import React, { useEffect, useState } from 'react';
import '../components/GemCard.css';

const Trails = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/trails')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Strictly filter for River Trails
          const filtered = data.filter(item => item.category === 'River Trail');
          setTrails(filtered);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch trails", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="gallery-page">
      <header className="hero-header" style={{marginBottom: '10px'}}>
        <h1 className="brand-font title-glow">Jungle Trails</h1>
        <p className="subtitle">Extensive River Routes and Hiking Paths</p>
      </header>

      {loading ? (
         <h3 style={{color:'var(--secondary)'}}>Loading trails from Atlas...</h3>
      ) : trails.length === 0 ? (
         <p style={{color:'#ccc'}}>No River Trails found! Add a trail using the Admin Panel.</p>
      ) : (
        <div className="gallery-grid">
          {trails.map(trail => (
            <div key={trail._id} className="gem-card">
              {trail.images && trail.images.length > 0 && (
                 <img src={trail.images[0].url} alt={trail.name} className="gem-card-img" />
              )}
              <div className="gem-card-content">
                <div className="gem-card-header">
                   <h3 className="brand-font">{trail.name}</h3>
                   <span className="gem-category" style={{borderColor: '#ff9800', color: '#ff9800', background: 'rgba(255, 152, 0, 0.1)'}}>
                      {trail.category}
                   </span>
                </div>
                <p className="gem-card-desc" style={{marginBottom: '5px'}}>{trail.description}</p>
                
                {/* Specific emphasis on Navigation for Trails */}
                <div className="trail-notes">
                   <strong>🧭 Nav Notes:</strong> {trail.navigationNotes}
                </div>

                <div className="gem-card-footer" style={{marginTop: '20px'}}>
                  <div className="safety-badge">
                     <span>🛑 Safety: <strong style={{color: 'white'}}>{trail.safetyLevel || 'Caution'}</strong></span>
                  </div>
                  <div className="safety-badge" style={{color: 'var(--secondary)'}}>
                     <span>📍 {trail.location?.nearestTown || 'Unknown'}</span>
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

export default Trails;
