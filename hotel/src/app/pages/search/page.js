'use client'; // this is necessary in order to use useStates and other react hooks

import './search.css' // Importing the CSS file for styling purposes (./ means the file is in the same directory as this file)
import React, { useState } from 'react' // Importing React and useState hook from the 'react' package
import axios from 'axios' // Importing axios library for making HTTP requests
import SearchResult from '../../components/SearchResult';

export default function Login(){ // Defining a functional component named Login
    const [error, setError] = useState('') // Creating a state variable 'error' and a function 'setError' to update it

	//unfinished handleSearch from main page
	const handleSearch = (event) => {
    	event.preventDefault();
    	const searchQuery = event.target.elements.search.value;
    	console.log("Searching for:", searchQuery);
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
        
  	const results = [hotel1, hotel2];

	// List Hotels
	
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
            	/>
            	
            	<div className="calendar">
            		<button className="calendar-button"> Dates </button>
            	</div>
            	
            	<div className="dropdown">
            	<button className="dropdown-button"> Guests </button>
            	<div class="dropdown-content">
					<p> Number of adults:</p>
					<input type="number" name="adult-guests" placeholder="2" min="1" max="20" className="guest-input"/>
					<p> Number of children: </p>
					<input type="number" name="child-guests" placeholder="0" min="0" max="20" className="guest-input"/>
            	</div>
            	</div>
            
           	 <button type="submit" className="searchButton">Search</button>
          </form>
        </div>
        <div className='search-results'>
        	{listHotels}
        </div>
        
            {error && <p className='error'>{error}</p>}
            {/* Conditional rendering of an error message if 'error' state variable is truthy */}
        </div>
    )
}
