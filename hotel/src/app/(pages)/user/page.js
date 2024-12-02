'use client';

import './user.css';
import '../.././main.css'
import '../.././globals.css'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Import the useRouter hook

export default function User() {
    // Default user state to prevent null entries in Array
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        reward_points: 0
    });
    const [upcoming_bookings, setUBookings] = useState([]);
    const [recent_bookings, setRBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();  // Initialize the router

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:4000/user', { withCredentials: true })
        .then((response) => {
            console.log('User API Response:', response.data);
            if (response.data && response.data.user) {
                setUser(response.data.user);
                setUBookings(response.data.upcoming_bookings || []);
                setRBookings(response.data.recent_bookings || []);
            }
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const handleViewPress = async (e, id, past) => {
        e.preventDefault();
        window.location.href = `/reservation?id=${id}&past=${past}`
        // router.push(`/reservation?id=${id}`);
    };

    return (
        <div className="page-container">
            <div className='nav-bar-filler'></div>
            <div className='user-page' style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
                <div className='top-container'>
                    <h1 style={{
                        fontSize: '2.5rem',
                        margin: '0px',
                        color: 'white',  // Ensure text is visible
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'  // Add shadow for better visibility
                    }}>
                        {user.first_name} {user.last_name}
                    </h1>

                    <h2 style={{ color: 'white' }}>Member</h2>
                    <p style={{ color: 'white' }}>Points: {user.reward_points}pts</p>
                </div>

                <div className='column-container'>
                    <div className='left-container'>
                        <div className='content-container leading-title'>
                            <h2>Upcoming Bookings</h2>
                        </div>
                        {Array.isArray(upcoming_bookings) && upcoming_bookings.length > 0 ? (
                            upcoming_bookings.map((b) => (
                                <div key={b.booking_id} className="content-container">
                                    <div>
                                        <h3>{b.hotel_name}</h3>
                                        <p>Check-in: {b.arrival_date}</p>
                                        <p>{b.num_nights} nights</p>
                                    </div>
                                    <button
                                        className='bookButton'
                                        onClick={(e) => handleViewPress(e, b.booking_id, 0)}
                                        style={{
                                            marginTop: 'auto',
                                            marginBottom: 'auto',
                                            background: 'grey'
                                        }}
                                    >
                                        View
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No booking details available.</p>
                        )}
                    </div>

                    <div className='right-container'>
                        <div className='content-container leading-title'>
                            <h2>Recent Stays</h2>
                        </div>
                        {Array.isArray(recent_bookings) && recent_bookings.length > 0 ? (
                            recent_bookings.map((b, index) => (
                                <div key={index} className="content-container">
                                    <div>
                                        <h3>{b.hotel_name}</h3>
                                        <p>Stayed: {b.arrival_date}</p>
                                        <p>{b.num_nights} nights</p>
                                    </div>
                                    <button
                                        className='bookButton'
                                        onClick={(e) => handleViewPress(e, b.booking_id, 1)}
                                        style={{
                                            marginTop: 'auto',
                                            marginBottom: 'auto',
                                            background: 'grey'
                                        }}
                                    >
                                        View
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No recent completed stays.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}