'use client'

import { useState, useEffect } from "react";
import styles from ".././main.css"

const ToggleComponent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleVisibility = () => {
        if (isVisible) {
            setIsAnimating(true); // Start the slide-out animation
            setTimeout(() => {
                setIsVisible(false); // Remove from DOM after animation
                setIsAnimating(false); // Reset animation state
            }, 375); // Match this duration with the CSS animation duration
        } else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        document.body.style.overflow = isVisible ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isVisible]);

    return (
        <div>
            <button onClick={toggleVisibility} className='nav-button-mobile'>
                Menu
                {isVisible ? false : true}
            </button>
            {isVisible && 
                <div className={`overlay-${isAnimating ? 'shown' : 'hidden'}`}>
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
                        <a className="nav-button" style={{animationDelay: '0.15s'}} href="/">Home</a>
                        <a className="nav-button" style={{animationDelay: '0.2s'}} href="/login">Login</a>
                        <a className="nav-button" style={{animationDelay: '0.25s'}} href="/registration">Register</a>
                        <a className="nav-button" style={{animationDelay: '0.3s'}} href="/payment">Payment</a>
                    </div>
                </div>
            }
        </div>
    );
};

export default ToggleComponent;