import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalCustomers: 0,
    revenue: 0
  });

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setStats({
          totalAppointments: 124,
          pendingAppointments: 8,
          totalCustomers: 87,
          revenue: 2450
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`h-10 w-10 rounded-md flex items-center justify-center ${color}`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          icon={<span className="text-white text-xl">📅</span>}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending Appointments"
          value={stats.pendingAppointments}
          icon={<span className="text-white text-xl">⏳</span>}
          color="bg-yellow-500"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<span className="text-white text-xl">👥</span>}
          color="bg-green-500"
        />
        <StatCard
          title="Revenue ($)"
          value={stats.revenue}
          icon={<span className="text-white text-xl">💰</span>}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/appointments"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Manage Appointments
          </Link>
          <Link
            to="/admin/customers"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Manage Customers
          </Link>
          <Link
            to="/admin/settings"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            System Settings
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="border-t border-gray-200">
          <div className="py-4">
            <p className="text-sm text-gray-500">No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;