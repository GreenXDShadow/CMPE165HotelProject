"use client";

import React, { useState, useEffect } from 'react';
import './edit.css'
import Image from 'next/image';
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import EditRoomCard from '../../../components/EditRoomCard'
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HotelInfo = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const { id } = params;
    const a_date = new Date(searchParams.get('start_date'));
    const d_date = new Date(searchParams.get('end_date'));
    a_date.setDate(a_date.getDate()+1); // Date() is stupid and returns the day before the actual date so we need to correct it with an offset
    d_date.setDate(d_date.getDate()+1);
    const [startDate, setStartDate] = useState(a_date);
    const [endDate, setEndDate] = useState(d_date);
    const [numAdults, setNumAdults] = useState(searchParams.get('num_adults'));
    const [numChildren, setNumChildren] = useState(searchParams.get('num_children'));
    const [numRooms, setNumRooms] = useState(searchParams.get('num_rooms'));
    const [edit, setEdit] = useState(searchParams.get('edit'));
    const [roomsList, setRooms] = useState([]);
    const todaysDate = new Date();

    useEffect(() => {
      }, []);

    function formatDate(d) {
    const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
    };
    const splitD = d.toString().split(" ");
    return splitD[3] + "-" + months[splitD[1]] + "-" +  splitD[2];j
    };
    
    const formData = {
        arrival_date: formatDate(startDate),
        departure_date: formatDate(endDate),
        num_adults: numAdults,
        num_children: numChildren,
        num_rooms: numRooms,
        booking_id: edit
    }

    const renderRooms = roomsList.map((room, index) => (
        <div className="room-list" key = {room.room_id}>
            <EditRoomCard
            roomData = {room}
            hotelData = {{'hotel_id': id, 'booking_id': edit}}
            formData = {formData}
            />
        </div>
        ));

    const handleEditSearch = async (e) => {
        e.preventDefault();

        try {
            axios.get(`http://localhost:4000/hotel/${id}?start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&num_adults=${numAdults}&num_children=${numChildren}&num_rooms=${numRooms}`)
            .then((response) => {
                console.log("hotel_info page", response.data)
                console.log("Hotel Page Start Date", startDate)
                setRooms(response.data.rooms);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <div className='nav-bar-filler'></div>
            <div className="search-container">
                <form onSubmit={handleEditSearch} className="search">
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
            </div>
            {renderRooms}
            <NotificationContainer />
        </div>
    )
}

export default HotelInfo;