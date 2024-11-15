'use client';

import './user.css';
import '../.././main.css'
import '../.././globals.css'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Import the useRouter hook

export default function user() {
    const [user, setUser] = useState([]);
    const [upcoming_bookings, setUBookings] = useState([]);
    const [recent_bookings, setRBookings] = useState([]);

    const router = useRouter();  // Initialize the router

    useEffect(() => {
        axios.get('http://localhost:4000/user', { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setUBookings(response.data.upcoming_bookings);
            setRBookings(response.data.recent_bookings)
            setUser(response.data.user);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }, [])

    const handleViewPress = async (e, id) => {
        e.preventDefault();
        router.push(`/reservation?id=${id}`)
    }

    return (
        <>
            <div className='nav-bar-filler'></div>
            <div className='user-page'>
            <div className='top-container'>
                <h1 id='name' style={{fontSize: '2.5rem', margin: '0px'}}>{user.first_name} {user.last_name}</h1>

                <h2> Platinum Member </h2>
                <p>Points: {user.reward_points}pts</p>
                <button className='logoutButton'>Logout</button>
                <button className='bookButton' style={{marginTop: '5px', marginBottom: '5px', marginLeft: '0px', marginRight: '0px', background: '#cdc379'}}>Edit Profile</button>
                
            </div>
            <div className='column-container'>
            <div className='left-container'>
                <div className='content-container leading-title'>
                    <h2>Upcoming Booking</h2>
                </div>
                {Array.isArray(upcoming_bookings) && upcoming_bookings.length > 0 ? (
                    upcoming_bookings.map((b, index) => (
                        <div key={b.booking_id} className="content-container">
                            <h3>{b.hotel_name}</h3>
                            <p>{b.arrival_date}</p>
                            <p>{b.num_nights}</p>
                            <button className='bookButton' onClick={(e) => handleViewPress(e, b.booking_id)} style={{marginTop: '0px', marginBottom: '5px', marginLeft: '10px', marginRight: '5px', background: 'grey'}}>View</button>
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
                                <h3>{b.hotel_name}</h3>
                                <p>{b.arrival_date}</p>
                                <p>{b.num_nights}</p>
                                <button className='bookButton' style={{marginTop: '0px', marginBottom: '5px', marginLeft: '10px', marginRight: '5px', background: 'grey'}}>View</button>
                            </div>
                        ))
                    ) : (
                        <p>No recent completed stays.</p>
                )}
            </div>
            </div>
            </div>

        </>
    );
};