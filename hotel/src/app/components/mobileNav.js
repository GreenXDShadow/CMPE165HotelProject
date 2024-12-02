'use client'

import { useState, useEffect } from "react";
import styles from "../main.css";

const ToggleComponent = ({ isLoggedIn, onLogout }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleVisibility = () => {
        if (isVisible) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsVisible(false);
                setIsAnimating(false);
            }, 375);
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

    // Reset menu visibility if logged out
    useEffect(() => {
        if (!isLoggedIn && isVisible) {
            setIsVisible(false);
        }
    }, [isLoggedIn]);

    // Define menu items dynamically based on logged-in state
    const menuItems = isLoggedIn
        ? [
            { href: "/", label: "Home" },
            { href: "/user", label: "Profile" },
            { href: "#", label: "Logout", onClick: onLogout },
          ]
        : [
            { href: "/", label: "Home" },
            { href: "/login", label: "Login" },
            { href: "/registration", label: "Register" },
          ];

    return (
        <div>
            <button onClick={toggleVisibility} className="nav-button-mobile">
                Menu
                {isVisible ? false : true}
            </button>
            {isVisible && (
                <div className={`overlay-${isAnimating ? 'shown' : 'hidden'}`}>
                    <nav className="nav-container-mobile">
                        <a href="/">
                            <img src="/home.png" alt="Home Logo" className="nav-logo" />
                        </a>
                        <button onClick={toggleVisibility} className="nav-button-mobile">
                            Menu
                            {isVisible ? false : true}
                        </button>
                    </nav>
                    <div className="mobile-menu">
                        {menuItems.map((item, index) => (
                            <a
                                key={item.label}
                                className="nav-button"
                                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                                href={item.href}
                                onClick={(e) => {
                                    if (item.onClick) {
                                        e.preventDefault();
                                        item.onClick();
                                    }
                                    toggleVisibility();
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToggleComponent;
