// routes/bookings.js
const express = require("express");
const Booking = require("../models/Booking");
const { protect } = require("../middleware/authmiddleware");

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

module.exports = router;
