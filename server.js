// server.js
const express = require("express");
const dotenv = require("dotenv");
// Removed Passport.js and express-session as they are not needed for the direct POST flow
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
// User model is used within authRoutes, no direct import needed here
// const User = require("./models/User");
const authRoutes = require("./routes/auth");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend URL (e.g., http://localhost:3000)
    credentials: true, // Allow sending cookies from frontend
  })
);

// Removed Passport.js and express-session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "secretkey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     },
//   })
// );

// Removed Passport initialization and strategy setup
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(...);
// passport.serializeUser(...);
// passport.deserializeUser(...);

// API Routes
app.use("/api/auth", authRoutes); // All authentication routes are prefixed with /api/auth

// Define the port to listen on
const PORT = process.env.PORT || 8080; // Your server is currently running on 8080

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
