import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePaymentStore = create(
  persist(
    (set, get) => ({
      // User balance & premium status
      coins: 0,
      isPremium: false,
      premiumUntil: null,
      
      // Transaction history
      transactions: [],
      
      // Pending payment
      pendingPayment: null,

      // Set premium status
      setPremium: (until) => {
        set({
          isPremium: true,
          premiumUntil: until,
        });
      },

      // Add coins
      addCoins: (amount) => {
        set((state) => ({
          coins: state.coins + amount,
        }));
      },

      // Spend coins
      spendCoins: (amount) => {
        const { coins } = get();
        if (coins >= amount) {
          set((state) => ({
            coins: state.coins - amount,
          }));
          return true;
        }
        return false;
      },

      // Add transaction
      addTransaction: (transaction) => {
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },

      // Set pending payment
      setPendingPayment: (payment) => {
        set({ pendingPayment: payment });
      },

      // Clear pending payment
      clearPendingPayment: () => {
        set({ pendingPayment: null });
      },

      // Check if premium is still active
      checkPremiumStatus: () => {
        const { isPremium, premiumUntil } = get();
        if (isPremium && premiumUntil) {
          const now = new Date();
          const expiry = new Date(premiumUntil);
          if (now > expiry) {
            set({ isPremium: false, premiumUntil: null });
            return false;
          }
        }
        return isPremium;
      },

      // Check if can read premium chapter
      canReadPremiumChapter: (chapterCost = 10) => {
        const { isPremium, coins } = get();
        return isPremium || coins >= chapterCost;
      },

      // Writer premium features
      canPublishNovel: () => {
        return get().checkPremiumStatus();
      },

      canPublishChapter: () => {
        return get().checkPremiumStatus();
      },

      getWriterFeatureLimit: () => {
        const { isPremium } = get();
        if (isPremium) {
          return {
            maxNovels: -1, // unlimited
            maxChapters: -1, // unlimited
            canPublish: true,
            canEarnRevenue: true,
            canUseAdvancedEditor: true,
            canAccessAnalytics: true,
          };
        }
        return {
          maxNovels: 1, // 1 novel only
          maxChapters: 5, // 5 chapters only
          canPublish: false, // cannot publish
          canEarnRevenue: false,
          canUseAdvancedEditor: false,
          canAccessAnalytics: false,
        };
      },

      // Unlock chapter with coins
      unlockChapter: (chapterId, cost = 10) => {
        const success = get().spendCoins(cost);
        if (success) {
          // Save unlocked chapter to localStorage
          const unlockedChapters = JSON.parse(
            localStorage.getItem('unlocked_chapters') || '[]'
          );
          if (!unlockedChapters.includes(chapterId)) {
            unlockedChapters.push(chapterId);
            localStorage.setItem(
              'unlocked_chapters',
              JSON.stringify(unlockedChapters)
            );
          }
        }
        return success;
      },

      // Check if chapter is unlocked
      isChapterUnlocked: (chapterId) => {
        const { isPremium } = get();
        if (isPremium) return true;

        const unlockedChapters = JSON.parse(
          localStorage.getItem('unlocked_chapters') || '[]'
        );
        return unlockedChapters.includes(chapterId);
      },
    }),
    {
      name: 'payment-storage',
      partialize: (state) => ({
        coins: state.coins,
        isPremium: state.isPremium,
        premiumUntil: state.premiumUntil,
        transactions: state.transactions,
      }),
    }
  )
);

export default usePaymentStore;