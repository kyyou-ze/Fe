import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Edit, MapPin, Calendar, Users, BookOpen, Share2 } from 'lucide-react';
import useAuthStore from '../store/authStore';
import NovelCard from '../components/ui/NovelCard';

const ProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuthStore();
  const isOwnProfile = !userId || currentUser?.id === parseInt(userId);
  const [activeTab, setActiveTab] = useState('novels');

  const profile = {
    id: userId || currentUser?.id,
    username: 'JohnDoe',
    email: 'john@example.com',
    avatar: null,
    bio: 'Passionate writer of fantasy and sci-fi novels. Love creating epic adventures!',
    location: 'Jakarta, Indonesia',
    joinedDate: 'January 2024',
    role: 'writer',
    stats: {
      novels: 5,
      followers: 3421,
      following: 245,
      totalViews: 456789,
      totalLikes: 23456,
    },
  };

  const novels = [
    {
      id: 1,
      title: 'The Shadow of Eternity',
      author: 'JohnDoe',
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
      author: 'JohnDoe',
      cover: 'https://picsum.photos/seed/novel2/400/600',
      genres: ['Sci-Fi', 'Thriller'],
      rating: 4.6,
      views: 98000,
      likes: 6200,
      status: 'ongoing',
    },
  ];

  const isMobile = window.innerWidth < 768;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Profile Header - Mobile Responsive */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '2rem',
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left',
        }}>
          {/* Avatar */}
          <div style={{
            width: isMobile ? '120px' : '150px',
            height: isMobile ? '120px' : '150px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '2.5rem' : '3rem',
            fontWeight: 700,
            color: 'var(--primary-700)',
            flexShrink: 0,
          }}>
            {profile.username[0].toUpperCase()}
          </div>

          {/* Info */}
          <div style={{ flex: 1, width: '100%' }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'center' : 'flex-start',
              marginBottom: '1rem',
              gap: '1rem',
            }}>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>
                  {profile.username}
                </h1>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--gray-600)',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                }}>
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Joined {profile.joinedDate}</span>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'var(--primary-100)',
                    color: 'var(--primary-700)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}>
                    {profile.role}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: isMobile ? 'center' : 'flex-end',
              }}>
                {isOwnProfile ? (
                  <Link to="/settings">
                    <button className="btn" style={{
                      backgroundColor: 'white',
                      border: '1px solid var(--gray-300)',
                      padding: '0.5rem 1rem',
                    }}>
                      <Edit size={16} style={{ marginRight: '0.5rem' }} />
                      Edit Profile
                    </button>
                  </Link>
                ) : (
                  <>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
                      <Users size={16} style={{ marginRight: '0.5rem' }} />
                      Follow
                    </button>
                    <button className="btn" style={{
                      backgroundColor: 'white',
                      border: '1px solid var(--gray-300)',
                      padding: '0.5rem',
                    }}>
                      <Share2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p style={{
                color: 'var(--gray-700)',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
              }}>
                {profile.bio}
              </p>
            )}

            {/* Stats - Mobile Responsive */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
              gap: '1rem',
              padding: '1.5rem',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <p className="text-2xl font-bold text-gray-900">{profile.stats.novels}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>Novels</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p className="text-2xl font-bold text-gray-900">{profile.stats.followers.toLocaleString()}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>Followers</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p className="text-2xl font-bold text-gray-900">{profile.stats.following.toLocaleString()}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>Following</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p className="text-2xl font-bold text-gray-900">{profile.stats.totalViews.toLocaleString()}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>Views</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p className="text-2xl font-bold text-gray-900">{profile.stats.totalLikes.toLocaleString()}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>Likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        borderBottom: '2px solid var(--gray-200)',
        marginBottom: '2rem',
        overflowX: 'auto',
      }}>
        <div className="flex items-center gap-6">
          {['novels', 'activity', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem 0',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: activeTab === tab ? 'var(--primary-600)' : 'var(--gray-600)',
                borderBottom: activeTab === tab ? '2px solid var(--primary-600)' : 'none',
                marginBottom: '-2px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'novels' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1.5rem',
          }}>
            {novels.map(novel => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </div>
        )}
        {activeTab === 'activity' && (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p className="text-gray-600">Activity feed coming soon</p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p className="text-gray-600">Reviews coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
