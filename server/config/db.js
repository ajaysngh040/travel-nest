const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load the correct environment file
dotenv.config({
  path:
    process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
});

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URL;

    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    console.log(`Connecting to MongoDB in ${process.env.NODE_ENV} mode...`);
    await mongoose.connect(mongoURI, {});

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
