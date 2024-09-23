const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require('./config/db');

// dotenv configuration
dotenv.config();

// Connection 
connectdb();

// Create an express app object
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Route
// Corrected URL => http://localhost:8000/api/v1/test
app.use("/api/v1/test", require('./routes/testRoutes'));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

// Root route
app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1> Welcome to Food Server APP API BASE PROJECT</h1>");
});

// Port configuration
const PORT = process.env.PORT || 8080;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgMagenta);
});
