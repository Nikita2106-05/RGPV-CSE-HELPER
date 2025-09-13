// backend/server.js
const express = require('express');
const dotenv = require('dotenv').config(); // Load environment variables
const colors = require('colors'); // For colored console output
const cors = require('cors'); // For Cross-Origin Resource Sharing
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware'); // Custom error handler
const connectDB = require('./config/db'); // Database connection

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Body parser for raw JSON
app.use(express.urlencoded({ extended: false })); // Body parser for URL-encoded data

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notes', require('./routes/notesRoutes'));
app.use('/api/pyq', require('./routes/pyqRoutes'));

// Serve static files from the 'uploads' directory
// This is crucial for serving downloadable files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow.bold));