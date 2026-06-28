import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
// import Products from './pages/Products';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import AdminDash from './pages/AdminDash';
// import AdminProducts from './pages/AdminProducts';
// import AdminOrders from './pages/AdminOrders';
// import AdminUsers from './pages/AdminUsers';

export default function App() {
  const { user } = useAuth();

  const defaultPath = user
    ? user.role === 'admin'
      ? '/admin/dashboard'
      : '/products'
    : '/login';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={defaultPath} replace />} />

        {/* Public routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={defaultPath} replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/products" replace />}
        />

        {/* Customer routes */}
        {/* <Route path="/products" element={<ProtectedRoute requiredRole="customer"><Products /></ProtectedRoute>} /> */}
        {/* <Route path="/products/:id" element={<ProtectedRoute requiredRole="customer"><ProductDetails /></ProtectedRoute>} /> */}
        {/* <Route path="/cart" element={<ProtectedRoute requiredRole="customer"><Cart /></ProtectedRoute>} /> */}
        {/* <Route path="/checkout" element={<ProtectedRoute requiredRole="customer"><Checkout /></ProtectedRoute>} /> */}
        {/* <Route path="/orders" element={<ProtectedRoute requiredRole="customer"><OrderHistory /></ProtectedRoute>} /> */}
        <Route path="/profile" element={<ProtectedRoute requiredRole="customer"><Profile /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDash /></ProtectedRoute>} />
        {/* <Route path="/admin/products" element={<ProtectedRoute requiredRole="admin"><AdminProducts /></ProtectedRoute>} /> */}
        {/* <Route path="/admin/orders" element={<ProtectedRoute requiredRole="admin"><AdminOrders /></ProtectedRoute>} /> */}
        {/* <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} /> */}

        <Route path="*" element={<Navigate to={defaultPath} replace />} />
      </Routes>
    </>
  );
}
