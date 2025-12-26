import { Link } from 'react-router-dom';
import { Star, Eye, Heart, BookOpen } from 'lucide-react';

const NovelCard = ({ novel }) => {
  return (
    <Link to={`/novel/${novel.id}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{
        overflow: 'hidden',
        transition: 'all 0.3s',
        cursor: 'pointer',
        padding: 0,
        height: '100%',
      }}>
        {/* Cover Image */}
        <div style={{
          position: 'relative',
          paddingTop: '140%',
          backgroundColor: 'var(--gray-200)',
          overflow: 'hidden',
        }}>
          {novel.cover ? (
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
          ) : (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
            }}>
              <BookOpen size={48} style={{ color: 'white', opacity: 0.5 }} />
            </div>
          )}
          
          {/* Status Badge */}
          {novel.status && (
            <div style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              backgroundColor: novel.status === 'completed' ? '#22c55e' : novel.status === 'ongoing' ? '#3b82f6' : '#f59e0b',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              {novel.status === 'completed' ? 'Completed' : novel.status === 'ongoing' ? 'Ongoing' : 'Hiatus'}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '1rem' }}>
          <h3 className="font-semibold text-gray-900" style={{
            fontSize: '1rem',
            marginBottom: '0.5rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3rem',
          }}>
            {novel.title}
          </h3>

          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-600)',
            marginBottom: '0.75rem',
          }}>
            by {novel.author}
          </p>

          {/* Genres */}
          {novel.genres && novel.genres.length > 0 && (
            <div className="flex items-center gap-1" style={{ marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              {novel.genres.slice(0, 2).map((genre, idx) => (
                <span key={idx} style={{
                  fontSize: '0.75rem',
                  padding: '0.125rem 0.5rem',
                  backgroundColor: 'var(--primary-100)',
                  color: 'var(--primary-700)',
                  borderRadius: 'var(--radius-full)',
                }}>
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4" style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
            <div className="flex items-center gap-1">
              <Star size={14} style={{ color: '#f59e0b' }} />
              <span>{novel.rating || '0.0'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{novel.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} />
              <span>{novel.likes || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NovelCard;
