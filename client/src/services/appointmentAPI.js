import api from './authAPI';

export const appointmentAPI = {
  bookAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  getUserAppointments: () => api.get('/appointments/my-appointments'),
  getAvailableSlots: (date) => api.get(`/appointments/available-slots/${date}`),
  cancelAppointment: (id) => api.put(`/appointments/cancel/${id}`),
  getAllAppointments: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return api.get(`/admin/appointments?${params.toString()}`);
  },
  updateAppointmentStatus: (id, status) => 
    api.put(`/admin/appointments/${id}`, { status }),
};