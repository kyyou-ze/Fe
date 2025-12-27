import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Coins, Check, Zap, Star, Shield, TrendingUp } from 'lucide-react';
import useAuthStore from '../store/authStore';
import usePaymentStore from '../store/paymentStore';
import { PAYMENT_PACKAGES, formatCurrency, openPaymentPopup, createPayment } from '../lib/payment';

const PremiumPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { coins, isPremium, premiumUntil, addCoins, setPremium, addTransaction } = usePaymentStore();
  const [activeTab, setActiveTab] = useState('premium'); // premium or coins
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = window.innerWidth < 768;

  const handlePurchase = async (packageType, packageItem) => {
    if (!isAuthenticated) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment order
      const response = await createPayment(packageType, packageItem.id, user.id);
      
      // Open Midtrans payment popup
      await openPaymentPopup(
        response.snapToken,
        // Success
        (result) => {
          if (packageType === 'premium') {
            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + packageItem.duration);
            setPremium(expiryDate.toISOString());
          } else {
            addCoins(packageItem.amount + packageItem.bonus);
          }

          addTransaction({
            id: result.order_id,
            type: packageType,
            amount: packageItem.price,
            status: 'success',
            date: new Date().toISOString(),
            package: packageItem.label,
          });

          alert('Payment successful! Thank you for your purchase.');
          setIsProcessing(false);
        },
        // Pending
        (result) => {
          addTransaction({
            id: result.order_id,
            type: packageType,
            amount: packageItem.price,
            status: 'pending',
            date: new Date().toISOString(),
            package: packageItem.label,
          });
          
          alert('Payment is being processed. Please complete your payment.');
          setIsProcessing(false);
        },
        // Error
        (result) => {
          alert('Payment failed. Please try again.');
          setIsProcessing(false);
        },
        // Close
        () => {
          setIsProcessing(false);
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const premiumFeatures = [
    { icon: Check, text: 'Unlock ALL premium chapters' },
    { icon: Star, text: 'Ad-free reading experience' },
    { icon: Zap, text: 'Early access to new chapters' },
    { icon: Shield, text: 'Exclusive author content' },
    { icon: TrendingUp, text: 'Priority support' },
  ];

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontSize: isMobile ? '1.75rem' : '2.25rem' }}>
          Upgrade Your Experience
        </h1>
        <p className="text-gray-600" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
          Get premium access to unlock all features
        </p>

        {/* Current Status */}
        {isAuthenticated && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '1rem',
            padding: '1rem 1.5rem',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <div className="flex items-center gap-2">
              <Crown size={20} style={{ color: isPremium ? '#f59e0b' : 'var(--gray-400)' }} />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>Status</p>
                <p className="font-semibold" style={{ color: isPremium ? '#f59e0b' : 'var(--gray-700)' }}>
                  {isPremium ? 'Premium' : 'Free'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Coins size={20} style={{ color: 'var(--primary-600)' }} />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>Coins</p>
                <p className="font-semibold text-gray-900">{coins}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
      }}>
        <button
          onClick={() => setActiveTab('premium')}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: activeTab === 'premium' ? 'var(--primary-600)' : 'white',
            color: activeTab === 'premium' ? 'white' : 'var(--gray-700)',
            border: activeTab === 'premium' ? 'none' : '1px solid var(--gray-300)',
            borderRadius: 'var(--radius-full)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Crown size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Premium
        </button>
        <button
          onClick={() => setActiveTab('coins')}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: activeTab === 'coins' ? 'var(--primary-600)' : 'white',
            color: activeTab === 'coins' ? 'white' : 'var(--gray-700)',
            border: activeTab === 'coins' ? 'none' : '1px solid var(--gray-300)',
            borderRadius: 'var(--radius-full)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Coins size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Coins
        </button>
      </div>

      {/* Premium Tab */}
      {activeTab === 'premium' && (
        <div>
          {/* Premium Benefits */}
          <div className="card" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Premium Benefits</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}>
              {premiumFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-center gap-3" style={{ justifyContent: isMobile ? 'flex-start' : 'center' }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={18} style={{ color: 'var(--primary-600)' }} />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, textAlign: 'left' }}>
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Premium Packages */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            {PAYMENT_PACKAGES.premium.map((pkg) => (
              <div
                key={pkg.id}
                className="card"
                style={{
                  position: 'relative',
                  border: pkg.popular ? '2px solid var(--primary-600)' : '1px solid var(--gray-200)',
                  transform: pkg.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.2s',
                }}
              >
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--primary-600)',
                    color: 'white',
                    padding: '0.25rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}>
                    Most Popular
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <Crown size={32} style={{ color: 'var(--primary-600)', margin: '0 auto 1rem' }} />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.label}</h3>
                  {pkg.discount && (
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#fef3c7',
                      color: '#92400e',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      marginBottom: '1rem',
                    }}>
                      Save {pkg.discount}
                    </span>
                  )}
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {formatCurrency(pkg.price)}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                    for {pkg.duration} {pkg.duration === 1 ? 'month' : 'months'}
                  </p>
                </div>

                <button
                  onClick={() => handlePurchase('premium', pkg)}
                  disabled={isProcessing || isPremium}
                  className="btn"
                  style={{
                    width: '100%',
                    backgroundColor: pkg.popular ? 'var(--primary-600)' : 'var(--secondary-600)',
                    color: 'white',
                    opacity: isProcessing || isPremium ? 0.5 : 1,
                    cursor: isProcessing || isPremium ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isPremium ? 'Already Premium' : isProcessing ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coins Tab */}
      {activeTab === 'coins' && (
        <div>
          <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Buy Coins</h2>
            <p className="text-gray-600">Use coins to unlock individual premium chapters (10 coins per chapter)</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {PAYMENT_PACKAGES.coins.map((pkg) => (
              <div
                key={pkg.id}
                className="card"
                style={{
                  position: 'relative',
                  border: pkg.popular ? '2px solid var(--primary-600)' : '1px solid var(--gray-200)',
                  transform: pkg.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.2s',
                }}
              >
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--primary-600)',
                    color: 'white',
                    padding: '0.25rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}>
                    Best Value
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <Coins size={32} style={{ color: 'var(--primary-600)', margin: '0 auto 1rem' }} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {pkg.amount + pkg.bonus}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
                    {pkg.amount} Coins {pkg.bonus > 0 && `+ ${pkg.bonus} Bonus`}
                  </p>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(pkg.price)}
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase('coins', pkg)}
                  disabled={isProcessing}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    opacity: isProcessing ? 0.5 : 1,
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isProcessing ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="card" style={{ marginTop: '3rem' }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">What's the difference between Premium and Coins?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
              Premium gives you unlimited access to ALL premium chapters. Coins let you unlock individual chapters (10 coins per chapter).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Can I cancel my Premium subscription?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
              Yes, you can cancel anytime. Your premium access will remain active until the end of your billing period.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Do coins expire?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
              No, your coins never expire. You can use them anytime to unlock premium chapters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;