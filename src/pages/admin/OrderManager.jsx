import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, Clock, ChefHat, CheckSquare } from 'lucide-react';
import { useAlert } from '../../components/AlertContext';
import api from '../../api';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/orders');
      setOrders(res.data);
    } catch (error) {
      showAlert('Failed to load orders', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}`, { status: newStatus });
      showAlert(`Order marked as ${newStatus}`, 'success');
      fetchOrders();
    } catch (error) {
      showAlert('Failed to update order status', 'error');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><Clock size={14}/> Pending</span>;
      case 'preparing': return <span className="bg-blue-500/20 text-blue-500 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><ChefHat size={14}/> Preparing</span>;
      case 'ready': return <span className="bg-green-500/20 text-green-500 border border-green-500/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><CheckSquare size={14}/> Ready</span>;
      case 'completed': return <span className="bg-gray text-light/50 border border-gray px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><CheckCircle size={14}/> Completed</span>;
      default: return <span className="bg-gray text-light px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-light/60">Monitor and update customer orders.</p>
        <button onClick={fetchOrders} className="bg-dark border border-gray hover:bg-gray text-light font-bold py-2 px-4 rounded transition">
          Refresh Orders
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={48} /></div>
      ) : orders.length === 0 ? (
        <div className="bg-darker border border-gray rounded-lg p-12 text-center text-light/50">
          No orders received yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-darker border border-gray rounded-xl overflow-hidden shadow-lg">
              <div className="bg-dark/50 p-5 border-b border-gray flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-black text-white">Order #{order.id}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-light/50">Placed at: {new Date(order.created_at).toLocaleString()}</p>
                </div>
                
                <div className="flex items-center gap-2">
                   <select 
                     value={order.status} 
                     onChange={(e) => handleStatusChange(order.id, e.target.value)}
                     className="bg-dark border border-gray rounded py-2 px-3 text-sm text-light focus:border-primary focus:outline-none"
                   >
                     <option value="pending">Pending</option>
                     <option value="preparing">Preparing</option>
                     <option value="ready">Ready for Pickup/Delivery</option>
                     <option value="completed">Completed</option>
                     <option value="cancelled">Cancelled</option>
                   </select>
                </div>
              </div>
              
              <div className="p-5 flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-light/50 uppercase tracking-wider mb-2">Customer Details</h4>
                    <p className="font-bold text-light">{order.customer_name}</p>
                    <p className="text-sm text-light/80">{order.customer_phone}</p>
                    <p className="text-sm text-light/80">{order.customer_address}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-light/50 uppercase tracking-wider mb-2">Payment Details</h4>
                    <p className="text-sm text-light/80">Method: <span className="font-bold uppercase text-primary">{order.payment_method}</span></p>
                    <p className="text-lg font-black text-white mt-1">Total: ₹{order.total_amount}</p>
                  </div>
                </div>
                
                <div className="flex-[2] bg-dark rounded-lg p-4 border border-gray/50">
                  <h4 className="text-xs font-bold text-light/50 uppercase tracking-wider mb-3 border-b border-gray/50 pb-2">Order Items ({order.items?.length || 0})</h4>
                  <ul className="space-y-3">
                    {order.items?.map(item => (
                      <li key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="bg-primary/20 text-primary font-bold px-2 py-0.5 rounded text-xs">{item.quantity}x</span>
                          <span className="font-medium text-light">{item.product?.name || 'Unknown Product'}</span>
                        </div>
                        <span className="text-light/70 font-mono">₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManager;
