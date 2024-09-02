import './registration.css'; // Importing the CSS file for styling (./ means the file is in the same directory as this file)
import React, { useState } from 'react'; // Importing React and useState hook from the 'react' package
import axios from 'axios'; // Importing axios for making HTTP requests

'use client'; // this is necessary in order to use useStates and other react hooks

export default function registration(){ // Exporting a default function named 'registration'
    const [email, setEmail] = useState('') // Creating a state variable 'email' and a function 'setEmail' to update it
    const [password, setPassword] = useState('') // Creating a state variable 'password' and a function 'setPassword' to update it
    const [response, setResponse] = useState('') // Creating a state variable 'response' and a function 'setResponse' to update it

    const handleRegistration = async(e) => { // Defining an asynchronous function named 'handleRegistration' that takes an event object as a parameter
        e.preventDefault() // Preventing the default form submission behavior

        const data = { // Creating an object 'data' with 'email' and 'password' properties
            email: email,
            password: password
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
            <form onSubmit={handleRegistration}> {/* Rendering a form element with the 'handleRegistration' function as the submit event handler */}
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Rendering an input element for email with value and onChange event handler */}
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> {/* Rendering an input element for password with value and onChange event handler */}
                <button type='submit'>Register</button> {/* Rendering a button element with the text 'Register' */}
                {response && <p className='response'>{response}</p>} {/* Rendering a paragraph element with the 'response' value if it exists */}
            </form>
        </div>
    )
}
