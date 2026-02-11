const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

const allowedOrigins = [
  'http://localhost:5173',
  'https://ankita-gupta-portfolio.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));


// Basic Route
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
if (!process.env.MONGODB_URI) {
  console.error('CRITICAL: MONGODB_URI is not defined in environment variables!');
} else {
  const maskedUri = process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@');
  console.log('DB URI (masked):', maskedUri.substring(0, 50) + '...');
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB Atlas');
    const { createInitialAdmin } = require('./controllers/authController');
    createInitialAdmin();
  })
  .catch(err => {
    console.error('ERROR: Could not connect to MongoDB Atlas:');
    console.error(err);
  });

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
