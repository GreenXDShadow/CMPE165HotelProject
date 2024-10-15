import './user.css';
import '../.././globals.css'
import Image from 'next/image'

export default function user() {
    return (
        <>
            <div class='nav-bar-filler'></div>
            <div class='container'>
                <Image 
                    src='/motel.png'
                    width='400'
                    height='400'
                    objectFit='cover'
                    style={{borderRadius: '100%', marginTop: '20px'}}
                />
                <h1 style={{fontSize: '2.5rem'}}>Jane Smith</h1>
            </div>
        </>
    );
};