import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/customer/HomePage';
import BookAppointment from './pages/customer/BookAppointment';
import MyAppointments from './pages/customer/MyAppointments';
import Profile from './pages/customer/Profile';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageAppointments from './pages/admin/ManageAppointments';
import ManageCustomers from './pages/admin/ManageCustomers';
import SystemSettings from './pages/admin/SystemSettings';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { AppointmentProvider } from './contexts/AppointmentContext';

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/book" element={<BookAppointment />} />
                <Route path="/appointments" element={<MyAppointments />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/appointments" element={<ManageAppointments />} />
                <Route path="/admin/customers" element={<ManageCustomers />} />
                <Route path="/admin/settings" element={<SystemSettings />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </Router>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;