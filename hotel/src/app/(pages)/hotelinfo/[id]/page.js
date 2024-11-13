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
    console.log(startDate)

    // Retrieve data from localStorage when the page loads
    useEffect(() => {
        const hasPrevHotel = localStorage.getItem('hotelData');
        if (hasPrevHotel) {
            console.log("Received data about the selected hotel")
            setPrevHotelData(JSON.parse(hasPrevHotel))
        }
        // const roomsFound = localStorage.getItem('saveRoomList');
        // if (roomsFound) {
        //     setRooms(JSON.parse(roomsFound))
        //     console.log("Rooms taken from cache")
        // }
    }, []);

    useEffect(() => {
        if (id) {
            console.log(startDate)
            axios.get(`http://localhost:4000/hotel/${id}?start_date=${startDate}&end_date=${endDate}&num_adults=${numAdults}&num_children=${numChildren}&num_rooms=${numRooms}`)
            .then((response) => {
                console.log("hotel_info page", response.data)
                console.log("Hotel Page Start Date", startDate)
                setHotelDetails(response.data);
                setRooms(response.data.rooms);
                localStorage.setItem('saveRoomList', JSON.stringify(response.data.rooms));
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
        }
    }, [id])

    const handleSearch = async (e) => {
        e.preventDefault();
      };

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

                {/* <div className="search-container">
                <form onSubmit={handleSearch} className="search">
                <div className="calendar">
                    <div className="date-picker-wrapper">
                    <p className="date-label">From:</p>
                    <DatePicker
                        id="start-date"
                        minDate={todaysDate}
                        className="calendar-input-first"
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
                    <div className="date-picker-wrapper">
                    <img src="/guestIcon.png" alt="Guests" className="guest-icon" />
                        <div className="dropdown">
                        <button className="dropdown-button"> Guests</button>
                        <div className="dropdown-content">
                        <p> Number of adults:</p>
                        <input
                            type="number"
                            name="adult-guests"
                            placeholder="2"
                            min="1"
                            max="20"
                            className="guest-input"
                            value={numAdults}
                            onChange={(e) => setNumAdults(e.target.value)}
                        />
                        <br />
                        <p> Number of children: </p>
                        <input
                            type="number"
                            name="child-guests"
                            placeholder="0"
                            min="0"
                            max="20"
                            className="guest-input"
                            value={numChildren}
                            onChange={(e) => setNumChildren(e.target.value)}
                        />
                        <br />
                        <p> Number of rooms:</p>
                        <input
                            type="number"
                            name="room-qty"
                            placeholder="1"
                            min="1"
                            max="4"
                            className="guest-input"
                            value={numRooms}
                            onChange={(e) => setNumRooms(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Stop click event from bubbling
                        />
                        </div>
                    </div>
                </div>
                </div>

                <button type="submit" className="searchButton">Search</button>
                </form>
                </div> */}
                
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