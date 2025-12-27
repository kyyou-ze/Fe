import { useNavigate } from 'react-router-dom';
import { Crown, Lock, AlertCircle, CheckCircle, X } from 'lucide-react';
import usePaymentStore from '../../store/paymentStore';

const WriterPremiumBanner = ({ type = 'banner', onClose }) => {
  const navigate = useNavigate();
  const { isPremium, premiumUntil, getWriterFeatureLimit } = usePaymentStore();
  const limits = getWriterFeatureLimit();

  if (isPremium) return null;

  // Full page modal
  if (type === 'modal') {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-2xl)',
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          position: 'relative',
        }}>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                backgroundColor: 'var(--gray-100)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>
          )}

          {/* Icon */}
          <div style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            backgroundColor: '#fef3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <Crown size={32} style={{ color: '#f59e0b' }} />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textAlign: 'center' }}>
            Upgrade to Writer Premium
          </h2>
          <p className="text-gray-600 mb-6" style={{ textAlign: 'center' }}>
            Unlock all writer features and start earning from your stories
          </p>

          {/* Features Comparison */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '1rem' }}>
                Free Writer
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  <AlertCircle size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <span>{limits.maxNovels} Novel Only</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  <AlertCircle size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <span>{limits.maxChapters} Chapters Max</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  <Lock size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <span>Draft Only</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  <Lock size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <span>No Revenue</span>
                </div>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f59e0b', marginBottom: '1rem' }}>
                Premium Writer
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--gray-900)' }}>
                  <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Unlimited Novels</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--gray-900)' }}>
                  <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Unlimited Chapters</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--gray-900)' }}>
                  <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Publish & Monetize</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--gray-900)' }}>
                  <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Earn Revenue</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--gray-900)' }}>
                  <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Advanced Analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/premium')}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            <Crown size={20} style={{ marginRight: '0.5rem' }} />
            Upgrade to Premium
          </button>

          <p style={{
            fontSize: '0.75rem',
            color: 'var(--gray-500)',
            textAlign: 'center',
            marginTop: '1rem',
          }}>
            Starting from Rp 49.000/month
          </p>
        </div>
      </div>
    );
  }

  // Banner (default)
  return (
    <div style={{
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      borderRadius: 'var(--radius-xl)',
      color: 'white',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="flex items-start gap-4">
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Crown size={24} />
          </div>

          <div style={{ flex: 1 }}>
            <h3 className="text-xl font-bold mb-2">
              🚀 Upgrade to Writer Premium
            </h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem', opacity: 0.9 }}>
              You're using Free Writer plan. Upgrade to publish your novels and start earning!
            </p>

            <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/premium')}
                className="btn"
                style={{
                  backgroundColor: 'white',
                  color: '#f59e0b',
                  padding: '0.5rem 1.5rem',
                  fontWeight: 600,
                }}
              >
                Upgrade Now
              </button>
              <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                From Rp 49.000/month
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterPremiumBanner;