import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo brand-font">
          <img src="/logo.jpg" alt="Logo" className="logo-image" onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}/>
          <span className="logo-text">Water Trails</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/gems" className="nav-links">Gems</Link>
          </li>
          <li className="nav-item">
            <Link to="/trails" className="nav-links">Trails</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
