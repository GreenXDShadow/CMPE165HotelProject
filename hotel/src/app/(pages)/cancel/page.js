"use client";
import Image from 'next/image';
import './cancel.css';
import '../.././main.css';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';  // Import the useRouter hook
import axios from 'axios';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css'

export default function reservation() {
    const id = useSearchParams().get('id');
    const [bookingDetails, setBookingDetails] = useState([]);
    const router = useRouter();  // Initialize the router

    useEffect(() => {
        axios.get('http://localhost:4000/booking_details', { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setBookingDetails(response.data[0]);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }, [])

    const handleConfirmPress = async (e) => {
        e.preventDefault();
        console.log("Canceling")
        NotificationManager.success('Booking Canceled');
        axios.delete(`http://localhost:4000/cancel?id=${id}`, { withCredentials: true })
        setTimeout(() => {
            router.push(`/user`)
        }, 1500) // 1.5 second delay before redirecting to the user page
    }

    return (
        <>
            <div className='navbar'></div>
            <div className="container">
                <h1>Cancel Booking #{id}</h1>
                <div className='details-container'>
                    <div className='item-container'>
                        <p>Hotel: </p>
                        <p id='hotel-name'>{bookingDetails.hotel_name}</p>
                    </div>
                    <div className='item-container'>
                        <p>Check-in: </p>
                        <p id='check-in-date-time'>{bookingDetails.arrival_date}</p>
                    </div>
                    <div className='item-container'>
                        <p>Room Type: </p>
                        <p id='room-type'>{bookingDetails.room_configuration}</p>
                    </div>
                    <div className='item-container'>
                        <p>Payment: </p>
                        <p id='payment'>AMEX 0945</p>
                    </div>
                    <div className='item-container'>
                        <p>Base Booking Cost: </p>
                        <p id='address'>${bookingDetails.cost_before_extra}</p>
                    </div>
                    <div className='item-container'>
                        <p>Cancellation Cost: </p>
                        <p id='address'>${bookingDetails.cost_before_extra * 0.1}</p>
                    </div>
                </div>
                <div classname='button-container'>
                    <button className='bookButton' onClick={() => router.back()}>Back</button>
                    <button className='bookButton' onClick={handleConfirmPress}>Confirm</button>
                </div>
            </div> 
        </>
    );
};