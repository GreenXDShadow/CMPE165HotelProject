'use client'; // use client-side hooks

import './confirmation.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Confirmation(){
    // function for displaying booking info
    const [bookingDetails, setBookingDetails] = useState([]);

    const testID = 11235813; // test ID for the booking
    // Internal API call for booking details
    useEffect(() => {
        axios.get('http://localhost:4000/booking_details', { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setBookingDetails(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }, [])

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <h1 className="confirmation-title">Payment</h1>

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
                    
                    {/*Confirmation logo*/}
                    <div className="right-column">
                            {/* this section can be improved upon with frontend css and otherwise */}
                            <div className="return-home">
                                this order has been confirmed
                            <a href="/">
                                <button className="btn">Home</button>
                            </a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}