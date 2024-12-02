"use client";
import Image from 'next/image';
import '../.././main.css';
import './reservation.css';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';  // Import the useRouter hook
import axios from 'axios';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css'

export default function reservation() {
    const booking_id = useSearchParams().get('id');
    const past = useSearchParams().get('past');
    const [bookingDetails, setBookingDetails] = useState([]);
    const router = useRouter();  // Initialize the router

    useEffect(() => {
        axios.get(`http://localhost:4000/booking_details/${booking_id}`, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setBookingDetails(response.data[0]);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }, [])

    const handleCancelPress = async (e) => {
        e.preventDefault();
        window.location.href = `/cancel?id=${booking_id}`
        // router.push(`/cancel?id=${booking_id}`)
    }

    const handleEditPress = async (e) => {
        e.preventDefault();
        window.location.href = `/edit/${bookingDetails.hotel_id}?edit=${bookingDetails.booking_id}&hotel_name=${bookingDetails.hotel_name}&start_date=${bookingDetails.arrival_date}&end_date=${bookingDetails.departure_date}&num_adults=${bookingDetails.num_adults}&num_children=${bookingDetails.num_children}&num_rooms=${bookingDetails.num_rooms}`
        // router.push(`/edit/${bookingDetails.hotel_id}?edit=${bookingDetails.booking_id}&start_date=${bookingDetails.arrival_date}&end_date=${bookingDetails.departure_date}&num_adults=${bookingDetails.num_adults}&num_children=${bookingDetails.num_children}&num_rooms=${bookingDetails.num_rooms}`)
    }

    return (
        <>
            <div className='navbar'></div>
            <div className="container">
            <div className="container-left">
                <div className="image-wrapper">
                    <Image
                        id="map-photo"
                        className='image'
                        src="/marriot.png"
                        alt="reservation image"
                        width="1366"
                        height="768"
                        style={{ width: '90%', height: 'auto', borderRadius: '0.5rem', minWidth: '350px' }}
                    />
                </div>
            </div>
            <div className="container-right">
                <h1 style={{ color: 'black' }}>Your Reservation</h1>
                <div className='details-container'>
                    <div className='item-container'>
                        <p>Hotel: </p>
                        <p id='hotel-name'>{bookingDetails.hotel_name}</p>
                    </div>
                    <div className='item-container'>
                        <p>Confirmation Number: </p>
                        <p id='confirmation-number'>{booking_id}</p>
                    </div>
                    <div className='item-container'>
                        <p>Check-in: </p>
                        <p id='check-in-date-time'>{bookingDetails.arrival_date}</p>
                    </div>
                    <div className='item-container'>
                        <p>Room Type: </p>
                        <p id='room-type'>{bookingDetails.room_configuration}</p>
                    </div>
                    {/* <div className='item-container'>
                        <p>Payment: </p>
                        <p id='payment'>AMEX 0945</p>
                    </div> */}
                    <div className='item-container'>
                        <p>Guests: </p>
                        <p id='guests'>{bookingDetails.guests}</p>
                    </div>
                    <div className='item-container'>
                        <p>Total Cost: </p>
                        <p id='address'>${bookingDetails.total}</p>
                    </div>
                </div>
                {past == "0" ? (
                    <div classname='button-container'>
                    <button className='bookButton' onClick={() => router.back()}>Back</button>
                    <button className='cancelButton' onClick={handleCancelPress}>Cancel</button>
                    <button className='editButton' onClick={handleEditPress}>Edit...</button>
                    </div>
                ) : ("")
                }
                
            </div> 
            </div>
        </>
    );
};