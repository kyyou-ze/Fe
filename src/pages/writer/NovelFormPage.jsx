import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';

const NovelFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      console.log('Saving novel:', formData);
      setIsSaving(false);
      navigate('/writer/novels');
    }, 1500);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/writer/novels')}
          className="flex items-center gap-2 text-primary-600 mb-4"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={16} />
          Back to Novels
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>
          {isEditMode ? 'Edit Novel' : 'Create Novel'}
        </h1>
        <p className="text-gray-600" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
          {isEditMode ? 'Update your novel' : 'Create your novel'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Mobile: Stack Layout, Desktop: Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '250px 1fr',
          gap: '2rem',
        }}>
          {/* Cover Upload */}
          <div>
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Cover Image</h3>
              
              {formData.coverPreview ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={formData.coverPreview}
                    alt="Cover"
                    style={{
                      width: '100%',
                      borderRadius: 'var(--radius-lg)',
                      marginBottom: '1rem',
                    }}
                  />
                  <button
                    type="button"
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
                  border: '2px dashed var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  backgroundColor: 'var(--gray-50)',
                  marginBottom: '1rem',
                }}>
                  <Upload size={isMobile ? 28 : 32} style={{ color: 'var(--gray-400)', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)', textAlign: 'center' }}>
                    Click to upload
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
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
          <div className="space-y-6">
            {/* Title */}
            <div className="card">
              <label className="block font-semibold text-gray-900 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter novel title"
                className="input"
              />
              {errors.title && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem' }}>{errors.title}</p>}
            </div>

            {/* Description */}
            <div className="card">
              <label className="block font-semibold text-gray-900 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write description..."
                rows={isMobile ? 6 : 8}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: errors.description ? '1px solid #ef4444' : '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
              {errors.description && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem' }}>{errors.description}</p>}
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
                {formData.description.length} / 2000
              </p>
            </div>

            {/* Genres */}
            <div className="card">
              <label className="block font-semibold text-gray-900 mb-3">
                Genres * <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--gray-600)' }}>(Max 3)</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {genreOptions.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    disabled={!formData.genres.includes(genre) && formData.genres.length >= 3}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: formData.genres.includes(genre) ? 'var(--primary-600)' : 'var(--gray-100)',
                      color: formData.genres.includes(genre) ? 'white' : 'var(--gray-700)',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      opacity: (!formData.genres.includes(genre) && formData.genres.length >= 3) ? 0.5 : 1,
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              {errors.genres && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem' }}>{errors.genres}</p>}
            </div>

            {/* Tags */}
            <div className="card">
              <label className="block font-semibold text-gray-900 mb-2">Tags</label>
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
                  placeholder="Add tag"
                  style={{
                    flex: 1,
                    minWidth: '150px',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
                <button type="button" onClick={addTag} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
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
                      backgroundColor: 'var(--secondary-100)',
                      color: 'var(--secondary-700)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                    }}>
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Language & Visibility */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
              <div className="card">
                <label className="block font-semibold text-gray-900 mb-2">Language</label>
                <select name="language" value={formData.language} onChange={handleChange} className="input">
                  {languageOptions.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="card">
                <label className="block font-semibold text-gray-900 mb-2">Visibility</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['public', 'private'].map(vis => (
                    <label key={vis} style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem',
                      border: formData.visibility === vis ? '2px solid var(--primary-600)' : '1px solid var(--gray-300)',
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      backgroundColor: formData.visibility === vis ? 'var(--primary-50)' : 'white',
                    }}>
                      <input
                        type="radio"
                        name="visibility"
                        value={vis}
                        checked={formData.visibility === vis}
                        onChange={handleChange}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'capitalize' }}>{vis}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="card">
              <label className="block font-semibold text-gray-900 mb-3">Status</label>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                {statusOptions.map(option => (
                  <label key={option.value} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                    border: formData.status === option.value ? '2px solid var(--primary-600)' : '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    backgroundColor: formData.status === option.value ? 'var(--primary-50)' : 'white',
                  }}>
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={handleChange}
                        style={{ cursor: 'pointer' }}
                      />
                      <span className="font-semibold" style={{ fontSize: '0.875rem' }}>{option.label}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginLeft: '1.5rem' }}>
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
                type="submit"
                disabled={isSaving}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <Save size={18} style={{ marginRight: '0.5rem' }} />
                {isSaving ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/writer/novels')}
                className="btn"
                style={{
                  flex: isMobile ? 1 : 0,
                  backgroundColor: 'white',
                  border: '1px solid var(--gray-300)',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NovelFormPage;
