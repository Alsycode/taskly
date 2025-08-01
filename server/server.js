require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const cors = require('cors');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customer');
const { mongoURI } = require('./config/index');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.get('/status', (req, res) => {
  res.json({ status: 'running', uptime: process.uptime() });
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));