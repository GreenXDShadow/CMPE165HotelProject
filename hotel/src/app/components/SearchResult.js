import React from 'react';
import '../main.css'; 

export default function SearchResult({ name, description, rating, image }) {
  return (
    <div className="search-result">
      <div className="search-result-left">

        <div className="hotel-info">
          <h2>{name}</h2>
          <p>{description}</p>
          <p>{rating} / 10</p>
          <button className="bookButton">Book</button>
        </div>
      </div>
      <div className="search-result-right">
        <img src={image} alt={name} className="hotel-image" />
      </div>
    </div>
  );
}
