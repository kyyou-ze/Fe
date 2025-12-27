import { useState } from 'react';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';

// Mock payment store hook
const usePaymentStore = () => ({
  isPremium: Math.random() > 0.5, // 50% chance premium
  canCreateNovel: () => Math.random() > 0.3 // 70% chance can create
});

// Mock WriterPremiumBanner component
const WriterPremiumBanner = ({ type, onClose }) => {
  if (type === 'banner') {
    return (
      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #fbbf24',
        borderRadius: '0.75rem',
        padding: '1rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#92400e', marginBottom: '0.25rem' }}>
            🚀 Upgrade to Premium
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#78350f' }}>
            Unlock unlimited novels, chapters, and advanced analytics. Start your journey today!
          </p>
        </div>
        <button
          onClick={() => alert('Redirect to pricing page')}
          style={{
            padding: '0.625rem 1.5rem',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Upgrade Now
        </button>
      </div>
    );
  }

  // Modal type
  return (
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
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
          🎉 Upgrade to Premium
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          You've reached your free novel creation limit. Upgrade to Premium to create unlimited novels and unlock advanced features!
        </p>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
        }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
            Premium Benefits:
          </h4>
          <ul style={{ fontSize: '0.875rem', color: '#4b5563', paddingLeft: '1.25rem', lineHeight: '1.8' }}>
            <li>Create unlimited novels</li>
            <li>Publish unlimited chapters</li>
            <li>Advanced analytics dashboard</li>
            <li>Priority support</li>
          </ul>
        </div>
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
              fontWeight: '500',
              color: '#374151',
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
};

