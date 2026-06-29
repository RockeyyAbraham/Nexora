// frontend/src/pages/Checkout.jsx

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: '',
        pincode: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (cartItems.length === 0) {
            setError('Your cart is empty. Add items before checking out.');
            return;
        }

        const { fullName, phone, address, city, pincode } = form;
        if (!fullName || !phone || !address || !city || !pincode) {
            setError('Please fill in all shipping fields.');
            return;
        }

        const orderPayload = {
            items: cartItems.map((item) => ({
                product: item._id,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount,
            shippingAddress: `${address}, ${city} - ${pincode}`,
        };

        try {
            setLoading(true);
            await axios.post('/api/orders', orderPayload, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            clearCart();
            navigate('/orders');
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to place order. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div style={styles.emptyWrapper}>
                <div style={styles.emptyBox}>
                    <span style={styles.emptyIcon}>🛒</span>
                    <h2 style={styles.emptyTitle}>Nothing to check out</h2>
                    <p style={styles.emptySubtitle}>
                        Your cart is empty. Add some products first.
                    </p>
                    <button
                        style={styles.backBtn}
                        onClick={() => navigate('/products')}
                    >
                        Go to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.pageTitle}>Checkout</h1>

                <div style={styles.layout}>
                    {/* Shipping Form */}
                    <form style={styles.form} onSubmit={handleSubmit}>
                        <h2 style={styles.sectionTitle}>Shipping Details</h2>

                        {error && <div style={styles.errorBox}>{error}</div>}

                        <label style={styles.label}>Full Name</label>
                        <input
                            style={styles.input}
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Ann Mary"
                        />

                        <label style={styles.label}>Phone Number</label>
                        <input
                            style={styles.input}
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="e.g. 9876543210"
                        />

                        <label style={styles.label}>Street Address</label>
                        <textarea
                            style={{ ...styles.input, height: 72, resize: 'vertical' }}
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="House no., Street, Locality"
                        />

                        <div style={styles.row}>
                            <div style={{ flex: 1 }}>
                                <label style={styles.label}>City</label>
                                <input
                                    style={styles.input}
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                />
                            </div>
                            <div style={{ width: 140 }}>
                                <label style={styles.label}>PIN Code</label>
                                <input
                                    style={styles.input}
                                    name="pincode"
                                    value={form.pincode}
                                    onChange={handleChange}
                                    placeholder="673001"
                                    maxLength={6}
                                />
                            </div>
                        </div>

                        <div style={styles.codNote}>
                            <span style={styles.codIcon}>💵</span>
                            <span>
                                <strong>Cash on Delivery</strong> — Pay when your order arrives.
                            </span>
                        </div>

                        <button
                            type="submit"
                            style={{
                                ...styles.submitBtn,
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer',
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Placing Order…' : 'Place Order'}
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div style={styles.summary}>
                        <h2 style={styles.sectionTitle}>Order Summary</h2>

                        <div style={styles.itemList}>
                            {cartItems.map((item) => (
                                <div key={item._id} style={styles.summaryItem}>
                                    <img
                                        src={item.imageUrl || 'https://placehold.co/48x48?text=🥛'}
                                        alt={item.title}
                                        style={styles.thumbImg}
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/48x48?text=🥛';
                                        }}
                                    />
                                    <div style={styles.summaryItemDetails}>
                                        <p style={styles.summaryItemName}>{item.title}</p>
                                        <p style={styles.summaryItemMeta}>
                                            ₹{item.price} × {item.quantity}
                                        </p>
                                    </div>
                                    <p style={styles.summaryItemTotal}>
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div style={styles.divider} />

                        <div style={styles.totalRow}>
                            <span style={styles.totalLabel}>Total</span>
                            <span style={styles.totalValue}>₹{totalAmount.toFixed(2)}</span>
                        </div>
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
    container: { maxWidth: 940, margin: '0 auto' },
    pageTitle: {
        fontSize: 28,
        fontWeight: 700,
        color: '#1a1a1a',
        margin: '0 0 28px',
    },
    layout: {
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    form: {
        flex: '1 1 480px',
        background: '#fff',
        borderRadius: 12,
        padding: 28,
        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 700,
        color: '#111827',
        margin: '0 0 16px',
    },
    errorBox: {
        background: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#dc2626',
        padding: '10px 14px',
        borderRadius: 8,
        fontSize: 13,
        marginBottom: 8,
    },
    label: {
        fontSize: 13,
        fontWeight: 500,
        color: '#374151',
        marginTop: 10,
        marginBottom: 4,
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #d1d5db',
        borderRadius: 8,
        fontSize: 14,
        color: '#111827',
        outline: 'none',
        boxSizing: 'border-box',
        background: '#fafafa',
        transition: 'border-color 0.2s',
    },
    row: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-end',
        marginTop: 4,
    },
    codNote: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 13,
        color: '#166534',
        marginTop: 12,
    },
    codIcon: { fontSize: 18 },
    submitBtn: {
        marginTop: 20,
        padding: '14px 0',
        background: '#16a34a',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: '0.2px',
    },
    // Summary panel
    summary: {
        flex: '0 0 280px',
        background: '#fff',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
        border: '1px solid #e5e7eb',
        position: 'sticky',
        top: 24,
    },
    itemList: { display: 'flex', flexDirection: 'column', gap: 12 },
    summaryItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    thumbImg: {
        width: 44,
        height: 44,
        objectFit: 'cover',
        borderRadius: 6,
        background: '#f3f4f6',
        flexShrink: 0,
    },
    summaryItemDetails: { flex: 1 },
    summaryItemName: {
        margin: 0,
        fontSize: 13,
        fontWeight: 500,
        color: '#111827',
    },
    summaryItemMeta: { margin: 0, fontSize: 12, color: '#9ca3af' },
    summaryItemTotal: {
        margin: 0,
        fontSize: 13,
        fontWeight: 600,
        color: '#166534',
        whiteSpace: 'nowrap',
    },
    divider: { height: 1, background: '#e5e7eb', margin: '16px 0' },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: { fontSize: 15, fontWeight: 600, color: '#111827' },
    totalValue: { fontSize: 20, fontWeight: 700, color: '#166534' },
    // Empty state
    emptyWrapper: {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f9f5',
    },
    emptyBox: { textAlign: 'center', padding: 48 },
    emptyIcon: { fontSize: 56, display: 'block', marginBottom: 16 },
    emptyTitle: { fontSize: 22, fontWeight: 700, color: '#111827', margin: '0 0 8px' },
    emptySubtitle: { color: '#6b7280', fontSize: 14, margin: '0 0 24px' },
    backBtn: {
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

export default Checkout;
