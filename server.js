import router from './routes/router.js';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(express.json());

app.use(cors({
  origin: true, 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));


// API Routes
app.use('/api', router);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);

  res.status(500).json({
    error: 'Internal Server Error',
    detail: err.message || 'Unexpected error',
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});