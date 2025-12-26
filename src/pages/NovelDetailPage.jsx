import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Eye, Heart, BookOpen, Clock, User, Tag, Share2, Bookmark, MessageSquare } from 'lucide-react';

const NovelDetailPage = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const novel = {
    id: id,
    title: 'The Shadow of Eternity',
    author: 'John Doe',
    authorId: 1,
    cover: 'https://picsum.photos/seed/novel1/400/600',
    description: 'In a world where magic and technology collide, one hero must rise to save humanity from an ancient darkness that threatens to consume everything. Follow the epic journey of Aldric, a young mage who discovers he is the chosen one destined to wield the legendary Shadow Blade.',
    genres: ['Fantasy', 'Adventure', 'Magic', 'Action'],
    tags: ['Overpowered MC', 'System', 'Leveling', 'Epic Battles'],
    rating: 4.8,
    totalRatings: 2453,
    views: 125000,
    likes: 8500,
    bookmarks: 5200,
    status: 'ongoing',
    language: 'English',
    totalChapters: 142,
    lastUpdated: '2 hours ago',
  };

  const chapters = [
    { id: 1, number: 142, title: 'The Final Confrontation (Part 2)', publishedAt: '2 hours ago', isPremium: false },
    { id: 2, number: 141, title: 'The Final Confrontation (Part 1)', publishedAt: '2 days ago', isPremium: false },
    { id: 3, number: 140, title: 'Gathering Allies', publishedAt: '4 days ago', isPremium: false },
    { id: 4, number: 139, title: 'The Dark Prophecy', publishedAt: '6 days ago', isPremium: true },
    { id: 5, number: 138, title: 'Return to the Capital', publishedAt: '1 week ago', isPremium: true },
  ];

  const reviews = [
    { id: 1, user: 'Alice', rating: 5, comment: 'Amazing story! The world-building is incredible.', date: '1 day ago' },
    { id: 2, user: 'Bob', rating: 4, comment: 'Great read, though the pacing slows down a bit.', date: '3 days ago' },
  ];

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Hero Section - Mobile Responsive */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '250px 1fr',
        gap: '2rem',
        marginBottom: '3rem',
      }}>
        {/* Cover */}
        <div style={{ margin: window.innerWidth < 768 ? '0 auto' : '0' }}>
          <div style={{
            width: window.innerWidth < 768 ? '200px' : '250px',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-2xl)',
          }}>
            <img src={novel.cover} alt={novel.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontSize: window.innerWidth < 768 ? '1.5rem' : '2rem' }}>
            {novel.title}
          </h1>
          
          <Link to={`/author/${novel.authorId}`} style={{ textDecoration: 'none' }}>
            <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--gray-700)' }}>
              <User size={18} />
              <span className="font-medium">by {novel.author}</span>
            </div>
          </Link>

          {/* Stats */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1rem',
            fontSize: '0.875rem',
          }}>
            <div className="flex items-center gap-2">
              <Star size={20} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
              <span className="font-semibold text-gray-900">{novel.rating}</span>
              <span className="text-gray-600">({novel.totalRatings})</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Eye size={18} />
              <span>{novel.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Heart size={18} />
              <span>{novel.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Bookmark size={18} />
              <span>{novel.bookmarks.toLocaleString()}</span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex items-center gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
            {novel.genres.map((genre, idx) => (
              <span key={idx} style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--primary-100)',
                color: 'var(--primary-700)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}>
                {genre}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-6" style={{ flexWrap: 'wrap' }}>
            <Tag size={16} style={{ color: 'var(--gray-500)' }} />
            {novel.tags.map((tag, idx) => (
              <span key={idx} style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: 'var(--gray-100)',
                color: 'var(--gray-700)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Status & Info */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            color: 'var(--gray-600)',
          }}>
            <div className="flex items-center gap-2">
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
              }} />
              <span className="font-medium">{novel.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>{novel.totalChapters} Chapters</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Updated {novel.lastUpdated}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}>
            <Link to={`/novel/${novel.id}/chapter/1`} style={{ flex: window.innerWidth < 768 ? '1 1 100%' : '0' }}>
              <button className="btn btn-primary" style={{ width: '100%' }}>
                <BookOpen size={18} style={{ marginRight: '0.5rem' }} />
                Start Reading
              </button>
            </Link>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="btn"
              style={{
                backgroundColor: isLiked ? '#fee2e2' : 'var(--white)',
                color: isLiked ? '#ef4444' : 'var(--gray-700)',
                border: '1px solid var(--gray-300)',
              }}
            >
              <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="btn"
              style={{
                backgroundColor: isBookmarked ? '#dbeafe' : 'var(--white)',
                color: isBookmarked ? '#3b82f6' : 'var(--gray-700)',
                border: '1px solid var(--gray-300)',
              }}
            >
              <Bookmark size={18} fill={isBookmarked ? '#3b82f6' : 'none'} />
            </button>
            <button className="btn" style={{
              backgroundColor: 'var(--white)',
              color: 'var(--gray-700)',
              border: '1px solid var(--gray-300)',
            }}>
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="card mb-6" style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }} onCopy={(e) => e.preventDefault()}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Synopsis</h2>
        <p style={{ lineHeight: '1.8', color: 'var(--gray-700)' }}>
          {novel.description}
        </p>
      </div>

      {/* Chapters List */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Chapters</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            Latest: Ch {novel.totalChapters}
          </span>
        </div>
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/novel/${novel.id}/chapter/${chapter.number}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                padding: window.innerWidth < 768 ? '0.75rem' : '1rem',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                  gap: window.innerWidth < 768 ? '0.5rem' : '0',
                  alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">Chapter {chapter.number}</span>
                      {chapter.isPremium && (
                        <span style={{
                          backgroundColor: '#fef3c7',
                          color: '#92400e',
                          padding: '0.125rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}>
                          Premium
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-700)', marginTop: '0.25rem' }}>
                      {chapter.title}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                    {chapter.publishedAt}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <button className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            Write Review
          </button>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} style={{
              padding: '1rem',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    color: 'var(--primary-700)',
                  }}>
                    {review.user[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.user}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} style={{
                          color: '#f59e0b',
                          fill: i < review.rating ? '#f59e0b' : 'none',
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                  {review.date}
                </span>
              </div>
              <p style={{ color: 'var(--gray-700)', lineHeight: '1.6' }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NovelDetailPage;
