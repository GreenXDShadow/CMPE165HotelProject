'use client';

import { Inter } from "next/font/google";
import { useState, useEffect } from 'react';
import "./main.css";

const inter = Inter({ subsets: ["latin"] });

// Mobile Navigation Toggle Component
const ToggleComponent = ({ isLoggedIn, onLogout }) => {
  // State for managing mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // Define all navigation items in an organized structure
  const mobileMenuItems = {
    alwaysShow: [
      { href: "/", label: "Home" }
    ],
    loggedOut: [
      { href: "/login", label: "Login" },
      { href: "/registration", label: "Register" }
    ],
    loggedIn: [
      { href: "/profile", label: "Profile" },
      { href: "/payment", label: "Payment" },
      // Add logout as a menu item with special onClick handling
      { href: "#", label: "Logout", onClick: onLogout }
    ]
  };

  // Toggle mobile menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <div className="hamburger-menu">
        <input
          type="checkbox"
          className="toggler"
          checked={isOpen}
          onChange={toggleMenu}
        />
        <div className="hamburger">
          <div></div>
        </div>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
          <div>
            <div>
              {/* Always visible navigation items */}
              {mobileMenuItems.alwaysShow.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* Conditional navigation based on authentication */}
              {!isLoggedIn ? (
                // Show login/register when logged out
                mobileMenuItems.loggedOut.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))
              ) : (
                // Show authenticated menu items when logged in
                mobileMenuItems.loggedIn.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                      setIsOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Layout Component
export default function RootLayout({ children }) {
  // State for tracking user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:4000/check-auth', {
          credentials: 'include'
        });
        setIsLoggedIn(response.status === 200);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        setIsLoggedIn(false);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <header>
          {/* Desktop Navigation */}
          <nav className="nav-container">
            <a href="/">
              <img src="/home.png" alt="Home Logo" className="nav-logo" />
            </a>
            <ul>
              <li><a className="nav-button" href="/">Home</a></li>
              {!isLoggedIn ? (
                // Show when logged out
                <>
                  <li><a className="nav-button" href="/login">Login</a></li>
                  <li><a className="nav-button" href="/registration">Register</a></li>
                </>
              ) : (
                // Show when logged in
                <>
                  <li><a className="nav-button" href="/user">Profile</a></li>
                  <li><a className="nav-button" href="/payment">Payment</a></li>
                  <li>
                    <a
                      href="#"
                      className="nav-button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {/* Mobile Navigation */}
          <nav className='nav-container-mobile'>
            <a href="/">
              <img src="/home.png" alt="Home Logo" className="nav-logo" />
            </a>
            <ToggleComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          </nav>
        </header>
        <main style={{ minHeight: "100vh" }}>{children}</main>
      </body>
    </html>
  );
}