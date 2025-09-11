const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const cloudinary = require('cloudinary').v2; // Import Cloudinary

require('dotenv').config();
const app = express();
connectDB();

// --- NEW: Cloudinary Configuration ---
// It's recommended to place this configuration here in the main server file.
// Ensure you have these variables in your .env file.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// --- END NEW ---

app.use(cors({
  origin: ['http://localhost:3000','https://hillridersmanavsewasamiti.vercel.app'], 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/admin', adminRoutes);
app.get('/ping', (req, res) => {
  res.send('pong');
});
app.get('/', (req, res) => {
  res.send('API working');
});
app.use('/api', require('./routes/mainRoutes'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
      setInterval(() => {
  fetch('http://localhost:5000/ping')
    .then(() => console.log('Pinged self!'))
    .catch(() => console.log('Self ping failed.'));
}, 1000 * 60 * 10);
});