import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeaders = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users', {
          headers: authHeaders,
        });
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, { headers: authHeaders });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
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
    <div className="bg-surface" style={{ minHeight: '100vh', padding: '40px 24px', textAlign: 'left' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h1 className="font-headline-md text-headline-md text-on-surface">Manage Users</h1>
          <span
            className="font-label-md text-label-md text-on-surface-variant bg-surface-container rounded-full"
            style={{ padding: '4px 14px' }}
          >
            {users.length} customer{users.length !== 1 ? 's' : ''}
          </span>
        </div>

        {users.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <span className="material-symbols-outlined text-outline" style={{ fontSize: '64px', display: 'block', marginBottom: '12px' }}>
              group
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">No customers registered yet.</p>
          </div>
        ) : (
          <div
            className="bg-surface-container-low border border-outline-variant rounded-xl"
            style={{ overflow: 'hidden' }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr className="bg-surface-container" style={{ borderBottom: '1px solid #c2c6d7' }}>
                  {['Name', 'Email', 'Phone', 'Address', ''].map((col) => (
                    <th
                      key={col}
                      className="font-label-md text-label-md text-on-surface-variant"
                      style={{ textAlign: col === '' ? 'right' : 'left', padding: '12px 24px', fontWeight: 500 }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    style={{ borderBottom: '1px solid rgba(194,198,215,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-container, #e5eeff)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Name */}
                    <td style={{ padding: '14px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          className="bg-primary rounded-full flex items-center justify-center"
                          style={{ width: '32px', height: '32px', flexShrink: 0 }}
                        >
                          <span className="text-on-primary font-label-md text-label-md">
                            {u.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-body-md text-body-md text-on-surface">{u.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="font-body-md text-body-md text-on-surface-variant" style={{ padding: '14px 24px' }}>
                      {u.email}
                    </td>

                    {/* Phone */}
                    <td className="font-body-md text-body-md text-on-surface-variant" style={{ padding: '14px 24px' }}>
                      {u.phone || '—'}
                    </td>

                    {/* Address */}
                    <td
                      className="font-body-md text-body-md text-on-surface-variant"
                      style={{ padding: '14px 24px', maxWidth: '220px' }}
                    >
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {u.address || '—'}
                      </span>
                    </td>

                    {/* Delete */}
                    <td style={{ padding: '14px 24px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="text-error font-label-md text-label-md flex items-center gap-xs rounded-lg"
                        style={{
                          marginLeft: 'auto',
                          padding: '6px 12px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(186,26,26,0.08)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
