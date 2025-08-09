// routes/bookings.js
const express = require("express");
const Booking = require("../models/Booking");
const { protect } = require("../middleware/authmiddleware");
const axios = require("axios");
require("dotenv").config();
const { CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET, CASHFREE_API_URL } =
  process.env;

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    console.error("Error creating booking:", err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.booking_id) {
      return res.status(400).json({ error: "Booking ID must be unique." });
    }
    res.status(400).json({ error: err.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error getting all bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/find-by-email/:email", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.email !== req.params.email) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only view your own bookings" });
    }

    const bookings = await Booking.find({ email: req.params.email });
    if (bookings.length > 0) {
      res.json(bookings);
    } else {
      res.status(404).json({ message: "No bookings found for this email." });
    }
  } catch (error) {
    console.error("Error finding bookings by user email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      if (req.user.role !== "admin" && booking.email !== req.user.email) {
        return res
          .status(403)
          .json({ message: "Forbidden: You can only view your own bookings" });
      }
      res.json(booking);
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error("Error getting booking by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (req.user.role !== "admin" && booking.email !== req.user.email) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only update your own bookings" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking by ID:", error);
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (req.user.role !== "admin" && booking.email !== req.user.email) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only delete your own bookings" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/verify-payment/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    // Step 1: Call Cashfree API to get order details
    const cashfreeResponse = await axios.get(
      `${CASHFREE_API_URL}/orders/${orderId}/payments`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": CASHFREE_CLIENT_ID,
          "x-client-secret": CASHFREE_CLIENT_SECRET,
        },
      }
    );

    const paymentDetails = cashfreeResponse.data[0];
    const cashfreeStatus = paymentDetails.payment_status;

    // Step 2: Find the corresponding booking in your database
    const booking = await Booking.findOne({ booking_id: orderId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Step 3: Update the booking payment status if it was successful
    if (cashfreeStatus === "SUCCESS") {
      booking.payment_status = true;
      await booking.save();
    } else {
      return res
        .status(400)
        .json({ message: "Payment not successful", status: cashfreeStatus });
    }

    // Step 4: Return the updated booking details to the frontend
    res.json(booking);
  } catch (error) {
    console.error(
      "Error verifying payment:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Payment verification failed." });
  }
});

module.exports = router;
