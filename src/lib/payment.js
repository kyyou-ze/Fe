import { api } from './api';

// Payment packages
export const PAYMENT_PACKAGES = {
  coins: [
    { id: 'coins_100', amount: 100, price: 10000, bonus: 0, label: '100 Coins', popular: false },
    { id: 'coins_500', amount: 500, price: 45000, bonus: 50, label: '500 Coins + 50 Bonus', popular: true },
    { id: 'coins_1000', amount: 1000, price: 85000, bonus: 150, label: '1000 Coins + 150 Bonus', popular: false },
    { id: 'coins_2000', amount: 2000, price: 160000, bonus: 400, label: '2000 Coins + 400 Bonus', popular: false },
  ],
  premium: [
    { id: 'premium_1m', duration: 1, price: 49000, label: '1 Month Premium', popular: false },
    { id: 'premium_3m', duration: 3, price: 129000, label: '3 Months Premium', popular: true, discount: '12%' },
    { id: 'premium_6m', duration: 6, price: 239000, label: '6 Months Premium', popular: false, discount: '19%' },
    { id: 'premium_12m', duration: 12, price: 449000, label: '12 Months Premium', popular: false, discount: '24%' },
  ],
};

// Create payment
export const createPayment = async (packageType, packageId, userId) => {
  try {
    const response = await api.post('/api/payment/create', {
      packageType,
      packageId,
      userId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Check payment status
export const checkPaymentStatus = async (orderId) => {
  try {
    const response = await api.get(`/api/payment/status/${orderId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get transaction history
export const getTransactionHistory = async (userId) => {
  try {
    const response = await api.get(`/api/payment/transactions/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Initialize Midtrans Snap
export const initMidtransSnap = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true'
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    script.onload = () => resolve(window.snap);
    script.onerror = () => reject(new Error('Failed to load Midtrans Snap'));
    document.head.appendChild(script);
  });
};

// Open Midtrans payment popup
export const openPaymentPopup = async (snapToken, onSuccess, onPending, onError, onClose) => {
  try {
    const snap = await initMidtransSnap();
    snap.pay(snapToken, {
      onSuccess: (result) => {
        console.log('Payment success:', result);
        onSuccess?.(result);
      },
      onPending: (result) => {
        console.log('Payment pending:', result);
        onPending?.(result);
      },
      onError: (result) => {
        console.log('Payment error:', result);
        onError?.(result);
      },
      onClose: () => {
        console.log('Payment popup closed');
        onClose?.();
      },
    });
  } catch (error) {
    console.error('Failed to open payment:', error);
    throw error;
  }
};