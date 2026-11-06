import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  User, Host, Gift, Agency, CoinSeller, BrandConfig, ChatMessage, Transaction, PKBattleState, UserRole, VIPTier
} from '../types';
import {
  INITIAL_BRAND_CONFIG, INITIAL_USERS, INITIAL_GIFTS, INITIAL_HOSTS,
  INITIAL_AGENCIES, INITIAL_COIN_SELLERS, INITIAL_CHAT, INITIAL_TRANSACTIONS, VIP_TIERS
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  users: User[];
  hosts: Host[];
  agencies: Agency[];
  coinSellers: CoinSeller[];
  gifts: Gift[];
  brandConfig: BrandConfig;
  chatMessages: ChatMessage[];
  transactions: Transaction[];
  activeHost: Host;
  pkBattle: PKBattleState;
  activeAnimation: { gift: Gift; senderName: string; recipientName: string } | null;
  audioSeats: { seatNumber: number; user: User | null; isMuted: boolean }[];
  isWebcamActive: boolean;
  activeTab: 'stream' | 'host_dash' | 'agency_dash' | 'seller_dash' | 'admin_dash';

  // Actions
  switchRole: (role: UserRole) => void;
  setActiveTab: (tab: 'stream' | 'host_dash' | 'agency_dash' | 'seller_dash' | 'admin_dash') => void;
  setActiveHostId: (id: string) => void;
  setStreamMode: (mode: 'video' | 'pk' | 'audio') => void;
  toggleWebcam: () => void;
  updateBrand: (config: Partial<BrandConfig>) => void;
  sendChatMessage: (text: string) => void;
  sendGift: (giftId: string, recipientHostId: string) => boolean;
  buyCoins: (amount: number, usd: number) => void;
  sellerTransferCoins: (targetUserId: string, amount: number, cashCollectedUSD: number) => boolean;
  requestHostWithdrawal: (amountUSD: number, method: string) => void;
  adminApproveHost: (hostId: string) => void;
  adminToggleBanUser: (userId: string) => void;
  adminUpdateAgencyCommission: (agencyId: string, newRate: number) => void;
  startPKBattle: () => void;
  resetPKBattle: () => void;
  toggleAudioSeat: (seatNumber: number) => void;
  vipTiers: VIPTier[];
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [hosts, setHosts] = useState<Host[]>(INITIAL_HOSTS);
  const [activeHostId, setActiveHostId] = useState<string>('host_aria_01');
  const [agencies, setAgencies] = useState<Agency[]>(INITIAL_AGENCIES);
  const [coinSellers, setCoinSellers] = useState<CoinSeller[]>(INITIAL_COIN_SELLERS);
  const [gifts] = useState<Gift[]>(INITIAL_GIFTS);
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(INITIAL_BRAND_CONFIG);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<'stream' | 'host_dash' | 'agency_dash' | 'seller_dash' | 'admin_dash'>('stream');
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);
  const [activeAnimation, setActiveAnimation] = useState<{ gift: Gift; senderName: string; recipientName: string } | null>(null);

  // PK Battle State
  const [pkBattle, setPkBattle] = useState<PKBattleState>({
    isActive: true,
    host1Id: 'host_aria_01',
    host2Id: 'host_neon_02',
    host1Score: 14850,
    host2Score: 11200,
    timeLeftSeconds: 165,
    winnerId: null,
    punishment: 'Wear silly glasses and sing high-pitch chorus! 🎭',
  });

  // Audio Room 8 Seats
  const [audioSeats, setAudioSeats] = useState<{ seatNumber: number; user: User | null; isMuted: boolean }[]>([
    { seatNumber: 1, user: INITIAL_USERS[1], isMuted: false }, // Aria
    { seatNumber: 2, user: INITIAL_USERS[2], isMuted: false }, // Marcus
    { seatNumber: 3, user: INITIAL_USERS[0], isMuted: true },  // Jordan
    { seatNumber: 4, user: null, isMuted: false },
    { seatNumber: 5, user: null, isMuted: false },
    { seatNumber: 6, user: null, isMuted: false },
    { seatNumber: 7, user: null, isMuted: false },
    { seatNumber: 8, user: null, isMuted: false },
  ]);

  const activeHost = hosts.find((h) => h.id === activeHostId) || hosts[0];
  const timerRef = useRef<any>(null);

  // PK Battle Countdown loop
  useEffect(() => {
    if (pkBattle.isActive && pkBattle.timeLeftSeconds > 0) {
      timerRef.current = setInterval(() => {
        setPkBattle((prev) => {
          if (prev.timeLeftSeconds <= 1) {
            const winner = prev.host1Score >= prev.host2Score ? prev.host1Id : prev.host2Id;
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            return { ...prev, timeLeftSeconds: 0, isActive: false, winnerId: winner };
          }
          return { ...prev, timeLeftSeconds: prev.timeLeftSeconds - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pkBattle.isActive, pkBattle.timeLeftSeconds]);

  // Switch Persona / Role
  const switchRole = (role: UserRole) => {
    const targetUser = users.find((u) => u.role === role) || users[0];
    setCurrentUser(targetUser);

    // Auto switch to relevant tab for convenience
    if (role === 'host') setActiveTab('host_dash');
    else if (role === 'agency') setActiveTab('agency_dash');
    else if (role === 'coin_seller') setActiveTab('seller_dash');
    else if (role === 'admin') setActiveTab('admin_dash');
    else setActiveTab('stream');
  };

  const setStreamMode = (mode: 'video' | 'pk' | 'audio') => {
    setHosts((prev) =>
      prev.map((h) => (h.id === activeHostId ? { ...h, streamMode: mode } : h))
    );
  };

  const toggleWebcam = () => {
    setIsWebcamActive((prev) => !prev);
  };

  const updateBrand = (config: Partial<BrandConfig>) => {
    setBrandConfig((prev) => ({ ...prev, ...config }));
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: String(Date.now()),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      vipLevel: currentUser.vipLevel,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  // Send Gift Engine
  const sendGift = (giftId: string, recipientHostId: string): boolean => {
    const gift = gifts.find((g) => g.id === giftId);
    if (!gift) return false;

    if (currentUser.coins < gift.cost) {
      return false; // Insufficient balance
    }

    // 1. Deduct coins from user, update totalSpent & recalculate VIP level
    const updatedSpent = currentUser.totalSpent + gift.cost;
    let newVipLevel = currentUser.vipLevel;
    if (updatedSpent >= 200000) newVipLevel = 10;
    else if (updatedSpent >= 50000) newVipLevel = 7;
    else if (updatedSpent >= 10000) newVipLevel = 5;
    else if (updatedSpent >= 2000) newVipLevel = 3;
    else if (updatedSpent >= 500) newVipLevel = 2;
    else if (updatedSpent >= 100) newVipLevel = 1;

    const updatedUser: User = {
      ...currentUser,
      coins: currentUser.coins - gift.cost,
      totalSpent: updatedSpent,
      vipLevel: newVipLevel,
    };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));

    // 2. Add diamonds to recipient host
    const recipientHost = hosts.find((h) => h.id === recipientHostId) || activeHost;
    const diamondsGained = gift.diamondsEarned;
    const hostUSDShare = (diamondsGained / 200); // 200 diamonds = $1 USD

    setHosts((prev) =>
      prev.map((h) => {
        if (h.id === recipientHost.id) {
          return {
            ...h,
            diamonds: h.diamonds + diamondsGained,
            todayEarningsUSD: Number((h.todayEarningsUSD + hostUSDShare).toFixed(2)),
          };
        }
        return h;
      })
    );

    // 3. Update Agency Commission (20%)
    setAgencies((prev) =>
      prev.map((a) => {
        if (a.id === recipientHost.agencyId) {
          const agencyCommissionUSD = hostUSDShare * a.commissionRate;
          return {
            ...a,
            monthlyRevenueUSD: Number((a.monthlyRevenueUSD + agencyCommissionUSD).toFixed(2)),
            pendingPayoutUSD: Number((a.pendingPayoutUSD + agencyCommissionUSD).toFixed(2)),
          };
        }
        return a;
      })
    );

    // 4. Update PK Battle Score if battle is ongoing
    if (pkBattle.isActive) {
      setPkBattle((prev) => {
        if (recipientHost.id === prev.host1Id) {
          return { ...prev, host1Score: prev.host1Score + gift.cost };
        } else if (recipientHost.id === prev.host2Id) {
          return { ...prev, host2Score: prev.host2Score + gift.cost };
        }
        return prev;
      });
    }

    // 5. Trigger Canvas Gift Animation
    setActiveAnimation({
      gift,
      senderName: currentUser.name,
      recipientName: recipientHost.name,
    });
    setTimeout(() => setActiveAnimation(null), 3500);

    // 6. Confetti for big gifts
    if (gift.cost >= 1000) {
      confetti({ particleCount: gift.cost >= 5000 ? 120 : 60, spread: 70, origin: { y: 0.5 } });
    }

    // 7. Post chat announcement
    const giftAnnouncement: ChatMessage = {
      id: String(Date.now()),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      vipLevel: newVipLevel,
      text: `sent ${gift.name} x1 to ${recipientHost.name}! 🔥`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      giftIcon: gift.icon,
    };
    setChatMessages((prev) => [...prev, giftAnnouncement]);

    // 8. Record transaction
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'gift_sent',
      amount: gift.cost,
      currency: 'coins',
      status: 'completed',
      timestamp: 'Just now',
      details: `Sent ${gift.name} to ${recipientHost.name}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    return true;
  };

  // Buy Coins (Recharge Wallet)
  const buyCoins = (amount: number, usd: number) => {
    const updated: User = {
      ...currentUser,
      coins: currentUser.coins + amount,
    };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'coin_purchase',
      amount,
      currency: 'coins',
      status: 'completed',
      timestamp: 'Just now',
      details: `Instant Top-Up (${amount} Coins for $${usd.toFixed(2)})`,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Coin Seller Direct Transfer Tool
  const sellerTransferCoins = (targetUserId: string, amount: number, cashCollectedUSD: number): boolean => {
    const seller = coinSellers[0];
    if (seller.stockCoins < amount) return false;

    // Deduct stock from seller
    setCoinSellers((prev) =>
      prev.map((s, idx) =>
        idx === 0
          ? {
              ...s,
              stockCoins: s.stockCoins - amount,
              totalSoldCoins: s.totalSoldCoins + amount,
              totalRevenueUSD: Number((s.totalRevenueUSD + cashCollectedUSD).toFixed(2)),
            }
          : s
      )
    );

    // Credit target user
    setUsers((prev) =>
      prev.map((u) => (u.id === targetUserId ? { ...u, coins: u.coins + amount } : u))
    );

    if (currentUser.id === targetUserId) {
      setCurrentUser((prev) => ({ ...prev, coins: prev.coins + amount }));
    }

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: seller.id,
      userName: seller.name,
      type: 'seller_transfer',
      amount,
      currency: 'coins',
      status: 'completed',
      timestamp: 'Just now',
      details: `Wholesale Transfer: ${amount.toLocaleString()} Coins to User ${targetUserId} ($${cashCollectedUSD})`,
    };
    setTransactions((prev) => [newTx, ...prev]);
    return true;
  };

  // Request Host Withdrawal
  const requestHostWithdrawal = (amountUSD: number, method: string) => {
    const diamondsNeeded = amountUSD * 200;
    setHosts((prev) =>
      prev.map((h) => {
        if (h.id === activeHost.id) {
          return {
            ...h,
            diamonds: Math.max(0, h.diamonds - diamondsNeeded),
            todayEarningsUSD: Math.max(0, Number((h.todayEarningsUSD - amountUSD).toFixed(2))),
          };
        }
        return h;
      })
    );

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: activeHost.id,
      userName: activeHost.name,
      type: 'host_withdrawal',
      amount: amountUSD,
      currency: 'USD',
      status: 'pending',
      timestamp: 'Just now',
      details: `Withdrawal to ${method} ($${amountUSD.toFixed(2)})`,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Admin Actions
  const adminApproveHost = (hostId: string) => {
    setHosts((prev) => prev.map((h) => (h.id === hostId ? { ...h, verified: true } : h)));
  };

  const adminToggleBanUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isBanned: !u.isBanned } : u))
    );
  };

  const adminUpdateAgencyCommission = (agencyId: string, newRate: number) => {
    setAgencies((prev) =>
      prev.map((a) => (a.id === agencyId ? { ...a, commissionRate: newRate } : a))
    );
  };

  const startPKBattle = () => {
    setPkBattle({
      isActive: true,
      host1Id: 'host_aria_01',
      host2Id: 'host_neon_02',
      host1Score: 0,
      host2Score: 0,
      timeLeftSeconds: 180, // 3 minutes
      winnerId: null,
      punishment: 'Wear silly glasses and sing high-pitch chorus! 🎭',
    });
    setStreamMode('pk');
  };

  const resetPKBattle = () => {
    setPkBattle((prev) => ({
      ...prev,
      isActive: true,
      host1Score: 1000,
      host2Score: 1000,
      timeLeftSeconds: 180,
      winnerId: null,
    }));
  };

  const toggleAudioSeat = (seatNumber: number) => {
    setAudioSeats((prev) =>
      prev.map((seat) => {
        if (seat.seatNumber === seatNumber) {
          if (seat.user) {
            // Already taken, toggle mute
            return { ...seat, isMuted: !seat.isMuted };
          } else {
            // Occupy seat
            return { ...seat, user: currentUser, isMuted: false };
          }
        }
        return seat;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        hosts,
        agencies,
        coinSellers,
        gifts,
        brandConfig,
        chatMessages,
        transactions,
        activeHost,
        pkBattle,
        activeAnimation,
        audioSeats,
        isWebcamActive,
        activeTab,
        switchRole,
        setActiveTab,
        setActiveHostId,
        setStreamMode,
        toggleWebcam,
        updateBrand,
        sendChatMessage,
        sendGift,
        buyCoins,
        sellerTransferCoins,
        requestHostWithdrawal,
        adminApproveHost,
        adminToggleBanUser,
        adminUpdateAgencyCommission,
        startPKBattle,
        resetPKBattle,
        toggleAudioSeat,
        vipTiers: VIP_TIERS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
