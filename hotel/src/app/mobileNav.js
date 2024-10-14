'use client'

import { useState } from "react";
import "./main.css"

const ToggleComponent = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <div>
            <button onClick={toggleVisibility} className='nav-button-mobile'>
                Menu
                {isVisible ? false : true}
            </button>
            {isVisible && 
                <div className='overlay'>
                    <nav className='nav-container-mobile'>
                        <a href="/">
                            <img src="/home.png" alt="Home Logo" className="nav-logo" />
                        </a>
                        <button onClick={toggleVisibility} className='nav-button-mobile'>
                            Menu
                            {isVisible ? false : true}
                        </button>
                    </nav>
                    <div className='mobile-menu'>
                        <a className="nav-button" href="/">Home</a>
                        <a className="nav-button" href="/login">Login</a>
                        <a className="nav-button" href="/registration">Register</a>
                        <a className="nav-button" href="/payment">Payment</a>
                    </div>
                </div>
            }
        </div>
    );
};

export default ToggleComponent;