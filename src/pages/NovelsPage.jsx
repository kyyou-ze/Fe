import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import NovelCard from '../components/ui/NovelCard';

const NovelsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genres: [],
    status: 'all',
    language: 'all',
    sortBy: 'popular',
  });

  const genres = ['Fantasy', 'Romance', 'Sci-Fi', 'Mystery', 'Thriller', 'Adventure', 'Drama', 'Action', 'Horror', 'Comedy'];
  const statuses = ['all', 'ongoing', 'completed', 'hiatus'];
  const languages = ['all', 'English', 'Indonesian', 'Chinese', 'Korean', 'Japanese'];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'chapters', label: 'Most Chapters' },
  ];

  // Dummy data
  const novels = [
    {
      id: 1,
      title: 'The Shadow of Eternity',
      author: 'John Doe',
      cover: 'https://picsum.photos/seed/novel1/400/600',
      genres: ['Fantasy', 'Adventure'],
      rating: 4.8,
      views: 125000,
      likes: 8500,
      status: 'ongoing',
    },
    {
      id: 2,
      title: 'Digital Dreams',
      author: 'Jane Smith',
      cover: 'https://picsum.photos/seed/novel2/400/600',
      genres: ['Sci-Fi', 'Thriller'],
      rating: 4.6,
      views: 98000,
      likes: 6200,
      status: 'ongoing',
    },
    {
      id: 3,
      title: 'Whispers of the Heart',
      author: 'Emily Brown',
      cover: 'https://picsum.photos/seed/novel3/400/600',
      genres: ['Romance', 'Drama'],
      rating: 4.9,
      views: 156000,
      likes: 12000,
      status: 'completed',
    },
    {
      id: 4,
      title: 'Crimson Blade Chronicles',
      author: 'Mike Johnson',
      cover: 'https://picsum.photos/seed/novel4/400/600',
      genres: ['Action', 'Fantasy'],
      rating: 4.5,
      views: 45000,
      likes: 3200,
      status: 'ongoing',
    },
    {
      id: 5,
      title: 'The Last Alchemist',
      author: 'Sarah Wilson',
      cover: 'https://picsum.photos/seed/novel5/400/600',
      genres: ['Fantasy', 'Adventure'],
      rating: 4.7,
      views: 67000,
      likes: 5100,
      status: 'ongoing',
    },
    {
      id: 6,
      title: 'Neon Nights',
      author: 'Chris Lee',
      cover: 'https://picsum.photos/seed/novel6/400/600',
      genres: ['Sci-Fi', 'Mystery'],
      rating: 4.4,
      views: 34000,
      likes: 2800,
      status: 'ongoing',
    },
  ];

  const toggleGenre = (genre) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const clearFilters = () => {
    setFilters({
      genres: [],
      status: 'all',
      language: 'all',
      sortBy: 'popular',
    });
    setSearchQuery('');
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Novels</h1>
        <p className="text-gray-600">Discover your next favorite story from thousands of novels</p>
      </div>

      {/* Search & Filter Bar */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <Search size={20} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--gray-400)',
          }} />
          <input
            type="text"
            placeholder="Search novels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '3rem',
              paddingRight: '1rem',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              border: '1px solid var(--gray-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          style={{
            padding: '0.75rem 1rem',
            border: '1px solid var(--gray-300)',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn"
          style={{
            backgroundColor: showFilters ? 'var(--primary-600)' : 'white',
            color: showFilters ? 'white' : 'var(--gray-700)',
            border: '1px solid var(--gray-300)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {/* Active Filters */}
      {(filters.genres.length > 0 || filters.status !== 'all' || filters.language !== 'all') && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)', fontWeight: 500 }}>
            Active Filters:
          </span>
          {filters.genres.map(genre => (
            <span key={genre} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: 'var(--primary-100)',
              color: 'var(--primary-700)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
            }}>
              {genre}
              <button onClick={() => toggleGenre(genre)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <X size={14} />
              </button>
            </span>
          ))}
          {filters.status !== 'all' && (
            <span style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: 'var(--secondary-100)',
              color: 'var(--secondary-700)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
            }}>
              Status: {filters.status}
            </span>
          )}
          <button onClick={clearFilters} style={{
            fontSize: '0.75rem',
            color: 'var(--gray-600)',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}>
            Clear all
          </button>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          {/* Genres */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 className="font-semibold text-gray-900 mb-3">Genres</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: filters.genres.includes(genre) ? 'var(--primary-600)' : 'var(--gray-100)',
                    color: filters.genres.includes(genre) ? 'white' : 'var(--gray-700)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setFilters({ ...filters, status })}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: filters.status === status ? 'var(--secondary-600)' : 'var(--gray-100)',
                    color: filters.status === status ? 'white' : 'var(--gray-700)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Language</h3>
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '200px',
              }}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang === 'all' ? 'All Languages' : lang}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Results */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
          Showing {novels.length} novels
        </p>
      </div>

      {/* Novels Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.5rem',
      }}>
        {novels.map((novel) => (
          <NovelCard key={novel.id} novel={novel} />
        ))}
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '3rem',
      }}>
        <button className="btn" style={{ padding: '0.5rem 1rem' }}>
          Previous
        </button>
        {[1, 2, 3, 4, 5].map(page => (
          <button
            key={page}
            className="btn"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: page === 1 ? 'var(--primary-600)' : 'white',
              color: page === 1 ? 'white' : 'var(--gray-700)',
            }}
          >
            {page}
          </button>
        ))}
        <button className="btn" style={{ padding: '0.5rem 1rem' }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NovelsPage;
