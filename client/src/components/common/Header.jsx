import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            ✂️ BarberShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link to="/book" className="text-gray-700 hover:text-primary-600">
              Book Now
            </Link>
            
            {user ? (
              <>
                <Link to="/appointments" className="text-gray-700 hover:text-primary-600">
                  My Appointments
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary-600">
                    Admin
                  </Link>
                )}
                <div className="relative group">
                  <button className="text-gray-700 hover:text-primary-600">
                    {user.name}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/admin/login" className="text-gray-700 hover:text-primary-600">
                  Admin Login
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link to="/book" className="block py-2 text-gray-700 hover:text-primary-600">
              Book Now
            </Link>
            
            {user ? (
              <>
                <Link to="/appointments" className="block py-2 text-gray-700 hover:text-primary-600">
                  My Appointments
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="block py-2 text-gray-700 hover:text-primary-600">
                    Admin
                  </Link>
                )}
                <Link to="/profile" className="block py-2 text-gray-700 hover:text-primary-600">
                  Profile
                </Link>
                <button onClick={handleLogout} className="block py-2 text-gray-700 hover:text-primary-600">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="block py-2 text-gray-700 hover:text-primary-600">
                Admin Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;