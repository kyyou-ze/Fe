import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen } from 'lucide-react';

const Sidebar = ({ onItemClick }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/writer/dashboard' },
    { icon: BookOpen, label: 'My Novels', path: '/writer/novels' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--white)',
      borderRight: '1px solid var(--gray-200)',
      overflowY: 'auto',
    }}>
      <nav style={{ padding: '1.5rem 1rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            paddingLeft: '0.75rem',
            marginBottom: '0.5rem',
          }}>
            Writer Tools
          </p>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onItemClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: active ? 'var(--primary-50)' : 'transparent',
                  color: active ? 'var(--primary-700)' : 'var(--gray-700)',
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
