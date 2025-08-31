import React from 'react';

const TimeSlotPicker = ({ slots, selectedSlot, onSelectSlot, columns = 3 }) => {
  if (!slots || slots.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No available time slots
      </div>
    );
  }

  const gridClass = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-3`;

  return (
    <div className={gridClass}>
      {slots.map((slot, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelectSlot(slot)}
          className={`p-4 border rounded-lg text-center transition duration-200 ${
            selectedSlot === slot
              ? 'bg-primary-600 text-white border-primary-600 shadow-md'
              : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700'
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;