import React, { useState, useEffect } from 'react';
import { LoadingSpinner, ErrorMessage } from '../../components/Common';
import { cateringApi, bulkOrderApi, enquiryApi, orderApi } from '../../utils/api';

const AdminOrders = () => {
  const [orderType, setOrderType] = useState('payment');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const OrderDetailModal = ({ order, isOpen, onClose }) => {
    if (!isOpen || !order) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-ramyaas-600 text-white p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{order.orderNumber}</h2>
              <p className="text-ramyaas-100 text-sm mt-1">
                {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-ramyaas-100 text-2xl font-bold"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">👤 Customer Info</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {order.customer?.name}</p>
                  <p><strong>Email:</strong> {order.customer?.email}</p>
                  <p><strong>Phone:</strong> {order.customer?.phone}</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">📍 Shipping Address</h3>
                <div className="space-y-1 text-sm">
                  <p>{order.customer?.address}</p>
                  <p>{order.customer?.city}, {order.customer?.zipCode}</p>
                </div>
              </div>
            </div>

            {/* Order Status & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-xs text-green-600 font-semibold mb-1">PAYMENT STATUS</p>
                {renderPaymentBadge(order.paymentStatus)}
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-xs text-indigo-600 font-semibold mb-1">ORDER STATUS</p>
                {renderOrderStatus(order.orderStatus)}
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-xs text-orange-600 font-semibold mb-1">PAYMENT ID</p>
                <p className="text-xs font-mono bg-white p-2 rounded border border-orange-200">
                  {order.razorpayPaymentId || 'N/A'}
                </p>
              </div>
            </div>

            {/* Items */}
            {order.items && order.items.length > 0 ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">📦 Ordered Items</h3>
                <table className="w-full text-sm">
                  <thead className="bg-gray-200 border-b">
                    <tr>
                      <th className="px-3 py-2 text-left">Product</th>
                      <th className="px-3 py-2 text-center">Price</th>
                      <th className="px-3 py-2 text-center">Qty</th>
                      <th className="px-3 py-2 text-center">Unit</th>
                      <th className="px-3 py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-100">
                        <td className="px-3 py-2">{item.name || item.nameTA}</td>
                        <td className="px-3 py-2 text-center">₹{item.price || 0}</td>
                        <td className="px-3 py-2 text-center font-semibold">{item.quantity}</td>
                        <td className="px-3 py-2 text-center">{item.quantityUnit || 'pcs'}</td>
                        <td className="px-3 py-2 text-right font-semibold">
                          ₹{((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                No items in this order
              </div>
            )}

            {/* Price Breakdown */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">💰 Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{(order.subtotal || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Cost:</span>
                  <span className="font-semibold">₹{(order.shippingCost || 0).toLocaleString()}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({order.discountCode}):</span>
                    <span className="font-semibold">-₹{(order.discountAmount || 0).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-amber-200 pt-2 mt-2 flex justify-between">
                  <span className="font-bold">Total Amount:</span>
                  <span className="text-xl font-bold text-ramyaas-600">₹{(order.totalAmount || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">📝 Notes</h3>
                <p className="text-sm text-blue-800">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-100 p-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
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
                              setSelectedOrder(order);
                              setShowModal(true);
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

      {/* Order Detail Modal */}
      <OrderDetailModal 
        order={selectedOrder} 
        isOpen={showModal} 
        onClose={() => {
          setShowModal(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
};

export default AdminOrders;
