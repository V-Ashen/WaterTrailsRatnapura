import React, { useEffect, useState } from 'react';
import '../components/GemCard.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/trails')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLocations(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch locations", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="gallery-page">
      <header className="hero-header" style={{marginBottom: '10px'}}>
        <h1 className="brand-font title-glow">Explore Ratnapura</h1>
        <p className="subtitle">Discover all scenic water destinations and natural pools</p>
      </header>

      {loading ? (
         <h3 style={{color:'var(--secondary)'}}>Loading locations from Atlas...</h3>
      ) : locations.length === 0 ? (
         <p style={{color:'#ccc'}}>No locations found! Please add them via the Admin Panel.</p>
      ) : (
        <div className="gallery-grid">
          {locations.map(loc => (
            <div key={loc._id} className="gem-card">
              {loc.images && loc.images.length > 0 && (
                 <img src={loc.images[0].url} alt={loc.name} className="gem-card-img" />
              )}
              <div className="gem-card-content">
                <div className="gem-card-header">
                   <h3 className="brand-font">{loc.name}</h3>
                   <span className="gem-category">{loc.category}</span>
                </div>
                <p className="gem-card-desc">{loc.description}</p>
                
                {loc.navigationNotes && (
                   <div className="trail-notes" style={{marginBottom: '15px'}}>
                      <strong>🧭 Nav Notes:</strong> {loc.navigationNotes}
                   </div>
                )}

                <div className="gem-card-footer">
                  <div className="safety-badge">
                     <span>🛑 Difficulty: <strong style={{color: 'white'}}>{loc.difficulty || 'Easy'}</strong></span>
                  </div>
                  <div className="safety-badge" style={{color: 'var(--secondary)'}}>
                     <span>📍 {loc.location?.nearestTown || 'Ratnapura'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Locations;
