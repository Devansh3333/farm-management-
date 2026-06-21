# Backend Setup Guide

## Overview
The Mango Farm Management backend is now configured with:
- ✅ MongoDB connection support
- ✅ OpenWeather API integration
- ✅ Express REST API
- ✅ CORS configuration

## Prerequisites

### 1. MongoDB Setup

Choose one of the following options:

#### Option A: Local MongoDB (Recommended for Development)
1. Download and install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically after installation
   - **Mac/Linux**: Run `mongod` in terminal

3. Verify connection:
   ```bash
   mongosh
   ```

The backend will connect using: `mongodb://localhost:27017/mango_farm_db`

#### Option B: MongoDB Atlas (Cloud)
1. Visit https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string
5. Update `.env` file:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mango_farm_db?retryWrites=true&w=majority
   ```

### 2. OpenWeather API Setup

1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Go to API Keys section and copy your API key
4. Update `.env` file:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

## Environment Variables

The `.env` file is already configured with:

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/mango_farm_db

# CORS Configuration
CORS_ORIGIN=http://localhost:3001

# OpenWeather API Configuration
OPENWEATHER_API_KEY=your_openweather_api_key
OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

**Update** `OPENWEATHER_API_KEY` with your actual key from OpenWeather.

## Starting the Backend

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The backend will run on `http://localhost:5000`

## API Endpoints

### Weather Endpoints

#### Get Current Weather (OpenWeather API)
```
GET /api/weather/api/current/:location
```
Example: `GET /api/weather/api/current/Mumbai`

Response:
```json
{
  "location": "Mumbai",
  "temperature": 28.5,
  "humidity": 75,
  "condition": "Rainy",
  "description": "light rain",
  "windSpeed": 3.5,
  "timestamp": "2026-06-21T10:30:00.000Z"
}
```

#### Get 5-Day Forecast (OpenWeather API)
```
GET /api/weather/api/forecast/:location
```
Example: `GET /api/weather/api/forecast/Mumbai`

Response:
```json
{
  "location": "Mumbai",
  "forecast": [
    {
      "temperature": 28.5,
      "humidity": 75,
      "condition": "Rainy",
      "timestamp": "2026-06-21T10:30:00.000Z"
    },
    ...
  ]
}
```

#### Local Database Endpoints
- `GET /api/weather` - Get all forecasts
- `GET /api/weather/:id` - Get forecast by ID
- `POST /api/weather` - Create new forecast
- `PUT /api/weather/:id` - Update forecast
- `DELETE /api/weather/:id` - Delete forecast

### Farm Endpoints
- `GET /api/farms` - Get all farms
- `POST /api/farms` - Create new farm
- `PUT /api/farms/:id` - Update farm
- `DELETE /api/farms/:id` - Delete farm

### Sales Endpoints
- `GET /api/sales` - Get all sales records
- `POST /api/sales` - Create new sales record

### Yields Endpoints
- `GET /api/yields` - Get all yields
- `POST /api/yields` - Create new yield record

### Market Prices Endpoints
- `GET /api/mandi-prices` - Get all market prices
- `POST /api/mandi-prices` - Create new price record

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB service is running
- Check `MONGO_URI` in `.env` file
- Verify connection string format

### OpenWeather API Error
- Verify API key is correct in `.env`
- Check that API key has not expired
- Test API at https://api.openweathermap.org

### CORS Error
- Ensure frontend is running on `http://localhost:3001`
- Update `CORS_ORIGIN` in `.env` if frontend runs on different port

## Next Steps

1. Install MongoDB locally or set up MongoDB Atlas
2. Get OpenWeather API key
3. Update `.env` with your credentials
4. Run `npm start` to launch backend
5. Test endpoints using Postman or curl
