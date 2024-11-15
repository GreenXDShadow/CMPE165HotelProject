"use client";
import './main.css';
import HotelCard from './components/HotelCard';
import React, { useEffect, useState } from 'react';
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

  const [breakfastIncluded, setBreakfastIncluded] = useState(false);
  const [parkingIncluded, setParkingIncluded] = useState(false);
  const [rating, setRating] = useState('');
  const [bedType, setBedType] = useState('');

  const todaysDate = new Date();

  const handleContactSubmit = (event) => {
    event.preventDefault();
    // No functionality yet
  };

  const handleApplyFilters = () => {

    // NEEDS IMPLEMENTATION
    console.log("Filters Applied: ");
    console.log("Breakfast Included:", breakfastIncluded);
    console.log("Parking Included:", parkingIncluded);
    console.log("Rating:", rating);
    console.log("Bed Type:", bedType);
    
  };

  function formatDate(d) {
    // Check if d exists, is a Date object, and is valid
    if (!d || !(d instanceof Date) || isNaN(d.getTime())) {
      return null;
    }

    const months = {
      // Reformatted for readability (nothing was wrong before)
      Jan: "01", Feb: "02", Mar: "03", Apr: "04",
      May: "05", Jun: "06", Jul: "07", Aug: "08",
      Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };
    const splitD = d.toString().split(" ");
    return splitD[3] + "-" + months[splitD[1]] + "-" +  splitD[2];
  };

  // Retrieve data from localStorage when the page loads
  useEffect(() => {
    // Handle hotels cache
    const cachedHotelSearch = localStorage.getItem('saveHotelList');
    if (cachedHotelSearch) {
        console.log("Hotels taken from cache")
        setHotels(JSON.parse(cachedHotelSearch));
    }

    // Handle form cache
    try {
        const cachedForm = JSON.parse(localStorage.getItem('saveForm'));
        if (cachedForm) {
            setLocation(cachedForm.location);

            //Set form fields from cache if not use defaults
            setStartDate(new Date(cachedForm.arrival_date || new Date()));
            setEndDate(new Date(cachedForm.departure_date || new Date()));
            setNumAdults(cachedForm.num_adults);
            setNumChildren(cachedForm.num_children);
            setNumRooms(cachedForm.num_rooms);
        }
    } catch (error) {
        console.error('Error loading cached form data:', error);
        // If there's an error parsing, we just keep the default states
    }
}, []);


  const handleSearch = async (e) => {
    e.preventDefault();

    // Validate dates before proceeding (extra precaution)
    if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid dates');
      return;
    }

    const data = {
      location,
      arrival_date: formatDate(startDate),
      departure_date: formatDate(endDate),
      num_adults: numAdults,
      num_children: numChildren,
      num_rooms: numRooms
    };

    // Only proceed if we have valid dates
    if (data.arrival_date && data.departure_date) {
      try {
        localStorage.setItem('saveForm', JSON.stringify(data));
        const response = await axios.post('http://localhost:4000/search', data, {withCredentials: true});
        localStorage.setItem('saveHotelList', JSON.stringify(response.data.hotels));
        setHotels(response.data.hotels);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const splitArrival = startDate.toString().split(" ");
  const splitDeparture = endDate.toString().split(" ");
  const renderHotels = hotelsList.map((hotel) => (
    <div className="hotel-list" key={hotel.hotel_id}>
      <HotelCard
        id={hotel.hotel_id}
        name={hotel.name}
        description={hotel.cost_before_extra}
        rating={`${hotel.review_score}/10 (${hotel.rating})`}
        image={hotel.image}
        start_date={formatDate(startDate)}
        end_date={formatDate(endDate)}
        num_adults = {numAdults}
        num_children = {numChildren}
        num_rooms = {numRooms}
        hotel_data = {hotel}
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
                className="calendar-input-first"
                selected={startDate}
                onChange={(date) => {setStartDate(date); console.log(date)}}
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


          {/* Filters row */}
          <div className="filters-row">
            <label>
              <input
                type="checkbox"
                checked={breakfastIncluded}
                onChange={(e) => setBreakfastIncluded(e.target.checked)}
              />
              Breakfast Included
              <div className="vertical-line2"></div>
            </label>

            <label>
              <input
                type="checkbox"
                checked={parkingIncluded}
                onChange={(e) => setParkingIncluded(e.target.checked)}
              />
              Parking Included
              <div className="vertical-line2"></div>
            </label>

            <label>
              Rating:
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <div className="vertical-line2"></div>
            </label>

            <label>
              Bed Type:
              <select value={bedType} onChange={(e) => setBedType(e.target.value)}>
                <option value="">Any</option>
                <option value="king">King</option>
                <option value="queen">Queen</option>
                <option value="twin">Twin</option>
              </select>
            </label>

              
            <button type="button" className="apply-filters-button" onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>

          
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
            <hr className="mobile-hr" />
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