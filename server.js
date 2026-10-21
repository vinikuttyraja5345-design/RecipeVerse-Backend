const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log every incoming request
app.use((req, res, next) => {
  console.log("API Request:", req.method, req.originalUrl);
  next();
});

// Database Connection
connectDB();

// Backend Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RecipeVerse Backend is Running",
  });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Recipe Routes
app.use("/api/recipes", recipeRoutes);



// Temporary Favorites Test Route
app.get("/api/favorites/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Favorites route is working",
  });
});

// Not Found Handler
app.use((req, res) => {
  console.log("Route Not Found:", req.method, req.originalUrl);

  res.status(404).json({
    success: false,
    message: "API Route Not Found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.status
      ? err.message
      : "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`RecipeVerse server running on port ${PORT}`);
});