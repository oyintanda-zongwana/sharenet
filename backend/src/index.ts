import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config';
import workshopRoutes from './routes/workshops';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workshops', workshopRoutes);

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 