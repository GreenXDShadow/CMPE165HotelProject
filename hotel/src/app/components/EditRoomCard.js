import React from 'react';
import '../main.css';
import { useRouter } from 'next/navigation';  // Import the useRouter hook
import axios from 'axios'
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css'


export default function EditRoomCard({roomData, hotelData, formData}) {

  const router = useRouter();  // Initialize the router
  
  const handleBookPress = async (e) => {
    e.preventDefault();
    console.log("Booking requested")
    try {
        const response = await axios.post('http://localhost:4000/edit', {
            hotel_data: hotelData,
            room_data: roomData,
            form_data: formData
        }, { withCredentials: true });
        if(response.status === 200){
            NotificationManager.success('Hotel booked successfully');
            console.log(response.data)
            setTimeout(() => {
                window.location.href = `/payment?id=${hotelData.booking_id}` // id set to a specific booking_id means the payment page fetches a specific booking (for showing an edited reservation)
            }, 1500) // 1.5 second delay before redirecting to the payment page
        }
        if(response.status === 401) {
            NotificationManager.error('You must be logged in to book a hotel');
        }
        if (response.status === 202) {
            console.log("Overlapping Booking");
        }
    } catch (error) {
        console.error('Error booking hotel:', error);
    }
};

  return (
    <div className="hotel-card">
      <div className="hotel-card-left">
        <div className="vertical-line"></div>
        <div className="hotel-info">
          <h2>{roomData.config}</h2>
          <p>Pricing Before Taxes And Fees: ${roomData.cost_before_extra}</p>
          <p>Room Size (Sq. Ft.) : {roomData.size_ft2}</p>
          <button className="bookButton" onClick={handleBookPress}>Book</button>
        </div>
      </div>
      <div className="hotel-card-right">
        <img src={roomData.image} alt={roomData.room_id} className="hotel-image" />
      </div>
    </div>
  );
}
