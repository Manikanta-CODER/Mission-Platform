const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware - CORS with origin restriction
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const PORT = process.env.PORT || 5000;

// This is a random telemetry data
let missionData = {
  altitude: 15000,
  latitude: 17.3850,  // Hyderabad
  longitude: 78.4867, // Hyderabad
  velocity: 150,
  temperature: -45,
  pressure: 180,
  status: 'Active',
  payloadData: {
    sensorA: 45.2,
    sensorB: 89.5,
    sensorC: 23.1
  },
  history: [
    { time: '14:30:00', altitude: 15000, temp: -45, pressure: 180 },
    { time: '14:25:00', altitude: 14800, temp: -44, pressure: 185 },
    { time: '14:20:00', altitude: 14500, temp: -43, pressure: 190 }
  ]
};

// Telemetry update function - simulates live data
function updateTelemetry() {
  missionData.altitude += Math.random() * 200 - 50; // +/- 50-150m
  missionData.latitude += (Math.random() - 0.5) * 0.005;  // ±0.0025 degrees (~250m)
  missionData.longitude += (Math.random() - 0.5) * 0.005; // ±0.0025 degrees (~250m)
  missionData.velocity += Math.random() * 5 - 2;
  missionData.temperature += Math.random() * 2 - 1;
  missionData.pressure += Math.random() * 5 - 2;
  missionData.payloadData.sensorA += Math.random() * 2 - 1;
  missionData.payloadData.sensorB += Math.random() * 2 - 1;
  missionData.payloadData.sensorC += Math.random() * 2 - 1;

  // Keep values in realistic ranges
  missionData.altitude = Math.max(0, Math.min(100000, missionData.altitude));
  missionData.temperature = Math.max(-60, Math.min(20, missionData.temperature));
  missionData.pressure = Math.max(50, Math.min(500, missionData.pressure));
  missionData.velocity = Math.max(0, Math.min(1000, missionData.velocity));
  
  // Keep coordinates within Hyderabad area (±0.02 degrees = ~2km)
  missionData.latitude = Math.max(17.3650, Math.min(17.4050, missionData.latitude));
  missionData.longitude = Math.max(78.4667, Math.min(78.5067, missionData.longitude));
}

// Update telemetry every 2 seconds
setInterval(updateTelemetry, 2000);

// PUBLIC ROUTES Section

// Public mission data endpoint - limited fields only
app.get('/api/public/mission', (req, res) => {
  res.json({
    altitude: missionData.altitude,
    latitude: missionData.latitude,
    longitude: missionData.longitude,
    status: missionData.status
  });
});

// AUTHENTICATION Section

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Mock credential verification
  if (username === 'customer' && password === 'password') {
    const token = jwt.sign(
      { username, role: 'customer' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// JWT Verification Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// PROTECTED CUSTOMER ROUTES

// Customer mission data endpoint - full telemetry
app.get('/api/customer/mission', authenticateToken, (req, res) => {
  res.json({
    altitude: missionData.altitude,
    latitude: missionData.latitude,
    longitude: missionData.longitude,
    velocity: missionData.velocity,
    temperature: missionData.temperature,
    pressure: missionData.pressure,
    payloadData: missionData.payloadData,
    history: missionData.history,
    status: missionData.status
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
