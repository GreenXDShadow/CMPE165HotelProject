import React from 'react';
import '../main.css'; 

export default function HotelCard({ name, description, image }) {
  return (
    <div className="hotel-card">
      <div className="hotel-card-left">
        <div className="vertical-line"></div>
        <div className="hotel-info">
          <h2>{name}</h2>
          <p>{description}</p>
          <button className="bookButton">Book</button>
        </div>
      </div>
      <div className="hotel-card-right">
        <img src={image} alt={name} className="hotel-image" />
      </div>
    </div>
  );
}
