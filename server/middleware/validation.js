const { body, validationResult } = require('express-validator');

// Validation for user registration
const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .isMobilePhone()
    .withMessage('Please enter a valid phone number')
];

// Validation for appointment booking
const validateAppointment = [
  body('date')
    .isISO8601()
    .withMessage('Please enter a valid date'),
  body('timeSlot')
    .notEmpty()
    .withMessage('Time slot is required'),
  body('services')
    .isArray({ min: 1 })
    .withMessage('At least one service is required')
];

// Check for validation errors
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors: errors.array() 
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateAppointment,
  checkValidation
};