"use client";

import React, { useState, useEffect } from 'react';
import './hotelinfo.css'
import Image from 'next/image';
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import RoomCard from '../../../components/RoomCard'
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HotelInfo = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const { id } = params;
    const [startDate, setStartDate] = useState(searchParams.get('start_date'));
    const [endDate, setEndDate] = useState(searchParams.get('end_date'));
    const [numAdults, setNumAdults] = useState(searchParams.get('num_adults'));
    const [numChildren, setNumChildren] = useState(searchParams.get('num_children'));
    const [numRooms, setNumRooms] = useState(searchParams.get('num_rooms'));
    const [hotelDetails, setHotelDetails] = useState(null);
    const [prevHotelData, setPrevHotelData] = useState({})
    const [roomsList, setRooms] = useState([]);
    const todaysDate = new Date();

    console.log(id)

    // Retrieve data from localStorage when the page loads
    useEffect(() => {
        const hasPrevHotel = localStorage.getItem('hotelData');
        if (hasPrevHotel) {
            console.log("Received data about the selected hotel")
            setPrevHotelData(JSON.parse(hasPrevHotel))
        }
        const roomsFound = localStorage.getItem('saveRoomList');
        if (roomsFound) {
            setRooms(JSON.parse(roomsFound))
            console.log("Rooms taken from cache")
        }
    }, []);

    useEffect(() => {
        if (id) {
            console.log(startDate)
            axios.get(`http://localhost:4000/hotel/${id}?start_date=${startDate}&end_date=${endDate}&num_adults=${numAdults}&num_children=${numChildren}&num_rooms=${numRooms}`)
            .then((response) => {
                console.log(response.data + " hotelinfo page")
                setHotelDetails(response.data);
                setRooms(response.data.rooms);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
        }
    }, [id])

    const formData = {
        arrival_date: startDate,
        depart_date: endDate,
        num_adults: numAdults,
        num_children: numChildren,
        num_rooms: numRooms
    }

    const renderRooms = roomsList.map((room, index) => (
        <div className="room-list" key = {room.room_id}>
            <RoomCard
            roomData = {room}
            hotelData = {prevHotelData}
            formData = {formData}
            />
        </div>
        ));

    if(!hotelDetails)
        return <div>Loading...</div>;

    return (
        <div>
            <div className='nav-bar-filler'></div>
            <div className="content-wrapper">
                <div className="info-container">
                    {/* Needs to eventualy be variable */}
                    <p id="hotel-name" className='title' style={{marginBottom: '0px', fontSize: '30px'}}>{prevHotelData.name}</p>
                    {/* <Image id="main-photo" src="/holiday.png" alt="hotel image" width={1366} height={768} layout='responsive'/> */}
                    <img src={prevHotelData.image} alt={'hotel image'} className="hotel-image" />
                    <p className='title'>Review Score</p>
                    <p id="rating">{prevHotelData.review_score}</p>
                    <p className='title'>Address</p>
                    <p id="address">{hotelDetails.address}</p>
                    <p className='title'>Cheapest Rate For Your Stay</p>
                    <p id="price-range">${prevHotelData.cost_before_extra}</p>
                    <p className='title'>Review</p>
                    <p id="review">{prevHotelData.rating}</p>
                    <p className='title'>Check In Time</p>
                    <p id="checkin">{prevHotelData.checkin_start}</p>
                    <p className='title'>Check Out Time</p>
                    <p id="checkout">{prevHotelData.checkout_end}</p>
                </div>
                
                <div className="map-container">
                </div>
                <div className="break"></div>

                {/* <div className="calendar">
                <div className="date-picker-wrapper">
                <p className="date-label">From:</p>
                <DatePicker
                    id="start-date"
                    minDate={todaysDate}
                    className="calendar-input"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                </div>
                <div className="date-picker-wrapper">
                <p className="date-label">To:</p>
                <DatePicker
                    id="end-date"
                    minDate={startDate}
                    className="calendar-input"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                />
                </div>

                </div> */}
                <div className="break"/>
                {renderRooms}
            </div>
            <NotificationContainer />
        </div>
    )
}

export default HotelInfo;