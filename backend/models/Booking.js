const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    booking_id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    appointment_type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    whatsapp_number: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time_slot: {
      type: String,
      required: true,
    },
    payment_status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
