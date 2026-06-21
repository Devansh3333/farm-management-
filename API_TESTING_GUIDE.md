# API Testing Guide

## Backend Status
✅ **Running on**: http://localhost:5000
✅ **MongoDB**: Connected to `mango_farm_db`
✅ **Frontend**: Running on http://localhost:3001

## Quick Start: OpenWeather API Integration

### Step 1: Get Your OpenWeather API Key

1. Go to https://openweathermap.org/
2. Click "Sign Up" and create a free account
3. Verify your email
4. Go to your API keys page: https://home.openweathermap.org/api_keys
5. Copy your default API key

### Step 2: Update Backend Configuration

Edit `backend/.env`:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

Then restart the backend:
```bash
npm run start --workspace=backend
```

### Step 3: Test OpenWeather Endpoints

#### Using Browser (Simple Test)
Open in your browser:
```
http://localhost:5000/api/weather/api/current/Mumbai
http://localhost:5000/api/weather/api/forecast/Mumbai
```

#### Using cURL

**Get Current Weather:**
```bash
curl http://localhost:5000/api/weather/api/current/Mumbai
```

**Get 5-Day Forecast:**
```bash
curl http://localhost:5000/api/weather/api/forecast/Mumbai
```

#### Using Postman

1. Open Postman
2. Create new request
3. Set method to GET
4. Enter URL: `http://localhost:5000/api/weather/api/current/Mumbai`
5. Click Send

### Response Example

**Current Weather Response:**
```json
{
  "location": "Mumbai",
  "temperature": 28.5,
  "feelsLike": 27.8,
  "humidity": 75,
  "pressure": 1013,
  "windSpeed": 3.5,
  "windDirection": 180,
  "cloudiness": 90,
  "condition": "Rainy",
  "description": "light rain",
  "icon": "10d",
  "timestamp": "2026-06-21T10:30:00.000Z"
}
```

## Complete API Endpoints

### Weather APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather/api/current/:location` | Get current weather from OpenWeather |
| GET | `/api/weather/api/forecast/:location` | Get 5-day forecast from OpenWeather |
| GET | `/api/weather` | Get all stored forecasts |
| POST | `/api/weather` | Create new forecast |
| GET | `/api/weather/:id` | Get forecast by ID |
| PUT | `/api/weather/:id` | Update forecast |
| DELETE | `/api/weather/:id` | Delete forecast |

### Farm APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/farms` | Get all farms |
| POST | `/api/farms` | Create new farm |
| GET | `/api/farms/:id` | Get farm by ID |
| PUT | `/api/farms/:id` | Update farm |
| DELETE | `/api/farms/:id` | Delete farm |

### Sales APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sales` | Get all sales |
| POST | `/api/sales` | Create new sale |
| GET | `/api/sales/:id` | Get sale by ID |
| PUT | `/api/sales/:id` | Update sale |
| DELETE | `/api/sales/:id` | Delete sale |

### Yields APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/yields` | Get all yields |
| POST | `/api/yields` | Create new yield |
| GET | `/api/yields/:id` | Get yield by ID |
| PUT | `/api/yields/:id` | Update yield |
| DELETE | `/api/yields/:id` | Delete yield |

### Market Prices APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mandi-prices` | Get all prices |
| POST | `/api/mandi-prices` | Create new price |
| GET | `/api/mandi-prices/:id` | Get price by ID |
| PUT | `/api/mandi-prices/:id` | Update price |
| DELETE | `/api/mandi-prices/:id` | Delete price |

## Frontend Integration

The frontend is already configured to:
- Call OpenWeather API through the backend
- Display weather information on the Dashboard
- Show 5-day forecasts for farms

## Troubleshooting

### "OpenWeather API key not configured" Error
- Verify API key is set in `backend/.env`
- Restart backend server after updating .env
- Test with: `http://localhost:5000/api/weather/api/current/Delhi`

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check connection string in `backend/.env`
- Verify MongoDB is listening on localhost:27017

### CORS Errors
- Check that frontend is on `http://localhost:3001`
- Update `CORS_ORIGIN` in `.env` if different port

## Next: Integrating with Frontend

The frontend Dashboard will automatically use these endpoints:
1. Load farm weather data from `/api/weather/farm/:farmId`
2. Fetch market prices from `/api/mandi-prices`
3. Display yield statistics from `/api/yields`
4. Show sales records from `/api/sales`

All data is now fully integrated with:
- ✅ Real-time weather from OpenWeather API
- ✅ MongoDB database persistence
- ✅ Express REST API
- ✅ React frontend with modern UI
