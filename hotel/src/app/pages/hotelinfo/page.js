'use client;'

import './hotelinfo.css'
import Image from 'next/image';

export default function HotelInfo() {
    return (
        <>
            <div className='nav-bar-filler'></div>
            <div className="content-wrapper">
                <div className="info-container">
                    {/* Needs to eventualy be variable */}
                    <p id="hotel-name" className='title' style={{marginBottom: '0px', fontSize: '30px'}}>Hotel Name</p>
                    <Image id="main-photo" src="/holiday.png" alt="hotel image" width={1366} height={768} layout='responsive'/>
                    <p className='title'>Rating</p>
                    <p id="rating">★★★★★</p>
                    <p className='title'>Address</p>
                    <p id="address">1 Apple Park Way, Cupertino, CA</p>
                    <p className='title'>Price Range</p>
                    <p id="price-range">$39.00 — $72.00</p>
                    <p className='title'>Hours</p>
                    <p id="hours">Open 24 Hours</p>
                    <p className='title'>Review</p>
                    <p id="review">lorum ipsum dal flsajdel klsjd lkslf</p>
                </div>
                <div className="map-container">
                    {/* <Image src="/landing.png" alt="map" width={1366} height={1536} layout='responsive'/> */}
                    <Image
                        id="map-photo"
                        className='image'
                        src="/landing.png"
                        alt="map to hotel"
                        width={1366}
                        height={768}
                        objectFit='cover'
                    />
                </div>
                <div className="break"></div>
                <div className="calendar-container">
                    <label for="check-in">Check in:</label>
                    <input type ="date" id="check-in" name="check-in"/>
                    <label for="check-out">Check out:</label>
                    <input type ="date" id="check-out" name="check-out"/>
                </div>
                <div className="break"/>
                <div className="booking-container">
                    <p style={{fontSize: '20px', marginBottom: '-5px'}}>Rooms:</p>
                    <div className='button-container'>
                        <input type='radio' className="roomButton" name='rooms' value='room1'/>
                        <span>Suite</span>
                    </div>
                    <div className='button-container'>
                        <input type='radio' className="roomButton" name='rooms' value='room2'/>
                        <span>Balcony</span>
                    </div>
                    <div className='button-container'>
                        <input type='radio' className="roomButton" name='rooms' value='room3'/>
                        <span>Window</span>
                    </div>    
                    <button style={{marginTop: '40px'}} className='confirmButton'>Book</button>
                </div>
            </div>
            
        </>
    )
}