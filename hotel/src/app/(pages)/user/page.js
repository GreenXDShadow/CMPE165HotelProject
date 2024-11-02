'use client';

import './user.css';
import '../.././main.css'
import '../.././globals.css'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function user() {
    const [user, setUser] = useState([]);
    const [upcoming_bookings, setUBookings] = useState([]);
    const [recent_bookings, setRBookings] = useState([]);

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

    return (
        <>
            <div className='nav-bar-filler'></div>
            <div className='container'>
                <h1 id='name' style={{fontSize: '2.5rem', margin: '0px'}}>{user.first_name} {user.last_name}</h1>
                <p id='membership-status'>Platinum Member</p>
                <button className='bookButton' style={{marginTop: '5px', marginBottom: '5px', marginLeft: '0px', marginRight: '0px', background: 'grey'}}>Edit Profile</button>
                <div className='content-container leading-title'>
                    <h2>Points</h2>
                </div>
                    <div className='content-container'>
                        <h3 id='points'>{user.reward_points}pts</h3>
                        <p id='cumulative-nights'>12 nights total</p>
                    </div>
                <div className='content-container leading-title'>
                    <h2>Upcoming Booking</h2>
                </div>
                {Array.isArray(upcoming_bookings) && upcoming_bookings.length > 0 ? (
                    upcoming_bookings.map((b, index) => (
                        <div key={index} className="content-container">
                            <h3>{b.hotel_name}</h3>
                            <p>{b.check_in_time}</p>
                            <p>{b.nights}</p>
                            <button className='bookButton' style={{marginTop: '0px', marginBottom: '5px', marginLeft: '10px', marginRight: '5px', background: 'grey'}}>View</button>
                            <button className='bookButton' style={{marginTop: '0px', marginBottom: '5px', marginLeft: '10px', marginRight: '5px', background: 'grey'}}>Change</button>
                        </div>
                    ))
                ) : (
                    <p>No booking details available.</p>
                )}
                <div className='content-container leading-title'>
                    <h2>Recent Stays</h2>
                </div>
                    {Array.isArray(recent_bookings) && recent_bookings.length > 0 ? (
                        recent_bookings.map((b, index) => (
                            <div key={index} className="content-container">
                                <h3>{b.hotel_name}</h3>
                                <p>{b.check_in_time}</p>
                                <p>{b.nights}</p>
                                <button className='bookButton' style={{marginTop: '0px', marginBottom: '5px', marginLeft: '10px', marginRight: '5px', background: 'grey'}}>View</button>
                            </div>
                        ))
                    ) : (
                        <p>No recent completed stays.</p>
                    )}
                    {/* <div className='content-container'>
                        <h3>Hilton Apple Valley</h3>
                        <p>3 nights</p>
                    </div>
                    <div className='content-container'>
                        <h3>Mariott Cupertino</h3>
                        <p>4 nights</p>
                    </div>
                    <div className='content-container'>
                        <h3>Hyatt San Jose Airport</h3>
                        <p>1 night</p>
                    </div> */}
                <button className='bookButton' style={{background: 'maroon', marginLeft: '0px', marginRight: '0px'}}>Logout</button>
            </div>
        </>
    );
};