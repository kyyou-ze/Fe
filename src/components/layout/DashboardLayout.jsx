import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = window.innerWidth < 1024;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--gray-50)' }}>
      <Navbar />
      
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-600)',
            color: 'white',
            border: 'none',
            boxShadow: 'var(--shadow-2xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100,
          }}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: '4rem',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 45,
          }}
        />
      )}

      <div style={{ display: 'flex' }}>
        {/* Sidebar - Conditional Rendering */}
        <div style={{
          position: isMobile ? 'fixed' : 'fixed',
          left: isMobile ? (isSidebarOpen ? 0 : '-16rem') : 0,
          top: '4rem',
          width: '16rem',
          height: 'calc(100vh - 4rem)',
          transition: 'left 0.3s ease',
          zIndex: 50,
        }}>
          <Sidebar onItemClick={() => isMobile && setIsSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <main style={{
          marginLeft: isMobile ? 0 : '16rem',
          flex: 1,
          padding: isMobile ? '1rem' : '2rem',
          minHeight: 'calc(100vh - 4rem)',
          width: isMobile ? '100%' : 'calc(100% - 16rem)',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
