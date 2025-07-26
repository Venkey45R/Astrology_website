// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  freeze_time: {
    type: Date,
    default: null
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
