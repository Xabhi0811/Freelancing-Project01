// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Password validation
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Name validation
export const validateName = (name) => {
  return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

// Date validation (not in past)
export const validateFutureDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) >= today;
};

// Time slot validation
export const validateTimeSlot = (timeSlot) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeSlot);
};

// Appointment form validation
export const validateAppointmentForm = (formData) => {
  const errors = {};

  if (!formData.date) {
    errors.date = 'Date is required';
  } else if (!validateFutureDate(formData.date)) {
    errors.date = 'Date cannot be in the past';
  }

  if (!formData.timeSlot) {
    errors.timeSlot = 'Time slot is required';
  } else if (!validateTimeSlot(formData.timeSlot)) {
    errors.timeSlot = 'Invalid time slot format';
  }

  if (!formData.services || formData.services.length === 0) {
    errors.services = 'At least one service is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Registration form validation
export const validateRegistrationForm = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = 'Name is required';
  } else if (!validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters and contain only letters';
  }

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (!formData.phone) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};