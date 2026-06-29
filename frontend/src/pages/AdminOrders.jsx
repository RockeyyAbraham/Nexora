// frontend/src/pages/AdminOrders.jsx

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ALL_STATUSES = ['Pending', 'Processing', 'Delivered', 'Cancelled'];

const STATUS_COLORS = {
  Pending: { bg: '#fef9c3', color: '#854d0e' },
  Processing: { bg: '#dbeafe', color: '#1d4ed8' },
  Delivered: { bg: '#dcfce7', color: '#166534' },
  Cancelled: { bg: '#fee2e2', color: '#991b1b' },
};

const AdminOrders = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: data.status } : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders =
    filterStatus === 'All'
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'Pending').length,
    processing: orders.filter((o) => o.status === 'Processing').length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
  };

  if (loading) {
    return (
      <div style={styles.centeredMsg}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading all orders…</p>
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
        {/* Page Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Manage Orders</h1>
          <span style={styles.totalBadge}>{orders.length} total</span>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          {[
            { label: 'Total', value: stats.total, color: '#6b7280' },
            { label: 'Pending', value: stats.pending, color: '#854d0e' },
            { label: 'Processing', value: stats.processing, color: '#1d4ed8' },
            { label: 'Delivered', value: stats.delivered, color: '#166534' },
          ].map((stat) => (
            <div key={stat.label} style={styles.statCard}>
              <p style={{ ...styles.statValue, color: stat.color }}>
                {stat.value}
              </p>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div style={styles.filterRow}>
          {['All', ...ALL_STATUSES].map((s) => (
            <button
              key={s}
              style={{
                ...styles.filterBtn,
                ...(filterStatus === s ? styles.filterBtnActive : {}),
              }}
              onClick={() => setFilterStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        {filteredOrders.length === 0 ? (
          <div style={styles.emptyBox}>
            <span style={styles.emptyIcon}>📭</span>
            <p style={styles.emptyText}>
              No orders with status "{filterStatus}".
            </p>
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {[
                    'Order ID',
                    'Customer',
                    'Items',
                    'Total',
                    'Date',
                    'Status',
                  ].map((col) => (
                    <th key={col} style={styles.th}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, idx) => {
                  const statusStyle =
                    STATUS_COLORS[order.status] || STATUS_COLORS.Pending;
                  const isUpdating = updatingId === order._id;

                  return (
                    <tr
                      key={order._id}
                      style={{
                        ...styles.tr,
                        background: idx % 2 === 0 ? '#fff' : '#fafafa',
                      }}
                    >
                      {/* Order ID */}
                      <td style={styles.td}>
                        <span style={styles.monoId}>
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </td>

                      {/* Customer */}
                      <td style={styles.td}>
                        <p style={styles.customerName}>
                          {order.user?.name || '—'}
                        </p>
                        <p style={styles.customerEmail}>
                          {order.user?.email || ''}
                        </p>
                      </td>

                      {/* Items */}
                      <td style={styles.td}>
                        <div style={styles.itemsList}>
                          {order.items.map((item, i) => (
                            <p key={i} style={styles.itemLine}>
                              {item.product?.title || 'Product'} ×{' '}
                              {item.quantity}
                            </p>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td style={styles.td}>
                        <span style={styles.totalAmt}>
                          ₹{order.totalAmount.toFixed(2)}
                        </span>
                      </td>

                      {/* Date */}
                      <td style={styles.td}>
                        <span style={styles.dateText}>
                          {new Date(order.createdAt).toLocaleDateString(
                            'en-IN',
                            { day: '2-digit', month: 'short', year: 'numeric' }
                          )}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td style={styles.td}>
                        <div style={styles.statusCell}>
                          <span
                            style={{
                              ...styles.statusDot,
                              background: statusStyle.color,
                            }}
                          />
                          <select
                            style={{
                              ...styles.statusSelect,
                              opacity: isUpdating ? 0.6 : 1,
                            }}
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            disabled={isUpdating}
                          >
                            {ALL_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {isUpdating && (
                            <span style={styles.updatingLabel}>Saving…</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
  container: { maxWidth: 1100, margin: '0 auto' },
  pageHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  totalBadge: {
    fontSize: 13,
    color: '#6b7280',
    background: '#e5e7eb',
    padding: '2px 10px',
    borderRadius: 20,
  },
  statsRow: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  statCard: {
    flex: '1 1 120px',
    background: '#fff',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
    padding: '14px 18px',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 700,
    margin: '0 0 2px',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  filterRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterBtn: {
    padding: '6px 14px',
    border: '1px solid #e5e7eb',
    borderRadius: 20,
    background: '#fff',
    fontSize: 13,
    color: '#6b7280',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.15s',
  },
  filterBtnActive: {
    background: '#16a34a',
    color: '#fff',
    border: '1px solid #16a34a',
  },
  tableWrapper: {
    background: '#fff',
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 13,
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: 11,
    fontWeight: 600,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    borderBottom: '1px solid #f3f4f6',
    background: '#fafafa',
  },
  tr: {
    borderBottom: '1px solid #f3f4f6',
    transition: 'background 0.1s',
  },
  td: {
    padding: '14px 16px',
    verticalAlign: 'top',
    color: '#374151',
  },
  monoId: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: 700,
    color: '#374151',
    letterSpacing: '0.5px',
  },
  customerName: {
    margin: '0 0 2px',
    fontWeight: 500,
    color: '#111827',
    fontSize: 13,
  },
  customerEmail: {
    margin: 0,
    fontSize: 11,
    color: '#9ca3af',
  },
  itemsList: { display: 'flex', flexDirection: 'column', gap: 2 },
  itemLine: {
    margin: 0,
    fontSize: 12,
    color: '#4b5563',
  },
  totalAmt: {
    fontWeight: 700,
    color: '#166534',
    fontSize: 14,
  },
  dateText: {
    fontSize: 12,
    color: '#6b7280',
    whiteSpace: 'nowrap',
  },
  statusCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    flexShrink: 0,
  },
  statusSelect: {
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '5px 8px',
    fontSize: 12,
    background: '#fafafa',
    color: '#374151',
    cursor: 'pointer',
    outline: 'none',
  },
  updatingLabel: {
    fontSize: 11,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
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
    padding: '56px 0',
  },
  emptyIcon: { fontSize: 48, display: 'block', marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#9ca3af', margin: 0 },
};

export default AdminOrders;
