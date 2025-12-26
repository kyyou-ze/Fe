import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, List, Settings, BookOpen, 
  MessageSquare, Heart, Bookmark, Share2, ArrowLeft,
  Moon, Sun, Type, ZoomIn, ZoomOut
} from 'lucide-react';

const ReadingPage = () => {
  const { novelId, chapterId } = useParams();
  const navigate = useNavigate();

  // Reader Settings
  const [readerSettings, setReaderSettings] = useState({
    fontSize: 18,
    fontFamily: 'serif',
    theme: 'light',
    lineHeight: 1.8,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Dummy data
  const novel = {
    id: novelId,
    title: 'The Shadow of Eternity',
    author: 'John Doe',
    cover: 'https://picsum.photos/seed/novel1/400/600',
  };

  const chapter = {
    id: chapterId,
    number: 142,
    title: 'The Final Confrontation (Part 2)',
    content: `The wind howled through the ancient ruins as Aldric stood face to face with the Dark Lord. His hand gripped the Shadow Blade tightly, its ethereal glow pulsing in rhythm with his heartbeat.

"You've come far, young mage," the Dark Lord's voice echoed through the chamber. "But this is where your journey ends."

Aldric steadied his breathing, remembering all the trials that had brought him to this moment. His friends' sacrifices, the lessons learned, the power he had gained – all of it culminated in this single confrontation.

"No," Aldric replied, his voice firm. "This is where yours ends."

The air crackled with magical energy as both combatants began to summon their powers. Ancient runes appeared around them, glowing with otherworldly light. The very fabric of reality seemed to bend and twist under the weight of their combined might.

Aldric moved first, launching a devastating strike that cleaved through the darkness. The Dark Lord countered with a wave of shadow magic that threatened to consume everything in its path. Their powers collided in the center of the chamber, creating a maelstrom of light and darkness.

As the battle intensified, Aldric could feel the strain on his body. Every spell, every parry, every dodge pushed him closer to his limits. But he couldn't give up now. Too much was at stake. The fate of the entire realm hung in the balance.

"You cannot win," the Dark Lord taunted. "I have existed for millennia. I have faced countless heroes, and they all fell before me."

"Then I'll be the first to succeed," Aldric shot back, channeling every ounce of his remaining strength into one final attack.

The Shadow Blade erupted with blinding light as Aldric thrust it forward. The Dark Lord's eyes widened in surprise as the blade pierced through his defenses, striking true. A scream of rage and pain echoed through the chamber as the darkness began to dissipate.

But victory came at a cost. As the Dark Lord fell, the ancient ruins began to crumble. Aldric knew he had only moments to escape. He turned and ran, the floor collapsing behind him with each step.

Just as he reached the exit, a massive stone pillar crashed down, blocking his path. Aldric raised his hand, summoning what little magic he had left. The pillar exploded into fragments, and he burst through into the open air.

Collapsing on the ground outside, Aldric looked up at the sky. The dark clouds that had hung over the land for so long were beginning to clear. Sunlight broke through, warming his face. He had done it. The Dark Lord was defeated. The realm was saved.

As consciousness began to fade, Aldric smiled. His journey had been long and difficult, but in the end, it had all been worth it. He could finally rest, knowing that peace had been restored.`,
    wordCount: 3245,
    publishedAt: '2 hours ago',
    isPremium: false,
  };

  const allChapters = [
    { id: 142, number: 142, title: 'The Final Confrontation (Part 2)', isPremium: false },
    { id: 141, number: 141, title: 'The Final Confrontation (Part 1)', isPremium: false },
    { id: 140, number: 140, title: 'Gathering Allies', isPremium: false },
    { id: 139, number: 139, title: 'The Dark Prophecy', isPremium: true },
    { id: 138, number: 138, title: 'Return to the Capital', isPremium: true },
  ];

  const comments = [
    { id: 1, user: 'Alice', avatar: null, comment: 'This chapter was epic! The fight scene gave me chills!', likes: 45, time: '1 hour ago' },
    { id: 2, user: 'Bob', avatar: null, comment: 'Finally! Been waiting for this confrontation for 50 chapters!', likes: 32, time: '2 hours ago' },
    { id: 3, user: 'Charlie', avatar: null, comment: 'Amazing writing as always. Can\'t wait for the next chapter!', likes: 28, time: '3 hours ago' },
  ];

  const currentIndex = allChapters.findIndex(ch => ch.id === parseInt(chapterId));
  const prevChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;
  const nextChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;

  // Save reading progress
  useEffect(() => {
    const progress = {
      novelId,
      chapterId,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(`reading_progress_${novelId}`, JSON.stringify(progress));
  }, [novelId, chapterId]);

  // Load reader settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('reader_settings');
    if (saved) {
      setReaderSettings(JSON.parse(saved));
    }
  }, []);

  // Save reader settings
  const updateSettings = (key, value) => {
    const newSettings = { ...readerSettings, [key]: value };
    setReaderSettings(newSettings);
    localStorage.setItem('reader_settings', JSON.stringify(newSettings));
  };

  const themes = {
    light: { bg: '#ffffff', text: '#111827', name: 'Light' },
    sepia: { bg: '#f5e6d3', text: '#5c4a3a', name: 'Sepia' },
    dark: { bg: '#1f2937', text: '#f3f4f6', name: 'Dark' },
  };

  const currentTheme = themes[readerSettings.theme];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      transition: 'all 0.3s',
    }}>
      {/* Top Navigation */}
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: currentTheme.bg,
        borderBottom: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        padding: '1rem 0',
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={`/novel/${novelId}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  color: currentTheme.text,
                  fontSize: '0.875rem',
                }}
              >
                <ArrowLeft size={18} />
                <span>Back to Novel</span>
              </Link>
              <div style={{ width: '1px', height: '1.5rem', backgroundColor: readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb' }} />
              <div>
                <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>{novel.title}</p>
                <p className="font-semibold">Chapter {chapter.number}: {chapter.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChapterList(!showChapterList)}
                className="btn"
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                }}
                title="Chapter List"
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="btn"
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                }}
                title="Reader Settings"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div style={{
          position: 'sticky',
          top: '4rem',
          backgroundColor: currentTheme.bg,
          borderBottom: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
          padding: '1rem 0',
          zIndex: 40,
        }}>
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
              {/* Font Size */}
              <div>
                <p style={{ fontSize: '0.75rem', marginBottom: '0.5rem', opacity: 0.7 }}>Font Size</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateSettings('fontSize', Math.max(14, readerSettings.fontSize - 2))}
                    className="btn"
                    style={{ padding: '0.25rem 0.5rem', backgroundColor: 'transparent', border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}` }}
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span style={{ minWidth: '3rem', textAlign: 'center' }}>{readerSettings.fontSize}px</span>
                  <button
                    onClick={() => updateSettings('fontSize', Math.min(28, readerSettings.fontSize + 2))}
                    className="btn"
                    style={{ padding: '0.25rem 0.5rem', backgroundColor: 'transparent', border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}` }}
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>

              {/* Font Family */}
              <div>
                <p style={{ fontSize: '0.75rem', marginBottom: '0.5rem', opacity: 0.7 }}>Font</p>
                <select
                  value={readerSettings.fontFamily}
                  onChange={(e) => updateSettings('fontFamily', e.target.value)}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                    borderRadius: 'var(--radius-lg)',
                    color: currentTheme.text,
                    cursor: 'pointer',
                  }}
                >
                  <option value="serif">Serif</option>
                  <option value="sans-serif">Sans Serif</option>
                  <option value="monospace">Monospace</option>
                </select>
              </div>

              {/* Theme */}
              <div>
                <p style={{ fontSize: '0.75rem', marginBottom: '0.5rem', opacity: 0.7 }}>Theme</p>
                <div className="flex items-center gap-2">
                  {Object.entries(themes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => updateSettings('theme', key)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: theme.bg,
                        color: theme.text,
                        border: readerSettings.theme === key ? '2px solid var(--primary-600)' : '1px solid #e5e7eb',
                        borderRadius: 'var(--radius-lg)',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                      }}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter List Sidebar */}
      {showChapterList && (
        <div
          style={{
            position: 'fixed',
            right: 0,
            top: '4rem',
            width: '300px',
            height: 'calc(100vh - 4rem)',
            backgroundColor: currentTheme.bg,
            borderLeft: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
            overflowY: 'auto',
            zIndex: 40,
            padding: '1rem',
          }}
        >
          <h3 className="font-semibold mb-4">All Chapters</h3>
          <div className="space-y-2">
            {allChapters.map((ch) => (
              <Link
                key={ch.id}
                to={`/novel/${novelId}/chapter/${ch.id}`}
                onClick={() => setShowChapterList(false)}
                style={{
                  display: 'block',
                  padding: '0.75rem',
                  backgroundColor: ch.id === parseInt(chapterId) ? 'var(--primary-100)' : 'transparent',
                  color: ch.id === parseInt(chapterId) ? 'var(--primary-700)' : currentTheme.text,
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Chapter {ch.number}</span>
                  {ch.isPremium && <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Premium</span>}
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>{ch.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <article style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {/* Chapter Header */}
          <header style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: `2px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}` }}>
            <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.5rem' }}>
              Chapter {chapter.number}
            </p>
            <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
            <div className="flex items-center gap-4" style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              <span>{chapter.wordCount.toLocaleString()} words</span>
              <span>•</span>
              <span>Published {chapter.publishedAt}</span>
            </div>
          </header>
          {/* Chapter Content - ANTI COPY */}
          <div style={{
          fontSize: `${readerSettings.fontSize}px`,
          lineHeight: readerSettings.lineHeight,
          fontFamily: readerSettings.fontFamily,
          whiteSpace: 'pre-wrap',
          marginBottom: '3rem',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          }}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          >
            {chapter.content}
            </div>

          {/* Chapter Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            borderTop: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
            borderBottom: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
            marginBottom: '3rem',
          }}>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="btn"
              style={{
                backgroundColor: isLiked ? '#fee2e2' : 'transparent',
                color: isLiked ? '#ef4444' : currentTheme.text,
                border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              }}
            >
              <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} style={{ marginRight: '0.5rem' }} />
              Like
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="btn"
              style={{
                backgroundColor: isBookmarked ? '#dbeafe' : 'transparent',
                color: isBookmarked ? '#3b82f6' : currentTheme.text,
                border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              }}
            >
              <Bookmark size={18} fill={isBookmarked ? '#3b82f6' : 'none'} style={{ marginRight: '0.5rem' }} />
              Bookmark
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              }}
            >
              <Share2 size={18} style={{ marginRight: '0.5rem' }} />
              Share
            </button>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '3rem',
          }}>
            {prevChapter ? (
              <Link to={`/novel/${novelId}/read/${prevChapter.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                <button className="btn" style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  padding: '1rem',
                  textAlign: 'left',
                }}>
                  <div className="flex items-center gap-2">
                    <ChevronLeft size={18} />
                    <div>
                      <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Previous</p>
                      <p className="font-medium" style={{ fontSize: '0.875rem' }}>Chapter {prevChapter.number}</p>
                    </div>
                  </div>
                </button>
              </Link>
            ) : (
              <div style={{ flex: 1 }} />
            )}

            {nextChapter ? (
              <Link to={`/novel/${novelId}/read/${nextChapter.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                <button className="btn" style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: `1px solid ${readerSettings.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  padding: '1rem',
                  textAlign: 'right',
                }}>
                  <div className="flex items-center justify-end gap-2">
                    <div>
                      <p style={{ fontSize: '0.75rem', opacity: '0.7' }}>Next</p>
                      <p className="font-medium"
                      style={{ fontSize: '0.875rem'
                      }}>Chapter {nextChapter.number}</p>
                    </div>
                    <ChevronRight size={18} />
                  </div>
                </button>
              </Link>
            ) : (
              <div style={{ flex: 1 }} />
            )}
          </div>

          {/* Comments Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
            
            {/* Add Comment */}
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: readerSettings.theme === 'dark' ? '#374151' : '#f9fafb',
              borderRadius: 'var(--radius-xl)',
            }}>
              <textarea
                placeholder="Share your thoughts about this chapter..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: currentTheme.bg,
                  color: currentTheme.text,
                  border: `1px solid ${readerSettings.theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  resize: 'vertical',
                  marginBottom: '1rem',
                }}
              />
              <button className="btn btn-primary">Post Comment</button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: readerSettings.theme === 'dark' ? '#374151' : '#f9fafb',
                    borderRadius: 'var(--radius-xl)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
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
                      {comment.user[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{comment.user}</p>
                      <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>{comment.time}</p>
                    </div>
                  </div>
                  <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>{comment.comment}</p>
                  <button
                    className="btn"
                    style={{
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.75rem',
                      backgroundColor: 'transparent',
                      border: `1px solid ${readerSettings.theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
                    }}
                  >
                    <Heart size={12} style={{ marginRight: '0.25rem' }} />
                    {comment.likes}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ReadingPage;
