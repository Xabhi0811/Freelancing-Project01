import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">✂️ BarberShop</h3>
            <p className="text-gray-300">
              Your premium destination for quality haircuts and grooming services.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/book" className="text-gray-300 hover:text-white">Book Appointment</a></li>
              <li><a href="/appointments" className="text-gray-300 hover:text-white">My Appointments</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <address className="text-gray-300 not-italic">
              <p>123 Barber Street</p>
              <p>Hairville, HV 12345</p>
              <p className="mt-2">Phone: (555) 123-4567</p>
              <p>Email: info@barbershop.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BarberShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;