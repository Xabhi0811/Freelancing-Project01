const express = require('express');
const router = express.Router();
const { 
  getAllAppointments, 
  updateAppointmentStatus, 
  getAllCustomers, 
  getSettings, 
  updateSettings 
} = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

// All routes require admin authentication
router.use(adminAuth);

// Get all appointments
router.get('/appointments', getAllAppointments);

// Update appointment status
router.put('/appointments/:id', updateAppointmentStatus);

// Get all customers
router.get('/customers', getAllCustomers);

// Get shop settings
router.get('/settings', getSettings);

// Update shop settings
router.put('/settings', updateSettings);

module.exports = router;