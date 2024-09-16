"use client"; 
import './main.css'; 
import Link from "next/link";

export default function Home() {
  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.search.value;
    // Logic to redirect or fetch results for the search
  };

  return (
    <>
      <div className="main">
        <h1>Your Next Stay Will Feel</h1>
        <img src="/likehome.png" alt="LikeHome Logo" className="logo" />
      </div>

      <div className="content-wrapper">
        <div className="search-container">
          <form onSubmit={handleSearch} className="searchBar">
            <input
              type="text"
              name="search"
              placeholder="Where do you wanna stay?"
              className="searchInput"
            />
            <button type="submit" className="searchButton">Search</button>
            <p className="infoText">Find your next getaway</p>
          </form>
        </div>
      </div>
    </>
  );
}