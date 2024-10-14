import Image from 'next/image';
import './reservation.css';
import '../.././main.css';

export default function reservation() {
    return (
        <>
            <div className='navbar'></div>
            <div className="container">
                <h1>Your Reservation</h1>
                <div className="image-wrapper">
                    <Image
                        id="map-photo"
                        className='image'
                        src="/marriot.png"
                        alt="reservation image"
                        width="1366"
                        height="768"
                        style={{ width: '90%', height: 'auto', borderRadius: '0.5rem', minWidth: '350px' }}
                    />
                </div>
                <div className='details-container'>
                    <div className='item-container'>
                        <p>Confirmation Number: </p>
                        <p id='confirmation-number'>3945835</p>
                    </div>
                    <div className='item-container'>
                        <p>Check-in: </p>
                        <p id='check-in-date-time'>October 14th 1:00pm</p>
                    </div>
                    <div className='item-container'>
                        <p>Room Type: </p>
                        <p id='room-type'>Suite</p>
                    </div>
                    <div className='item-container'>
                        <p>Room Number: </p>
                        <p id='room-number'>205</p>
                    </div>
                    <div className='item-container'>
                        <p>Payment: </p>
                        <p id='payment'>AMEX 0945</p>
                    </div>
                    <div className='item-container'>
                        <p>Address: </p>
                        <p id='address'>1 Alameden Dr. San Jose, CA.</p>
                    </div>
                </div>
                <div classname='button-container'>
                    <button className='cancelButton'>Cancel</button>
                    <button className='confirmButton'>Ok</button>
                </div>
            </div> 
        </>
    );
};