// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const linksRoutes = require('./routes/links');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb://localhost:27017/landing-page-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/links', linksRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
