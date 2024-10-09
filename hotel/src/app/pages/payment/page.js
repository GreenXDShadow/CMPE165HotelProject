'use client'; // use client-side hooks

import './payment.css';
import React, { useState } from 'react';

export default function Payment() {
    const [cardnum, setCardnum] = useState('');
    const [cvc, setCVC] = useState('');
    const [expire, setExpire] = useState('');
    const [error, setError] = useState('');

    const testID = 11235813; // test ID for the booking

    const handlePaymentInfo = (e) => {
        e.preventDefault();      
    };

    return (
        <div className="payment-page">
            <div className="payment-container">
                <h1 className="payment-title">Payment</h1>

                <div className="columns-container">
                    {/* Booking Information */}
                    <div className="left-column">
                        <div className="booking-info">
                            <h2 className="section-title">Your Booking Information</h2>
                            <p>Check-in date:</p>
                            <p>Check-out date:</p>
                            <p>Hotel:</p>
                            <p>Guests:</p>
                            <p>Room and floor:</p>
                            <p>Price:</p>
                            <p>Tax:</p>
                            <p>Convenience Fee:</p>
                            <p>Total:</p>
                            <p className="booking-id">Booking ID: {testID}</p>
                        </div>
                    </div>

                    {/* Payment Form and Login */}
                    <div className="right-column">
                        <div className="payment-form">
                            <h2 className="section-title">Payment Information</h2>
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
                                    Confirm
                                </button>
                            </form>
                        </div>

                        <div className="login-section">
                            <h2 className="section-title">You may also login to check out</h2>
                            <a href="/pages/login">
                                <button className="btn">Login</button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Error */}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}
