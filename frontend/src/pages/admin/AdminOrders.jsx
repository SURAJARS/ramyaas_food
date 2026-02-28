import React, { useState, useEffect } from 'react';
import { LoadingSpinner, ErrorMessage } from '../../components/Common';
import { cateringApi, bulkOrderApi, enquiryApi } from '../../utils/api';

const AdminOrders = () => {
  const [orderType, setOrderType] = useState('catering');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [orderType]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (orderType === 'catering') {
        response = await cateringApi.getAll();
      } else if (orderType === 'bulk') {
        response = await bulkOrderApi.getAll();
      } else {
        response = await enquiryApi.getAll();
      }
      console.log(`Orders (${orderType}):`, response.data);
      setOrders(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (err) {
      console.error(`Failed to load ${orderType} orders:`, err);
      const errorMsg = err.response?.data?.message || err.message || `Failed to load ${orderType} orders`;
      setError(errorMsg);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (orderType === 'catering') {
        await cateringApi.update(id, { status: newStatus });
      } else if (orderType === 'bulk') {
        await bulkOrderApi.update(id, { status: newStatus });
      } else {
        await enquiryApi.update(id, { status: newStatus });
      }
      fetchOrders();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this order?')) {
      try {
        if (orderType === 'catering') {
          await cateringApi.delete(id);
        } else if (orderType === 'bulk') {
          await bulkOrderApi.delete(id);
        } else {
          await enquiryApi.delete(id);
        }
        fetchOrders();
      } catch (err) {
        setError('Failed to delete order');
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-ramyaas-700">Orders & Enquiries</h2>

      <div className="flex gap-2">
        {[
          { id: 'catering', label: 'Catering Orders' },
          { id: 'bulk', label: 'Bulk Orders' },
          { id: 'enquiries', label: 'Contact Enquiries' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setOrderType(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
              orderType === tab.id
                ? 'bg-ramyaas-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{order.name}</td>
                    <td className="px-6 py-3 text-xs">{order.email}</td>
                    <td className="px-6 py-3">{order.phone}</td>
                    <td className="px-6 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="quoted">Quoted</option>
                        <option value="rejected">Rejected</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-3 text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
