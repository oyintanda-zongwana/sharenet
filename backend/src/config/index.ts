import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: parseInt(process.env.PORT || '3000'),
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sharenet',
    port: parseInt(process.env.DB_PORT || '3306')
  },
  sharenetApi: {
    url: process.env.SHARENET_API_URL || 'https://api.sharenet.co.za/api/v1/px2/spots'
  }
};

export default config; 