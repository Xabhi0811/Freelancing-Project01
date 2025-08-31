const express = require('express');
const router = express.Router();
const { 
  bookAppointment, 
  getUserAppointments, 
  getAvailableSlots, 
  cancelAppointment 
} = require('../controllers/appointmentController');
const { validateAppointment, checkValidation } = require('../middleware/validation');
const { auth } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Book a new appointment
router.post('/', validateAppointment, checkValidation, bookAppointment);

// Get user's appointments
router.get('/my-appointments', getUserAppointments);

// Get available time slots for a date
router.get('/available-slots/:date', getAvailableSlots);

// Cancel an appointment
router.put('/cancel/:id', cancelAppointment);

module.exports = router;