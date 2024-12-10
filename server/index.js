require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes"); // Adjust the path as needed
const cors = require("cors"); // Import the CORS middleware

const app = express();
connectDB();

const allowedOrigins = [
  process.env.CLIENT_URL, // Production frontend URL
  process.env.DEV_URL, // Development frontend URL
];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or Postman)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowedOrigins list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // If not allowed, return an error
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes); // auth routes
app.use("/places", placeRoutes); // places routes
app.use("/bookings", bookingRoutes); // booking routes

// Serve files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use the upload routes
app.use("/uploads", uploadRoutes); // Prefixing routes with /api for better

// Error handling
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
