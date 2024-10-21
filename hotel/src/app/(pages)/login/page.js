'use client'; // this is necessary in order to use useStates and other react hooks

import './login.css' // Importing the CSS file for styling purposes (./ means the file is in the same directory as this file)
import React, { useState } from 'react' // Importing React and useState hook from the 'react' package
import axios from 'axios' // Importing axios library for making HTTP requests
import { NotificationManager, NotificationContainer } from 'react-notifications' // Importing NotificationManager and NotificationContainer from 'react-notifications'
import 'react-notifications/lib/notifications.css'

export default function Login(){ // Defining a functional component named Login
    const [email, setEmail] = useState('') // Creating a state variable 'email' and a function 'setEmail' to update it
    const [password, setPassword] = useState('') // Creating a state variable 'password' and a function 'setPassword' to update it

    const handleLogin = async(e) => { // Defining an asynchronous function named handleLogin, which will be called when the form is submitted
        e.preventDefault() // Preventing the default form submission behavior

        const data = { // Creating an object 'data' with email and password properties
            email: email,
            password: password
        }

        try{
            const response = await axios.post('http://localhost:4000/login', data, { withCredentials: true }) // Making a POST request to 'http://localhost:4000/login' with the data object
            if(response.status === 200){ // Checking if the response status is 200 (OK)
                NotificationManager.success('Login successful!') // Redirecting to the home page
                setTimeout(() => {
                    window.location.href = '/' // Redirecting to the home page after a delay
                }, 1500)
            } else if(response.status === 401){ // Checking if the response status is 401 (Unauthorized){
                NotificationManager.error('Invalid credentials, please try again!')
            } else {
                NotificationManager.error('An error occurred, please try again!')
            }
        } catch (e) {
            console.log(e) // Logging any errors that occur during the request
        }
    }

    return (
        <div className='login-page'>
            {/* A div element with a class name 'login-page' */}

            <form onSubmit={handleLogin} className='form-container'>
            	<img src="/likehome.png" alt="LikeHome Logo" className="logo" />
            	<br></br>
                {/* Form element with a submit event handler set to handleLogin function */}
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                {/* Input element for email with value and onChange event handler */}
                <br></br>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* Input element for password with value and onChange event handler */}
                <br></br>
                <button type='submit'>Login</button>
                {/* Button element for submitting the form */}
            </form>
            {/* Conditional rendering of an error message if 'error' state variable is truthy */}
            <NotificationContainer />
        </div>
    )
}
