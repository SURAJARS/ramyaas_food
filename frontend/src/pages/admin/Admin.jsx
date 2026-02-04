import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import AdminSnacks from './AdminSnacks';
import AdminSettings from './AdminSettings';
import AdminMenu from './AdminMenu';
import AdminReels from './AdminReels';
import AdminOrders from './AdminOrders';

const Admin = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'menu', label: 'Menu Images' },
    { id: 'reels', label: 'Reels' },
    { id: 'orders', label: 'Orders' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-ramyaas-700 mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium border-b-2 transition-smooth ${
                activeTab === tab.id
                  ? 'border-ramyaas-600 text-ramyaas-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg p-6">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'snacks' && <AdminSnacks />}
          {activeTab === 'menu' && <AdminMenu />}
          {activeTab === 'reels' && <AdminReels />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-ramyaas-700">Dashboard Overview</h2>
      <p className="text-gray-600">
        Welcome to the admin dashboard. Use the tabs above to manage your content.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-ramyaas-50 p-6 rounded-lg border border-ramyaas-200">
          <div className="text-3xl font-bold text-ramyaas-600 mb-2">Manage</div>
          <p className="text-gray-600">Snacks & Sweets Catalog</p>
        </div>
        <div className="bg-ramyaas-50 p-6 rounded-lg border border-ramyaas-200">
          <div className="text-3xl font-bold text-ramyaas-600 mb-2">Configure</div>
          <p className="text-gray-600">Coupons & Shipping</p>
        </div>
        <div className="bg-ramyaas-50 p-6 rounded-lg border border-ramyaas-200">
          <div className="text-3xl font-bold text-ramyaas-600 mb-2">Track</div>
          <p className="text-gray-600">Catering & Bulk Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
