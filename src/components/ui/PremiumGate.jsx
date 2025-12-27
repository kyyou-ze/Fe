import { useNavigate } from 'react-router-dom';
import { Lock, Crown, Coins, Zap } from 'lucide-react';
import usePaymentStore from '../../store/paymentStore';

const PremiumGate = ({ chapterId, chapterTitle, cost = 10 }) => {
  const navigate = useNavigate();
  const { isPremium, coins, unlockChapter, isChapterUnlocked } = usePaymentStore();

  // Check if already unlocked
  if (isChapterUnlocked(chapterId)) {
    return null; // Don't show gate
  }

  const handleUnlockWithCoins = () => {
    if (coins >= cost) {
      if (confirm(`Unlock "${chapterTitle}" for ${cost} coins?`)) {
        const success = unlockChapter(chapterId, cost);
        if (success) {
          window.location.reload(); // Reload to show content
        }
      }
    } else {
      if (confirm('Not enough coins. Would you like to buy more?')) {
        navigate('/premium?tab=coins');
      }
    }
  };

  const handleGetPremium = () => {
    navigate('/premium');
  };

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
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
      }}>
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
          <Lock size={32} style={{ color: '#f59e0b' }} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Premium Chapter
        </h2>
        <p className="text-gray-600 mb-6">
          This chapter is locked. Choose how to unlock it:
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Option 1: Premium */}
          <button
            onClick={handleGetPremium}
            style={{
              padding: '1.5rem',
              border: '2px solid var(--primary-600)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--primary-50)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-100)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-50)';
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown size={24} style={{ color: 'var(--primary-600)' }} />
                <div>
                  <p className="font-semibold text-gray-900">Get Premium</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                    Unlock ALL premium chapters
                  </p>
                </div>
              </div>
              <Zap size={20} style={{ color: 'var(--primary-600)' }} />
            </div>
          </button>

          {/* Option 2: Use Coins */}
          <button
            onClick={handleUnlockWithCoins}
            style={{
              padding: '1.5rem',
              border: '1px solid var(--gray-300)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'white',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--gray-50)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Coins size={24} style={{ color: '#f59e0b' }} />
                <div>
                  <p className="font-semibold text-gray-900">Use {cost} Coins</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                    You have: {coins} coins
                  </p>
                </div>
              </div>
              {coins < cost && (
                <span style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  Need {cost - coins} more
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Cancel */}
        <button
          onClick={() => window.history.back()}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--gray-600)',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PremiumGate;