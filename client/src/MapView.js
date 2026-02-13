import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import './MapView.css';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapView({ latitude, longitude, altitude, status }) {
  const position = [latitude, longitude];
  
  // Calculate circle radius based on altitude (for visualization)
  // Higher altitude = larger circle
  const radiusKm = Math.max(5, altitude / 5000);

  return (
    <div className="map-view-container">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Altitude visualization circle */}
        <Circle
          center={position}
          radius={radiusKm * 1000}
          pathOptions={{
            color: status === 'Active' ? '#667eea' : '#ccc',
            weight: 2,
            opacity: 0.3,
            fillOpacity: 0.1,
          }}
        />
        
        {/* Payload marker */}
        <Marker position={position}>
          <Popup>
            <div className="popup-content">
              <h4>🚀 Payload Location</h4>
              <p><strong>Latitude:</strong> {latitude.toFixed(6)}°</p>
              <p><strong>Longitude:</strong> {longitude.toFixed(6)}°</p>
              <p><strong>Altitude:</strong> {altitude.toFixed(2)} m</p>
              <p><strong>Status:</strong> {status}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
