import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Styling state trackers
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [regHovered, setRegHovered] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      login(token, user);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'customer') {
        navigate('/products');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Styles defined as plain JS objects for inline-styling
  const containerStyle = {
    backgroundColor: '#e5eeff',
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMFN5-8EpUp4jqLAjVpJzkltu5_KvAI2um6gig6t7mz3SkZkd-FjZJxjlL7LNbvk_FqCF-Rov7OxTblzTWMKWaf9_1iPdx34ZC1uBLRZCUP67IxU9LXsBj4GClVJEmB8VRgLuW_UguqCVVwBb0X5DFJdC0arfcpGiAQfyueFcJPkhcb2fsMWhWP2xhFj-mtGntPIcAQKPu5O4lZfhJdmFciG5cqZRmZyhie2WypWw3a-IuWJEx7Rxi7oHfwG1OludzmrE8LhuzXJQ6")',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'border-box'
  };

  const mainStyle = {
    width: '100%',
    maxWidth: '440px',
    boxSizing: 'border-box'
  };

  const cardStyle = {
    boxShadow: '0 12px 40px -12px rgba(0, 86, 201, 0.15)',
    borderRadius: '1rem',
    padding: '32px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxSizing: 'border-box'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px'
  };

  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '12px'
  };

  const logoCircleStyle = {
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(27, 110, 243, 0.1)',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const logoIconStyle = {
    color: '#0056c9',
    fontSize: '32px'
  };

  const titleStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '24px',
    lineHeight: '1.3',
    fontWeight: '600',
    color: '#0056c9',
    marginBottom: '4px',
    marginTop: 0
  };

  const subtitleStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    fontWeight: '400',
    color: '#424654',
    margin: 0
  };

  const fieldContainerStyle = {
    marginBottom: '24px'
  };

  const labelStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: '500',
    color: '#0b1c30',
    marginLeft: '4px',
    marginBottom: '4px',
    display: 'block'
  };

  const inputWrapperStyle = {
    position: 'relative'
  };

  const iconWrapperStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    paddingLeft: '12px',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none'
  };

  const inputIconStyle = {
    color: '#727786',
    fontSize: '20px'
  };

  const inputBaseStyle = {
    display: 'block',
    width: '100%',
    paddingLeft: '40px',
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #727786',
    borderRadius: '0.5rem',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    fontWeight: '400',
    color: '#0b1c30',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const inputFocusStyle = {
    borderColor: '#0056c9',
    boxShadow: '0 0 0 3px rgba(0, 86, 201, 0.1)'
  };

  const btnStyle = {
    width: '100%',
    backgroundColor: btnHovered ? '#1b6ef3' : '#0056c9',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: '500',
    paddingTop: '14px',
    paddingBottom: '14px',
    paddingLeft: '24px',
    paddingRight: '24px',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: btnHovered ? '0 4px 6px -1px rgba(0, 86, 201, 0.1), 0 2px 4px -1px rgba(0, 86, 201, 0.06)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  };

  const btnIconStyle = {
    fontSize: '18px',
    transform: btnHovered ? 'translateX(4px)' : 'none',
    transition: 'transform 0.2s ease'
  };

  const footerStyle = {
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(194, 198, 215, 0.3)',
    textAlign: 'center'
  };

  const footerTextStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: '500',
    color: '#424654',
    margin: 0
  };

  const registerLinkStyle = {
    color: '#0056c9',
    fontWeight: 'bold',
    textDecoration: regHovered ? 'underline' : 'none',
    transition: 'all 0.2s ease',
    marginLeft: '4px'
  };

  const subtleBgElementStyle = {
    position: 'absolute',
    bottom: '-48px',
    right: '-48px',
    width: '128px',
    height: '128px',
    backgroundColor: 'rgba(0, 86, 201, 0.05)',
    borderRadius: '50%',
    filter: 'blur(64px)',
    pointerEvents: 'none'
  };

  const statusFooterStyle = {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
    borderRadius: '9999px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'fit-content',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxSizing: 'border-box'
  };

  const statusItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const indicatorStyle = {
    width: '6px',
    height: '6px',
    backgroundColor: '#006a48',
    borderRadius: '50%'
  };

  const statusLabelStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    lineHeight: '1.2',
    fontWeight: '600',
    color: '#727786'
  };

  const separatorDotStyle = {
    width: '4px',
    height: '4px',
    backgroundColor: '#c2c6d7',
    borderRadius: '50%'
  };

  return (
    <div style={containerStyle}>
      {/* Login Card Container */}
      <main style={mainStyle}>
        <div style={cardStyle}>
          {/* Branding Section */}
          <header style={headerStyle}>
            <div style={logoContainerStyle}>
              <div style={logoCircleStyle}>
                <span className="material-symbols-outlined" style={logoIconStyle}>
                  local_shipping
                </span>
              </div>
            </div>
            <h1 style={titleStyle}>DairyDirect</h1>
            <p style={subtitleStyle}>Sign in to your account</p>
          </header>

          {/* Login Form */}
          <form id="loginForm" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="email">
                Email Address
              </label>
              <div style={inputWrapperStyle}>
                <div style={iconWrapperStyle}>
                  <span className="material-symbols-outlined" style={inputIconStyle}>
                    mail
                  </span>
                </div>
                <input
                  style={{
                    ...inputBaseStyle,
                    ...(emailFocused ? inputFocusStyle : {})
                  }}
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="password">
                Password
              </label>
              <div style={inputWrapperStyle}>
                <div style={iconWrapperStyle}>
                  <span className="material-symbols-outlined" style={inputIconStyle}>
                    lock
                  </span>
                </div>
                <input
                  style={{
                    ...inputBaseStyle,
                    ...(passwordFocused ? inputFocusStyle : {})
                  }}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              </div>
            </div>

            {/* Login Button */}
            <div style={{ paddingTop: '8px' }}>
              <button
                style={btnStyle}
                id="loginBtn"
                type="submit"
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                <span>Login</span>
                <span className="material-symbols-outlined" style={btnIconStyle}>
                  arrow_forward
                </span>
              </button>
            </div>
          </form>

          {error && !loading && (
            <div style={{ marginTop: '16px', textAlign: 'center', color: '#ba1a1a', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500' }}>
              {error}
            </div>
          )}

          {/* Footer Link */}
          <footer style={footerStyle}>
            <p style={footerTextStyle}>
              Don't have an account?{' '}
              <Link
                style={registerLinkStyle}
                to="/register"
                onMouseEnter={() => setRegHovered(true)}
                onMouseLeave={() => setRegHovered(false)}
              >
                Register
              </Link>
            </p>
          </footer>

          {/* Subtle background branding element */}
          <div style={subtleBgElementStyle}></div>
        </div>

        {/* System Status Footer (Minimalist) */}
        <div style={statusFooterStyle}>
          <div style={statusItemStyle}>
            <div style={indicatorStyle}></div>
            <span style={statusLabelStyle}>System Online</span>
          </div>
          <div style={separatorDotStyle}></div>
          <span style={statusLabelStyle}>v2.4.0-stable</span>
        </div>
      </main>
    </div>
  );
}
