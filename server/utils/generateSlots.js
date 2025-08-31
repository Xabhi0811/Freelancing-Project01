// Generate time slots based on shop hours and existing appointments
function generateTimeSlots(openTime, closeTime, slotDuration, existingAppointments, breaks) {
  const slots = [];
  const [openHour, openMinute] = openTime.split(':').map(Number);
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);
  
  let currentTime = new Date();
  currentTime.setHours(openHour, openMinute, 0, 0);
  
  const endTime = new Date();
  endTime.setHours(closeHour, closeMinute, 0, 0);
  
  while (currentTime < endTime) {
    const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);
    
    if (slotEnd <= endTime) {
      const startTimeStr = formatTime(currentTime);
      const endTimeStr = formatTime(slotEnd);
      const slotStr = `${startTimeStr}-${endTimeStr}`;
      
      // Check if slot is during a break
      const isDuringBreak = breaks.some(breakItem => {
        const [breakStartHour, breakStartMinute] = breakItem.start.split(':').map(Number);
        const [breakEndHour, breakEndMinute] = breakItem.end.split(':').map(Number);
        
        const breakStart = new Date();
        breakStart.setHours(breakStartHour, breakStartMinute, 0, 0);
        
        const breakEnd = new Date();
        breakEnd.setHours(breakEndHour, breakEndMinute, 0, 0);
        
        return currentTime < breakEnd && slotEnd > breakStart;
      });
      
      // Check if slot is already booked
      const isBooked = existingAppointments.some(apt => apt.timeSlot === slotStr);
      
      if (!isDuringBreak && !isBooked) {
        slots.push(slotStr);
      }
    }
    
    currentTime = slotEnd;
  }
  
  return slots;
}

// Format time to HH:MM
function formatTime(date) {
  return date.toTimeString().slice(0, 5);
}

module.exports = { generateTimeSlots, formatTime };