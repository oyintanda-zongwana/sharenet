# Sharenet Workshop Booking System

A Vue.js Single Page Application for viewing Sharenet spot prices and booking workshops.

## Features

- Real-time spot prices display with sortable columns
- Contact information with Google Maps integration
- Workshop booking system with availability filtering
- Mobile responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sharenet
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run serve
```

The application will be available at `http://localhost:8080`

## Building for Production

To build the application for production:

```bash
npm run build
```

## Docker Deployment

To build and run the application using Docker:

```bash
# Build the Docker image
docker build -t sharenet-app .

# Run the container
docker run -d -p 80:80 sharenet-app
```

The application will be available at `http://localhost`

## API Endpoints

The application uses the following Sharenet API endpoints:

- Spot prices: `https://api.sharenet.co.za/api/v1/px2/spots`
- Workshop booking: `https://api.sharenet.co.za/api/v1/workshops/book`

## Technologies Used

- Vue.js 3
- TypeScript
- Vue Router
- Axios
- Docker
- Nginx (for production deployment)
