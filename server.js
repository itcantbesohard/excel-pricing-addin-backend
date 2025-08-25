require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/router');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);

  res.status(500).json({
    error: 'Internal Server Error',
    detail: err.message || 'Unexpected error',
  });
});

// API Routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});