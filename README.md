# Weather AI Dashboard API

A production-ready backend service built with **Node.js** and **Express.js** that wraps the Weather AI external API — adding data transformation, webhook management, and interactive Swagger documentation.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [What I Built](#what-i-built)

---

## Overview

The **Weather AI Dashboard API** acts as an intelligent wrapper layer over a third-party weather service. It enhances the raw API by:

- Fetching real-time weather data by coordinates
- Transforming raw responses into clean, structured JSON
- Providing a full webhook management system
- Offering interactive API documentation via Swagger UI

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js 18.x | Runtime environment |
| Express.js | HTTP server & routing |
| Axios | External API requests |
| dotenv | Environment configuration |
| swagger-jsdoc + swagger-ui-express | API documentation |

---

## Project Structure

```
weather-ai-dashboard/
├── routes/
│   ├── weatherRoutes.js      # Weather endpoints
│   └── webhookRoutes.js      # Webhook CRUD endpoints
├── swagger.js                # Swagger configuration
├── app.js                    # Entry point
├── .env                      # Environment variables
└── package.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-ai-dashboard.git
cd weather-ai-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
BASE_URL=https://api.weather-ai.co
WEATHER_API_KEY=wai_your_actual_api_key
```

>  Your API key must start with `wai_` and be a valid key from the Weather AI dashboard.

### 4. Start the server

```bash
# Production
node app.js

# Development
npx nodemon app.js
```

### 5. Access the API

| Interface | URL |
|---|---|
| Base API | `http://localhost:5000` |
| Swagger Docs | `http://localhost:5000/docs` |

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `5000` |
| `BASE_URL` | Weather AI base URL | `https://api.weather-ai.co` |
| `WEATHER_API_KEY` | Your Weather AI API key | `wai_abc123...` |

---

## API Reference

### Weather Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/weather` | Get current weather by coordinates |
| `GET` | `/api/weather/forecast` | Get multi-day forecast |
| `GET` | `/api/weather/location` | Detect location via IP |

**Get current weather**

GET /api/weather?lat=23.8103&lon=90.4125


**Get forecast**
```
GET /api/weather/forecast?lat=23.8103&lon=90.4125&days=7
```

**Get location (IP-based)**
```
GET /api/weather/location
```

---

### Webhook Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/webhooks` | Register a new webhook |
| `GET` | `/api/webhooks` | List all registered webhooks |
| `DELETE` | `/api/webhooks/:id` | Delete a webhook by ID |

**Register a webhook**
```
POST /api/webhooks
```
```json
{
  "url": "https://your-server.com/webhook"
}
```

---

## What I Built

### External API Integration
- Connected to the Weather AI API using **Axios**
- Handled **Bearer token authentication**
- Managed query-parameter-based requests (`lat`, `lon`, `days`)

### Data Transformation Layer
- Converted raw API payloads into clean, structured JSON responses
- Extracted only the fields that matter: location details, weather summary, and simplified forecast data

### Webhook Management System
- Built a complete CRUD webhook system from scratch
- Supports registering, listing, and deleting webhook URLs by ID

### API Documentation
- Integrated **Swagger UI** for interactive endpoint testing
- Fully documented request/response schemas available at `/docs`

---

## License

This project is licensed under the [MIT License](LICENSE).