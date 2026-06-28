import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Focus and Hover states for inline styling
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [loginLinkHovered, setLoginLinkHovered] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        phone,
        address,
      });
      const { token, user } = response.data;
      login(token, user);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Plain CSS styles as JS objects for inline-styling
  const containerStyle = {
    backgroundColor: '#f8f9ff',
    color: '#0b1c30',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    overflowX: 'hidden',
    minHeight: '100vh',
    position: 'relative',
    boxSizing: 'border-box'
  };

  const bgLayerStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0
  };

  const bgOverlayStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 10
  };

  const bgImgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const mainStyle = {
    position: 'relative',
    zIndex: 20,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    boxSizing: 'border-box'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    width: '100%',
    maxWidth: '480px',
    borderRadius: '0.75rem',
    padding: '40px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    boxSizing: 'border-box'
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '64px'
  };

  const titleStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '32px',
    lineHeight: '1.2',
    fontWeight: '600',
    color: '#0056c9',
    letterSpacing: '-0.01em',
    margin: 0
  };

  const subtitleStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: '500',
    color: '#424654',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    margin: '8px 0 0 0'
  };

  const dividerStyle = {
    width: '48px',
    height: '4px',
    backgroundColor: 'rgba(0, 86, 201, 0.2)',
    borderRadius: '9999px',
    marginTop: '12px'
  };

  const fieldContainerStyle = {
    marginBottom: '24px'
  };

  const labelStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: '500',
    color: '#424654',
    marginLeft: '4px',
    marginBottom: '4px',
    display: 'block'
  };

  const inputContainerStyle = {
    position: 'relative'
  };

  const inputIconStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#727786',
    fontSize: '20px'
  };

  const inputBaseStyle = {
    width: '100%',
    paddingLeft: '48px',
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid #c2c6d7',
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
    boxShadow: '0 0 0 4px rgba(0, 86, 201, 0.1)'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  };

  const btnStyle = {
    width: '100%',
    paddingTop: '16px',
    paddingBottom: '16px',
    backgroundColor: btnHovered ? 'rgba(0, 86, 201, 0.9)' : '#0056c9',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: '500',
    borderRadius: '0.5rem',
    boxShadow: btnHovered ? '0 10px 15px -3px rgba(0, 86, 201, 0.3), 0 4px 6px -2px rgba(0, 86, 201, 0.05)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transform: btnHovered ? 'translateY(-2px)' : 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  };

  const footerStyle = {
    marginTop: '40px',
    textAlign: 'center'
  };

  const footerTextStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    fontWeight: '400',
    color: '#424654',
    margin: 0
  };

  const loginLinkStyle = {
    color: '#0056c9',
    fontWeight: 'bold',
    marginLeft: '4px',
    textDecoration: loginLinkHovered ? 'underline' : 'none',
    transition: 'all 0.2s ease'
  };

  const badgeContainerStyle = {
    marginTop: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    opacity: 0.6
  };

  const badgeItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const badgeIconStyle = {
    fontSize: '16px'
  };

  const badgeLabelStyle = {
    fontSize: '10px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em'
  };

  const dotSeparatorStyle = {
    width: '4px',
    height: '4px',
    backgroundColor: '#c2c6d7',
    borderRadius: '50%'
  };

  return (
    <div style={containerStyle}>
      {/* Background Image Layer */}
      <div style={bgLayerStyle}>
        <div style={bgOverlayStyle}></div>
        <img
          style={bgImgStyle}
          src="https://lh3.googleusercontent.com/aida/AP1WRLsqbgCS_px2jeV3JZmSNbFLajcsfLV_DNMPwCUkXS-WCtvwtrFm6fLL0C06o2whR-_9vW5hzlOXBRDr07XKsKp_AoNR94Ya5uSM0pwXRjocPxr24xDmfPzkImNmiLx7yxV6LxpEHzZEaCf4lNmIOognb2NxAgb3Pr1hAM-Tg4J8yRCrFDwnbJNiJZSejwHV9qCew5dp2m9nGchv0bwE-cVSub6dDQ_PpFC6iSkKTO4D31sIEFJ5YCrOYUQ"
          alt=""
        />
      </div>

      {/* Main Content Canvas */}
      <main style={mainStyle}>
        {/* Registration Card */}
        <div style={cardStyle}>
          {/* Branding Header */}
          <div style={headerStyle}>
            <h1 style={titleStyle}>DairyDirect</h1>
            <p style={subtitleStyle}>Create your account</p>
            <div style={dividerStyle}></div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="name">
                Full Name
              </label>
              <div style={inputContainerStyle}>
                <span className="material-symbols-outlined" style={inputIconStyle}>
                  person
                </span>
                <input
                  style={{
                    ...inputBaseStyle,
                    ...(nameFocused ? inputFocusStyle : {})
                  }}
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                />
              </div>
            </div>

            {/* Email Field */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="email">
                Email Address
              </label>
              <div style={inputContainerStyle}>
                <span className="material-symbols-outlined" style={inputIconStyle}>
                  mail
                </span>
                <input
                  style={{
                    ...inputBaseStyle,
                    ...(emailFocused ? inputFocusStyle : {})
                  }}
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>
            </div>

            {/* Grid for Phone and Address (Desktop only, Stacked Mobile) */}
            <div style={gridStyle}>
              {/* Phone Field */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle} htmlFor="phone">
                  Phone
                </label>
                <div style={inputContainerStyle}>
                  <span className="material-symbols-outlined" style={inputIconStyle}>
                    call
                  </span>
                  <input
                    style={{
                      ...inputBaseStyle,
                      ...(phoneFocused ? inputFocusStyle : {})
                    }}
                    id="phone"
                    placeholder="+1 234..."
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => setPhoneFocused(true)}
                    onBlur={() => setPhoneFocused(false)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle} htmlFor="password">
                  Password
                </label>
                <div style={inputContainerStyle}>
                  <span className="material-symbols-outlined" style={inputIconStyle}>
                    lock
                  </span>
                  <input
                    style={{
                      ...inputBaseStyle,
                      ...(passwordFocused ? inputFocusStyle : {})
                    }}
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle} htmlFor="address">
                Delivery Address
              </label>
              <div style={inputContainerStyle}>
                <span className="material-symbols-outlined" style={inputIconStyle}>
                  location_on
                </span>
                <input
                  style={{
                    ...inputBaseStyle,
                    ...(addressFocused ? inputFocusStyle : {})
                  }}
                  id="address"
                  placeholder="123 Farm Lane, Fresh Hills"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onFocus={() => setAddressFocused(true)}
                  onBlur={() => setAddressFocused(false)}
                />
              </div>
            </div>

            {/* Register Button */}
            <div style={{ paddingTop: '12px' }}>
              <button
                style={btnStyle}
                type="submit"
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                <span>Register</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>

          {error && !loading && (
            <div style={{ marginTop: '16px', textAlign: 'center', color: '#ba1a1a', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500' }}>
              {error}
            </div>
          )}

          {/* Footer Link */}
          <div style={footerStyle}>
            <p style={footerTextStyle}>
              Already have an account?
              <Link
                style={loginLinkStyle}
                to="/login"
                onMouseEnter={() => setLoginLinkHovered(true)}
                onMouseLeave={() => setLoginLinkHovered(false)}
              >
                Login
              </Link>
            </p>
          </div>

          {/* Trust Badge (Optional Micro-Interaction) */}
          <div style={badgeContainerStyle}>
            <div style={badgeItemStyle}>
              <span className="material-symbols-outlined" style={badgeIconStyle}>verified_user</span>
              <span style={badgeLabelStyle}>Secure Data</span>
            </div>
            <div style={dotSeparatorStyle}></div>
            <div style={badgeItemStyle}>
              <span className="material-symbols-outlined" style={badgeIconStyle}>eco</span>
              <span style={badgeLabelStyle}>Eco-Friendly</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
