const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Weather AI API",
      version: "1.0.0",
      description: "Express wrapper for Weather AI with Webhooks",
    },
    servers: [
      {
        url: "https://weather-ai-dashboard-api.onrender.com/api",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJSDoc(options);