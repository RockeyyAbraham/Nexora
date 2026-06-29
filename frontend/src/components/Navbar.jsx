import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const brandTo = user
    ? user.role === 'admin'
      ? '/admin/dashboard'
      : '/products'
    : '/login';

  return (
    <nav
      className="bg-surface-container-low border-b border-outline-variant"
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: '1200px', padding: '0 24px', height: '64px', textAlign: 'left' }}
      >
        {/* Brand */}
        <Link
          to={brandTo}
          className="flex items-center gap-sm text-primary font-headline-md text-headline-md"
          style={{ textDecoration: 'none' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
            local_shipping
          </span>
          DairyDirect
        </Link>

        {/* Links */}
        <div className="flex items-center gap-md">
          {/* Guest */}
          {!user && (
            <>
              <Link to="/login" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" style={{ textDecoration: 'none' }}>
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity"
                style={{ textDecoration: 'none', padding: '8px 20px' }}
              >
                Register
              </Link>
            </>
          )}

          {/* Customer */}
          {user?.role === 'customer' && (
            <>
              <Link to="/products" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" style={{ textDecoration: 'none' }}>Products</Link>
              <Link to="/orders" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" style={{ textDecoration: 'none' }}>My Orders</Link>
              <Link to="/profile" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" style={{ textDecoration: 'none' }}>Profile</Link>

              {/* Cart with badge */}
              <Link
                to="/cart"
                className="text-on-surface-variant hover:text-primary transition-colors"
                style={{ textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>shopping_cart</span>
                {totalItems > 0 && (
                  <span
                    className="bg-error text-on-error font-bold flex items-center justify-center rounded-full"
                    style={{ fontSize: '10px', width: '16px', height: '16px', position: 'absolute', top: '-6px', right: '-8px' }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-xs font-label-md text-label-md text-on-surface-variant hover:text-error transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
                Logout
              </button>
            </>
          )}

          {/* Admin */}
          {user?.role === 'admin' && (
            <>
              <Link to="/admin/dashboard" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" style={{ textDecoration: 'none' }}>Dashboard</Link>
              <Link to="/admin/products" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" style={{ textDecoration: 'none' }}>Products</Link>
              <Link to="/admin/orders" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" style={{ textDecoration: 'none' }}>Orders</Link>
              <Link to="/admin/users" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" style={{ textDecoration: 'none' }}>Users</Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-xs font-label-md text-label-md text-on-surface-variant hover:text-error transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
