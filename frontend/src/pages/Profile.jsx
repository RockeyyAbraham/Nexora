import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, token, updateUser } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const authHeaders = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/profile', {
          headers: authHeaders,
        });
        setForm({
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || '',
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const { data } = await axios.put('http://localhost:5000/api/users/profile', form, {
        headers: authHeaders,
      });
      updateUser({ name: data.name, phone: data.phone, address: data.address });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px' }}>
          progress_activity
        </span>
      </div>
    );
  }

  return (
    <div className="bg-surface" style={{ minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <h1 className="font-headline-md text-headline-md text-on-surface" style={{ marginBottom: '32px' }}>
          My Profile
        </h1>

        <div
          className="bg-surface-container-low border border-outline-variant rounded-xl"
          style={{ padding: '40px' }}
        >
          {/* User header */}
          <div
            className="flex items-center gap-sm"
            style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #c2c6d7' }}
          >
            <div
              className="bg-primary rounded-full flex items-center justify-center"
              style={{ width: '48px', height: '48px', flexShrink: 0 }}
            >
              <span className="text-on-primary font-headline-md text-headline-md">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface">{user?.name}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">{user?.email}</p>
            </div>
          </div>

          {/* Feedback message */}
          {message && (
            <div
              className="font-label-md text-label-md rounded-lg"
              style={{
                marginBottom: '24px',
                padding: '12px 16px',
                backgroundColor: message.type === 'success' ? 'rgba(0,106,72,0.1)' : 'rgba(186,26,26,0.1)',
                color: message.type === 'success' ? '#006a48' : '#93000a',
              }}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="name">
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  className="material-symbols-outlined text-outline"
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}
                >
                  badge
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface"
                  style={{ paddingLeft: '48px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px' }}
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="phone">
                Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  className="material-symbols-outlined text-outline"
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}
                >
                  call
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface"
                  style={{ paddingLeft: '48px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px' }}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            {/* Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="address">
                Delivery Address
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  className="material-symbols-outlined text-outline"
                  style={{ position: 'absolute', left: '16px', top: '14px', fontSize: '20px' }}
                >
                  location_on
                </span>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface"
                  style={{ paddingLeft: '48px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px', resize: 'none' }}
                  placeholder="123 Farm Lane, Fresh Hills"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-xs"
              style={{
                padding: '14px 24px',
                border: 'none',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>progress_activity</span>
                  Saving...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
