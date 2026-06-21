# Mango Farm Management System

A comprehensive farm management solution for mango cultivation, featuring real-time sales tracking, yield management, market price monitoring (Mandi Prices), and weather forecasting.

## 📋 Project Overview

This system helps mango farmers manage their operations efficiently by providing:
- **Sales Management**: Track and manage all sales transactions
- **Yield Management**: Monitor crop production and yield data
- **Mandi Prices**: Real-time market price information for different varieties
- **Weather Forecasting**: Local weather data and forecasts for better farm planning

## 📁 Project Structure

```
mango-farm-management-system/
├── backend/                    # Node.js Express API
│   ├── src/
│   │   ├── config/            # Configuration files (database, environment)
│   │   ├── controllers/       # Request handlers for each feature
│   │   │   ├── farmController.js
│   │   │   ├── salesController.js
│   │   │   ├── yieldController.js
│   │   │   ├── mandiPriceController.js
│   │   │   └── weatherController.js
│   │   ├── models/            # Data models
│   │   │   ├── farmModel.js
│   │   │   ├── salesModel.js
│   │   │   ├── yieldModel.js
│   │   │   ├── mandiPriceModel.js
│   │   │   └── weatherModel.js
│   │   ├── routes/            # API route definitions
│   │   │   ├── farmRoutes.js
│   │   │   ├── salesRoutes.js
│   │   │   ├── yieldRoutes.js
│   │   │   ├── mandiPriceRoutes.js
│   │   │   ├── weatherRoutes.js
│   │   │   └── index.js
│   │   ├── services/          # Business logic and utilities
│   │   ├── middlewares/       # Custom middleware
│   │   └── app.js             # Express app configuration
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env                   # Environment variables
│
├── frontend/                  # React Frontend
│   ├── public/               # Static files
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   │   └── api.js
│   │   ├── styles/          # CSS files
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env                 # Frontend environment variables
│
├── package.json             # Root workspace package.json
├── README.md               # This file
└── .gitignore            # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**
```bash
cd "project 1"
```

2. **Install dependencies for all workspaces**
```bash
npm run install-all
```

### Environment Setup

Create `.env` files for both backend and frontend:

**backend/.env**
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=27017
DB_NAME=mango_farm_db
```

**frontend/.env**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

**Start Backend Server**
```bash
npm run start:backend
```
The API will be available at `http://localhost:5000/api`

**Start Frontend Development Server**
```bash
npm run start:frontend
```
The frontend will be available at `http://localhost:3000`

**Start Both (in one command)**
```bash
npm start
```

## 📚 API Endpoints

### Health Check
- `GET /api/farms/health` - Check backend health

### Farms Management
- `GET /api/farms` - Get all farms
- `GET /api/farms/:id` - Get farm by ID
- `POST /api/farms` - Create new farm
- `PUT /api/farms/:id` - Update farm
- `DELETE /api/farms/:id` - Delete farm

### Sales Management
- `GET /api/sales` - Get all sales
- `GET /api/sales/:id` - Get sale by ID
- `GET /api/sales/farm/:farmId` - Get sales by farm
- `POST /api/sales` - Create new sale
- `PUT /api/sales/:id` - Update sale
- `DELETE /api/sales/:id` - Delete sale

### Yield Management
- `GET /api/yields` - Get all yields
- `GET /api/yields/:id` - Get yield by ID
- `GET /api/yields/farm/:farmId` - Get yields by farm
- `POST /api/yields` - Create new yield record
- `PUT /api/yields/:id` - Update yield
- `DELETE /api/yields/:id` - Delete yield

### Mandi Prices
- `GET /api/mandi-prices` - Get all prices
- `GET /api/mandi-prices/latest` - Get latest prices
- `GET /api/mandi-prices/:id` - Get price by ID
- `GET /api/mandi-prices/variety/:variety` - Get prices by variety
- `GET /api/mandi-prices/mandi/:mandi` - Get prices by mandi
- `POST /api/mandi-prices` - Create new price record
- `PUT /api/mandi-prices/:id` - Update price
- `DELETE /api/mandi-prices/:id` - Delete price

### Weather Forecasting
- `GET /api/weather` - Get all forecasts
- `GET /api/weather/:id` - Get forecast by ID
- `GET /api/weather/farm/:farmId` - Get forecasts by farm
- `GET /api/weather/farm/:farmId/latest` - Get latest forecast for farm
- `GET /api/weather/location/:location` - Get forecasts by location
- `POST /api/weather` - Create new forecast
- `PUT /api/weather/:id` - Update forecast
- `DELETE /api/weather/:id` - Delete forecast

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Controllers**: Handle HTTP requests and responses
- **Models**: Define data structure and operations
- **Routes**: Map API endpoints to controllers
- **Services**: Business logic and external service integration
- **Middlewares**: Request validation and processing

### Frontend (React)
- **Components**: Reusable UI components
- **Pages**: Full page components
- **Services**: API communication layer
- **Styles**: CSS styling

## 📦 Dependencies

### Backend
- express: Web framework
- cors: Cross-origin resource sharing
- dotenv: Environment variable management
- mongoose: MongoDB object modeling (ready for integration)
- nodemon: Development server with auto-reload

### Frontend
- react: UI library
- react-dom: React DOM rendering
- react-router-dom: Client-side routing
- axios: HTTP client

## 🔄 Data Models

### Farm
- id, name, location, area, varieties, createdAt

### Sales
- id, farmId, variety, quantity, pricePerUnit, totalPrice, buyer, saleDate, mandi, notes, createdAt

### Yield
- id, farmId, variety, quantity, date, season, notes, createdAt

### MandiPrice
- id, variety, mandi, price, unit, date, source, trend, createdAt

### Weather
- id, farmId, location, date, temperature, humidity, rainfall, windSpeed, condition, uvIndex, forecast7Days, createdAt

## 🔐 Security Considerations

Before deploying to production:
- Add authentication and authorization
- Implement input validation and sanitization
- Use HTTPS for all communications
- Add rate limiting
- Implement CORS properly
- Use environment variables for sensitive data
- Add error logging and monitoring

## 📝 Development Notes

- The system currently uses in-memory storage for data (models)
- For production, integrate with MongoDB or PostgreSQL
- Add comprehensive error handling
- Implement pagination for large datasets
- Add API documentation with Swagger/OpenAPI

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Last Updated**: 2026-06-15
