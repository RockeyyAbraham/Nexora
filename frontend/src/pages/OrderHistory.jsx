import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const STATUS_COLORS = {
  Pending:    { bg: '#fef9c3', color: '#854d0e' },
  Processing: { bg: '#dbeafe', color: '#1d4ed8' },
  Delivered:  { bg: '#dcfce7', color: '#166534' },
  Cancelled:  { bg: '#fee2e2', color: '#991b1b' },
};

const s = {
  page: { minHeight: '100vh', backgroundColor: '#f5f6f8', padding: '28px 24px', fontFamily: "'Inter', sans-serif" },
  container: { maxWidth: 760, margin: '0 auto' },
  header: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 },
  pageTitle: { fontSize: 26, fontWeight: 700, color: '#111827', margin: 0 },
  orderCount: { fontSize: 12, color: '#6b7280', background: '#e5e7eb', padding: '2px 10px', borderRadius: 20 },
  orderList: { display: 'flex', flexDirection: 'column', gap: 16 },
  orderCard: { background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 20px', borderBottom: '1px solid #f3f4f6' },
  orderId: { margin: '0 0 4px', fontSize: 13, color: '#6b7280' },
  orderIdVal: { fontWeight: 700, color: '#111827', fontFamily: 'monospace', letterSpacing: '0.5px' },
  orderDate: { margin: 0, fontSize: 12, color: '#9ca3af' },
  statusBadge: { fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 },
  itemsWrapper: { padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 },
  itemRow: { display: 'flex', alignItems: 'center', gap: 12 },
  itemImg: { width: 40, height: 40, objectFit: 'cover', borderRadius: 6, background: '#f3f4f6', flexShrink: 0 },
  itemDetails: { flex: 1 },
  itemName: { margin: '0 0 2px', fontSize: 14, fontWeight: 500, color: '#111827' },
  itemMeta: { margin: 0, fontSize: 12, color: '#9ca3af' },
  itemTotal: { margin: 0, fontSize: 13, fontWeight: 600, color: '#374151' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: '#fafafa', borderTop: '1px solid #f3f4f6', fontSize: 13, color: '#6b7280' },
  footerTotal: { color: '#111827' },
  centered: { minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 },
  spinner: { width: 36, height: 36, border: '3px solid #e5e7eb', borderTop: '3px solid #16a34a', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  emptyBox: { textAlign: 'center', padding: '64px 0' },
};

export default function OrderHistory() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) return (
    <div style={{ ...s.page }}>
      <div style={s.centered}>
        <div style={s.spinner} />
        <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>Loading your orders…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={s.page}>
      <div style={s.centered}>
        <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#fca5a5' }}>error</span>
        <p style={{ color: '#dc2626', fontSize: 14 }}>{error}</p>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={s.container}>
        <div style={s.header}>
          <h1 style={s.pageTitle}>My Orders</h1>
          <span style={s.orderCount}>{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
        </div>

        {orders.length === 0 ? (
          <div style={s.emptyBox}>
            <span className="material-symbols-outlined" style={{ fontSize: 52, color: '#d1d5db', display: 'block', marginBottom: 12 }}>package_2</span>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: '0 0 6px' }}>No orders yet</p>
            <p style={{ fontSize: 13, color: '#9ca3af' }}>Your completed orders will appear here.</p>
          </div>
        ) : (
          <div style={s.orderList}>
            {orders.map(order => {
              const sc = STATUS_COLORS[order.status] || STATUS_COLORS.Pending;
              return (
                <div key={order._id} style={s.orderCard}>
                  <div style={s.cardHeader}>
                    <div>
                      <p style={s.orderId}>Order <span style={s.orderIdVal}>#{order._id.slice(-8).toUpperCase()}</span></p>
                      <p style={s.orderDate}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <span style={{ ...s.statusBadge, background: sc.bg, color: sc.color }}>{order.status}</span>
                  </div>

                  <div style={s.itemsWrapper}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={s.itemRow}>
                        <img
                          src={item.product?.imageUrl || 'https://placehold.co/40x40?text=🥛'}
                          alt={item.product?.title || 'Product'}
                          style={s.itemImg}
                          onError={e => { e.target.src = 'https://placehold.co/40x40?text=🥛'; }}
                        />
                        <div style={s.itemDetails}>
                          <p style={s.itemName}>{item.product?.title || 'Product'}</p>
                          <p style={s.itemMeta}>₹{item.price} × {item.quantity}</p>
                        </div>
                        <p style={s.itemTotal}>₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div style={s.cardFooter}>
                    <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                    <span style={s.footerTotal}>Total: <strong>₹{order.totalAmount.toFixed(2)}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
