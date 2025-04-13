// server.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const apiRoutes = require('./routes/api'); // Import the API routes
require('dotenv').config();

const app = express();
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use('/uploads', express.static('uploads'));  // Serve static files from 'uploads' directory

// Parse incoming JSON
app.use(express.json());

// Connect to DB
connectDB();

// Use the API routes for '/api'
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
