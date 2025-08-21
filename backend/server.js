const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const bookingRoutes = require("./routes/bookings");
const unavailableSlotRoutes = require("./routes/unavailableSlots");
const awakenRoutes = require("./routes/awaken");

const payuRoutes = require("./routes/payuRoutes");
const Razorpay = require("razorpay");
const cashfreeRoutes = require("./routes/cashfreeRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000", // frontend dev
  "http://localhost:8080", // (optional if you call from browser directly)
  "https://www.kalagaprasadastrology.com",
  "https://kalagaprasadastrology.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/awaken",awakenRoutes)
app.use("/api/unavailable-slots", unavailableSlotRoutes);
app.use("/api/cashfree", cashfreeRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
