'use client'

import { useState } from 'react';
import './style.css';
import '../.././globals.css';

export default function hotelinfo2() {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <>
        <div className="spacer"></div>
            <div className="masonry-container">
                <img src="https://plus.unsplash.com/premium_photo-1670513725769-a048102828ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" alt=""/>
                <img src="https://images.unsplash.com/photo-1727725527510-092e7a8ec381?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8" alt=""/>
                <img src="https://images.unsplash.com/photo-1728347736799-3342c4a79fa8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8" alt=""/>
                <img src="https://images.unsplash.com/photo-1729180801690-d7db9ea35867?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                <img src="https://images.unsplash.com/photo-1728607424948-3e3a75b28c34?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                <img src="https://plus.unsplash.com/premium_photo-1730065983253-5d453442719e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                <img src="https://images.unsplash.com/photo-1729934399194-09ba96dbed74?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D" alt=""/>
                <img src="https://images.unsplash.com/photo-1727224280190-d7e55acb068e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D" alt=""/>
                <img src="https://images.unsplash.com/photo-1728042743558-b16bc5547ced?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                <img src="https://images.unsplash.com/photo-1725489891043-44182c9d0393?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D" alt=""/>
            </div>
            <div className="sheet" style={{
                    overflow: isExpanded ? 'hidden' : 'scroll', 
                    top: isExpanded ? '90vh' : '30vh',
                    height: isExpanded ? '10vh' : '70vh',
                    position: isExpanded ? 'fixed' : 'absolute'
                    }}>
                <div className="content-title">
                    <div className="hotel-title">Hotel Name</div>
                    <button className="toggle-images" onClick={toggleContent}> 
                        {isExpanded ? 'Hide ' : 'Show '} Images 
                    </button>
                </div>
                <div className="content">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1134176%2Fpexels-photo-1134176.jpeg%3Fcs%3Dsrgb%26dl%3Ddug-out-pool-hotel-poolside-1134176.jpg%26fm%3Djpg&f=1&nofb=1&ipt=8bbb73532269b93d1dc0934d0118516257d58fce71f73bb16b2dc897c6d1da69&ipo=images" alt="Main image"></img>
                </div>
            </div>
        </>
    )
}