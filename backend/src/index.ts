import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';
import lineOfBestFitRoutes from './routes/lineOfBestFit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/line-of-best-fit', lineOfBestFitRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Database connection check
pool.connect((err: Error | undefined, client: any, done: (release?: any) => void) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  done();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 