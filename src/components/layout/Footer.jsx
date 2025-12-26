import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--gray-900)', color: 'var(--gray-300)', marginTop: 'auto' }}>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <BookOpen size={32} style={{ color: 'var(--primary-500)' }} />
              <span className="text-2xl font-bold text-white">LimeNovel</span>
            </div>
            <p style={{ fontSize: '0.875rem' }}>Your destination for amazing digital novels.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white" style={{ marginBottom: '1rem' }}>Quick Links</h3>
            <div className="space-y-3">
              <Link to="/" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-300)', textDecoration: 'none' }}>Home</Link>
              <Link to="/novels" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-300)', textDecoration: 'none' }}>Browse Novels</Link>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem' }}>© {new Date().getFullYear()} LimeNovel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
