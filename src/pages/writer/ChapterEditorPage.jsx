import { useState, useEffect, useRef, useCallback } from 'react';
import { Save, Eye, ArrowLeft, Clock, Type, BookOpen, Lock, Unlock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock payment store hook
const usePaymentStore = () => ({
  canPublishChapter: () => Math.random() > 0.3 // 70% chance can publish
});

// Mock WriterPremiumBanner component
const WriterPremiumBanner = ({ type, onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '1rem',
      maxWidth: '500px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Upgrade to Premium
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        You've reached your free chapter publishing limit. Upgrade to Premium to publish unlimited chapters!
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => alert('Redirect to pricing page')}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Upgrade Now
        </button>
      </div>
    </div>
  </div>
);

const ChapterEditorPage = () => {
  const { canPublishChapter } = usePaymentStore();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Mock route params
  const novelId = 'novel-123';
  const chapterId = null; // Set to null for new chapter, or 'chapter-456' for edit
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

  // State for storing drafts (replaces localStorage)
  const [drafts, setDrafts] = useState({});

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

  // Auto-save function
  const autoSave = useCallback(() => {
    const draftKey = `chapter_draft_${novelId}_${chapterId || 'new'}`;
    setDrafts(prev => ({
      ...prev,
      [draftKey]: {
        ...formData,
        savedAt: new Date().toISOString(),
      }
    }));
    
    setEditorState(prev => ({
      ...prev,
      lastSaved: new Date(),
    }));
  }, [formData, novelId, chapterId]);

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
  }, [formData, autoSave]);

  // Load draft on mount
  useEffect(() => {
    const draftKey = `chapter_draft_${novelId}_${chapterId || 'new'}`;
    const savedDraft = drafts[draftKey];
    
    if (savedDraft) {
      setFormData({
        number: savedDraft.number || '',
        title: savedDraft.title || '',
        content: savedDraft.content || '',
        isPremium: savedDraft.isPremium || false,
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
      autoSave();
      setEditorState(prev => ({
        ...prev,
        isSaving: false,
      }));
    }, 1000);
  };

  const handlePublish = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content before publishing');
      return;
    }

    // Check if can publish
    if (!canPublishChapter()) {
      setShowPremiumModal(true);
      return;
    }

    setEditorState(prev => ({ ...prev, isSaving: true }));
    
    setTimeout(() => {
      console.log('Publishing chapter:', formData);
      
      // Remove draft from state
      const draftKey = `chapter_draft_${novelId}_${chapterId || 'new'}`;
      setDrafts(prev => {
        const newDrafts = {...prev};
        delete newDrafts[draftKey];
        return newDrafts;
      });
      
      alert('Chapter published successfully!');
      setEditorState(prev => ({ ...prev, isSaving: false }));
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
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: isMobile ? '1rem' : '2rem',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      {showPremiumModal && (
        <WriterPremiumBanner 
          type="modal" 
          onClose={() => setShowPremiumModal(false)} 
        />
      )}
      
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
        marginBottom: '1.5rem',
        zIndex: 10,
        marginLeft: isMobile ? '-1rem' : '-2rem',
        marginRight: isMobile ? '-1rem' : '-2rem',
        marginTop: isMobile ? '-1rem' : '-2rem',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.75rem' : '1rem',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}>             
        <Link
                to={`writer/novels/${novelId}/chapters`}
                style={{display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            marginBottom: '1rem',
            padding: 0,
                  
                }}
              >
                <ArrowLeft size={18} />
                <span>Back to chapter</span>
              </Link>

          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}>
            {/* Auto-save indicator */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontSize: '0.75rem', 
              color: '#6b7280' 
            }}>
              <Clock size={14} />
              <span>{formatLastSaved()}</span>
            </div>

            {/* Preview Toggle */}
            <button
              onClick={() => setEditorState(prev => ({ ...prev, showPreview: !prev.showPreview }))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: editorState.showPreview ? '#3b82f6' : 'white',
                color: editorState.showPreview ? 'white' : '#374151',
                border: '1px solid #d1d5db',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              <Eye size={16} />
              {!isMobile && 'Preview'}
            </button>

            {/* Save Draft */}
            <button
              onClick={handleSaveDraft}
              disabled={editorState.isSaving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: editorState.isSaving ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                opacity: editorState.isSaving ? 0.6 : 1,
              }}
            >
              <Save size={16} />
              {!isMobile && 'Save'}
            </button>

            {/* Publish */}
            <button
              onClick={handlePublish}
              disabled={editorState.isSaving}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: editorState.isSaving ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                opacity: editorState.isSaving ? 0.6 : 1,
              }}
            >
              {editorState.isSaving ? 'Publishing...' : (isEditMode ? 'Update' : 'Publish')}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem',
          flexWrap: 'wrap',
          fontSize: '0.875rem', 
          color: '#6b7280' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Type size={16} />
            <span><strong>{editorState.wordCount.toLocaleString()}</strong> words</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span><strong>{editorState.charCount.toLocaleString()}</strong> characters</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
            gridTemplateColumns: isMobile ? '1fr' : '150px 1fr auto',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            {/* Chapter Number */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
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
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
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
                color: '#374151',
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
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
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
                color: '#374151',
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
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
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
                    <Unlock size={16} style={{ color: '#6b7280' }} />
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
              color: '#374151',
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
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                lineHeight: '1.8',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'Georgia, serif',
                backgroundColor: 'white',
              }}
            />
          </div>

          {/* Writing Tips */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
              💡 Writing Tips
            </h4>
            <ul style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
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
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }}>
            {/* Chapter Header */}
            <div style={{ marginBottom: '2rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '1.5rem' }}>
              {formData.number && (
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Chapter {formData.number}
                </p>
              )}
              <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>
                {formData.title || 'Untitled Chapter'}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#6b7280', flexWrap: 'wrap' }}>
                <span>{editorState.wordCount.toLocaleString()} words</span>
                <span>•</span>
                <span>{editorState.readingTime} min read</span>
                {formData.isPremium && (
                  <>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b' }}>
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
              color: '#1f2937',
              fontFamily: 'Georgia, serif',
              whiteSpace: 'pre-wrap',
            }}>
              {formData.content || (
                <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                  No content yet. Start writing to see the preview.
                </p>
              )}
            </div>

            {/* Preview Footer */}
            <div style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e5e7eb',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
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