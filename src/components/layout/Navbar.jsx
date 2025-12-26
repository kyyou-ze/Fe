import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut, BookOpen, Settings } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <nav style={{
      backgroundColor: 'var(--white)',
      boxShadow: 'var(--shadow-md)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: '4rem' }}>
          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <BookOpen size={32} style={{ color: 'var(--primary-600)' }} />
            <span className="text-2xl font-bold" style={{ color: 'var(--gray-900)' }}>LimoNovel</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button style={{ position: 'relative', padding: '0.5rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <Bell size={20} style={{ color: 'var(--gray-600)' }} />
                </button>

                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    style={{ padding: '0.5rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <div style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <User size={20} style={{ color: 'var(--primary-600)' }} />
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '0.5rem',
                      width: '12rem',
                      backgroundColor: 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-xl)',
                      padding: '0.5rem',
                      zIndex: 50,
                    }}>
                      <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                        <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user?.username || 'User'}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', textDecoration: 'none', color: 'var(--gray-700)', borderRadius: 'var(--radius-lg)' }}>
                        <User size={16} />
                        <span style={{ fontSize: '0.875rem' }}>Profile</span>
                      </Link>
                      <Link to="/settings" onClick={() => setIsUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', textDecoration: 'none', color: 'var(--gray-700)', borderRadius: 'var(--radius-lg)' }}>
                        <Settings size={16} />
                        <span style={{ fontSize: '0.875rem' }}>Settings</span>
                      </Link>
                      <button
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#ef4444',
                          borderRadius: 'var(--radius-lg)',
                          textAlign: 'left',
                        }}
                      >
                        <LogOut size={16} />
                        <span style={{ fontSize: '0.875rem' }}>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login"><button className="btn" style={{ backgroundColor: 'transparent', color: 'var(--gray-700)', padding: '0.5rem 1rem' }}>Login</button></Link>
                <Link to="/register"><button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign Up</button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
