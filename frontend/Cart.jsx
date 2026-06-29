// frontend/src/pages/Cart.jsx

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyWrapper}>
        <div style={styles.emptyBox}>
          <span style={styles.emptyIcon}>🧺</span>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptySubtitle}>
            Browse our fresh dairy products and add something delicious.
          </p>
          <button
            style={styles.browseBtn}
            onClick={() => navigate('/products')}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Your Cart</h1>
          <span style={styles.itemCount}>
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div style={styles.layout}>
          {/* Cart Items */}
          <div style={styles.itemsSection}>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.card}>
                <img
                  src={item.imageUrl || 'https://placehold.co/80x80?text=🥛'}
                  alt={item.title}
                  style={styles.productImg}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/80x80?text=🥛';
                  }}
                />
                <div style={styles.cardBody}>
                  <div style={styles.cardTop}>
                    <div>
                      <p style={styles.productTitle}>{item.title}</p>
                      <p style={styles.productCategory}>{item.category}</p>
                    </div>
                    <button
                      style={styles.removeBtn}
                      onClick={() => removeFromCart(item._id)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                  <div style={styles.cardBottom}>
                    <div style={styles.qtyControls}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span style={styles.qtyValue}>{item.quantity}</span>
                      <button
                        style={styles.qtyBtn}
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p style={styles.lineTotal}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button style={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.summaryRows}>
              {cartItems.map((item) => (
                <div key={item._id} style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>
                    {item.title} × {item.quantity}
                  </span>
                  <span style={styles.summaryValue}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div style={styles.divider} />

            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Subtotal</span>
              <span style={styles.totalValue}>₹{subtotal.toFixed(2)}</span>
            </div>

            <p style={styles.codBadge}>💵 Cash on Delivery</p>

            <button
              style={styles.checkoutBtn}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
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
  container: {
    maxWidth: 960,
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  itemCount: {
    fontSize: 14,
    color: '#6b7280',
    background: '#e5e7eb',
    padding: '2px 10px',
    borderRadius: 20,
  },
  layout: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  itemsSection: {
    flex: '1 1 520px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    background: '#ffffff',
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    gap: 14,
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    border: '1px solid #e5e7eb',
  },
  productImg: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: 8,
    flexShrink: 0,
    background: '#f3f4f6',
  },
  cardBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productTitle: {
    margin: '0 0 4px',
    fontWeight: 600,
    fontSize: 15,
    color: '#111827',
  },
  productCategory: {
    margin: 0,
    fontSize: 12,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9ca3af',
    fontSize: 14,
    padding: '2px 6px',
    borderRadius: 4,
    transition: 'color 0.2s',
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#f3f4f6',
    borderRadius: 8,
    padding: '4px 8px',
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    color: '#374151',
    lineHeight: 1,
    padding: '0 4px',
    fontWeight: 600,
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: 600,
    color: '#111827',
    minWidth: 20,
    textAlign: 'center',
  },
  lineTotal: {
    margin: 0,
    fontWeight: 700,
    fontSize: 15,
    color: '#166534',
  },
  clearBtn: {
    alignSelf: 'flex-start',
    background: 'none',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  // Order Summary
  summary: {
    flex: '0 0 280px',
    background: '#ffffff',
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    border: '1px solid #e5e7eb',
    position: 'sticky',
    top: 24,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 16px',
  },
  summaryRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    color: '#4b5563',
  },
  summaryLabel: { flex: 1, paddingRight: 8 },
  summaryValue: { fontWeight: 500, whiteSpace: 'nowrap' },
  divider: {
    height: 1,
    background: '#e5e7eb',
    margin: '16px 0',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: { fontSize: 15, fontWeight: 600, color: '#111827' },
  totalValue: { fontSize: 18, fontWeight: 700, color: '#166534' },
  codBadge: {
    fontSize: 12,
    color: '#6b7280',
    background: '#f3f4f6',
    borderRadius: 6,
    padding: '6px 10px',
    textAlign: 'center',
    margin: '0 0 16px',
  },
  checkoutBtn: {
    width: '100%',
    padding: '13px 0',
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.2px',
  },
  // Empty state
  emptyWrapper: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9f5',
  },
  emptyBox: {
    textAlign: 'center',
    padding: 48,
  },
  emptyIcon: { fontSize: 56, display: 'block', marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: 700, color: '#111827', margin: '0 0 8px' },
  emptySubtitle: { color: '#6b7280', fontSize: 14, margin: '0 0 24px' },
  browseBtn: {
    padding: '12px 28px',
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default Cart;
