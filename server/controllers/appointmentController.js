const Appointment = require('../models/Appointment');
const Settings = require('../models/Settings');
const { generateTimeSlots } = require('../utils/generateSlots');

// Book a new appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { date, timeSlot, services, notes } = req.body;
    const customer = req.user._id;

    // Check if slot is available
    const settings = await Settings.findOne();
    const appointmentsInSlot = await Appointment.countDocuments({
      date: new Date(date),
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (appointmentsInSlot >= (settings?.maxAppointmentsPerSlot || 1)) {
      return res.status(400).json({ message: 'This time slot is no longer available' });
    }

    // Create new appointment
    const appointment = new Appointment({
      customer,
      date: new Date(date),
      timeSlot,
      services,
      notes
    });

    await appointment.save();
    await appointment.populate('customer', 'name email phone');

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ customer: req.user._id })
      .sort({ date: 1, createdAt: -1 })
      .populate('customer', 'name email phone');

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get available time slots for a date
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params;
    
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: 'Shop settings not found' });
    }

    const appointments = await Appointment.find({
      date: new Date(date),
      status: { $in: ['pending', 'confirmed'] }
    });

    const availableSlots = generateTimeSlots(
      settings.openTime,
      settings.closeTime,
      settings.slotDuration,
      appointments,
      settings.breaks
    );

    res.json({ date, availableSlots });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findOne({
      _id: id,
      customer: req.user._id
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};