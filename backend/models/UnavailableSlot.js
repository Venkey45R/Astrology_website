const mongoose = require("mongoose");

const UnavailableSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("UnavailableSlot", UnavailableSlotSchema);
