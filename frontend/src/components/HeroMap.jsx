import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './HeroMap.css';

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
  const kuruwitaPosition = [6.7725, 80.3644];

  return (
    <div className="map-wrapper glass">
      <MapContainer 
        center={kuruwitaPosition} 
        zoom={12} 
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={kuruwitaPosition}>
          <Popup className="premium-popup">
            <h3 className="brand-font">Kuruwita Water Trails</h3>
            <p>Your journey to the majestic falls begins here.</p>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="map-overlay-glare"></div>
    </div>
  );
};

export default HeroMap;
