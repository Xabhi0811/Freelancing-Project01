const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  shopName: {
    type: String,
    default: "Premium Barber Shop"
  },
  openTime: {
    type: String,
    default: "09:00"
  },
  closeTime: {
    type: String,
    default: "18:00"
  },
  slotDuration: {
    type: Number,
    default: 30
  },
  breaks: [{
    start: String,
    end: String,
    reason: String
  }],
  services: [{
    name: String,
    duration: Number,
    price: Number
  }],
  maxAppointmentsPerSlot: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Settings', settingsSchema);