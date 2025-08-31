// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/me'
  },
  APPOINTMENTS: {
    BASE: '/appointments',
    MY_APPOINTMENTS: '/appointments/my-appointments',
    AVAILABLE_SLOTS: '/appointments/available-slots'
  },
  ADMIN: {
    APPOINTMENTS: '/admin/appointments',
    CUSTOMERS: '/admin/customers',
    SETTINGS: '/admin/settings'
  }
};

// Appointment statuses
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Appointment status labels and colors
export const APPOINTMENT_STATUS_CONFIG = {
  [APPOINTMENT_STATUS.PENDING]: {
    label: 'Pending',
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800'
  },
  [APPOINTMENT_STATUS.CONFIRMED]: {
    label: 'Confirmed',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  },
  [APPOINTMENT_STATUS.COMPLETED]: {
    label: 'Completed',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  [APPOINTMENT_STATUS.CANCELLED]: {
    label: 'Cancelled',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800'
  }
};

// Default services
export const DEFAULT_SERVICES = [
  { id: 1, name: 'Haircut', duration: 30, price: 25 },
  { id: 2, name: 'Beard Trim', duration: 15, price: 15 },
  { id: 3, name: 'Haircut & Beard', duration: 45, price: 35 },
  { id: 4, name: 'Hair Coloring', duration: 60, price: 50 },
  { id: 5, name: 'Hair Wash', duration: 15, price: 10 },
  { id: 6, name: 'Head Massage', duration: 20, price: 20 }
];

// Shop operating hours
export const SHOP_HOURS = {
  OPEN: '09:00',
  CLOSE: '18:00',
  BREAKS: [
    { start: '13:00', end: '14:00', reason: 'Lunch Break' }
  ]
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  USER_DATA: 'user',
  THEME_PREFERENCE: 'theme'
};

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  TIME_SLOT: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  APPOINTMENT_BOOKED: 'Appointment booked successfully!',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!'
};