import React, { createContext, useContext, useState, useEffect } from 'react';
import { appointmentAPI } from '../services/appointmentAPI';
import { useAuth } from './AuthContext';

const AppointmentContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentContext);
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchAppointments = async () => {
    if (!user) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await appointmentAPI.getUserAppointments();
      setAppointments(response.data.appointments);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (appointmentData) => {
    try {
      const response = await appointmentAPI.bookAppointment(appointmentData);
      await fetchAppointments(); // Refresh the list
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to book appointment' 
      };
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await appointmentAPI.cancelAppointment(id);
      await fetchAppointments(); // Refresh the list
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to cancel appointment' 
      };
    }
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments.filter(apt => 
      new Date(apt.date) >= now && apt.status !== 'cancelled'
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getPastAppointments = () => {
    const now = new Date();
    return appointments.filter(apt => 
      new Date(apt.date) < now || apt.status === 'cancelled'
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const value = {
    appointments,
    loading,
    error,
    fetchAppointments,
    bookAppointment,
    cancelAppointment,
    getUpcomingAppointments,
    getPastAppointments
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};