"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import '../main.css'; 

export default function HotelCard({ id, name, description, image, rating, start_date, end_date, num_adults, num_children, num_rooms, hotel_data}) {
  const navigate = useRouter();
  
  const handleHotelInfo = (e) => {
    e.preventDefault();
    localStorage.setItem('hotelData', JSON.stringify(hotel_data));
    window.location.href = `/hotel/${id}?start_date=${start_date}&end_date=${end_date}&num_adults=${num_adults}&num_children=${num_children}&num_rooms=${num_rooms}`
    // navigate.push(`/hotel/${id}?start_date=${start_date}&end_date=${end_date}&num_adults=${num_adults}&num_children=${num_children}&num_rooms=${num_rooms}`)
  }
  
  return (
    <div className="hotel-card">
      <div className="hotel-card-left">
        <div className="vertical-line"></div>
        <div className="hotel-info">
          <h2>{name}</h2>
          <p>Cheapest Rate For Your Stay: ${description}</p>
          <p>Rating: {rating}</p>
          <button className="bookButton" onClick={handleHotelInfo}>Learn More</button>
        </div>
      </div>
      <div className="hotel-card-right">
        <img src={image} alt={name} className="hotel-image" />
      </div>
    </div>
  );
}
