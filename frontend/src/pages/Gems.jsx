import React, { useEffect, useState } from 'react';
import '../components/GemCard.css';

const Gems = () => {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/trails')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Strictly filter for Gems (Waterfalls / Natural Pools)
          const filtered = data.filter(item => item.category === 'Waterfall' || item.category === 'Natural Pool');
          setGems(filtered);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch gems", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="gallery-page">
      <header className="hero-header" style={{marginBottom: '10px'}}>
        <h1 className="brand-font title-glow">Hidden Gems</h1>
        <p className="subtitle">Discover breathtaking Waterfalls and Secret Natural Pools</p>
      </header>

      {loading ? (
         <h3 style={{color:'var(--secondary)'}}>Loading gems from Atlas...</h3>
      ) : gems.length === 0 ? (
         <p style={{color:'#ccc'}}>No Hidden Gems found! Please add them via the Admin Panel.</p>
      ) : (
        <div className="gallery-grid">
          {gems.map(gem => (
            <div key={gem._id} className="gem-card">
              {gem.images && gem.images.length > 0 && (
                 <img src={gem.images[0].url} alt={gem.name} className="gem-card-img" />
              )}
              <div className="gem-card-content">
                <div className="gem-card-header">
                   <h3 className="brand-font">{gem.name}</h3>
                   <span className="gem-category">{gem.category}</span>
                </div>
                <p className="gem-card-desc">{gem.description}</p>
                
                <div className="gem-card-footer">
                  <div className="safety-badge">
                     <span>🛑 Difficulty: <strong style={{color: 'white'}}>{gem.difficulty || 'Easy'}</strong></span>
                  </div>
                  <div className="safety-badge" style={{color: 'var(--secondary)'}}>
                     <span>📍 {gem.location?.nearestTown || 'Ratnapura'}</span>
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

export default Gems;
