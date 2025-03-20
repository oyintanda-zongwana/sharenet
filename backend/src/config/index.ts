import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306'),
    database: process.env.DB_NAME || 'sharenet_workshops'
  },
  sharenetApiUrl: process.env.SHARENET_API_URL || 'https://api.sharenet.co.za/api/v1/px2/spots'
}; 