import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const statusBadgeStyle = (status) => {
    switch (status) {
        case 'Delivered':
            return {
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: '#6ffbbe',
                color: '#005236',
                display: 'inline-block',
            };
        case 'Processing':
            return {
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: '#d3e4fe',
                color: '#0056c9',
                display: 'inline-block',
            };
        case 'Pending':
            return {
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: '#e5eeff',
                color: '#5e656c',
                display: 'inline-block',
            };
        case 'Cancelled':
            return {
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: '#ffdad6',
                color: '#93000a',
                display: 'inline-block',
            };
        default:
            return {
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: '#e5eeff',
                color: '#424654',
                display: 'inline-block',
            };
    }
};

const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
};

export default function AdminDashboard() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);

    // Styling state trackers
    const [hoveredLink, setHoveredLink] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [viewAllHovered, setViewAllHovered] = useState(false);

    const { token } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/dashboard/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTotalUsers(data.totalUsers);
                setTotalProducts(data.totalProducts);
                setTotalOrders(data.totalOrders);
                setTotalRevenue(data.totalRevenue);
                setRecentOrders(data.recentOrders);
            } catch (error) {
                console.log(error);
            }
        };
        if (token) {
            fetchStats();
        }
    }, [token]);

    // Adjust root layout to take full width on admin dashboard
    useEffect(() => {
        const rootEl = document.getElementById('root');
        if (rootEl) {
            rootEl.style.width = '100%';
            rootEl.style.maxWidth = 'none';
            rootEl.style.borderInline = 'none';
        }
        return () => {
            if (rootEl) {
                rootEl.style.width = '';
                rootEl.style.maxWidth = '';
                rootEl.style.borderInline = '';
            }
        };
    }, []);

    // Inline styling definitions
    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#f5f7fa',
        color: '#0b1c30',
        boxSizing: 'border-box'
    };

    const sidebarStyle = {
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        borderRight: '1px solid #c2c6d7',
        backgroundColor: '#eff4ff',
        width: '256px',
        zIndex: 50,
        boxSizing: 'border-box'
    };

    const brandWrapperStyle = {
        marginBottom: '40px',
        paddingLeft: '8px',
        paddingRight: '8px'
    };

    const brandTitleStyle = {
        fontSize: '24px',
        lineHeight: '1.3',
        fontWeight: '800',
        color: '#16a34a',
        letterSpacing: '-0.01em',
        margin: 0
    };

    const brandSubtitleStyle = {
        fontSize: '14px',
        lineHeight: '1.4',
        fontWeight: '500',
        color: '#15803d',
        margin: 0
    };

    const sidebarNavStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    };

    const activeNavLinkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#16a34a',
        color: '#fffdff',
        borderRadius: '0.5rem',
        padding: '8px 16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        boxSizing: 'border-box'
    };

    const navLinkStyle = (key) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: hoveredLink === key ? '#dce9ff' : 'transparent',
        color: '#424654',
        borderRadius: '0.5rem',
        padding: '8px 16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        border: 'none',
        width: '100%',
        textAlign: 'left',
        boxSizing: 'border-box'
    });

    const sidebarFooterStyle = {
        marginTop: 'auto',
        paddingTop: '16px',
        borderTop: '1px solid #c2c6d7'
    };

    const logoutBtnStyle = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: hoveredLink === 'logout' ? '#dce9ff' : 'transparent',
        color: '#424654',
        borderRadius: '0.5rem',
        padding: '8px 16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        border: 'none',
        textAlign: 'left',
        boxSizing: 'border-box'
    };

    const mainContentStyle = {
        flex: 1,
        marginLeft: '256px',
        overflowY: 'auto',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        boxSizing: 'border-box'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px',
        paddingBottom: '16px',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: '#f5f7fa',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box'
    };

    const canvasStyle = {
        padding: '24px',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxSizing: 'border-box'
    };

    const statsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        marginBottom: '24px'
    };

    const cardStyle = (index) => ({
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '0.75rem',
        boxShadow: hoveredCard === index ? '0 12px 24px -10px rgba(0, 86, 201, 0.15)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #c2c6d7',
        transform: hoveredCard === index ? 'translateY(-4px)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxSizing: 'border-box'
    });

    const cardHeaderRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
    };

    const usersIconContainerStyle = {
        padding: '8px',
        backgroundColor: 'rgba(27, 110, 243, 0.1)',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const productsIconContainerStyle = {
        padding: '8px',
        backgroundColor: 'rgba(0, 134, 92, 0.1)',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const ordersIconContainerStyle = {
        padding: '8px',
        backgroundColor: 'rgba(220, 227, 235, 0.3)',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const revenueIconContainerStyle = {
        padding: '8px',
        backgroundColor: 'rgba(0, 87, 204, 0.1)',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const cardLabelStyle = {
        fontSize: '14px',
        lineHeight: '1.4',
        fontWeight: '500',
        color: '#424654',
        margin: 0
    };

    const cardValueStyle = {
        fontSize: '24px',
        lineHeight: '1.3',
        fontWeight: '600',
        marginTop: '4px',
        marginBottom: 0
    };

    const sectionStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #c2c6d7',
        overflow: 'hidden',
        boxSizing: 'border-box'
    };

    const sectionHeaderStyle = {
        padding: '24px',
        borderBottom: '1px solid #c2c6d7',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box'
    };

    const sectionTitleStyle = {
        fontSize: '24px',
        lineHeight: '1.3',
        fontWeight: '600',
        margin: 0
    };

    const viewAllBtnStyle = {
        color: '#0056c9',
        fontSize: '14px',
        lineHeight: '1.4',
        fontWeight: '500',
        textDecoration: viewAllHovered ? 'underline' : 'none',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    };

    const tableWrapperStyle = {
        overflowX: 'auto',
        width: '100%'
    };

    const tableStyle = {
        width: '100%',
        textAlign: 'left',
        borderCollapse: 'collapse'
    };

    const tableHeaderRowStyle = {
        backgroundColor: '#dcfce7',
        color: '#424654'
    };

    const thStyle = {
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px',
        paddingBottom: '16px',
        fontSize: '14px',
        lineHeight: '1.4',
        fontWeight: '500',
        boxSizing: 'border-box'
    };

    const rowStyle = (id) => ({
        backgroundColor: hoveredRow === id ? '#e5eeff' : 'transparent',
        transition: 'background-color 0.2s ease'
    });

    const tdStyle = {
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px',
        paddingBottom: '16px',
        fontSize: '16px',
        lineHeight: '1.5',
        fontWeight: '400',
        borderBottom: '1px solid #c2c6d7',
        boxSizing: 'border-box'
    };

    return (
        <div style={containerStyle}>
            {/* Sidebar */}
            <aside style={sidebarStyle}>
                {/* Brand Identity */}
                <div style={brandWrapperStyle}>
                    <h1 style={brandTitleStyle}>DairyDirect</h1>
                    <p style={brandSubtitleStyle}>Admin Console</p>
                </div>

                {/* Navigation Links */}
                <nav style={sidebarNavStyle}>
                    <a
                        style={activeNavLinkStyle}
                        href="/admin/dashboard"
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                            dashboard
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
                    </a>
                    <a
                        style={navLinkStyle('products')}
                        href="/admin/products"
                        onMouseEnter={() => setHoveredLink('products')}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <span className="material-symbols-outlined">inventory_2</span>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Products</span>
                    </a>
                    <a
                        style={navLinkStyle('orders')}
                        href="/admin/orders"
                        onMouseEnter={() => setHoveredLink('orders')}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Orders</span>
                    </a>
                    <a
                        style={navLinkStyle('users')}
                        href="/admin/users"
                        onMouseEnter={() => setHoveredLink('users')}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <span className="material-symbols-outlined">group</span>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Users</span>
                    </a>
                </nav>

                {/* Footer Actions */}
                <div style={sidebarFooterStyle}>
                    <button
                        onClick={handleLogout}
                        style={logoutBtnStyle}
                        onMouseEnter={() => setHoveredLink('logout')}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={mainContentStyle}>
                {/* Top App Bar */}
                <header style={headerStyle} />

                {/* Content Canvas */}
                <div style={canvasStyle}>

                    {/* Statistics Bento Grid */}
                    <div style={statsGridStyle}>

                        {/* Total Users */}
                        <div
                            style={cardStyle(0)}
                            onMouseEnter={() => setHoveredCard(0)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div style={cardHeaderRowStyle}>
                                <div style={usersIconContainerStyle}>
                                    <span className="material-symbols-outlined" style={{ color: '#0056c9' }}>group</span>
                                </div>
                            </div>
                            <p style={cardLabelStyle}>Total Users</p>
                            <h3 style={cardValueStyle}>{totalUsers}</h3>
                        </div>

                        {/* Total Products */}
                        <div
                            style={cardStyle(1)}
                            onMouseEnter={() => setHoveredCard(1)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div style={cardHeaderRowStyle}>
                                <div style={productsIconContainerStyle}>
                                    <span className="material-symbols-outlined" style={{ color: '#006a48' }}>inventory_2</span>
                                </div>
                            </div>
                            <p style={cardLabelStyle}>Total Products</p>
                            <h3 style={cardValueStyle}>{totalProducts}</h3>
                        </div>

                        {/* Total Orders */}
                        <div
                            style={cardStyle(2)}
                            onMouseEnter={() => setHoveredCard(2)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div style={cardHeaderRowStyle}>
                                <div style={ordersIconContainerStyle}>
                                    <span className="material-symbols-outlined" style={{ color: '#5e656c' }}>shopping_cart</span>
                                </div>
                            </div>
                            <p style={cardLabelStyle}>Total Orders</p>
                            <h3 style={cardValueStyle}>{totalOrders}</h3>
                        </div>

                        {/* Total Revenue */}
                        <div
                            style={cardStyle(3)}
                            onMouseEnter={() => setHoveredCard(3)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div style={cardHeaderRowStyle}>
                                <div style={revenueIconContainerStyle}>
                                    <span className="material-symbols-outlined" style={{ color: '#0056c9' }}>payments</span>
                                </div>
                            </div>
                            <p style={cardLabelStyle}>Total Revenue</p>
                            <h3 style={cardValueStyle}>₹{totalRevenue.toLocaleString()}</h3>
                        </div>
                    </div>

                    {/* Recent Orders Section */}
                    <section style={sectionStyle}>
                        <div style={sectionHeaderStyle}>
                            <h4 style={sectionTitleStyle}>Recent Orders</h4>

                        </div>
                        <div style={tableWrapperStyle}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr style={tableHeaderRowStyle}>
                                        <th style={thStyle}>Order ID</th>
                                        <th style={thStyle}>Customer Name</th>
                                        <th style={{ ...thStyle, textAlign: 'right' }}>Total Amount</th>
                                        <th style={{ ...thStyle, textAlign: 'center' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody style={{ verticalAlign: 'middle' }}>
                                    {recentOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} style={{ ...tdStyle, textAlign: 'center', color: '#424654', padding: '32px' }}>
                                                No recent orders
                                            </td>
                                        </tr>
                                    ) : (
                                        recentOrders.map((order) => (
                                            <tr
                                                key={order._id}
                                                style={rowStyle(order._id)}
                                                onMouseEnter={() => setHoveredRow(order._id)}
                                                onMouseLeave={() => setHoveredRow(null)}
                                            >
                                                <td style={{ ...tdStyle, color: '#0056c9', fontWeight: '500' }}>
                                                    #{order._id}
                                                </td>
                                                <td style={tdStyle}>
                                                    {order.user?.name ?? '—'}
                                                </td>
                                                <td style={{ ...tdStyle, textAlign: 'right' }}>
                                                    ₹{order.totalAmount?.toLocaleString()}
                                                </td>
                                                <td style={{ ...tdStyle, textAlign: 'center' }}>
                                                    <span style={statusBadgeStyle(order.status)}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
