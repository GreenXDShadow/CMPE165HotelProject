"use client";

import React, { useState, useEffect } from 'react';
import './hotelinfo.css'
import Image from 'next/image';
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css'

const HotelInfo = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const { id } = params;
    const [startDate, setStartDate] = useState(searchParams.get('start_date'));
    const [endDate, setEndDate] = useState(searchParams.get('end_date'));
    const [hotelDetails, setHotelDetails] = useState(null);

    console.log(id)

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:4000/hotel/${id}?start_date=${startDate}&end_date=${endDate}`)
            .then((response) => {
                console.log(response.data + " hotelinfo page")
                setHotelDetails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
        }
    }, [id])
    
    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/booking', {
                hotel_id: id,
                hotel_name: hotelDetails.name,
                startDate,
                endDate
            }, { withCredentials: true });
            console.log('Booking successful:', response.data);
            if(response.status === 200){
                NotificationManager.success('Hotel booked successfully');
                console.log(response.data)
                setTimeout(() => {
                    window.location.href = '/payment'
                }, 1500) // 1.5 second delay before redirecting to the payment page
            }
            if(response.status === 401) {
                NotificationManager.error('You must be logged in to book a hotel');
            }
        } catch (error) {
            console.error('Error booking hotel:', error);
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    if(!hotelDetails)
        return <div>Loading...</div>;

    return (
        <div>
            <div className='nav-bar-filler'></div>
            <div className="content-wrapper">
                <form onSubmit={handleBooking}>
                <div className="info-container">
                    {/* Needs to eventualy be variable */}
                    <p id="hotel-name" className='title' style={{marginBottom: '0px', fontSize: '30px'}}>{hotelDetails.name}</p>
                    <p className='title'>Rating</p>
                    <p id="rating">{hotelDetails.rating}5/10</p>
                    <p className='title'>Address</p>
                    <p id="address">{hotelDetails.address}</p>
                    <p className='title'>Price Range</p>
                    <p id="price-range">$121-354</p>
                    <p className='title'>Hours</p>
                    <p id="hours">Open 24 Hours</p>
                </div>
                <div className="map-container">
                </div>
                <div className="break"></div>
                <div className="calendar-container">
                    <label for="check-in">Check in:</label>
                    <p>{startDate}</p>
                    <input type ="date" id="check-in" name="check-in" value={startDate} onChange={handleStartDateChange} />
                    <div>
                        <label for="check-out">Check out:</label>
                        <p>{endDate}</p>
                        <input type ="date" id="check-out" name="check-out" value={endDate} onChange={handleEndDateChange} />
                    </div>
                </div>
                <div className="break"/>
                <div className="booking-container">
                    <button style={{marginTop: '40px'}} className='confirmButton' type='submit'>Book</button>
                </div>
                </form>
            </div>
            <NotificationContainer />
        </div>
    )
}

export default HotelInfo;