const NovelFormPage = () => {
  const { isPremium, canCreateNovel } = usePaymentStore();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Mock route params
  const id = null; // Set to null for create, or 'novel-123' for edit
  const isEditMode = !!id;
  const isMobile = window.innerWidth < 768;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cover: null,
    coverPreview: '',
    genres: [],
    tags: [],
    language: 'English',
    status: 'draft',
    visibility: 'public',
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const genreOptions = [
    'Fantasy', 'Romance', 'Sci-Fi', 'Mystery', 'Thriller', 'Adventure',
    'Drama', 'Action', 'Horror', 'Comedy', 'Historical', 'Slice of Life'
  ];

  const languageOptions = ['English', 'Indonesian', 'Chinese', 'Korean', 'Japanese', 'Spanish'];
  const statusOptions = [
    { value: 'draft', label: 'Draft', desc: 'Not visible' },
    { value: 'ongoing', label: 'Ongoing', desc: 'Active' },
    { value: 'completed', label: 'Completed', desc: 'Finished' },
    { value: 'hiatus', label: 'Hiatus', desc: 'Paused' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cover: 'File size must be less than 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          cover: file,
          coverPreview: reader.result,
        }));
        setErrors(prev => ({ ...prev, cover: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCover = () => {
    setFormData(prev => ({ ...prev, cover: null, coverPreview: '' }));
  };

  const toggleGenre = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.genres.length === 0) newErrors.genres = 'Select at least one genre';
    if (!isEditMode && !formData.cover) newErrors.cover = 'Cover image is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if can create novel (only for new novels, not edits)
    if (!isEditMode && !canCreateNovel()) {
      setShowPremiumModal(true);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      console.log('Saving novel:', formData);
      alert('Novel saved successfully!');
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: isMobile ? '1rem' : '2rem' 
    }}>
      {showPremiumModal && (
        <WriterPremiumBanner 
          type="modal" 
          onClose={() => setShowPremiumModal(false)} 
        />
      )}

      {!isPremium && <WriterPremiumBanner type="banner" />}

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => alert('Navigate back to novels')}
          style={{
            display: 'flex',
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
          <ArrowLeft size={16} />
          Back to Novels
        </button>
        <h1 style={{ 
          fontSize: isMobile ? '1.5rem' : '2rem', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '0.5rem' 
        }}>
          {isEditMode ? 'Edit Novel' : 'Create Novel'}
        </h1>
        <p style={{ fontSize: isMobile ? '0.875rem' : '1rem', color: '#6b7280' }}>
          {isEditMode ? 'Update your novel details' : 'Fill in the details to create your novel'}
        </p>
      </div>

      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '250px 1fr',
          gap: '2rem',
        }}>
          {/* Cover Upload */}
          <div>
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}>
              <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
                Cover Image
              </h3>
              
              {formData.coverPreview ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={formData.coverPreview}
                    alt="Cover"
                    style={{
                      width: '100%',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  />
                  <button
                    onClick={removeCover}
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isMobile ? '2rem 1rem' : '3rem 1rem',
                  border: '2px dashed #d1d5db',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  backgroundColor: '#f9fafb',
                  marginBottom: '1rem',
                }}>
                  <Upload size={isMobile ? 28 : 32} style={{ color: '#9ca3af', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
                    Click to upload
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                    Max 5MB
                  </span>
                  <input type="file" accept="image/*" onChange={handleCoverUpload} style={{ display: 'none' }} />
                </label>
              )}
              
              {errors.cover && (
                <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem' }}>
                  {errors.cover}
                </p>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Title */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter novel title"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: errors.title ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
              {errors.title && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem' }}>{errors.title}</p>}
            </div>

            {/* Description */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a compelling description..."
                rows={isMobile ? 6 : 8}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: errors.description ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
              {errors.description && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem' }}>{errors.description}</p>}
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                {formData.description.length} / 2000 characters
              </p>
            </div>

            {/* Genres */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                Genres * <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#6b7280' }}>(Max 3)</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {genreOptions.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    disabled={!formData.genres.includes(genre) && formData.genres.length >= 3}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: formData.genres.includes(genre) ? '#3b82f6' : '#f3f4f6',
                      color: formData.genres.includes(genre) ? 'white' : '#374151',
                      border: 'none',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      opacity: (!formData.genres.includes(genre) && formData.genres.length >= 3) ? 0.5 : 1,
                      transition: 'all 0.2s',
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              {errors.genres && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem' }}>{errors.genres}</p>}
            </div>

            {/* Tags */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                Tags
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add a tag and press Enter"
                  style={{
                    flex: 1,
                    minWidth: '150px',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
                <button 
                  onClick={addTag}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {formData.tags.map((tag, idx) => (
                    <span key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                    }}>
                      {tag}
                      <button 
                        onClick={() => removeTag(tag)} 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer', 
                          padding: 0, 
                          display: 'flex',
                          color: '#1e40af',
                        }}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Language & Visibility */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              }}>
                <label style={{ display: 'block', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Language
                </label>
                <select 
                  name="language" 
                  value={formData.language} 
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  }}
                >
                  {languageOptions.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              }}>
                <label style={{ display: 'block', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Visibility
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['public', 'private'].map(vis => (
                    <label key={vis} style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem',
                      border: formData.visibility === vis ? '2px solid #3b82f6' : '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      backgroundColor: formData.visibility === vis ? '#eff6ff' : 'white',
                    }}>
                      <input
                        type="radio"
                        name="visibility"
                        value={vis}
                        checked={formData.visibility === vis}
                        onChange={handleChange}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'capitalize' }}>
                        {vis}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Status */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                Status
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                {statusOptions.map(option => (
                  <label key={option.value} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                    border: formData.status === option.value ? '2px solid #3b82f6' : '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    backgroundColor: formData.status === option.value ? '#eff6ff' : 'white',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={handleChange}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontWeight: '600', fontSize: '0.875rem', color: '#111827' }}>
                        {option.label}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '1.5rem' }}>
                      {option.desc}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '0.75rem',
            }}>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isSaving ? '#9ca3af' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                }}
              >
                <Save size={18} />
                {isSaving ? 'Saving...' : (isEditMode ? 'Update Novel' : 'Create Novel')}
              </button>
              <button
                onClick={() => alert('Navigate back')}
                style={{
                  flex: isMobile ? 1 : 0,
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: '#374151',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelFormPage;