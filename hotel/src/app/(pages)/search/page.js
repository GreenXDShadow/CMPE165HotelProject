'use client'; // this is necessary in order to use useStates and other react hooks

import './search.css' // Importing the CSS file for styling purposes (./ means the file is in the same directory as this file)
import React, { useState } from 'react' // Importing React and useState hook from the 'react' package
import axios from 'axios' // Importing axios library for making HTTP requests
import SearchResult from '../../components/SearchResult';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { render } from 'react-dom';


export default function Login(){ // Defining a functional component named Login
    const [error, setError] = useState('') // Creating a state variable 'error' and a function 'setError' to update it
	const [location, setLocation] = useState('') // State variable for the location of stay
	const [startDate, setStartDate] = useState(new Date()); //State variable for Check-in Date picker
	const [endDate, setEndDate] = useState(new Date()); //State variable for Check-out Date picker
	const [numAdults, setNumAdults] = useState('');
	const [numChildren, setNumChildren] = useState('');
	const [numRooms, setNumRooms] = useState('');
	const [hotelsList, setHotels] = useState([]);
	const todaysDate = new Date();

	//unfinished handleSearch from main page
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
		} catch (e) {
            console.log(e) // Logging any errors that occur during the request
        }
  	};
  	
  	// Test Hotels
  	
  	const hotel1 = {name:"Holiday Inn", 
  		description:"Clean rooms, amenities, reliable stay", 
  		rating: 5,
  		image:"/holiday.png"
  	};
  	
  	const hotel2 = {name:"Mariott",
        description:"Pool, Views, best stay at a bargain",
        rating: 9,
        image:"/marriot.png"
    };
    
    const hotel3 = {name:"Motel6",
        description:"Reliable stay, affordable prices, easy to stay",
        rating: 7,
        image:"/motel.png"
    };
        
  	const results = [hotel1, hotel2, hotel3];

	// List Hotels (used by Ari for intial page design, but now use renderHotels instead to render API data)
	
	const listHotels = results.map((result, index) => (
    <div className="hotel-list">
        <SearchResult 
        name={result.name} 
        description={result.description}
        rating={result.rating}
        image={result.image}
        />
    </div>
    ));

	// API Hotels (renders upon receiving post request after the setHotels function is run to populate hotelsList with the API data)

	const renderHotels = hotelsList.map((hotel, index) => (
    <div className="hotel-list">
        <SearchResult 
		id = {hotel.hotel_id} // follow the key structure from h_details in the hotel_search() funtion from hotelFetch.py
        name={hotel.name} 
        description={hotel.rating}
        rating={hotel.review_score}
        image= "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/8a/0a/a3/exterior.jpg?w=700&h=-1&s=1" // default image until we decide how to get unique high quality images for hotels
        />
    </div>
    ));

	// Search HTML
		
    return (
        <div className='search-page'>
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
        </div>
    )
}
