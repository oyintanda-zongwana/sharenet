import express from 'express';
import cors from 'cors';
import { config } from './config';
import workshopRoutes from './routes/workshopRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workshops', workshopRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
}); 