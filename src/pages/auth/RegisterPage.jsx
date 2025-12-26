import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { api } from '../../lib/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'reader',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, text: 'Very Weak', color: '#ef4444' },
      { strength: 1, text: 'Weak', color: '#f97316' },
      { strength: 2, text: 'Fair', color: '#eab308' },
      { strength: 3, text: 'Good', color: '#84cc16' },
      { strength: 4, text: 'Strong', color: '#22c55e' },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength();

  const validate = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const response = await api.post('/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Auto login after register
      setAuth(response.user, response.token);
      navigate('/');
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-blue-purple flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join LimoNovel community today</p>
        </div>

        {apiError && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: 'var(--radius-lg)',
            padding: '0.75rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <AlertCircle size={18} style={{ color: '#dc2626' }} />
            <span style={{ fontSize: '0.875rem', color: '#991b1b' }}>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--gray-400)',
              }} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '1rem',
                  paddingTop: '0.625rem',
                  paddingBottom: '0.625rem',
                  border: errors.username ? '1px solid #ef4444' : '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>
            {errors.username && (
              <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--gray-400)',
              }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '1rem',
                  paddingTop: '0.625rem',
                  paddingBottom: '0.625rem',
                  border: errors.email ? '1px solid #ef4444' : '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>
            {errors.email && (
              <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
              I want to join as
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  border: formData.role === 'reader' ? '2px solid var(--primary-600)' : '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  backgroundColor: formData.role === 'reader' ? 'var(--primary-50)' : 'transparent',
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="reader"
                  checked={formData.role === 'reader'}
                  onChange={handleChange}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Reader</span>
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  border: formData.role === 'writer' ? '2px solid var(--primary-600)' : '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  backgroundColor: formData.role === 'writer' ? 'var(--primary-50)' : 'transparent',
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="writer"
                  checked={formData.role === 'writer'}
                  onChange={handleChange}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Writer</span>
              </label>
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--gray-400)',
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '2.5rem',
                  paddingTop: '0.625rem',
                  paddingBottom: '0.625rem',
                  border: errors.password ? '1px solid #ef4444' : '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={18} style={{ color: 'var(--gray-400)' }} /> : <Eye size={18} style={{ color: 'var(--gray-400)' }} />}
              </button>
            </div>
            {formData.password && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--gray-200)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${(passwordStrength.strength / 4) * 100}%`, height: '100%', backgroundColor: passwordStrength.color, transition: 'all 0.3s' }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: passwordStrength.color, fontWeight: 500 }}>
                    {passwordStrength.text}
                  </span>
                </div>
              </div>
            )}
            {errors.password && (
              <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--gray-400)',
              }} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '2.5rem',
                  paddingTop: '0.625rem',
                  paddingBottom: '0.625rem',
                  border: errors.confirmPassword ? '1px solid #ef4444' : '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {showConfirmPassword ? <EyeOff size={18} style={{ color: 'var(--gray-400)' }} /> : <Eye size={18} style={{ color: 'var(--gray-400)' }} />}
              </button>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <CheckCircle2 size={18} style={{
                  position: 'absolute',
                  right: '2.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#22c55e',
                }} />
              )}
            </div>
            {errors.confirmPassword && (
              <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-600)', fontWeight: 600, textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
