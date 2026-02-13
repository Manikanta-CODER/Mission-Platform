import React from 'react';
import './SensorPanel.css';

function SensorPanel({ data }) {
  return (
    <div className="sensor-panel">
      <h3>Payload Sensors</h3>
      <div className="sensor-grid">
        {data && Object.entries(data).map(([key, value]) => (
          <div key={key} className="sensor-item">
            <span className="sensor-label">{key}</span>
            <span className="sensor-value">{value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SensorPanel;
