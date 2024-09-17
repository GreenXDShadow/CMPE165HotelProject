"use client"; 
import './main.css'; 

export default function Home() {
  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.search.value;
  };

  const handleContactSubmit = (event) => {
    event.preventDefault(); // Prevents form submission
    // No functionality yet
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

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <a href="/">
              <img src="/likehome.png" alt="LikeHome Logo" className="footer-logo" />
            </a>
            <p>We are dedicated to providing a catered hotel experience based on your needs.</p>
            <p>Whatever stay you look for will feel <strong>LikeHome</strong>.</p>
            <p>Book your next vacation with us!</p>
          </div>
          <div className="footer-right">
            <p>Contact Us</p>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <input type="text" name="name" placeholder="Name" className="contact-input" />
              <input type="email" name="email" placeholder="Email" className="contact-input" />
              <textarea name="message" placeholder="Message" className="contact-input"></textarea>
              <button type="submit" className="contact-button">Book</button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
}