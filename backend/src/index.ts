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

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 