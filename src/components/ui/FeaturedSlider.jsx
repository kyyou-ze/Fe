import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedSlider = ({ novels }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || !novels || novels.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % novels.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, novels]);

  if (!novels || novels.length === 0) {
    return null;
  }

  const currentNovel = novels[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + novels.length) % novels.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % novels.length);
    setIsAutoPlaying(false);
  };

  return (
    <div style={{
      position: 'relative',
      height: '400px',
      borderRadius: 'var(--radius-2xl)',
      overflow: 'hidden',
      marginBottom: '3rem',
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: currentNovel.cover ? `url(${currentNovel.cover})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px)',
        transform: 'scale(1.1)',
      }} />
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Content */}
      <div className="container" style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'var(--primary-600)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1rem',
          }}>
            Featured Novel
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            {currentNovel.title}
          </h1>

          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1rem',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {currentNovel.description || 'An amazing story waiting to be discovered...'}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
              by {currentNovel.author}
            </span>
            {currentNovel.genres && currentNovel.genres.length > 0 && (
              <div className="flex items-center gap-2">
                {currentNovel.genres.slice(0, 3).map((genre, idx) => (
                  <span key={idx} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                  }}>
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>

          <Link to={`/novel/${currentNovel.id}`}>
            <button className="btn btn-primary">
              Read Now
            </button>
          </Link>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-2" style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
      }}>
        {novels.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              setIsAutoPlaying(false);
            }}
            style={{
              width: currentIndex === idx ? '2rem' : '0.5rem',
              height: '0.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: currentIndex === idx ? 'white' : 'rgba(255, 255, 255, 0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSlider;
