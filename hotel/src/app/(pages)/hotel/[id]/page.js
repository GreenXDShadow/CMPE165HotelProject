'use client'

import React, { useState, useEffect } from 'react';
import './style.css';
import '../../.././globals.css';
import '../../.././main.css';
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import RoomCard from '../../../components/RoomCard'
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function hotelinfo2() {
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
    const [overlay, setOverlay] = useState(false);
    const [photosList, setPhotos] = useState([]);

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

    // no need to format date because it takes from parameter which is not a Date() string
    const formData = {
        arrival_date: startDate,
        departure_date: endDate,
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

    const renderPhotos = roomsList.map((photo_link, index) => (
        <div className="photo-list" key = {index}>
           <img
            src={photo_link}
            className="photo"
            alt={index}
            />
        </div>
        ));

    const toggleOverlay = () => {

        {/* More photos API call here */}
        axios.get(`http://localhost:4000/hotel_photos/${id}`)
        .then((response) => {
            console.log(response.data);
            setRooms(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });

        if(overlay) {
            setOverlay(false);
            document.querySelector('.image-overlay').style.display = 'none';
            document.querySelector('.content-wrapper').style.overflow = 'scroll';
            document.body.style.overflowY = 'scroll';
        } else {
            setOverlay(true)
            document.querySelector('.image-overlay').style.display = 'block';
            document.querySelector('.content-wrapper').style.overflow = 'hidden';
            document.body.style.overflowY = 'hidden';
        };
    };

    return (
        <div className="view-container">
            <div className="image-overlay">
            <button onClick={toggleOverlay} className="close-button">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                id="Outline" 
                viewBox="0 0 24 24"
            >
                <path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"/>
            </svg>
            </button>
                <div className="masonry-container">
                    {/* Load photos here */}        
                    {renderPhotos}
                </div>
            </div>
            <div className="content-wrapper">
                <div className="top-section">
                    <div className="image-container">
                        <div className="image-wrapper">
                            {/* MAIN IMAGE HERE */}
                            <img
                                src={prevHotelData.image}
                                alt="Main Photo"
                                className="main-photo"
                            />
                            <div className="name-wrapper">
                                {/* INSERT HOTEL TITLE HERE */}
                                <p className="title">{prevHotelData.name}</p>
                                <button onClick={toggleOverlay} className="open-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                        <path d="m9,9H2c-1.103,0-2-.897-2-2v-2C0,2.243,2.243,0,5,0h4c1.103,0,2,.897,2,2v5c0,1.103-.897,2-2,2Zm10,15h-4c-1.103,0-2-.897-2-2v-5c0-1.103.897-2,2-2h7c1.103,0,2,.897,2,2v2c0,2.757-2.243,5-5,5Zm3-11h-7c-1.103,0-2-.897-2-2V2c0-1.103.897-2,2-2h4c2.757,0,5,2.243,5,5v6c0,1.103-.897,2-2,2Zm-13,11h-4c-2.757,0-5-2.243-5-5v-6c0-1.103.897-2,2-2h7c1.103,0,2,.897,2,2v9c0,1.103-.897,2-2,2Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {/* Hotel overview here */}
                        <p className="overview">
                            Rated As A {prevHotelData.rating} Stay
                        </p>
                    </div>
                </div>
                <div className="stats-section">
                    <div className="rating-stat">
                        <p className="subheading">Rating:</p>
                        {/* replace with rating */}
                        <p className="stat">{prevHotelData.review_score}</p>
                    </div>
                    <div className="price-stat">
                        <p className="subheading">Cheapest Price For Your Stay:</p>
                        {/* replace with price range */}
                        <p className="stat">${prevHotelData.cost_before_extra}</p>
                    </div>
                    <div className="hours-stat">
                        <p className="subheading">Hours:</p>
                        {/* replace with hours */}
                        <p className="stat">Open 24hrs</p>
                    </div>
                </div>
                <div className="book-section">
                    <span className="section-title">Book Now</span>
                    {renderRooms}
                </div> 
            </div>   
        </div> 
    )
}