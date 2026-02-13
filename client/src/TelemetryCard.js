import React from 'react';
import './TelemetryCard.css';

function TelemetryCard({ title, value, unit, icon }) {
  return (
    <div className="telemetry-card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">
          {typeof value === 'number' ? value.toFixed(2) : value}
          {unit && <span className="card-unit">{unit}</span>}
        </p>
      </div>
    </div>
  );
}

export default TelemetryCard;
