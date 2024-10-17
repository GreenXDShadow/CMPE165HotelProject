"use client"; 
import './main.css'; 
import HotelCard from './components/HotelCard';
import React, { useState } from 'react' // Importing React and useState hook from the 'react' package
import axios from 'axios' // Importing axios library for making HTTP requests
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { render } from 'react-dom';

export default function Home() {
  const [error, setError] = useState('') // Creating a state variable 'error' and a function 'setError' to update it
	const [location, setLocation] = useState('') // State variable for the location of stay
	const [startDate, setStartDate] = useState(new Date()); //State variable for Check-in Date picker
	const [endDate, setEndDate] = useState(new Date()); //State variable for Check-out Date picker
	const [numAdults, setNumAdults] = useState('');
	const [numChildren, setNumChildren] = useState('');
	const [numRooms, setNumRooms] = useState('');
	const [hotelsList, setHotels] = useState([]);
	const todaysDate = new Date();

  const handleContactSubmit = (event) => {
    event.preventDefault(); // Prevents form submission
    // No functionality yet
  };
  
	const handleSearch = async(e) => {
      e.preventDefault();
      const searchQuery = e.target.elements.search.value;
      console.log("Searching for:", searchQuery);
      
      const data = { 
        location: location,
        arrival_date: startDate,
        depart_date: endDate,
        num_adults: numAdults,
        num_children: numChildren,
        num_rooms: numRooms
      }

      try{
        const response = await axios.post('http://localhost:4000/search', data) // Making a POST request to 'http://localhost:4000/search' with the data object
        setHotels(response.data)
      } 
      catch (e) {
        console.log(e) // Logging any errors that occur during the request
      }
  	};

	// API Hotels (renders upon receiving post request after the setHotels function is run to populate hotelsList with the API data)

	const renderHotels = hotelsList.map((hotel, index) => (
    <div className="hotel-list" key = {hotel.hotel_id}>
        <HotelCard
        name={hotel.name} // follows the key structure from h_details in the hotel_search() funtion from hotelFetch.py
        description={hotel.cost_before_extra}
        rating ={hotel.review_score + "/10 ("  + hotel.rating + ")"} 
        image= {hotel.image} // default image until we decide how to get unique high quality images for hotels
        />
    </div>
    ));

	// Search HTML
		
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
            value={location} onChange={(e) => setLocation(e.target.value)}
          />
          
          <div className="calendar">
            <DatePicker minDate={todaysDate} className="calendar-input" selected={startDate} onChange={(date) => setStartDate(date)} />
            <DatePicker minDate={startDate} className="calendar-input" selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>
          
          <div className="dropdown">
          <button className="dropdown-button"> Guests </button>
          <div className="dropdown-content">
          <p> Number of adults:</p>
          <input type="number" name="adult-guests" placeholder="2" min="1" max="20" className="guest-input" value={numAdults} onChange={(e) => setNumAdults(e.target.value)}/>
          <br/>
          <p> Number of children: </p>
          <input type="number" name="child-guests" placeholder="0" min="0" max="20" className="guest-input" value={numChildren} onChange={(e) => setNumChildren(e.target.value)}/>
          <br/>
          <p> Number of rooms:</p>
          <input type="number" name="room-qty" placeholder="1" min="1" max="4" className="guest-input" value={numRooms} onChange={(e) => setNumRooms(e.target.value)}/>
          </div>
          </div>
            
          <button type="submit" className="searchButton">Search</button>
        </form>
      </div>

      <div className='search-results'>
        {renderHotels}
      </div>
      
      {error && <p className='error'>{error}</p>}
      {/* Conditional rendering of an error message if 'error' state variable is truthy */}

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
      
  )
}
