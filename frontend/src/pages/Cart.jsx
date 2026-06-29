import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const s = {
  page: { minHeight: '100vh', backgroundColor: '#f5f6f8', padding: '28px 24px', fontFamily: "'Inter', sans-serif" },
  container: { maxWidth: 960, margin: '0 auto' },
  header: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 },
  title: { fontSize: 26, fontWeight: 700, color: '#111827', margin: 0 },
  badge: { fontSize: 12, color: '#6b7280', background: '#e5e7eb', padding: '2px 10px', borderRadius: 20 },
  layout: { display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' },
  items: { flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: 12 },
  card: { background: '#fff', borderRadius: 12, padding: 16, display: 'flex', gap: 14, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  img: { width: 80, height: 80, objectFit: 'cover', borderRadius: 8, background: '#f3f4f6', flexShrink: 0 },
  cardBody: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { margin: '0 0 3px', fontWeight: 600, fontSize: 14, color: '#111827' },
  cat: { margin: 0, fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' },
  rmvBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 16, lineHeight: 1 },
  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  qtyCtrl: { display: 'flex', alignItems: 'center', gap: 10, background: '#f3f4f6', borderRadius: 8, padding: '4px 10px' },
  qtyBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#374151', fontWeight: 700, lineHeight: 1 },
  qtyVal: { fontSize: 14, fontWeight: 600, color: '#111827', minWidth: 20, textAlign: 'center' },
  lineTotal: { margin: 0, fontWeight: 700, fontSize: 15, color: '#166534' },
  clearBtn: { alignSelf: 'flex-start', background: 'none', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 12, color: '#6b7280', marginTop: 4 },
  summary: { flex: '0 0 280px', background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'sticky', top: 24 },
  summaryTitle: { fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 16px' },
  summaryRows: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#4b5563' },
  divider: { height: 1, background: '#e5e7eb', margin: '12px 0' },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  totalLabel: { fontSize: 15, fontWeight: 600, color: '#111827' },
  totalVal: { fontSize: 20, fontWeight: 700, color: '#166534' },
  codNote: { fontSize: 12, color: '#6b7280', background: '#f3f4f6', borderRadius: 6, padding: '7px 10px', textAlign: 'center', marginBottom: 14 },
  checkoutBtn: { width: '100%', padding: '13px 0', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  emptyWrap: { minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptyBox: { textAlign: 'center', padding: 48 },
};

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cartItems.length === 0) return (
    <div style={s.page}>
      <div style={{ ...s.emptyWrap }}>
        <div style={s.emptyBox}>
          <span style={{ fontSize: 52, display: 'block', marginBottom: 16 }}>🧺</span>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>Your cart is empty</h2>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 24px' }}>Browse fresh dairy products and add something delicious.</p>
          <button style={{ ...s.checkoutBtn, width: 'auto', padding: '12px 28px' }} onClick={() => navigate('/products')}>Browse Products</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.header}>
          <h1 style={s.title}>Your Cart</h1>
          <span style={s.badge}>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>
        </div>
        <div style={s.layout}>
          <div style={s.items}>
            {cartItems.map(item => (
              <div key={item._id} style={s.card}>
                <img src={item.imageUrl || 'https://placehold.co/80x80?text=🥛'} alt={item.title} style={s.img} onError={e => { e.target.src = 'https://placehold.co/80x80?text=🥛'; }} />
                <div style={s.cardBody}>
                  <div style={s.cardTop}>
                    <div><p style={s.name}>{item.title}</p><p style={s.cat}>{item.category}</p></div>
                    <button style={s.rmvBtn} onClick={() => removeFromCart(item._id)}>✕</button>
                  </div>
                  <div style={s.cardBottom}>
                    <div style={s.qtyCtrl}>
                      <button style={s.qtyBtn} onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                      <span style={s.qtyVal}>{item.quantity}</span>
                      <button style={s.qtyBtn} onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <p style={s.lineTotal}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            <button style={s.clearBtn} onClick={clearCart}>Clear Cart</button>
          </div>

          <div style={s.summary}>
            <h2 style={s.summaryTitle}>Order Summary</h2>
            <div style={s.summaryRows}>
              {cartItems.map(item => (
                <div key={item._id} style={s.summaryRow}>
                  <span style={{ flex: 1, paddingRight: 8 }}>{item.title} × {item.quantity}</span>
                  <span style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={s.divider} />
            <div style={s.totalRow}>
              <span style={s.totalLabel}>Subtotal</span>
              <span style={s.totalVal}>₹{subtotal.toFixed(2)}</span>
            </div>
            <p style={s.codNote}>💵 Cash on Delivery</p>
            <button style={s.checkoutBtn} onClick={() => navigate('/checkout')}>Proceed to Checkout →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
