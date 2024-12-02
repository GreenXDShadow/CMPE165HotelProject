'use client'; // use client-side hooks

import './payment.css';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications'; // Importing NotificationContainer and NotificationManager from 'react-notifications'
import 'react-notifications/lib/notifications.css'

export default function Payment() {
    const booking_id = useSearchParams().get('id');
    const [cardnum, setCardnum] = useState('');
    const [cvc, setCVC] = useState('');
    const [expire, setExpire] = useState('');
    const [bookingDetails, setBookingDetails] = useState([]);
    const [bd, setBD] = useState([]);
    // zander rewards
    const [userPoints, setUserPoints] = useState(-1);
    const [deductPoints, setDeductPoints] = useState(0);

    // zander rewards below
    const handleRewards = async(r) => {
        r.preventDefault();
        const data = {
            rewardPoints : deductPoints
        }
        try{
            bd[0].form_data['deduct_points'] = deductPoints;
            if (booking_id == "0") {
                const response = await axios.post('http://localhost:4000/booking', bd[0], {withCredentials: true})
                if(response.status === 200){
                    NotificationManager.success('Hotel booked successfully');
                    setTimeout(() => {
                        window.location.href = '/user' // id=0 means the payment page fetches info for the new booking 
                    }, 3000) // 1.5 second delay before redirecting to the payment page
                }
                if(response.status === 401) {
                    NotificationManager.error('You must be logged in to book a hotel');
                }
                if (response.status === 202) {
                  NotificationManager.error('Booking will overlap');
                  console.log("Overlapping Booking");
                }
            }
            else {
                const response = await axios.post('http://localhost:4000/edit', bd[0], {withCredentials: true})
                if(response.status === 200){
                    NotificationManager.success('Hotel booked successfully');
                    setTimeout(() => {
                        window.location.href = '/user' // id=0 means the payment page fetches info for the new booking 
                    }, 1500) // 1.5 second delay before redirecting to the payment page
                }
                if(response.status === 401) {
                    NotificationManager.error('You must be logged in to book a hotel');
                }
                if (response.status === 202) {
                  NotificationManager.error('Booking will overlap');
                  console.log("Overlapping Booking");
                }
            }      
        }catch(r){
            console.log(r)
        }
    }
    // end zander rewards above
    useEffect(() => {
        const response = axios.get('http://localhost:4000/rewards', { withCredentials: true })
        .then((response) => {
            setUserPoints(response.data.user_points);
            console.log(response);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
        const hasBD = localStorage.getItem('booking');
        if (hasBD) {
            console.log("Received data about the booking")
            setBD([JSON.parse(hasBD)])
        }
    }, [])

    return (
        <div className="payment-page">
            <div className="payment-container">
                <h1 className="payment-title">Payment</h1>

                <div className="columns-container">
                    {/* Booking Information */}
                    <div className="left-column">
                        <div className="booking-info">
                            <h2 className="section-title">Your Booking Information</h2>
                            {Array.isArray(bd) && bd.length > 0 ? (
                                <div key="0" className="booking-detail">
                                <p>Check-in date: {bd[0].form_data.arrival_date}</p>
                                <p>Check-out date: {bd[0].form_data.departure_date}</p>
                                <p>Hotel: {bd[0].hotel_data.name}</p>
                                <p>Guests: {bd[0].form_data.num_adults} adult(s) & {bd[0].form_data.num_children} child(ren)</p>
                                <p>Room Configuration: {bd[0].room_data.config}</p>
                                <p>Subtotal: ${bd[0].room_data.cost_before_extra}</p> 
                                <p>9% Tax: ${(bd[0].room_data.cost_before_extra*0.09).toFixed(2)}</p>
                                <p>Convenience Fee: ${2.50.toFixed(2)}</p>
                                <p>Total: <b>${(bd[0].room_data.cost_before_extra+bd[0].room_data.cost_before_extra*0.09+2.5-deductPoints*0.1).toFixed(2) >= 0 ? ((bd[0].room_data.cost_before_extra+bd[0].room_data.cost_before_extra*0.09+2.5-deductPoints*0.1).toFixed(2)) : (0)}</b></p>
                                <p>6% Points Earned: {((bd[0].room_data.cost_before_extra - deductPoints*0.1)*.06) > 0 ? (((bd[0].room_data.cost_before_extra - deductPoints*0.1)*.06).toFixed(0)): (0)}</p>                                
                                </div>
                            ) : (
                                <p>Loading Booking Details...</p>
                            )}
                        </div>
                    </div>

                    {/* Payment Form and Login */}
                    <div className="right-column">
                        <div>
                            {userPoints >= 0 ? (
                                <div>
                                    <b>Current Reward Points Total:</b> {userPoints}
                                </div>
                            ) : (
                                <p><b>Current Reward Points Total:</b> Loading...</p>
                            )}
                        </div>
                        <div>
                        <form onSubmit={handleRewards}>
                            <div>
                            <b> Number of Reward Points to Redeem (1 point = $0.10): </b>
                            <input
                                type="number"
                                min = "0"
                                max = {userPoints}
                                className="redeem-amt"
                                placeholder="#"
                                value={deductPoints}
                                onChange={(r) => setDeductPoints(r.target.value)}
                                required
                            />
                            </div>
                                
                            <button type = "submit" className="btn">Confirm Purchase</button>
                                
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </div>
    );
}
