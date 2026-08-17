import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../types';

interface AdminOrdersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

interface OrderReferenceImageProps {
  orderId: number;
  accessKey: string;
}

const OrderReferenceImage: React.FC<OrderReferenceImageProps> = ({ orderId, accessKey }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      try {
        const res = await fetch(`/api/admin/orders/${orderId}/image`, {
          headers: { 'Authorization': `Bearer ${accessKey}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setImage(data.image);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchImage();
    return () => { isMounted = false; };
  }, [orderId, accessKey]);

  if (loading) return <div className="animate-pulse w-full h-32 bg-gray-200 dark:bg-gray-800 rounded-xl" />;
  if (!image) return null;

  return (
    <div className="mt-4">
      <h4 className="text-xs font-bold text-[#2A2421] dark:text-[#D4AF37] mb-2 uppercase tracking-wider">Reference Image</h4>
      <img src={image} alt={`Reference for Order #${orderId}`} className="max-w-full h-auto max-h-64 rounded-xl border border-[#D4AF37]/30 shadow-md object-contain" />
    </div>
  );
};

export const AdminOrdersPanel: React.FC<AdminOrdersPanelProps> = ({
  isOpen,
  onClose,
  products
}) => {
  const [accessKey, setAccessKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const STATUSES = ['NEW', 'CONTACTED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed so key is not kept around
      setAccessKey('');
      setIsAuthenticated(false);
      setAuthError('');
      setOrders([]);
      setExpandedOrderId(null);
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${accessKey}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        setIsAuthenticated(true);
      } else {
        setAuthError('Invalid Admin Access Key');
      }
    } catch (err) {
      setAuthError('Network error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${accessKey}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessKey}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: updatedOrder.status } : o));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const getProductName = (productId: string) => {
    const p = products.find(p => p.id === productId);
    return p ? p.name : productId;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] bg-[#FFF8F0] dark:bg-[#1C1815] rounded-2xl shadow-2xl border border-[#D4AF37]/30 flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <h2 className="font-serif-display text-2xl font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                Admin Order Management
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full glass-panel text-[#2A2421] dark:text-[#F5EFE6] hover:bg-white dark:hover:bg-[#2A2421]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!isAuthenticated ? (
                <div className="max-w-md mx-auto mt-10">
                  <div className="text-center space-y-4 mb-8">
                    <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto text-[#D4AF37]">
                      <Lock className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif-display text-xl text-[#2A2421] dark:text-[#F5EFE6]">
                      Secure Dashboard
                    </h3>
                    <p className="text-sm text-[#6B5E55] dark:text-[#C4B8AD]">
                      Enter the Admin Access Key to manage customer orders.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <input
                      type="password"
                      placeholder="Admin Access Key"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#12100E] border border-[#D4AF37]/30 text-sm focus:outline-none focus:border-[#D4AF37]"
                    />
                    {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-[#D4AF37] text-white font-bold tracking-wide hover:bg-[#B8860B] transition-colors"
                    >
                      {isLoading ? 'Verifying...' : 'Access Dashboard'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <button 
                      onClick={handleRefresh}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2A2421] rounded-lg text-sm border border-[#D4AF37]/30 hover:bg-gray-50 dark:hover:bg-[#3d332f] text-[#2A2421] dark:text-[#F5EFE6]"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                      Refresh List
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <p className="text-center text-[#6B5E55] py-10">No orders found.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="bg-white dark:bg-[#12100E] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-sm">
                          <div 
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1a1715]"
                            onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                          >
                            <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                              <div>
                                <p className="text-xs text-[#6B5E55]">Order #{order.id}</p>
                                <p className="font-bold text-[#2A2421] dark:text-[#F5EFE6] truncate">{order.customerName}</p>
                              </div>
                              <div>
                                <p className="text-xs text-[#6B5E55]">Date</p>
                                <p className="text-sm text-[#2A2421] dark:text-[#F5EFE6]">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-[#6B5E55]">Amount</p>
                                <p className="text-sm font-bold text-emerald-600">₹{order.totalAmount}</p>
                              </div>
                              <div onClick={e => e.stopPropagation()}>
                                <select
                                  value={order.status}
                                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                  className="text-xs px-2 py-1.5 rounded bg-gray-50 dark:bg-[#2A2421] border border-gray-200 dark:border-gray-700 outline-none text-[#2A2421] dark:text-[#F5EFE6] font-semibold"
                                >
                                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </div>
                            </div>
                            <div className="pl-4 border-l border-[#D4AF37]/10 ml-4">
                              {expandedOrderId === order.id ? <ChevronUp className="w-5 h-5 text-[#D4AF37]" /> : <ChevronDown className="w-5 h-5 text-[#D4AF37]" />}
                            </div>
                          </div>
                          
                          {expandedOrderId === order.id && (
                            <div className="p-4 border-t border-[#D4AF37]/10 bg-gray-50 dark:bg-[#161311]">
                              <div className="mb-4 grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-[#6B5E55] mb-1">Contact Email</p>
                                  <p className="text-sm text-[#2A2421] dark:text-[#F5EFE6]">{order.email}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-[#6B5E55] mb-1">Session ID</p>
                                  <p className="text-xs font-mono text-gray-500 break-all">{order.sessionId}</p>
                                </div>
                              </div>
                              
                              <h4 className="text-xs font-bold text-[#2A2421] dark:text-[#D4AF37] mb-3 uppercase tracking-wider">Order Items ({order.items?.length || 0})</h4>
                              <div className="space-y-2">
                                {order.items && order.items.map((item: any) => {
                                  let customizationText = item.customizations;
                                  if (item.customizations) {
                                    try {
                                      const parsed = JSON.parse(item.customizations);
                                      customizationText = parsed.names || parsed.text || item.customizations;
                                    } catch (e) {
                                      // ignore and use raw string
                                    }
                                  }
                                  return (
                                    <div key={item.id} className="p-3 bg-white dark:bg-[#1C1815] rounded-xl border border-gray-100 dark:border-[#D4AF37]/10 flex justify-between items-start">
                                      <div>
                                        <p className="text-sm font-bold text-[#2A2421] dark:text-[#F5EFE6]">{getProductName(item.productId)}</p>
                                        <p className="text-xs text-[#6B5E55] mt-1">Qty: {item.quantity}</p>
                                        {customizationText && customizationText !== 'null' && (
                                          <p className="text-xs mt-1.5 text-[#D4AF37] italic bg-[#D4AF37]/5 px-2 py-1 rounded inline-block">Note: {customizationText}</p>
                                        )}
                                      </div>
                                      <div className="text-right whitespace-nowrap pl-4">
                                        <p className="text-sm font-bold text-[#2A2421] dark:text-[#F5EFE6]">₹{item.priceAtTime * item.quantity}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              {order.hasReferenceImage && (
                                <OrderReferenceImage orderId={order.id} accessKey={accessKey} />
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
