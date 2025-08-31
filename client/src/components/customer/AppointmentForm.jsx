import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { appointmentAPI } from '../../services/appointmentAPI';
import { toast } from 'react-toastify';
import TimeSlotPicker from './TimeSlotPicker';
import LoadingSpinner from '../common/LoadingSpinner';

const AppointmentForm = ({ onSuccess, initialDate = '' }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  
  const services = [
    { id: 1, name: 'Haircut', duration: 30, price: 25 },
    { id: 2, name: 'Beard Trim', duration: 15, price: 15 },
    { id: 3, name: 'Haircut & Beard', duration: 45, price: 35 },
    { id: 4, name: 'Hair Coloring', duration: 60, price: 50 },
    { id: 5, name: 'Hair Wash', duration: 15, price: 10 },
    { id: 6, name: 'Head Massage', duration: 20, price: 20 }
  ];

  const fetchAvailableSlots = async (date) => {
    if (!date) return;
    
    try {
      setFetchingSlots(true);
      const response = await appointmentAPI.getAvailableSlots(date);
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      toast.error('Failed to fetch available slots');
      console.error('Error fetching slots:', error);
    } finally {
      setFetchingSlots(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot('');
    if (date) {
      fetchAvailableSlots(date);
    }
  };

  const handleServiceToggle = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to book an appointment');
      return;
    }

    if (!selectedDate || !selectedSlot || selectedServices.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const appointmentData = {
        date: selectedDate,
        timeSlot: selectedSlot,
        services: selectedServices,
        notes
      };

      await appointmentAPI.bookAppointment(appointmentData);
      toast.success('Appointment booked successfully!');
      
      // Reset form
      setSelectedDate('');
      setSelectedSlot('');
      setSelectedServices([]);
      setNotes('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceName) => {
      const service = services.find(s => s.name === serviceName);
      return total + (service?.price || 0);
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block text-gray-700 mb-2 font-semibold">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Select Time Slot</label>
          {fetchingSlots ? (
            <div className="text-center py-4">
              <LoadingSpinner />
              <p className="mt-2 text-gray-500">Loading available slots...</p>
            </div>
          ) : availableSlots.length > 0 ? (
            <TimeSlotPicker 
              slots={availableSlots} 
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          ) : (
            <p className="text-gray-500 text-center py-4">No available slots for this date</p>
          )}
        </div>
      )}

      {/* Services Selection */}
      <div>
        <label className="block text-gray-700 mb-2 font-semibold">Select Services</label>
        <div className="grid grid-cols-1 gap-2">
          {services.map(service => (
            <label key={service.id} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedServices.includes(service.name)}
                onChange={() => handleServiceToggle(service.name)}
                className="mr-3 h-5 w-5 text-primary-600"
              />
              <div className="flex-1">
                <span className="font-medium">{service.name}</span>
                <span className="text-gray-600 ml-2">({service.duration} min) - ${service.price}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Total Price */}
      {selectedServices.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-semibold">
            Total: ${calculateTotal()}
          </p>
        </div>
      )}

      {/* Additional Notes */}
      <div>
        <label className="block text-gray-700 mb-2 font-semibold">Additional Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Any special requests or instructions..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !selectedDate || !selectedSlot || selectedServices.length === 0}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <LoadingSpinner size="small" /> : 'Book Appointment'}
      </button>
    </form>
  );
};

export default AppointmentForm;