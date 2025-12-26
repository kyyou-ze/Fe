import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Clock, Type, BookOpen, Lock, Unlock } from 'lucide-react';

const ChapterEditorPage = () => {
  const { novelId, chapterId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!chapterId;
  const autoSaveTimer = useRef(null);
  const isMobile = window.innerWidth < 768;

  const [formData, setFormData] = useState({
    number: '',
    title: '',
    content: '',
    isPremium: false,
  });

  const [editorState, setEditorState] = useState({
    isSaving: false,
    lastSaved: null,
    showPreview: false,
    wordCount: 0,
    charCount: 0,
    readingTime: 0,
  });

  // Calculate stats
  useEffect(() => {
    const words = formData.content.trim().split(/\s+/).filter(w => w.length > 0).length;
    const chars = formData.content.length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words/min

    setEditorState(prev => ({
      ...prev,
      wordCount: words,
      charCount: chars,
      readingTime: readingTime,
    }));
  }, [formData.content]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    autoSaveTimer.current = setTimeout(() => {
      if (formData.content.length > 0 || formData.title.length > 0) {
        autoSave();
      }
    }, 10000); // Auto-save every 10 seconds

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [formData]);

  const autoSave = async () => {
    // Save to localStorage
    const draftKey = `chapter_draft_${novelId}_${chapterId || 'new'}`;
    localStorage.setItem(draftKey, JSON.stringify({
      ...formData,
      savedAt: new Date().toISOString(),
    }));
    
    setEditorState(prev => ({
      ...prev,
      lastSaved: new Date(),
    }));
  };

  // Load draft from localStorage
  useEffect(() => {
    const draftKey = `chapter_draft_${novelId}_${chapterId || 'new'}`;
    const savedDraft = localStorage.getItem(draftKey);
    
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setFormData({
        number: draft.number || '',
        title: draft.title || '',
        content: draft.content || '',
        isPremium: draft.isPremium || false,
      });
    }
  }, [novelId, chapterId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveDraft = async () => {
    setEditorState(prev => ({ ...prev, isSaving: true }));
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saving draft:', formData);
      setEditorState(prev => ({
        ...prev,
        isSaving: false,
        lastSaved: new Date(),
      }));
    }, 1000);
  };

  const handlePublish = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content before publishing');
      return;
    }

    setEditorState(prev => ({ ...prev, isSaving: true }));
    
    // Simulate API call
    setTimeout(() => {
      console.log('Publishing chapter:', formData);
      
      // Clear draft from localStorage
      const draftKey = `chapter_draft_${novelId}_${chapterId || 'new'}`;
      localStorage.removeItem(draftKey);
      
      navigate(`/writer/novels/${novelId}/chapters`);
    }, 1500);
  };

  const formatLastSaved = () => {
    if (!editorState.lastSaved) return 'Not saved yet';
    
    const diff = Math.floor((new Date() - editorState.lastSaved) / 1000);
    
    if (diff < 60) return `Saved ${diff}s ago`;
    if (diff < 3600) return `Saved ${Math.floor(diff / 60)}m ago`;
    return `Saved ${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: '4rem',
        backgroundColor: 'var(--white)',
        borderBottom: '1px solid var(--gray-200)',
        padding: isMobile ? '0.75rem 0' : '1rem 0',
        marginBottom: '1.5rem',
        zIndex: 10,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.75rem' : '1rem',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
        }}>
          <button
            onClick={() => navigate(`/writer/novels/${novelId}/chapters`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: 'var(--primary-600)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <ArrowLeft size={16} />
            Back to Chapters
          </button>
          
          <div className="flex items-center gap-3">
            {/* Auto-save indicator */}
            <div className="flex items-center gap-2" style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
              <Clock size={14} />
              <span>{formatLastSaved()}</span>
            </div>

            {/* Preview Toggle */}
            <button
              onClick={() => setEditorState(prev => ({ ...prev, showPreview: !prev.showPreview }))}
              className="btn"
              style={{
                backgroundColor: editorState.showPreview ? 'var(--primary-600)' : 'white',
                color: editorState.showPreview ? 'white' : 'var(--gray-700)',
                border: '1px solid var(--gray-300)',
                padding: '0.5rem 1rem',
              }}
            >
              <Eye size={16} style={{ marginRight: '0.5rem' }} />
              Preview
            </button>

            {/* Save Draft */}
            <button
              onClick={handleSaveDraft}
              disabled={editorState.isSaving}
              className="btn"
              style={{
                backgroundColor: 'white',
                border: '1px solid var(--gray-300)',
                padding: '0.5rem 1rem',
              }}
            >
              <Save size={16} style={{ marginRight: '0.5rem' }} />
              Save Draft
            </button>

            {/* Publish */}
            <button
              onClick={handlePublish}
              disabled={editorState.isSaving}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.5rem' }}
            >
              {editorState.isSaving ? 'Publishing...' : (isEditMode ? 'Update Chapter' : 'Publish Chapter')}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6" style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
          <div className="flex items-center gap-2">
            <Type size={16} />
            <span><strong>{editorState.wordCount.toLocaleString()}</strong> words</span>
          </div>
          <div className="flex items-center gap-2">
            <span><strong>{editorState.charCount.toLocaleString()}</strong> characters</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={16} />
            <span><strong>{editorState.readingTime}</strong> min read</span>
          </div>
        </div>
      </div>

      {!editorState.showPreview ? (
        /* Editor Mode */
        <div>
          {/* Chapter Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '150px 1fr auto',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            {/* Chapter Number */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--gray-700)',
                marginBottom: '0.5rem',
              }}>
                Chapter #
              </label>
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="1"
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Chapter Title */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--gray-700)',
                marginBottom: '0.5rem',
              }}>
                Chapter Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter chapter title..."
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Premium Toggle */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--gray-700)',
                marginBottom: '0.5rem',
              }}>
                Access
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1rem',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  backgroundColor: formData.isPremium ? '#fef3c7' : 'white',
                }}
              >
                <input
                  type="checkbox"
                  name="isPremium"
                  checked={formData.isPremium}
                  onChange={handleChange}
                  style={{ cursor: 'pointer' }}
                />
                {formData.isPremium ? (
                  <>
                    <Lock size={16} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#92400e' }}>Premium</span>
                  </>
                ) : (
                  <>
                    <Unlock size={16} style={{ color: 'var(--gray-600)' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Free</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--gray-700)',
              marginBottom: '0.5rem',
            }}>
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Start writing your chapter here..."
              style={{
                width: '100%',
                minHeight: '600px',
                padding: '1.5rem',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                lineHeight: '1.8',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'Georgia, serif',
              }}
            />
          </div>

          {/* Writing Tips */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-200)',
          }}>
            <h4 className="font-semibold text-gray-900 mb-2" style={{ fontSize: '0.875rem' }}>
              💡 Writing Tips
            </h4>
            <ul style={{ fontSize: '0.75rem', color: 'var(--gray-600)', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
              <li>Aim for 2000-3000 words per chapter for optimal reading experience</li>
              <li>Use paragraph breaks frequently to improve readability</li>
              <li>Your work is auto-saved every 10 seconds</li>
              <li>Use "Preview" to see how your chapter looks to readers</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Preview Mode */
        <div>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
          }}>
            {/* Chapter Header */}
            <div style={{ marginBottom: '2rem', borderBottom: '2px solid var(--gray-200)', paddingBottom: '1.5rem' }}>
              {formData.number && (
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>
                  Chapter {formData.number}
                </p>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {formData.title || 'Untitled Chapter'}
              </h1>
              <div className="flex items-center gap-4" style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                <span>{editorState.wordCount.toLocaleString()} words</span>
                <span>•</span>
                <span>{editorState.readingTime} min read</span>
                {formData.isPremium && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1" style={{ color: '#f59e0b' }}>
                      <Lock size={14} />
                      Premium
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Chapter Content */}
            <div style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: 'var(--gray-800)',
              fontFamily: 'Georgia, serif',
              whiteSpace: 'pre-wrap',
            }}>
              {formData.content || (
                <p style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>
                  No content yet. Start writing to see the preview.
                </p>
              )}
            </div>

            {/* Preview Footer */}
            <div style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--gray-200)',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                End of preview
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterEditorPage;
