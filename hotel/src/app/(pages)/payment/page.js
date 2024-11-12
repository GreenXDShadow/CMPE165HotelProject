'use client'; // use client-side hooks

import './payment.css';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function Payment() {
    const booking_id = useSearchParams().get('id');
    const [cardnum, setCardnum] = useState('');
    const [cvc, setCVC] = useState('');
    const [expire, setExpire] = useState('');
    const [bookingDetails, setBookingDetails] = useState([]);

    const testID = 11235813; // test ID for the booking

    const handlePaymentInfo = (e) => {
        e.preventDefault();      
    };

    useEffect(() => {
        axios.get(`http://localhost:4000/booking_details/${booking_id}`, { withCredentials: true }) // booking_id = 0 tells backend to return latest entry for adding a new reservation, any other value is returns the specific booking (when editing reservations)
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
                                        <p>Check-in date: {detail.arrival_date}</p>
                                        <p>Check-out date: {detail.departure_date}</p>
                                        <p>Hotel: {detail.hotel_name}</p>
                                        <p>Guests: {detail.guests}</p>
                                        {/* <p>Room and floor: {detail.room_and_floor}</p> */}
                                        <p>Room Configuration: {detail.room_configuration}</p>
                                        <p>Price: {detail.cost_before_extra}</p>
                                        <p>Tax: {detail.tax}</p>
                                        <p>Convenience Fee: {detail.convenience_fee}</p>
                                        <p>Total: {detail.total}</p>
                                        {/* <p className="booking-id">Booking ID: {index}</p> */}
                                    </div>
                                ))
                            ) : (
                                <p>No booking details available.</p>
                            )}
                        </div>
                    </div>

                    {/* Payment Form and Login */}
                    <div className="right-column">
                        <div className="payment-form">
                            <h2 className="section-title">Payment Information</h2>
                            {/* this should only be used for guest checkout */}
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
                        <div>
                            rewards
                        </div>
                            <a href = "/confirmation">
                                <button className="btn">Confirm purchase</button>
                            </a>
                        <div className="login-section"> {/* this should all be hidden if the user is already logged in, we can just show a confirm button */}
                            <h2 className="section-title">You may also login to check out</h2>
                            <a href="/login">
                                <button className="btn">Login</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
