import React from 'react';
import './MissionStatusBadge.css';

function MissionStatusBadge({ status }) {
  const isActive = status === 'Active';

  return (
    <div className={`status-badge ${isActive ? 'active' : 'completed'}`}>
      <span className="status-dot"></span>
      {status}
    </div>
  );
}

export default MissionStatusBadge;
