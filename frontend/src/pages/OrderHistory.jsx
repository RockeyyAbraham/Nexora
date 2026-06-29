// frontend/src/pages/OrderHistory.jsx

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const STATUS_COLORS = {
  Pending: { bg: '#fef9c3', color: '#854d0e' },
  Processing: { bg: '#dbeafe', color: '#1d4ed8' },
  Delivered: { bg: '#dcfce7', color: '#166534' },
  Cancelled: { bg: '#fee2e2', color: '#991b1b' },
};

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(data);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to load your orders.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.token]);

  if (loading) {
    return (
      <div style={styles.centeredMsg}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading your orders…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centeredMsg}>
        <p style={styles.errorText}>⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>My Orders</h1>
          <span style={styles.orderCount}>
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </span>
        </div>

        {orders.length === 0 ? (
          <div style={styles.emptyBox}>
            <span style={styles.emptyIcon}>📦</span>
            <p style={styles.emptyTitle}>No orders yet</p>
            <p style={styles.emptySubtitle}>
              Your completed orders will appear here.
            </p>
          </div>
        ) : (
          <div style={styles.orderList}>
            {orders.map((order) => {
              const statusStyle =
                STATUS_COLORS[order.status] || STATUS_COLORS.Pending;
              return (
                <div key={order._id} style={styles.orderCard}>
                  {/* Card Header */}
                  <div style={styles.cardHeader}>
                    <div>
                      <p style={styles.orderId}>
                        Order{' '}
                        <span style={styles.orderIdVal}>
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </p>
                      <p style={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span
                      style={{
                        ...styles.statusBadge,
                        background: statusStyle.bg,
                        color: statusStyle.color,
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div style={styles.itemsWrapper}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={styles.itemRow}>
                        <img
                          src={
                            item.product?.imageUrl ||
                            'https://placehold.co/40x40?text=🥛'
                          }
                          alt={item.product?.title || 'Product'}
                          style={styles.itemImg}
                          onError={(e) => {
                            e.target.src =
                              'https://placehold.co/40x40?text=🥛';
                          }}
                        />
                        <div style={styles.itemDetails}>
                          <p style={styles.itemName}>
                            {item.product?.title || 'Product'}
                          </p>
                          <p style={styles.itemMeta}>
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <p style={styles.itemTotal}>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div style={styles.cardFooter}>
                    <span style={styles.footerLabel}>
                      {order.items.length} item
                      {order.items.length !== 1 ? 's' : ''}
                    </span>
                    <span style={styles.footerTotal}>
                      Total:{' '}
                      <strong>₹{order.totalAmount.toFixed(2)}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f8f9f5',
    padding: '32px 16px',
    fontFamily: "'Inter', sans-serif",
  },
  container: { maxWidth: 760, margin: '0 auto' },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 28,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  orderCount: {
    fontSize: 14,
    color: '#6b7280',
    background: '#e5e7eb',
    padding: '2px 10px',
    borderRadius: 20,
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  orderCard: {
    background: '#fff',
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '16px 20px',
    borderBottom: '1px solid #f3f4f6',
  },
  orderId: {
    margin: '0 0 4px',
    fontSize: 13,
    color: '#6b7280',
  },
  orderIdVal: {
    fontWeight: 700,
    color: '#111827',
    fontFamily: 'monospace',
    letterSpacing: '0.5px',
  },
  orderDate: {
    margin: 0,
    fontSize: 12,
    color: '#9ca3af',
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 12px',
    borderRadius: 20,
    letterSpacing: '0.3px',
  },
  itemsWrapper: {
    padding: '12px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  itemImg: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 6,
    background: '#f3f4f6',
    flexShrink: 0,
  },
  itemDetails: { flex: 1 },
  itemName: {
    margin: '0 0 2px',
    fontSize: 14,
    fontWeight: 500,
    color: '#111827',
  },
  itemMeta: { margin: 0, fontSize: 12, color: '#9ca3af' },
  itemTotal: {
    margin: 0,
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    background: '#fafafa',
    borderTop: '1px solid #f3f4f6',
    fontSize: 13,
    color: '#6b7280',
  },
  footerLabel: {},
  footerTotal: { color: '#111827' },
  // States
  centeredMsg: {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    fontFamily: "'Inter', sans-serif",
  },
  spinner: {
    width: 36,
    height: 36,
    border: '3px solid #e5e7eb',
    borderTop: '3px solid #16a34a',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: { color: '#6b7280', fontSize: 14, margin: 0 },
  errorText: { color: '#dc2626', fontSize: 14 },
  emptyBox: {
    textAlign: 'center',
    padding: '64px 0',
  },
  emptyIcon: { fontSize: 52, display: 'block', marginBottom: 12 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 6px',
  },
  emptySubtitle: { fontSize: 13, color: '#9ca3af', margin: 0 },
};

// Inject keyframe for spinner via a style tag trick
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleTag);

export default OrderHistory;
