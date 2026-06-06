const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Weather AI API",
      version: "1.0.0",
      description: "Express wrapper for Weather AI with Webhooks"
    },
    servers: [
  {
    url: process.env.NODE_ENV === "production"
      ? "https://weatger-ai-dashboard-api.onrender.com/api"
      : "http://localhost:5000/api"
  }
]
  },

  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJSDoc(options);