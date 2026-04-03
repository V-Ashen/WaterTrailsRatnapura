import React from 'react';
import './Home.css'; // Reusing global premium styles

const About = () => {
  return (
    <div className="home-container" style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: '100px'}}>
      <header className="hero-header" style={{marginBottom: '40px'}}>
        <h1 className="brand-font title-glow">About The Project</h1>
        <p className="subtitle">Engineering the future of geographic tourism</p>
      </header>

      <div className="glass" style={{maxWidth: '800px', width: '90%', padding: '40px', borderRadius: '15px', color: '#ccc', lineHeight: '1.6'}}>
        <h2 className="brand-font" style={{color: 'var(--secondary)', marginBottom: '20px'}}>Project Vision</h2>
        <p>
          <strong>Water Trails Ratnapura</strong> is a high-level Software Engineering MERN Stack (MongoDB, Express, React, Node.js) 
          application designed to dynamically index and map the incredible aquatic geography surrounding the Ratnapura region. 
        </p>
        <p style={{marginTop: '15px'}}>
          By integrating native Geolocation APIs with the Haversine trigonometric formula and scaling offline via Progressive Web App technology, 
          this platform serves to seamlessly push digital exploration into nature routes without dropping reliable navigation.
        </p>
        
        <div style={{marginTop: '40px', borderTop: '1px solid rgba(100,255,218,0.2)', paddingTop: '20px'}}>
            <h3 style={{color: 'white', marginBottom: '10px'}}>Lead Engineer</h3>
            <p className="brand-font" style={{fontSize: '1.2rem', color: 'var(--accent)'}}>Vihanga asen</p>
        </div>
      </div>
    </div>
  );
};

export default About;
