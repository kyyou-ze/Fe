import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Lock, Unlock, ArrowLeft } from 'lucide-react';

const ChapterListPage = () => {
  const { novelId } = useParams();
  const [sortBy, setSortBy] = useState('number');

  // Dummy data
  const novel = {
    id: novelId,
    title: 'The Shadow of Eternity',
    totalChapters: 142,
  };

  const chapters = [
    { id: 1, number: 142, title: 'The Final Confrontation (Part 2)', wordCount: 3245, views: 12500, publishedAt: '2 hours ago', status: 'published', isPremium: false },
    { id: 2, number: 141, title: 'The Final Confrontation (Part 1)', wordCount: 3180, views: 15200, publishedAt: '2 days ago', status: 'published', isPremium: false },
    { id: 3, number: 140, title: 'Gathering Allies', wordCount: 2890, views: 16800, publishedAt: '4 days ago', status: 'published', isPremium: false },
    { id: 4, number: 139, title: 'The Dark Prophecy', wordCount: 3420, views: 18200, publishedAt: '6 days ago', status: 'published', isPremium: true },
    { id: 5, number: 138, title: 'Return to the Capital', wordCount: 3100, views: 19500, publishedAt: '1 week ago', status: 'published', isPremium: true },
    { id: 6, number: 137, title: 'Aftermath', wordCount: 2650, views: 20100, publishedAt: '1 week ago', status: 'published', isPremium: false },
    { id: 7, number: null, title: 'Untitled Chapter', wordCount: 1250, views: 0, publishedAt: null, status: 'draft', isPremium: false },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link to="/writer/novels" className="flex items-center gap-2 text-primary-600 mb-4" style={{ textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
          <ArrowLeft size={16} />
          Back to Novels
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{novel.title}</h1>
            <p className="text-gray-600">{novel.totalChapters} chapters published</p>
          </div>
          <Link to={`/writer/novels/${novelId}/chapters/create`}>
            <button className="btn btn-primary">
              <Plus size={18} style={{ marginRight: '0.5rem' }} />
              New Chapter
            </button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid var(--gray-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="number">Chapter Number</option>
            <option value="views">Most Viewed</option>
            <option value="date">Recently Updated</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--gray-100)',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.875rem',
            color: 'var(--gray-700)',
          }}>
            {chapters.filter(c => c.status === 'published').length} Published
          </span>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--gray-100)',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.875rem',
            color: 'var(--gray-700)',
          }}>
            {chapters.filter(c => c.status === 'draft').length} Drafts
          </span>
        </div>
      </div>

      {/* Chapters Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-700)' }}>Chapter</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-700)' }}>Title</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: 'var(--gray-700)' }}>Words</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: 'var(--gray-700)' }}>Views</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: 'var(--gray-700)' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: 'var(--gray-700)' }}>Published</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: 'var(--gray-700)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => (
                <tr key={chapter.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {chapter.number ? `#${chapter.number}` : '-'}
                      </span>
                      {chapter.isPremium && (
                        <Lock size={14} style={{ color: '#f59e0b' }} />
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: chapter.status === 'draft' ? 'var(--gray-500)' : 'var(--gray-900)' }}>
                      {chapter.title}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--gray-600)' }}>
                    {chapter.wordCount.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--gray-600)' }}>
                    {chapter.views.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: chapter.status === 'published' ? '#dcfce7' : '#fef3c7',
                      color: chapter.status === 'published' ? '#166534' : '#92400e',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}>
                      {chapter.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--gray-600)', fontSize: '0.75rem' }}>
                    {chapter.publishedAt || '-'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`/writer/novels/${novelId}/chapters/${chapter.id}/edit`}>
                        <button
                          className="btn"
                          style={{
                            padding: '0.375rem',
                            backgroundColor: 'white',
                            border: '1pxsolid var(--gray-300)',
                          }}
                          title="Edit"
                        >
                          <Edit size={14} style={{ color: 'var(--gray-600)' }} />
                        </button>
                      </Link>
                      <button
                        className="btn"
                        style={{
                          padding: '0.375rem',
                          backgroundColor: 'white',
                          border: '1px solid var(--gray-300)',
                        }}
                        title={chapter.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {chapter.status === 'published' ? (
                          <EyeOff size={14} style={{ color: 'var(--gray-600)' }} />
                        ) : (
                          <Eye size={14} style={{ color: 'var(--gray-600)' }} />
                        )}
                      </button>
                      <button
                        className="btn"
                        style={{
                          padding: '0.375rem',
                          backgroundColor: 'white',
                          border: '1px solid var(--gray-300)',
                        }}
                        title="Delete"
                      >
                        <Trash2 size={14} style={{ color: '#ef4444' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {chapters.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No chapters yet</h3>
          <p className="text-gray-600 mb-4">Start writing your first chapter</p>
          <Link to={`/writer/novels/${novelId}/chapters/create`}>
            <button className="btn btn-primary">
              <Plus size={18} style={{ marginRight: '0.5rem' }} />
              Create First Chapter
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ChapterListPage;
