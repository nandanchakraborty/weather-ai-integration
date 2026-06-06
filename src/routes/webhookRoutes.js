const express = require("express");
const axios = require("axios");

const router = express.Router();
/**
 * @openapi
 * /webhooks:
 *   post:
 *     tags:
 *       - Webhooks
 *     summary: Register webhook
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Webhook created
 */
router.post("/", async (req, res) => {
  try {

    const response = await axios.post(
      `${process.env.BASE_URL}/v1/webhooks`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.WEATHER_API_KEY}`
        }
      }
    );

      const data = response.data;

    res.json({
      success: true,
      webhook: {
        id: data.id,
        url: data.url,
        events: data.events
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
 * /webhooks:
 *   get:
 *     tags:
 *       - Webhooks
 *     summary: Get all webhooks
 *     responses:
 *       200:
 *         description: List of webhooks
 */
router.get("/", async (req, res) => {
  try {

    const response = await axios.get(
      `${process.env.BASE_URL}/v1/webhooks`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WEATHER_API_KEY}`
        }
      }
    );

   const data = response.data;

    const webhooks = data.map(w => ({
      id: w.id,
      url: w.url,
      events: w.events,
      created_at: w.created_at
    }));

    res.json({
      total: webhooks.length,
      webhooks
    });

  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
});
/**
 * @openapi
 * /webhooks/{id}:
 *   delete:
 *     tags:
 *       - Webhooks
 *     summary: Delete webhook
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", async (req, res) => {
  try {

    const response = await axios.delete(
      `${process.env.BASE_URL}/v1/webhooks/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WEATHER_API_KEY}`
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
});

module.exports = router;