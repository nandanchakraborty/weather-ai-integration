const express = require("express");
const axios = require("axios");

const router = express.Router();

/**
 * @openapi
 * /weather:
 *   get:
 *     tags:
 *       - Weather
 *     summary: Get current weather
 *     description: Returns current weather using lat and lon
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: days
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", async (req, res) => {
  try {
    const { lat, lon, days = 3 } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "lat and lon are required"
      });
    }

    const response = await axios.get(
      `${process.env.BASE_URL}/v1/weather`,
      {
        params: {
          lat,
          lon,
          days
        },
        headers: {
          Authorization: `Bearer ${process.env.WEATHER_API_KEY}`
        }
      }
    );

    const data = response.data;

    res.json({
      location: {
        lat: data.location.lat,
        lon: data.location.lon,
        timezone: data.location.timezone
      },
      current: {
        temperature: data.current.temperature,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        condition: data.current.condition_code,
        uv_index: data.current.uv_index
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
});
/**
 * @openapi
 * /weather/forecast:
 *   get:
 *     tags:
 *       - Weather
 *     summary: Get forecast
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Forecast data
 */
router.get("/forecast", async (req, res) => {
  try {
    const { lat, lon, days = 7 } = req.query;

    const response = await axios.get(
      `${process.env.BASE_URL}/v1/forecast`,
      {
        params: {
          lat,
          lon,
          days
        },
        headers: {
          Authorization: `Bearer ${process.env.WEATHER_API_KEY}`
        }
      }
    );

      const data = response.data;

    const daily = data.daily.map(day => ({
      date: day.date,
      max_temp: day.max_temperature,
      min_temp: day.min_temperature,
      condition: day.condition_code,
      precipitation_chance: day.precipitation_probability
    }));

    res.json({
      location: {
        lat: data.location.lat,
        lon: data.location.lon,
        timezone: data.location.timezone
      },
      forecast: daily
    });

  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
});
/**
 * @openapi
 * /weather/location:
 *   get:
 *     tags:
 *       - Weather
 *     summary: Get IP location
 *     responses:
 *       200:
 *         description: Location data
 */
router.get("/location", async (req, res) => {
  try {

    const response = await axios.get(
      `${process.env.BASE_URL}/v1/ip-lookup`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WEATHER_API_KEY}`
        }
      }
    );

    const data = response.data;

    res.json({
      ip_location: {
        city: data.city,
        country: data.country,
        latitude: data.lat,
        longitude: data.lon,
        timezone: data.timezone
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
});

module.exports = router;