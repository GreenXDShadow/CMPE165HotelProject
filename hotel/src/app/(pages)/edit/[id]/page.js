"use client";

import React, { useState, useEffect } from 'react';
import './edit.css'
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
    const [edit, setEdit] = useState(searchParams.get('edit'));
    const [hotelDetails, setHotelDetails] = useState(null);
    const [prevHotelData, setPrevHotelData] = useState({})
    const [roomsList, setRooms] = useState([]);
    const todaysDate = new Date();
    console.log(startDate)

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:4000/hotel/${id}?start_date=${startDate}&end_date=${endDate}&num_adults=${numAdults}&num_children=${numChildren}&num_rooms=${numRooms}`)
            .then((response) => {
                console.log("hotel_info page", response.data)
                console.log("Hotel Page Start Date", startDate)
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
            hotelData = {{}}
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
                {renderRooms}
            </div>
            <NotificationContainer />
        </div>
    )
}

export default HotelInfo;