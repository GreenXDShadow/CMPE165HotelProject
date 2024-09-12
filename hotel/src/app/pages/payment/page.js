'use client'; // this is necessary in order to use useStates and other react hooks

import './payment.css' // Importing the CSS file for styling purposes (./ means the file is in the same directory as this file)
import React, { useState } from 'react' // Importing React and useState hook from the 'react' package
import axios from 'axios' // Importing axios library for making HTTP requests

export default function Payment(){ 
	// Payment form based on login form - no crucial changes made
    const [cardnum, setCardnum] = useState('') 
    const [cvc, setCVC] = useState('')
    const [expire, setExpire] = useState('') 
	const [error, setError] = useState('')
	
	// Current testID just for displaying information
	const testID = 11235813;
	
	const handlePaymentInfo = async(e) => { 
        e.preventDefault() 

        const data = { 
            cardnum: cardnum,
            cvc: cvc,
            expire: expire
        }

        try{
            const response = await axios.post('http://localhost:4000/payment', data)
        } catch (e) {
            console.log(e)
        }
    }
	
    return (
        <div className='payment-page'>
            
            <h1>Payment</h1>
            
            <h2> Display booking Information: </h2>
            <p> Current Booking ID: {testID}</p>
            
			<br></br>
			
            <h2> Payment Information </h2>
            <form onSubmit={handlePaymentInfo}>
                <input type='cardnum' placeholder='Card Number' value={cardnum} onChange={(e) => setCardnum(e.target.value)} />
                {}
                <input type='cvc' placeholder='CVC' value={cvc} onChange={(e) => setCVC(e.target.value)} />
                {}
                <input type='expire' placeholder='Expiration' value={expire} onChange={(e) => setExpire(e.target.value)} />
                {}
                <button type='submit'>Confirm</button>
                {}
            </form>
            
            <br></br>
            
            <h2> You may also login to check out </h2>
            <a href="/pages/login">
            <button className="button" type="submit">
              Login
            </button>
          	</a>
            
            {error && <p className='error'>{error}</p>}

        </div>
    )
}
