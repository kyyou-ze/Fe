import { useState } from 'react';
import { User, Lock, Bell, Shield, Trash2, Save, X } from 'lucide-react';
import useAuthStore from '../store/authStore';

const SettingsPage = () => {
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: '',
    location: '',
    avatar: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newChapterAlerts: true,
    commentReplies: true,
    newFollowers: true,
    novelRecommendations: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateUser(profileData);
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsSaving(false);
      alert('Password changed successfully!');
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Notification preferences saved!');
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const isMobile = window.innerWidth < 768;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '250px 1fr',
        gap: '2rem',
      }}>
        {/* Sidebar - Desktop */}
        {!isMobile && (
          <div>
            <div className="card" style={{ padding: '0.5rem' }}>
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      backgroundColor: activeTab === tab.id ? 'var(--primary-50)' : 'transparent',
                      color: activeTab === tab.id ? 'var(--primary-700)' : 'var(--gray-700)',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile Tab Navigation */}
        {isMobile && (
          <div style={{
            position: 'sticky',
            top: '4rem',
            backgroundColor: 'white',
            zIndex: 10,
            marginBottom: '1rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
          }}>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="btn"
              style={{
                width: '100%',
                justifyContent: 'space-between',
                padding: '1rem',
              }}
            >
              <div className="flex items-center gap-2">
                {tabs.find(t => t.id === activeTab)?.icon && 
                  (() => {
                    const Icon = tabs.find(t => t.id === activeTab).icon;
                    return <Icon size={18} />;
                  })()
                }
                <span>{tabs.find(t => t.id === activeTab)?.label}</span>
              </div>
              <X size={18} style={{ transform: showMobileMenu ? 'rotate(0deg)' : 'rotate(45deg)' }} />
            </button>
            {showMobileMenu && (
              <div style={{
                padding: '0.5rem',
                borderTop: '1px solid var(--gray-200)',
              }}>
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setShowMobileMenu(false);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        backgroundColor: activeTab === tab.id ? 'var(--primary-50)' : 'transparent',
                        color: activeTab === tab.id ? 'var(--primary-700)' : 'var(--gray-700)',
                        border: 'none',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div>
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

              {/* Avatar Upload */}
              <div style={{ marginBottom: '2rem' }}>
                <label className="block font-medium text-gray-700 mb-3">Profile Picture</label>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  gap: '1rem',
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--primary-700)',
                    overflow: 'hidden',
                  }}>
                    {profileData.avatar ? (
                      <img src={profileData.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      profileData.username[0]?.toUpperCase() || 'U'
                    )}
                  </div>
                  <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <label className="btn" style={{
                      backgroundColor: 'white',
                      border: '1px solid var(--gray-300)',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                    }}>
                      Upload Photo
                      <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
                    </label>
                    <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
                      JPG, PNG (Max 2MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="block font-medium text-gray-700 mb-2">Username</label>
                <input type="text" name="username" value={profileData.username} onChange={handleProfileChange} className="input" />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="block font-medium text-gray-700 mb-2">Email</label>
                <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} className="input" />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="block font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '0.875rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label className="block font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleProfileChange}
                  placeholder="City, Country"
                  className="input"
                />
              </div>

              <button type="submit" disabled={isSaving} className="btn btn-primary" style={{ width: isMobile ? '100%' : 'auto' }}>
                <Save size={18} style={{ marginRight: '0.5rem' }} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handleChangePassword} className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="block font-medium text-gray-700 mb-2">Current Password</label>
                <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="input" />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="block font-medium text-gray-700 mb-2">New Password</label>
                <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="input" />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label className="block font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="input" />
              </div>

              <button type="submit" disabled={isSaving} className="btn btn-primary" style={{ width: isMobile ? '100%' : 'auto' }}>
                <Save size={18} style={{ marginRight: '0.5rem' }} />
                {isSaving ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center justify-between"
                    style={{
                      padding: '1rem',
                      backgroundColor: 'var(--gray-50)',
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ flex: 1, marginRight: '1rem' }}>
                      <p className="font-medium text-gray-900" style={{ marginBottom: '0.25rem', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                        Receive notifications for this
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleNotificationToggle(key)}
                      style={{
                        width: '3rem',
                        height: '1.5rem',
                        cursor: 'pointer',
                      }}
                    />
                  </label>
                ))}
              </div>

              <button
                onClick={handleSaveNotifications}
                disabled={isSaving}
                className="btn btn-primary"
                style={{ marginTop: '1.5rem', width: isMobile ? '100%' : 'auto' }}
              >
                <Save size={18} style={{ marginRight: '0.5rem' }} />
                {isSaving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy & Security</h2>

              <div className="space-y-4" style={{ marginBottom: '2rem' }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--gray-50)',
                  borderRadius: 'var(--radius-lg)',
                }}>
                  <p className="font-medium text-gray-900 mb-2">Profile Visibility</p>
                  <select className="input">
                    <option value="public">Public - Anyone can see</option>
                    <option value="followers">Followers Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--gray-50)',
                  borderRadius: 'var(--radius-lg)',
                }}>
                  <p className="font-medium text-gray-900 mb-2">Show Activity</p>
                  <select className="input">
                    <option value="everyone">Everyone</option>
                    <option value="followers">Followers Only</option>
                    <option value="none">No One</option>
                  </select>
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: '#fef2f2',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #fecaca',
              }}>
                <h3 className="font-semibold mb-2" style={{ color: '#991b1b' }}>
                  Danger Zone
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#991b1b', marginBottom: '1rem' }}>
                  Once you delete your account, there is no going back.
                </p>
                <button className="btn" style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  width: isMobile ? '100%' : 'auto',
                }}>
                  <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
