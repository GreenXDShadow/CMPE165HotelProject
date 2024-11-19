'use client'

import { useState } from 'react';
import './style.css';
import '../.././globals.css';

export default function hotelinfo2() {

    const [overlay, setOverlay] = useState(false);

    const toggleOverlay = () => {
        if(overlay) {
            setOverlay(false);
            document.querySelector('.image-overlay').style.display = 'none';
            document.querySelector('.content-wrapper').style.overflow = 'scroll';
        } else {
            setOverlay(true)
            document.querySelector('.image-overlay').style.display = 'block';
            document.querySelector('.content-wrapper').style.overflow = 'hidden';
        };
    };

    return (
        <div className="view-container">
            <div className="image-overlay">
            <button onClick={toggleOverlay} className="close-button">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                id="Outline" 
                viewBox="0 0 24 24"
            >
                <path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"/>
            </svg>
            </button>
                <div className="masonry-container">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=2220&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="1"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1730818203797-897b2838105a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="2"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1445991842772-097fea258e7b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="3"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="4"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="5"
                    />
                    <img   
                        src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="6"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="7"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="8"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1477120128765-a0528148fed2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="9"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="10"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="11"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1725345653429-8b3926cc229c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="photo"
                        alt="12"
                    />
                </div>
            </div>
            <div className="content-wrapper">
                <div className="top-section">
                    <div className="image-container">
                        <div className="image-wrapper">
                            {/* MAIN IMAGE HERE */}
                            <img
                                src="https://textspoton.com/wp-content/uploads/2020/08/olexandr-ignatov-w72a24brINI-unsplash-1-1024x768.jpg"
                                alt="Main Photo"
                                className="main-photo"
                            />
                            <div className="name-wrapper">
                                {/* INSERT HOTEL TITLE HERE */}
                                <p className="title">Hotel Title</p>
                                <button onClick={toggleOverlay} className="open-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                        <path d="m9,9H2c-1.103,0-2-.897-2-2v-2C0,2.243,2.243,0,5,0h4c1.103,0,2,.897,2,2v5c0,1.103-.897,2-2,2Zm10,15h-4c-1.103,0-2-.897-2-2v-5c0-1.103.897-2,2-2h7c1.103,0,2,.897,2,2v2c0,2.757-2.243,5-5,5Zm3-11h-7c-1.103,0-2-.897-2-2V2c0-1.103.897-2,2-2h4c2.757,0,5,2.243,5,5v6c0,1.103-.897,2-2,2Zm-13,11h-4c-2.757,0-5-2.243-5-5v-6c0-1.103.897-2,2-2h7c1.103,0,2,.897,2,2v9c0,1.103-.897,2-2,2Z"/>
                                    </svg>
                                </button>
                                
                            </div>
                        </div>
                        {/* Hotel overview here */}
                        <p className="overview">
                            Lorem ipsum dolor sit amet, consectetur adipiscing 
                            elit. Sed do eiusmod tempor incididunt ut labore et 
                            dolore magna aliqua. Ut enim ad minim veniam, quis 
                            nostrud exercitation ullamco laboris nisi ut aliquip 
                            ex ea commodo consequat. Duis aute irure dolor in 
                            reprehenderit in voluptate velit esse cillum dolo.
                        </p>
                    </div>
                </div>
                <div className="stats-section">
                    <div className="rating-stat">
                        <p className="subheading">Rating:</p>
                        <p className="stat">5.0 Stars</p>
                    </div>
                    <div className="price-stat">
                        <p className="subheading">Price:</p>
                        <p className="stat">$149/night</p>
                    </div>
                    <div className="hours-stat">
                        <p className="subheading">Hours:</p>
                        <p className="stat">Open 24hrs</p>
                    </div>
                </div>
                <div className="book-section">

                </div>   
            </div> 
        </div>
    )
}