import { Link } from 'react-router-dom';
import { BookOpen, FileText, Eye, Heart, TrendingUp, Users, MessageSquare, Plus } from 'lucide-react';
import WriterPremiumBanner from '../../components/ui/WriterPremiumBanner';
import usePaymentStore from '../../store/paymentStore';

const WriterDashboardPage = () => {
  const { isPremium } = usePaymentStore();


  const stats = {
    totalNovels: 5,
    totalChapters: 127,
    totalViews: 456789,
    totalLikes: 23456,
    totalBookmarks: 12345,
    followers: 3421,
  };

  const recentNovels = [
    { id: 1, title: 'The Shadow of Eternity', chapters: 142, views: 125000, likes: 8500, lastUpdated: '2 hours ago', status: 'ongoing' },
    { id: 2, title: 'Digital Dreams', chapters: 98, views: 98000, likes: 6200, lastUpdated: '1 day ago', status: 'ongoing' },
  ];

  const recentComments = [
    { id: 1, user: 'Alice', novel: 'The Shadow of Eternity', comment: 'Amazing chapter!', time: '30 min ago' },
    { id: 2, user: 'Bob', novel: 'Digital Dreams', comment: 'This is getting so good!', time: '2 hours ago' },
  ];

  const weeklyViews = [
    { day: 'Mon', views: 12500 },
    { day: 'Tue', views: 15200 },
    { day: 'Wed', views: 18300 },
    { day: 'Thu', views: 14800 },
    { day: 'Fri', views: 21000 },
    { day: 'Sat', views: 25600 },
    { day: 'Sun', views: 19200 },
  ];

  const maxViews = Math.max(...weeklyViews.map(d => d.views));
  const isMobile = window.innerWidth < 768;

  return (
      <div>
    {!isPremium && <WriterPremiumBanner />}
    {/* rest of dashboard */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '1rem',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
      }}>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>
            Writer Dashboard
          </h1>
          <p className="text-gray-600" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
            Welcome back!
          </p>
        </div>
        <Link to="/writer/novels/create" style={{ width: isMobile ? '100%' : 'auto' }}>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            <Plus size={18} style={{ marginRight: '0.5rem' }} />
            Create Novel
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Novels</h3>
            <BookOpen size={20} style={{ color: 'var(--primary-600)' }} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalNovels}</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Chapters</h3>
            <FileText size={20} style={{ color: 'var(--secondary-600)' }} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalChapters}</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Views</h3>
            <Eye size={20} style={{ color: '#3b82f6' }} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Likes</h3>
            <Heart size={20} style={{ color: '#ef4444' }} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</p>
        </div>
      </div>

      {/* Weekly Views Chart */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Views This Week</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? '0.5rem' : '1rem', height: '200px', overflowX: 'auto' }}>
          {weeklyViews.map((data, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: isMobile ? '40px' : '60px' }}>
              <span style={{ fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: 600, color: 'var(--gray-700)' }}>
                {isMobile ? data.views > 1000 ? `${Math.round(data.views/1000)}k` : data.views : data.views.toLocaleString()}
              </span>
              <div style={{
                width: '100%',
                height: `${(data.views / maxViews) * 100}%`,
                backgroundColor: 'var(--primary-600)',
                borderRadius: '0.25rem',
                minHeight: '20px',
              }} />
              <span style={{ fontSize: isMobile ? '0.65rem' : '0.75rem', color: 'var(--gray-600)' }}>{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Novels & Comments */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: '1.5rem',
      }}>
        {/* Recent Novels */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Novels</h3>
            <Link to="/writer/novels" style={{ fontSize: '0.875rem', color: 'var(--primary-600)', textDecoration: 'none', fontWeight: 500 }}>
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentNovels.map((novel) => (
              <div key={novel.id} style={{
                padding: isMobile ? '0.75rem' : '1rem',
                backgroundColor: 'var(--gray-50)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <Link to={`/writer/novels/${novel.id}`} style={{ textDecoration: 'none' }}>
                  <h4 className="font-semibold text-gray-900 mb-1" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    {novel.title}
                  </h4>
                </Link>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: isMobile ? '0.5rem' : '1rem',
                  fontSize: '0.75rem',
                  color: 'var(--gray-600)',
                }}>
                  <span>{novel.chapters} chapters</span>
                  <span>•</span>
                  <span>{novel.views.toLocaleString()} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
            <MessageSquare size={18} style={{ color: 'var(--gray-600)' }} />
          </div>
          <div className="space-y-3">
            {recentComments.map((comment) => (
              <div key={comment.id} style={{
                padding: '0.75rem',
                backgroundColor: 'var(--gray-50)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div className="flex items-center gap-2 mb-1">
                  <div style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--primary-700)',
                  }}>
                    {comment.user[0]}
                  </div>
                  <span className="font-medium text-gray-900" style={{ fontSize: '0.875rem' }}>
                    {comment.user}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
                  {comment.comment}
                </p>
                <div style={{ fontSize: '0.65rem', color: 'var(--gray-500)' }}>
                  {comment.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterDashboardPage;
