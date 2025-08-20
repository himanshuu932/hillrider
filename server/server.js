const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');

require('dotenv').config();
const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API working');
});
app.use('/api', require('./routes/mainRoutes'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});