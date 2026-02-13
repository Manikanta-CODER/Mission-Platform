import React, { useState, useEffect } from 'react';
import TelemetryCard from '../TelemetryCard';
import MissionStatusBadge from '../MissionStatusBadge';
import MapView from '../MapView';
import './PublicDashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function PublicDashboard() {
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/public/mission`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setMissionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Poll for updates every 2 seconds
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="page"><p>Loading mission data...</p></div>;
  if (error) return <div className="page error"><p>Error: {error}</p></div>;

  return (
    <div className="page">
      <div className="public-dashboard">
        <div className="dashboard-header">
          <h1>🚀 High-Altitude Payload Mission</h1>
          <p>Live Public Mission Data</p>
        </div>

        <div className="status-section">
          <MissionStatusBadge status={missionData.status} />
        </div>

        <div className="telemetry-grid">
          <TelemetryCard
            title="Altitude"
            value={missionData.altitude}
            unit="meters"
            icon="📍"
          />
          <TelemetryCard
            title="Latitude"
            value={missionData.latitude}
            unit="°"
            icon="🧭"
          />
          <TelemetryCard
            title="Longitude"
            value={missionData.longitude}
            unit="°"
            icon="🧭"
          />
        </div>

        <div className="trajectory-section">
          <h2>📍 Live Mission Map</h2>
          <MapView
            latitude={missionData.latitude}
            longitude={missionData.longitude}
            altitude={missionData.altitude}
            status={missionData.status}
          />
        </div>

        <div className="trajectory-section">
          <h2>Trajectory Information</h2>
          <div className="trajectory-box">
            <p><strong>Current Position:</strong></p>
            <p>Lat: {missionData.latitude.toFixed(4)}°, Lon: {missionData.longitude.toFixed(4)}°</p>
            <p><strong>Altitude:</strong> {missionData.altitude.toFixed(2)}m</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Data updates every 2 seconds. This is public data available to all users.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h3>Want detailed telemetry data?</h3>
          <p>Login as a customer to view advanced metrics including velocity, temperature, pressure, and payload sensor data.</p>
          <a href="/login" className="btn btn-primary">Login Now</a>
        </div>
      </div>
    </div>
  );
}

export default PublicDashboard;
