import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Hide on admin, login, register
  if (pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register') return null;

  const handleLogout = () => { logout(); navigate('/login'); };

  const navStyle = {
    position: 'sticky', top: 0, zIndex: 50,
    backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    fontFamily: "'Inter', sans-serif",
  };
  const inner = {
    maxWidth: 1280, margin: '0 auto', height: 64,
    padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  };
  const brand = { display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' };
  const brandName = { fontSize: 20, fontWeight: 800, color: '#16a34a', letterSpacing: '-0.02em' };
  const navLinks = { display: 'flex', alignItems: 'center', gap: 4 };
  const linkStyle = (active) => ({
    padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: active ? 600 : 400,
    color: active ? '#16a34a' : '#374151', textDecoration: 'none',
    background: active ? '#f0fdf4' : 'transparent', transition: 'all 0.15s',
  });
  const cartBtn = {
    position: 'relative', display: 'flex', alignItems: 'center',
    padding: '6px 14px', borderRadius: 8, color: '#374151', textDecoration: 'none',
    background: pathname === '/cart' ? '#f0fdf4' : 'transparent',
  };
  const cartBadge = {
    position: 'absolute', top: 2, right: 6,
    width: 17, height: 17, borderRadius: '50%', background: '#ef4444',
    color: '#fff', fontSize: 10, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
  const logoutBtn = {
    display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
    cursor: 'pointer', padding: '6px 14px', borderRadius: 8,
    fontSize: 14, color: '#6b7280', fontWeight: 400,
  };

  const brandTo = user ? (user.role === 'admin' ? '/admin/dashboard' : '/products') : '/login';

  return (
    <nav style={navStyle}>
      <div style={inner}>
        {/* Brand */}
        <Link to={brandTo} style={brand}>
          <span className="material-symbols-outlined" style={{ fontSize: 26, color: '#16a34a' }}>local_shipping</span>
          <span style={brandName}>DairyDirect</span>
        </Link>

        {/* Links */}
        <div style={navLinks}>
          {!user && (
            <>
              <Link to="/login" style={linkStyle(pathname === '/login')}>Login</Link>
              <Link to="/register" style={{ ...linkStyle(false), background: '#16a34a', color: '#fff', fontWeight: 600 }}>Register</Link>
            </>
          )}
          {user?.role === 'customer' && (
            <>
              <Link to="/products" style={linkStyle(pathname === '/products' || pathname.startsWith('/products/'))}>Products</Link>
              <Link to="/orders" style={linkStyle(pathname === '/orders')}>My Orders</Link>
              <Link to="/profile" style={linkStyle(pathname === '/profile')}>Profile</Link>
              <Link to="/cart" style={cartBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>shopping_cart</span>
                {totalItems > 0 && <span style={cartBadge}>{totalItems}</span>}
              </Link>
              <button style={logoutBtn} onClick={handleLogout}>
                <span className="material-symbols-outlined" style={{ fontSize: 17 }}>logout</span>
                Logout
              </button>
            </>
          )}
          {user?.role === 'admin' && (
            <>
              <Link to="/admin/dashboard" style={linkStyle(pathname === '/admin/dashboard')}>Dashboard</Link>
              <Link to="/admin/products" style={linkStyle(pathname === '/admin/products')}>Products</Link>
              <Link to="/admin/orders" style={linkStyle(pathname === '/admin/orders')}>Orders</Link>
              <Link to="/admin/users" style={linkStyle(pathname === '/admin/users')}>Users</Link>
              <button style={logoutBtn} onClick={handleLogout}>
                <span className="material-symbols-outlined" style={{ fontSize: 17 }}>logout</span>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
