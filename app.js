require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const weatherRoutes = require("./src/routes/weatherRoutes");
const webhookRoutes = require("./src/routes/webhookRoutes");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/weather", weatherRoutes);
app.use("/api/webhooks", webhookRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Weather AI Dashboard API"
  });
});

const PORT = process.env.PORT || 5000;
//console.log(process.env.BASE_URL);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});