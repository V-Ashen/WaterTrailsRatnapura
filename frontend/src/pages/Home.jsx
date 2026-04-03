import React from 'react';
import HeroMap from '../components/HeroMap';
import './Home.css';

import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-header">
        <h1 className="brand-font title-glow">Discover Ratnapura</h1>
        <p className="subtitle">The City of Gems and Majestic Water Trails</p>
      </header>
      <section className="map-section">
        <ErrorBoundary>
          <HeroMap />
        </ErrorBoundary>
      </section>
    </div>
  );
};

export default Home;
