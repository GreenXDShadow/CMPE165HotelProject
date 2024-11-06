'use client'; // use client-side hooks

import './payment.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications'; // Importing NotificationContainer and NotificationManager from 'react-notifications'
import 'react-notifications/lib/notifications.css'

export default function Payment() {
    const [cardnum, setCardnum] = useState('');
    const [cvc, setCVC] = useState('');
    const [expire, setExpire] = useState('');
    const [bookingDetails, setBookingDetails] = useState([]);
    // zander rewards
    const [rewardsPoints, setRewards] = useState('');

    const testID = 11235813; // test ID for the booking

    const handlePaymentInfo = (e) => {
        e.preventDefault();      
    };
    // zander rewards below
    const handleRewards = async(r) => {
        r.preventDefault();
        const data = {
            rewardsPoints : rewardsPoints
        }
        console.log(data)
        try{
            const response = await axios.post('http://localhost:4000/payment', data, { withCredentials: true })
            if(response.status === 200){ // Checking if the response data is equal to 'Success'
                console.log("Help");
                NotificationManager.success('Payment successful') // Updating the 'response' state variable with the success message
                setTimeout(() => {
                    window.location.href = '/confirmation' // Redirecting to the confirmation page after a delay
                }, 1500)
            }
            else {}
        }catch(r){
            console.log(r)
        }
    }
    // end zander rewards above
    useEffect(() => {
        axios.get('http://localhost:4000/booking_details',{ withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setBookingDetails(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
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
                            {Array.isArray(bookingDetails) && bookingDetails.length > 0 ? (
                                bookingDetails.map((detail, index) => (
                                    <div key={index} className="booking-detail">
                                        <p>Check-in date: {detail.check_in_time}</p>
                                        <p>Check-out date: {detail.check_out_time}</p>
                                        <p>Hotel: {detail.hotel_name}</p>
                                        <p>Guests: {detail.guests}</p>
                                        <p>Room and floor: {detail.room_and_floor}</p>
                                        <p>Price: {detail.pricing_per_night}</p>
                                        <p>Tax: {detail.tax}</p>
                                        <p>Convenience Fee: {detail.convenience_fee}</p>
                                        <p>Total: {detail.cost}</p>
                                        <p className="booking-id">Booking ID: {index}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No booking details available.</p>
                            )}
                        </div>
                    </div>

                    {/* Payment Form and Login */}
                    <div className="right-column">
                        {/* commented out guest checkout form
                        <div className="payment-form">
                            <h2 className="section-title">Payment Information</h2>
                            {/* this should only be used for guest checkout 
                            <form onSubmit={handlePaymentInfo}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="payment-input"
                                        placeholder="Card Number"
                                        value={cardnum}
                                        onChange={(e) => setCardnum(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group2">
                                    <input
                                        type="text"
                                        className="payment-input2"
                                        placeholder="CVC"
                                        value={cvc}
                                        onChange={(e) => setCVC(e.target.value)}
                                        required
                                    />

                                    <input
                                        type="text"
                                        className="payment-input2"
                                        placeholder="Expiration Date"
                                        value={expire}
                                        onChange={(e) => setExpire(e.target.value)}
                                        required
                                    />
                                </div>


                                <button type="submit" className="btn">
                                    Confirm payment
                                </button>
                            </form>
                        </div>
                         end of guest checkout form   */}
                        <div>
                            rewards
                            Display current user rewards points
                            1 point = $0.01
                        </div>
                        <div>
                        <form onSubmit={handleRewards}>

                            <input
                                type="number"
                                min = "0"
                                max = "100000"
                                className="redeem-amt"
                                placeholder="points"
                                value={rewardsPoints}
                                onChange={(r) => setRewards(r.target.value)}
                                required
                            />
                                
                            <button type = "submit" className="btn">Confirm purchase and rewards</button>
                                
                        </form>
                        </div>
                        <div className="login-section"> {/* this should all be hidden if the user is already logged in, we can just show a confirm button */}
                            <h2 className="section-title">You may also login to check out</h2>
                            <a href="/login">
                                <button className="btn">Login</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </div>
    );
}
