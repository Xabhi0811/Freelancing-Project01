const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Settings = require('../models/Settings');

// Get all appointments (admin)
exports.getAllAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;
    let filter = {};
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (date) {
      filter.date = new Date(date);
    }

    const appointments = await Appointment.find(filter)
      .sort({ date: 1, timeSlot: 1 })
      .populate('customer', 'name email phone');

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update appointment status (admin)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();
    await appointment.populate('customer', 'name email phone');

    res.json({ 
      message: 'Appointment status updated successfully',
      appointment 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all customers (admin)
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ customers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get shop settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      // Create default settings if none exist
      settings = new Settings({
        shopName: "Premium Barber Shop",
        openTime: "09:00",
        closeTime: "18:00",
        slotDuration: 30,
        breaks: [
          { start: "13:00", end: "14:00", reason: "Lunch Break" }
        ],
        services: [
          { name: "Haircut", duration: 30, price: 25 },
          { name: "Beard Trim", duration: 15, price: 15 },
          { name: "Haircut & Beard", duration: 45, price: 35 },
          { name: "Hair Coloring", duration: 60, price: 50 }
        ],
        maxAppointmentsPerSlot: 1
      });
      await settings.save();
    }

    res.json({ settings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update shop settings
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      settings = await Settings.findOneAndUpdate(
        {}, 
        { $set: req.body }, 
        { new: true, runValidators: true }
      );
    }

    await settings.save();
    res.json({ 
      message: 'Settings updated successfully',
      settings 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};