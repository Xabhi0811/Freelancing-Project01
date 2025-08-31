import { format, addMinutes, isBefore, isAfter, parse } from 'date-fns';

// Format date to readable string
export const formatDate = (date, formatStr = 'PPP') => {
  return format(new Date(date), formatStr);
};

// Format time to 12-hour format
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return format(date, 'h:mm a');
};

// Generate time slots between two times
export const generateTimeSlots = (startTime, endTime, intervalMinutes = 30) => {
  const slots = [];
  let currentTime = parse(startTime, 'HH:mm', new Date());
  const end = parse(endTime, 'HH:mm', new Date());
  
  while (isBefore(currentTime, end)) {
    const slotEnd = addMinutes(currentTime, intervalMinutes);
    if (isBefore(slotEnd, end) || isEqual(slotEnd, end)) {
      slots.push({
        start: format(currentTime, 'HH:mm'),
        end: format(slotEnd, 'HH:mm'),
        label: `${format(currentTime, 'h:mm a')} - ${format(slotEnd, 'h:mm a')}`
      });
    }
    currentTime = slotEnd;
  }
  
  return slots;
};

// Check if date is today
export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Check if date is in the past
export const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
};

// Add days to date
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Get day name from date
export const getDayName = (date) => {
  return format(new Date(date), 'EEEE');
};

// Helper function to check if two dates are equal (ignoring time)
const isEqual = (date1, date2) => {
  return (
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  );
};