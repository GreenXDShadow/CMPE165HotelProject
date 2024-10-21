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
                    <Image id="main-photo" src="/holiday.png" alt="hotel image" width={1366} height={768} layout='responsive'/>
                    <p className='title'>Rating</p>
                    <p id="rating">{hotelDetails.rating}/10</p>
                    <p className='title'>Address</p>
                    <p id="address">{hotelDetails.address}</p>
                    <p className='title'>Price Range</p>
                    <p id="price-range">$39.00 — $72.00</p>
                    <p className='title'>Hours</p>
                    <p id="hours">Open 24 Hours</p>
                    <p className='title'>Description</p>
                    <p id="review">{hotelDetails.review}</p>
                </div>
                <div className="map-container">
                    {/* <Image src="/landing.png" alt="map" width={1366} height={1536} layout='responsive'/> */}
                    <Image
                        id="map-photo"
                        className='image'
                        src="/landing.png"
                        alt="map to hotel"
                        width={1366}
                        height={768}
                        objectFit='cover'
                    />
                </div>
                <div className="break"></div>
                <div className="calendar-container">
                    <label for="check-in">Check in:</label>
                    <p>{startDate}</p>
                    <input type ="date" id="check-in" name="check-in" value={startDate} onChange={handleStartDateChange} />
                    <label for="check-out">Check out:</label>
                    <p>{endDate}</p>
                    <input type ="date" id="check-out" name="check-out" value={endDate} onChange={handleEndDateChange} />
                </div>
                <div className="break"/>
                <div className="booking-container">
                    <p style={{fontSize: '20px', marginBottom: '-5px'}}>Rooms:</p>
                    <div className='button-container'>
                        <input type='radio' className="roomButton" name='rooms' value='room1'/>
                        <span>Suite</span>
                    </div>
                    <div className='button-container'>
                        <input type='radio' className="roomButton" name='rooms' value='room2'/>
                        <span>Balcony</span>
                    </div>
                    <div className='button-container'>
                        <input type='radio' className="roomButton" name='rooms' value='room3'/>
                        <span>Window</span>
                    </div>    
                    <button style={{marginTop: '40px'}} className='confirmButton' type='submit'>Book</button>
                </div>
                </form>
            </div>
            <NotificationContainer />
        </div>
    )
}

export default HotelInfo;