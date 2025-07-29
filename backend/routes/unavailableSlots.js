// routes/unavailableSlots.js

const express = require("express");
const UnavailableSlot = require("../models/UnavailableSlot");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// Create a new unavailable slot
router.post("/", protect, async (req, res) => {
  try {
    const { date, timeSlot } = req.body;

    const newSlot = await UnavailableSlot.create({
      date: new Date(date),
      timeSlot,
      isAvailable: false,
    });

    
    res.status(201).json(newSlot);
  } catch (err) {
    console.error("Error creating unavailable slot:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all unavailable slots
router.get("/", protect, async (req, res) => {
  try {
    const slots = await UnavailableSlot.find().sort({ date: 1 });
    res.json(slots);
  } catch (err) {
    console.error("Error fetching unavailable slots:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a specific unavailable slot
router.delete("/:id", protect, async (req, res) => {
  try {
    const slot = await UnavailableSlot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    await UnavailableSlot.findByIdAndDelete(req.params.id);
    res.json({ message: "Slot deleted" });
  } catch (err) {
    console.error("Error deleting unavailable slot:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
