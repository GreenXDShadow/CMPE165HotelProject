"use client";
import './main.css';
import HotelCard from './components/HotelCard';
import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numAdults, setNumAdults] = useState('');
  const [numChildren, setNumChildren] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [hotelsList, setHotels] = useState([]);
  const todaysDate = new Date();

  const handleContactSubmit = (event) => {
    event.preventDefault();
    // No functionality yet
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = {
      location,
      arrival_date: startDate,
      depart_date: endDate,
      num_adults: numAdults,
      num_children: numChildren,
      num_rooms: numRooms
    };

    try {
      const response = await axios.post('http://localhost:4000/search', data, {withCredentials: true});
      console.log(response.data)
      setHotels(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const renderHotels = hotelsList.map((hotel) => (
    <div className="hotel-list" key={hotel.hotel_id}>
      <HotelCard
        id={hotel.hotel_id}
        name={hotel.name}
        description={hotel.cost_before_extra}
        rating={`${hotel.review_score}/10 (${hotel.rating})`}
        image={hotel.image}
        start_date={startDate}
        end_date={endDate}
      />
    </div>
  ));

  return (
    <div className='search-page'>
      <div className="main">
        <h1>Your Next Stay Will Feel</h1>
        <img src="/likehome.png" alt="LikeHome Logo" className="logo" />
      </div>
      <div className="search-container">
        <form onSubmit={handleSearch} className="search">
          <input
            type="text"
            name="search"
            placeholder="Where do you wanna stay?"
            className="search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="calendar">
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
          </div>
          <div className="dropdown">
            <button className="dropdown-button"> Guests </button>
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
              />
            </div>
          </div>
          <button type="submit" className="searchButton">Search</button>
        </form>
      </div>
      <div className='search-results'>
        {renderHotels}
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <a href="/">
              <img src="/likehome.png" alt="LikeHome Logo" className="footer-logo" />
            </a>
            <p>We are dedicated to providing a catered hotel experience based on your needs.</p>
            <p>Whatever stay you look for will feel <strong>LikeHome</strong>.</p>
            <p>Book your next vacation with us!</p>
          </div>
          <div className="footer-right">
            <p>Contact Us</p>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <input type="text" name="name" placeholder="Name" className="contact-input" />
              <input type="email" name="email" placeholder="Email" className="contact-input" />
              <textarea name="message" placeholder="Message" className="contact-input"></textarea>
              <button type="submit" className="contact-button">Submit</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;