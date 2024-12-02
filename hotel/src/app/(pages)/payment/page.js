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
            // const response = await axios.post('http://localhost:4000/payment', data, { withCredentials: true })
            // if(response.status === 200){ // Checking if the response data is equal to 'Success'
            //     console.log("Help");
            //     NotificationManager.success('Payment successful') // Updating the 'response' state variable with the success message
            //     setTimeout(() => {
            //         window.location.href = '/user' // Redirecting to the confirmation page after a delay
            //     }, 1500)
            // }
            bd[0].form_data['deduct_points'] = deductPoints;
            if (booking_id == "0") {
                const response = await axios.post('http://localhost:4000/booking', bd[0], {withCredentials: true})
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
                                <p>Price: {bd[0].room_data.cost_before_extra} ({(bd[0].room_data.cost_before_extra * 0.06).toFixed(0)} reward points earned)</p>
                                <p>Tax: {(bd[0].room_data.cost_before_extra*0.09).toFixed(2)} ({0.09}%)</p>
                                <p>Convenience Fee: ${2.50}</p>
                                <p>Total: ${(bd[0].room_data.cost_before_extra+bd[0].room_data.cost_before_extra*0.09+2.5-deductPoints*0.1).toFixed(2)}</p>
                                </div>
                            ) : (
                                <p>Loading Booking Details...</p>
                            )}
                        </div>
                    </div>

                    {/* Payment Form and Login */}
                    <div className="right-column">
                        <div>
                            {userPoints > 0 ? (
                                <div>
                                    Current Reward Points Total: {userPoints} (1 point = $0.10)
                                </div>
                            ) : (
                                <p>Current Reward Points Total: Loading...</p>
                            )}
                        </div>
                        <div>
                        <form onSubmit={handleRewards}>

                            <input
                                type="number"
                                min = "0"
                                max = {userPoints}
                                className="redeem-amt"
                                placeholder="points"
                                value={deductPoints}
                                onChange={(r) => setDeductPoints(r.target.value)}
                                required
                            />
                                
                            <button type = "submit" className="btn">Confirm purchase and rewards</button>
                                
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </div>
    );
}
