import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import TelemetryCard from '../TelemetryCard';
import SensorPanel from '../SensorPanel';
import MissionStatusBadge from '../MissionStatusBadge';
import './CustomerDashboard.css';

function CustomerDashboard() {
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customer/mission', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

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
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <div className="page"><p>Loading mission data...</p></div>;
  if (error) return <div className="page error"><p>Error: {error}</p></div>;

  return (
    <div className="page">
      <div className="customer-dashboard">
        <div className="dashboard-header-with-logout">
          <div className="dashboard-header">
            <h1>📊 Customer Mission Dashboard</h1>
            <p>Advanced Telemetry & Payload Data</p>
          </div>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>

        <div className="status-section">
          <MissionStatusBadge status={missionData.status} />
        </div>

        <div className="telemetry-section">
          <h2>Core Metrics</h2>
          <div className="telemetry-grid">
            <TelemetryCard
              title="Altitude"
              value={missionData.altitude}
              unit="m"
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
            <TelemetryCard
              title="Velocity"
              value={missionData.velocity}
              unit="m/s"
              icon="🚀"
            />
            <TelemetryCard
              title="Temperature"
              value={missionData.temperature}
              unit="°C"
              icon="🌡️"
            />
            <TelemetryCard
              title="Pressure"
              value={missionData.pressure}
              unit="hPa"
              icon="💨"
            />
          </div>
        </div>

        <div className="sensors-section">
          <SensorPanel data={missionData.payloadData} />
        </div>

        <div className="history-section">
          <h2>Telemetry History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Altitude (m)</th>
                <th>Temperature (°C)</th>
                <th>Pressure (hPa)</th>
              </tr>
            </thead>
            <tbody>
              {missionData.history && missionData.history.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.time}</td>
                  <td>{entry.altitude.toFixed(2)}</td>
                  <td>{entry.temp.toFixed(2)}</td>
                  <td>{entry.pressure.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer-note">
          <p>ℹ️ This dashboard displays complete mission telemetry data including advanced sensors and historical records. Auto-updates every 2 seconds.</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
