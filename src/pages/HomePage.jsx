import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Star, ChevronRight } from 'lucide-react';
import FeaturedSlider from '../components/ui/FeaturedSlider';
import NovelCard from '../components/ui/NovelCard';

const HomePage = () => {
  // Dummy data - nanti diganti dengan API
  const [featuredNovels] = useState([
    {
      id: 1,
      title: 'The Shadow of Eternity',
      author: 'John Doe',
      description: 'In a world where magic and technology collide, one hero must rise to save humanity from an ancient darkness that threatens to consume everything.',
      cover: 'https://picsum.photos/seed/novel1/400/600',
      genres: ['Fantasy', 'Adventure', 'Magic'],
      rating: 4.8,
      views: 125000,
      likes: 8500,
      status: 'ongoing',
    },
    {
      id: 2,
      title: 'Digital Dreams',
      author: 'Jane Smith',
      description: 'A cyberpunk thriller where reality and virtual reality blur. Follow the journey of a hacker trying to uncover the truth behind a massive conspiracy.',
      cover: 'https://picsum.photos/seed/novel2/400/600',
      genres: ['Sci-Fi', 'Thriller', 'Cyberpunk'],
      rating: 4.6,
      views: 98000,
      likes: 6200,
      status: 'ongoing',
    },
    {
      id: 3,
      title: 'Whispers of the Heart',
      author: 'Emily Brown',
      description: 'A touching romance that spans across two lifetimes. Will their love be strong enough to overcome the boundaries of time itself?',
      cover: 'https://picsum.photos/seed/novel3/400/600',
      genres: ['Romance', 'Drama', 'Fantasy'],
      rating: 4.9,
      views: 156000,
      likes: 12000,
      status: 'completed',
    },
  ]);

  const [newestNovels] = useState([
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
    {
      id: 7,
      title: 'Moonlight Sonata',
      author: 'Anna Taylor',
      cover: 'https://picsum.photos/seed/novel7/400/600',
      genres: ['Romance', 'Drama'],
      rating: 4.8,
      views: 89000,
      likes: 7200,
      status: 'completed',
    },
  ]);

  const [popularNovels] = useState([
    {
      id: 8,
      title: 'Empire of Ashes',
      author: 'David Chen',
      cover: 'https://picsum.photos/seed/novel8/400/600',
      genres: ['Fantasy', 'War'],
      rating: 4.9,
      views: 234000,
      likes: 18500,
      status: 'ongoing',
    },
    {
      id: 9,
      title: 'Virtual Legends',
      author: 'Lisa Wang',
      cover: 'https://picsum.photos/seed/novel9/400/600',
      genres: ['Sci-Fi', 'Gaming'],
      rating: 4.7,
      views: 198000,
      likes: 15200,
      status: 'ongoing',
    },
    {
      id: 10,
      title: 'Eternal Love Story',
      author: 'Tom Martinez',
      cover: 'https://picsum.photos/seed/novel10/400/600',
      genres: ['Romance', 'Fantasy'],
      rating: 4.8,
      views: 167000,
      likes: 13400,
      status: 'completed',
    },
    {
      id: 11,
      title: 'Dark Academia',
      author: 'Rachel Green',
      cover: 'https://picsum.photos/seed/novel11/400/600',
      genres: ['Mystery', 'Thriller'],
      rating: 4.6,
      views: 145000,
      likes: 11200,
      status: 'ongoing',
    },
  ]);

  const [topRatedNovels] = useState([
    {
      id: 12,
      title: 'Masterpiece of Time',
      author: 'Alexander White',
      cover: 'https://picsum.photos/seed/novel12/400/600',
      genres: ['Fantasy', 'Adventure'],
      rating: 5.0,
      views: 289000,
      likes: 24500,
      status: 'completed',
    },
    {
      id: 13,
      title: 'The Perfect Crime',
      author: 'Detective Black',
      cover: 'https://picsum.photos/seed/novel13/400/600',
      genres: ['Mystery', 'Thriller'],
      rating: 4.9,
      views: 276000,
      likes: 22300,
      status: 'completed',
    },
    {
      id: 14,
      title: 'Quantum Dreams',
      author: 'Dr. Sarah Nova',
      cover: 'https://picsum.photos/seed/novel14/400/600',
      genres: ['Sci-Fi', 'Philosophy'],
      rating: 4.9,
      views: 234000,
      likes: 19800,
      status: 'ongoing',
    },
    {
      id: 15,
      title: 'Hearts Entwined',
      author: 'Emma Rose',
      cover: 'https://picsum.photos/seed/novel15/400/600',
      genres: ['Romance', 'Drama'],
      rating: 4.8,
      views: 201000,
      likes: 17600,
      status: 'completed',
    },
  ]);

  return (
    <div>
      {/* Featured Slider */}
      <div className="container">
        <FeaturedSlider novels={featuredNovels} />
      </div>

      {/* Newest Novels */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock size={28} style={{ color: 'var(--primary-600)' }} />
              <h2 className="text-3xl font-bold text-gray-900">Newest Novels</h2>
            </div>
            <Link to="/novels?sort=newest" style={{ textDecoration: 'none' }}>
              <button className="btn" style={{
                backgroundColor: 'transparent',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                View All
                <ChevronRight size={18} />
              </button>
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {newestNovels.map((novel) => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Novels */}
      <section style={{ marginBottom: '4rem', backgroundColor: 'var(--gray-100)', padding: '4rem 0' }}>
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp size={28} style={{ color: 'var(--secondary-600)' }} />
              <h2 className="text-3xl font-bold text-gray-900">Popular This Week</h2>
            </div>
            <Link to="/novels?sort=popular" style={{ textDecoration: 'none' }}>
              <button className="btn" style={{
                backgroundColor: 'transparent',
                color: 'var(--secondary-600)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                View All
                <ChevronRight size={18} />
              </button>
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {popularNovels.map((novel) => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Novels */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Star size={28} style={{ color: '#f59e0b' }} />
              <h2 className="text-3xl font-bold text-gray-900">Top Rated</h2>
            </div>
            <Link to="/novels?sort=rating" style={{ textDecoration: 'none' }}>
              <button className="btn" style={{
                backgroundColor: 'transparent',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                View All
                <ChevronRight size={18} />
              </button>
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {topRatedNovels.map((novel) => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: 'var(--primary-600)',
        padding: '4rem 0',
        marginTop: '4rem',
      }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Writing Journey
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Join thousands of writers and share your stories with millions of readers
          </p>
          <Link to="/register">
            <button className="btn" style={{
              backgroundColor: 'white',
              color: 'var(--primary-600)',
              fontWeight: 600,
            }}>
              Become a Writer
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
