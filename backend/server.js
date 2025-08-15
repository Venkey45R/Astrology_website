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

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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
