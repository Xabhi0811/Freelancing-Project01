import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const services = [
    {
      name: 'Haircut',
      description: 'Professional haircut with styling',
      price: 25,
      duration: '30 min'
    },
    {
      name: 'Beard Trim',
      description: 'Precise beard shaping and trimming',
      price: 15,
      duration: '20 min'
    },
    {
      name: 'Haircut & Beard',
      description: 'Complete grooming package',
      price: 35,
      duration: '45 min'
    },
    {
      name: 'Hair Coloring',
      description: 'Professional hair coloring service',
      price: 45,
      duration: '60 min'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Premium Barber Services</h1>
          <p className="text-xl mb-8">Book your appointment with our professional barbers</p>
          <Link
            to="/book"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">${service.price}</span>
                  <span className="text-gray-500">{service.duration}</span>
                </div>
                <Link
                  to="/book"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
            <p className="text-gray-600 mb-8">
              Our experienced barbers provide top-quality services in a comfortable and friendly environment. 
              We use the best products and techniques to ensure you leave looking your best.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">✂️</div>
                <h3 className="text-xl font-bold mb-2">Expert Barbers</h3>
                <p className="text-gray-600">Highly skilled professionals with years of experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold mb-2">Flexible Hours</h3>
                <p className="text-gray-600">Open 7 days a week to accommodate your schedule</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-bold mb-2">Quality Service</h3>
                <p className="text-gray-600">We use premium products and the latest techniques</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;