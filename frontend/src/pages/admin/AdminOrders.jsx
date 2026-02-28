import React, { useState, useEffect } from 'react';
import { LoadingSpinner, ErrorMessage } from '../../components/Common';
import { cateringApi, bulkOrderApi, enquiryApi, orderApi } from '../../utils/api';

const AdminOrders = () => {
  const [orderType, setOrderType] = useState('payment');
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
      if (orderType === 'payment') {
        response = await orderApi.getAll();
      } else if (orderType === 'catering') {
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
      if (orderType === 'payment') {
        await orderApi.updateStatus(id, { orderStatus: newStatus });
      } else if (orderType === 'catering') {
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
        if (orderType === 'payment') {
          // Payment orders shouldn't be deleted, but show a message
          setError('Payment orders cannot be deleted for audit purposes');
          return;
        } else if (orderType === 'catering') {
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

  const renderPaymentBadge = (paymentStatus) => {
    const colors = {
      'paid': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800',
      'cancelled': 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[paymentStatus] || colors.pending}`}>
        {paymentStatus?.toUpperCase()}
      </span>
    );
  };

  const renderOrderStatus = (orderStatus) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'confirmed': 'bg-green-100 text-green-800',
      'processing': 'bg-purple-100 text-purple-800',
      'shipped': 'bg-indigo-100 text-indigo-800',
      'delivered': 'bg-emerald-100 text-emerald-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[orderStatus] || colors.new}`}>
        {orderStatus?.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-ramyaas-700">Orders & Enquiries</h2>

      <div className="flex gap-2 overflow-x-auto">
        {[
          { id: 'payment', label: '💳 Payment Orders' },
          { id: 'catering', label: '🍽️  Catering Orders' },
          { id: 'bulk', label: '📦 Bulk Orders' },
          { id: 'enquiries', label: '📧 Contact Enquiries' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setOrderType(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-smooth whitespace-nowrap ${
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
                {orderType === 'payment' ? (
                  <>
                    <th className="px-6 py-3 text-left">Order #</th>
                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Payment</th>
                    <th className="px-6 py-3 text-left">Order Status</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Phone</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={orderType === 'payment' ? 8 : 6} className="px-6 py-8 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order._id || order.id} className="border-b hover:bg-gray-50">
                    {orderType === 'payment' ? (
                      <>
                        <td className="px-6 py-3 font-semibold text-ramyaas-600">{order.orderNumber}</td>
                        <td className="px-6 py-3">{order.customer?.name || 'N/A'}</td>
                        <td className="px-6 py-3 text-xs">{order.customer?.email || 'N/A'}</td>
                        <td className="px-6 py-3 font-semibold">₹{order.totalAmount || 0}</td>
                        <td className="px-6 py-3">{renderPaymentBadge(order.paymentStatus)}</td>
                        <td className="px-6 py-3">
                          <select
                            value={order.orderStatus || 'new'}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-xs"
                          >
                            <option value="new">New</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-3 text-xs">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => {
                              // Show order details
                              alert(JSON.stringify({
                                orderNumber: order.orderNumber,
                                customer: order.customer,
                                items: order.items,
                                amount: order.totalAmount,
                                paymentId: order.razorpayPaymentId,
                                notes: order.notes
                              }, null, 2));
                            }}
                            className="text-blue-600 hover:underline text-xs font-medium"
                          >
                            View
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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
