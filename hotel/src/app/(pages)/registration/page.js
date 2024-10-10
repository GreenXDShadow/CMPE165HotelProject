'use client'; // this is necessary in order to use useStates and other react hooks

import './registration.css'; // Importing the CSS file for styling (./ means the file is in the same directory as this file)
import React, { useState } from 'react'; // Importing React and useState hook from the 'react' package
import axios from 'axios'; // Importing axios for making HTTP requests

export default function registration(){ // Exporting a default function named 'registration'
    const [email, setEmail] = useState('') // Creating a state variable 'email' and a function 'setEmail' to update it
    const [password, setPassword] = useState('') // Creating a state variable 'password' and a function 'setPassword' to update it
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [cardnum, setCardnum] = useState('')
    const [cvc, setCVC] = useState('')
    const [expire, setExpire] = useState('')
    const [response, setResponse] = useState('') // Creating a state variable 'response' and a function 'setResponse' to update it

    const handleRegistration = async(e) => { // Defining an asynchronous function named 'handleRegistration' that takes an event object as a parameter
        e.preventDefault() // Preventing the default form submission behavior

        const data = { // Creating an object 'data' with 'email' and 'password' properties
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            cardnum: cardnum,
            cvc: cvc,
            expire: expire
        }

        try{
            const response = await axios.post('http://localhost:4000/registration', data) // Making a POST request to 'http://localhost:4000/registration' with the 'data' object
            if(response.data === 'Success'){ // Checking if the response data is equal to 'Success'
                setResponse('Registered successfully') // Updating the 'response' state variable with the success message
            }
        }catch (e){
            console.log(e) // Logging any errors that occur during the request
        }
    }
 
    return(
        <div className="registration-page"> {/* Rendering a div element with the class name 'registration-page' */}
            <h1>Registration</h1> {/* Rendering a heading element with the text 'Registration' */}
            <form onSubmit={handleRegistration} className='form-container'> {/* Rendering a form element with the 'handleRegistration' function as the submit event handler */}
                <img src="/likehome.png" alt="LikeHome Logo" className="logo" />
                <br></br>
                <input id='longtext' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Rendering an input element for email with value and onChange event handler */}
                <br></br>
                <input id='longtext' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> {/* Rendering an input element for password with value and onChange event handler */}
                <br></br>
                <input type='firstname' placeholder='First Name' value={firstname} onChange={(e) => setFirstname(e.target.value)} /> {}
                <input type='lastname' placeholder='Last Name' value={lastname} onChange={(e) => setLastname(e.target.value)} /> {}
                <br></br>
                <input id='longtext' type='cardnum' placeholder='Card Number' value={cardnum} onChange={(e) => setCardnum(e.target.value)} /> {}
                <br></br>
                <input type='cvc' placeholder='CVC' value={cvc} onChange={(e) => setCVC(e.target.value)} /> {}
                <input type='expire' placeholder='Expiration' value={expire} onChange={(e) => setExpire(e.target.value)} /> {}
                <br></br>
                <button type='submit'>Register</button> {/* Rendering a button element with the text 'Register' */}
                {response && <p className='response'>{response}</p>} {/* Rendering a paragraph element with the 'response' value if it exists */}
            </form>
        </div>
    )
}
