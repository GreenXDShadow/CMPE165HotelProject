import React from 'react';
import '../main.css'; 

export default function HotelCard({ name, description, image, rating}) {
  return (
    <div className="hotel-card">
      <div className="hotel-card-left">
        <div className="vertical-line"></div>
        <div className="hotel-info">
          <h2>{name}</h2>
          <p>Cheapest Rate For Your Stay: ${description}</p>
          <p>Rating: {rating}</p>
          <button className="bookButton">Book</button>
        </div>
      </div>
      <div className="hotel-card-right">
        <img src={image} alt={name} className="hotel-image" />
      </div>
    </div>
  );
}
