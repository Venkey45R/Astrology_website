const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const bookingRoutes = require("./routes/bookings");
const unavailableSlotRoutes = require("./routes/unavailableSlots");
const Razorpay = require('razorpay');
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

app.use("/api/unavailable-slots", unavailableSlotRoutes);
const PORT = process.env.PORT || 8080;


const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY,
  key_secret: process.env.RAZOR_SECRET,
});
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  console.log(amount)
  // const formatedFormData = {
  //   booking_id: formData.bookingId, 
  //   name: formData.name,
  //   email: userInfo.email,
  //   appointment_type: formData.appointmentType,
  //   whatsapp_number: formData.phone,
  //   city: formData.city,
  //   date: formData.pickedDate,
  //   time_slot: formData.timeSlot,
  //   payment_status: formData.paymentStatus 
  // };

  // console.log(formatedFormData, userInfo);

  const options = {
    amount: amount,
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  try {
    // const booking = await Booking.create(formatedFormData);

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating booking or order:", err); // ✅ Debug
    res.status(500).send("Error creating order");
  }
});

const crypto = require("crypto");
app.post("/verify-payment", verifyPayment);

function verifyPayment({ razorpay_payment_id, razorpay_order_id, razorpay_signature }) {
  const secret = process.env.RAZOR_SECRET;

if (!secret) {
  console.error("RAZORPAY_KEY_SECRET is not defined in environment");
  return res.status(500).json({ success: false, message: "Server misconfiguration" });
}

  const generated_signature = require("crypto")
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  return generated_signature === razorpay_signature;
}
app.post("/verify-payment", (req, res) => {
  const isVerified = verifyPayment(req.body);
  console.log(req.body)
  res.json({ success: isVerified });
});



app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
