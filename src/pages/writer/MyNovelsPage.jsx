import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, MoreVertical, FileText } from 'lucide-react';

const MyNovelsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Dummy data
  const novels = [
    {
      id: 1,
      title: 'The Shadow of Eternity',
      cover: 'https://picsum.photos/seed/novel1/400/600',
      status: 'ongoing',
      chapters: 142,
      views: 125000,
      likes: 8500,
      bookmarks: 5200,
      lastUpdated: '2 hours ago',
      visibility: 'public',
    },
    {
      id: 2,
      title: 'Digital Dreams',
      cover: 'https://picsum.photos/seed/novel2/400/600',
      status: 'ongoing',
      chapters: 98,
      views: 98000,
      likes: 6200,
      bookmarks: 4100,
      lastUpdated: '1 day ago',
      visibility: 'public',
    },
    {
      id: 3,
      title: 'Whispers of the Heart',
      cover: 'https://picsum.photos/seed/novel3/400/600',
      status: 'completed',
      chapters: 156,
      views: 156000,
      likes: 12000,
      bookmarks: 8900,
      lastUpdated: '1 week ago',
      visibility: 'public',
    },
    {
      id: 4,
      title: 'Crimson Blade Chronicles',
      cover: 'https://picsum.photos/seed/novel4/400/600',
      status: 'hiatus',
      chapters: 67,
      views: 45000,
      likes: 3200,
      bookmarks: 2100,
      lastUpdated: '2 weeks ago',
      visibility: 'private',
    },
  ];

  const filteredNovels = novels.filter(novel => {
    const matchesSearch = novel.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || novel.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Novels</h1>
          <p className="text-gray-600">Manage your published novels</p>
        </div>
        <Link to="/writer/novels/create">
          <button className="btn btn-primary">
            <Plus size={18} style={{ marginRight: '0.5rem' }} />
            Create New Novel
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--gray-400)',
          }} />
          <input
            type="text"
            placeholder="Search your novels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '3rem',
              paddingRight: '1rem',
              paddingTop: '0.625rem',
              paddingBottom: '0.625rem',
              border: '1px solid var(--gray-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          {['all', 'ongoing', 'completed', 'hiatus'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: filterStatus === status ? 'var(--primary-600)' : 'var(--gray-100)',
                color: filterStatus === status ? 'white' : 'var(--gray-700)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: 500,
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1" style={{
          border: '1px solid var(--gray-300)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.25rem',
        }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '0.375rem 0.75rem',
              backgroundColor: viewMode === 'grid' ? 'var(--primary-600)' : 'transparent',
              color: viewMode === 'grid' ? 'white' : 'var(--gray-700)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              padding: '0.375rem 0.75rem',
              backgroundColor: viewMode === 'list' ? 'var(--primary-600)' : 'transparent',
              color: viewMode === 'list' ? 'white' : 'var(--gray-700)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            List
          </button>
        </div>
      </div>

      {/* Results Count */}
      <p style={{ marginBottom: '1rem', color: 'var(--gray-600)', fontSize: '0.875rem' }}>
        Showing {filteredNovels.length} novel{filteredNovels.length !== 1 ? 's' : ''}
      </p>

      {/* Novels Grid/List */}
      {viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredNovels.map((novel) => (
            <div key={novel.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Cover */}
              <div style={{ position: 'relative', paddingTop: '140%', backgroundColor: 'var(--gray-200)' }}>
                <img
                  src={novel.cover}
                  alt={novel.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '0.5rem',
                  backgroundColor: novel.status === 'completed' ? '#22c55e' : novel.status === 'ongoing' ? '#3b82f6' : '#f59e0b',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}>
                  {novel.status}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1rem' }}>
                <h3 className="font-semibold text-gray-900 mb-2" style={{ fontSize: '1rem' }}>
                  {novel.title}
                </h3>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                  <div>
                    <span className="font-medium">{novel.chapters}</span> Chapters
                  </div>
                  <div>
                    <span className="font-medium">{novel.views.toLocaleString()}</span> Views
                  </div>
                  <div>
                    <span className="font-medium">{novel.likes.toLocaleString()}</span> Likes
                  </div>
                  <div>
                    <span className="font-medium">{novel.bookmarks.toLocaleString()}</span> Saves
                  </div>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>
                  Updated {novel.lastUpdated}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link to={`/writer/novels/${novel.id}/edit`} style={{ flex: 1 }}>
                    <button className="btn" style={{
                      width: '100%',
                      backgroundColor: 'var(--primary-600)',
                      color: 'white',
                      fontSize: '0.875rem',
                      padding: '0.5rem',
                    }}>
                      <Edit size={14} style={{ marginRight: '0.25rem' }} />
                      Edit
                    </button>
                  </Link>
                  <Link to={`/writer/novels/${novel.id}/chapters`} style={{ flex: 1 }}>
                    <button className="btn" style={{
                      width: '100%',
                      backgroundColor: 'var(--secondary-600)',
                      color: 'white',
                      fontSize: '0.875rem',
                      padding: '0.5rem',
                    }}>
                      <FileText size={14} style={{ marginRight: '0.25rem' }} />
                      Chapters
                    </button>
                  </Link>
                  <button className="btn" style={{
                    backgroundColor: 'white',
                    border: '1px solid var(--gray-300)',
                    padding: '0.5rem',
                  }}>
                    <MoreVertical size={16} style={{ color: 'var(--gray-600)' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNovels.map((novel) => (
            <div key={novel.id} className="card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}>
              {/* Cover */}
              <img
                src={novel.cover}
                alt={novel.title}
                style={{
                  width: '80px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg)',
                }}
              />

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{novel.title}</h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: novel.status === 'completed' ? '#dcfce7' : novel.status === 'ongoing' ? '#dbeafe' : '#fef3c7',
                    color: novel.status === 'completed' ? '#166534' : novel.status === 'ongoing' ? '#1e40af' : '#92400e',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}>
                    {novel.status}
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-2" style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  <span><strong>{novel.chapters}</strong> chapters</span>
                  <span><strong>{novel.views.toLocaleString()}</strong> views</span>
                  <span><strong>{novel.likes.toLocaleString()}</strong> likes</span>
                  <span><strong>{novel.bookmarks.toLocaleString()}</strong> saves</span>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                  Last updated {novel.lastUpdated}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link to={`/novel/${novel.id}`}>
                  <button className="btn" style={{
                    backgroundColor: 'white',
                    border: '1px solid var(--gray-300)',
                    padding: '0.5rem 1rem',
                  }}>
                    <Eye size={16} style={{ marginRight: '0.5rem' }} />
                    View
                  </button>
                </Link>
                <Link to={`/writer/novels/${novel.id}/edit`}>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    <Edit size={16} style={{ marginRight: '0.5rem' }} />
                    Edit
                  </button>
                </Link>
                <Link to={`/writer/novels/${novel.id}/chapters`}>
                  <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                    <FileText size={16} style={{ marginRight: '0.5rem' }} />
                    Chapters
                  </button>
                </Link>
                <button className="btn" style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--gray-300)',
                  padding: '0.5rem',
                  color: '#ef4444',
                }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredNovels.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: 'var(--gray-50)',
          borderRadius: 'var(--radius-xl)',
        }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No novels found</h3>
          <p className="text-gray-600 mb-4">Start your writing journey by creating your first novel!</p>
          <Link to="/writer/novels/create">
            <button className="btn btn-primary">
              <Plus size={18} style={{ marginRight: '0.5rem' }} />
              Create New Novel
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyNovelsPage;
