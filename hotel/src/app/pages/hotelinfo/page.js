'use client;'

import './hotelinfo.css'
import '../../../../../hotel/src/app/main.css'
import Image from 'next/image';
import axios from 'axios'

const ResponsiveImage = ({ src, alt, width, height, ...props}) => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative'}}>
            <Image
                src={src}
                alt={alt}
                layout='fill'
                objectFit='cover'
                {...props}
            />
        </div>
    );
};

export default function HotelInfo() {
    return (
        <>
            <div className='nav-bar-filler'></div>
            <div className="content-wrapper">
                <div className="info-container">
                    {/* Needs to eventualy be variable */}
                    <p className='title' style={{marginBottom: '0px', fontSize: '30px'}}>Hotel Name</p>
                    <Image className='image' src="/holiday.png" alt="hotel image" width={1366} height={768} layout='responsive'/>
                    <p className='title'>Rating</p>
                    <p>★★★★★</p>
                    <p className='title'>Address</p>
                    <p>1 Apple Park Way, Cupertino, CA</p>
                    <p className='title'>Pricing</p>
                    <p>$69.42/night</p>
                    <p className='title'>Hours</p>
                    <p>Open 24 Hours</p>
                    <p className='title'>Review</p>
                    <p>lorum ipsum dal flsajdel klsjd lkslf</p>
                </div>
                <div className="map-container">
                    {/* <Image src="/landing.png" alt="map" width={1366} height={1536} layout='responsive'/> */}
                    <Image
                        className='image'
                        src="/landing.png"
                        alt="map to hotel"
                        width={1366}
                        height={768}
                        objectFit='cover'
                    />
                </div>
                <div className="booking-container">
                    <button className='searchButton'>Book</button>
                </div>
            </div>
        </>
    )
}