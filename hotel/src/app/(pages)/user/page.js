import './user.css';
import '../.././main.css'
import '../.././globals.css'
import Image from 'next/image'

export default function user() {
    return (
        <>
            <div className='nav-bar-filler'></div>
            <div className='container'>
                <Image 
                    src='/motel.png'
                    width='400'
                    height='400'
                    objectFit='cover'
                    style={{borderRadius: '100%', marginTop: '20px'}}
                    className='image-nextjs'
                    id='user-photo'
                />
                <h1 id='name' style={{fontSize: '2.5rem', margin: '0px'}}>Jane Smith</h1>
                <p id='membership-status'>Platinum Member</p>
                <button className='bookButton' style={{marginTop: '5px', marginBottom: '5px', marginLeft: '0px', marginRight: '0px', background: 'grey'}}>Edit Profile</button>
                <div className='content-container leading-title'>
                    <h2>Points</h2>
                </div>
                    <div className='content-container'>
                        <h3 id='points'>843pts</h3>
                        <p id='cumulative-nights'>12 nights total</p>
                    </div>
                <div className='content-container leading-title'>
                    <h2>Upcoming Booking</h2>
                </div>
                    <div className='content-container'>
                        <h3>Hyatt San Jose</h3>
                        <p>October 14th</p>
                        <p>4 nights</p>
                    </div>
                <div className='content-container leading-title'>
                    <h2>Recent Stays</h2>
                </div>
                    <div className='content-container'>
                        <h3>Hilton Apple Valley</h3>
                        <p>3 nights</p>
                    </div>
                    <div className='content-container'>
                        <h3>Mariott Cupertino</h3>
                        <p>4 nights</p>
                    </div>
                    <div className='content-container'>
                        <h3>Hyatt San Jose Airport</h3>
                        <p>1 night</p>
                    </div>
                <button className='bookButton' style={{background: 'maroon', marginLeft: '0px', marginRight: '0px'}}>Logout</button>
            </div>
        </>
    );
};