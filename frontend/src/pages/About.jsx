import React from 'react';
import './Home.css'; // Reusing global premium styles

const About = () => {
  return (
    <div className="home-container" style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: '100px'}}>
      <header className="hero-header" style={{marginBottom: '40px'}}>
        <h1 className="brand-font title-glow">About The Project</h1>
        <p className="subtitle">Engineering the future of geographic tourism</p>
      </header>

      <div className="glass" style={{maxWidth: '800px', width: '90%', padding: '40px', borderRadius: '15px', color: '#ccc', lineHeight: '1.8'}}>
        
        <h2 className="brand-font" style={{color: 'var(--secondary)', marginBottom: '15px'}}>💎 The Hidden Sanctuary</h2>
        <p>
          Ratnapura's greatest treasures are its sapphire-clear waterfalls and emerald rivers 
          that remain hidden from the world. We bring these secrets to light.
        </p>

        <h2 className="brand-font" style={{color: 'var(--secondary)', marginTop: '35px', marginBottom: '15px'}}>🌿 Ethical Tourism: The Guardian's Code</h2>
        <p>
          Many of these locations are untouched. They are clean. They are silent. 
          As a user of Water Trails, you agree to be a <strong style={{color: 'white'}}>Guardian of the Trail</strong>. 
          Carry your trash back, respect the silence, and leave only footprints.
        </p>

        <div style={{marginTop: '40px', borderTop: '1px solid rgba(100,255,218,0.2)', paddingTop: '20px'}}>
          <small style={{color: '#aaa'}}>Developer: <strong style={{color: 'var(--accent)'}}>Vihanga Asen</strong></small>
        </div>

      </div>
    </div>
  );
};

export default About;
