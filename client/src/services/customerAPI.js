import api from './authAPI';

export const customerAPI = {
  // Get customer profile
  getProfile: () => api.get('/customers/profile'),
  
  // Update customer profile
  updateProfile: (profileData) => api.put('/customers/profile', profileData),
  
  // Get customer appointments (alternative endpoint)
  getCustomerAppointments: (customerId) => api.get(`/customers/${customerId}/appointments`),
  
  // Update customer appointment
  updateCustomerAppointment: (appointmentId, updateData) => 
    api.put(`/customers/appointments/${appointmentId}`, updateData),
};