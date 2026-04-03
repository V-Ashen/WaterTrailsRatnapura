import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './HeroMap.css';
import { useGeolocation } from '../hooks/useGeolocation';
import { calculateDistance } from '../utils/haversine';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const HeroMap = () => {
  const [trails, setTrails] = useState([]);
  const geo = useGeolocation(); // Triggers GPS browser permission!

  useEffect(() => {
    // This fetch automatically uses the Service Worker offline cache we set up!
    fetch('http://localhost:5000/api/trails')
      .then(res => res.json())
      .then(data => setTrails(data))
      .catch(err => console.error("Could not fetch gems!", err));
  }, []);

  const defaultPosition = [6.7725, 80.3644]; // Centered roughly on Ratnapura

  return (
    <div className="map-wrapper glass">
      <MapContainer 
        center={defaultPosition} 
        zoom={11} 
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Dynamic MongoDB Rendering */}
        {Array.isArray(trails) && trails.map((trail) => {
          if (!trail.location || !trail.location.coordinates || trail.location.coordinates.length < 2) return null;
          
          // MongoDB GeoJSON stores coordinates as [longitude, latitude]
          const lng = trail.location.coordinates[0];
          const lat = trail.location.coordinates[1];
          
          let distStr = "";
          // Only calculate Haversine distance if the user allowed GPS and coordinates exist
          if (geo.location.loaded && geo.location.coordinates && geo.location.coordinates.lat) {
             const dist = calculateDistance(
                 geo.location.coordinates.lat, 
                 geo.location.coordinates.lng,
                 lat, 
                 lng
             );
             distStr = `📍 ${dist} km precisely from you`;
          }

          return (
            <Marker key={trail._id} position={[lat, lng]}>
              <Popup className="premium-popup" maxWidth={300} minWidth={220}>
                {trail.images && trail.images.length > 0 && (
                  <img src={trail.images[0].url} alt={trail.name} style={{width: '100%', height: 'auto', borderRadius: '5px', marginBottom: '8px'}}/>
                )}
                <h3 className="brand-font">{trail.name}</h3>
                <p style={{fontSize: '0.8rem', color: '#ccc', margin: '0 0 5px 0'}}>{trail.category}</p>
                
                {/* Advanced Haversine Dist Validation */}
                {distStr && <p style={{color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.8rem', margin: '5px 0'}}>{distStr}</p>}
                
                <p style={{margin: '5px 0'}}>{trail.description}</p>
                <div style={{background: 'rgba(0,0,0,0.3)', padding: '5px', borderRadius: '5px', marginTop: '5px'}}>
                   <small style={{color: 'var(--secondary)'}}>🧭 Directions:</small><br/>
                   <small>{trail.navigationNotes}</small>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* User's Current GPS Location Pin */}
        {geo.location.loaded && geo.location.coordinates && geo.location.coordinates.lat && (
          <Marker position={[geo.location.coordinates.lat, geo.location.coordinates.lng]}>
             <Popup className="premium-popup">
                <strong style={{color: 'var(--accent)', fontSize: '1.2em'}}>📍 You Are Here</strong>
                <p style={{fontSize: '0.8rem', color: '#ccc'}}>If this is nowhere near your house, your desktop ISP is artificially spoofing your location coordinates! Test on your Mobile Phone for satellite accuracy.</p>
             </Popup>
          </Marker>
        )}

      </MapContainer>
      <div className="map-overlay-glare"></div>
    </div>
  );
};

export default HeroMap;
