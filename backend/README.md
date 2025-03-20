# Sharenet Workshop Booking System Backend

This is the backend service for the Sharenet Workshop Booking System. It provides APIs for managing workshops and bookings.

## Features

- Fetch workshops from Sharenet spots data
- Get all available workshops
- Book workshops
- MySQL integration for data persistence
- TypeScript support
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sharenet/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_HOST=byw2itsus8sgckjjxx3i-mysql.services.clever-cloud.com
DB_USER=uy0ecbqzrwvak8ar
DB_PASSWORD=PRO3dJUXQAoEU6n4NkXZ
DB_PORT=3306
DB_NAME=byw2itsus8sgckjjxx3i
SHARENET_API_URL=https://api.sharenet.co.za/api/v1/px2/spots
```

4. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Workshops

- `GET /api/workshops` - Get all workshops
- `POST /api/workshops/create-from-spots` - Create workshops from Sharenet spots
- `POST /api/workshops/:workshopId/book` - Book a workshop

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start the production server
- `npm test` - Run tests

## Technologies Used

- Node.js
- Express
- TypeScript
- MySQL
- mysql2
- Axios
- CORS
- dotenv
