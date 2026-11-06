export type UserRole = 'viewer' | 'host' | 'agency' | 'coin_seller' | 'admin';

export interface VIPTier {
  level: number;
  name: string;
  minCoins: number;
  badgeColor: string;
  perks: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  coins: number;
  diamonds: number;
  vipLevel: number;
  totalSpent: number;
  isBanned?: boolean;
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  cost: number;
  diamondsEarned: number;
  category: 'popular' | 'luxury' | 'mythic';
  animationType: 'rose' | 'heart' | 'car' | 'yacht' | 'dragon';
}

export interface Host {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  category: string;
  viewers: number;
  diamonds: number;
  isLive: boolean;
  streamMode: 'video' | 'pk' | 'audio';
  streamKey: string;
  agencyId: string;
  agencyName: string;
  todayEarningsUSD: number;
  verified: boolean;
  pkOpponentId?: string;
  pkScore: number;
}

export interface PKBattleState {
  isActive: boolean;
  host1Id: string;
  host2Id: string;
  host1Score: number;
  host2Score: number;
  timeLeftSeconds: number;
  winnerId: string | null;
  punishment: string;
}

export interface Agency {
  id: string;
  name: string;
  code: string;
  ownerName: string;
  commissionRate: number; // e.g. 0.20 for 20%
  hostsCount: number;
  monthlyRevenueUSD: number;
  pendingPayoutUSD: number;
}

export interface CoinSeller {
  id: string;
  name: string;
  sellerCode: string;
  stockCoins: number;
  totalSoldCoins: number;
  totalRevenueUSD: number;
  discountMargin: number; // e.g. 30% margin
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  vipLevel: number;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  giftIcon?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'coin_purchase' | 'gift_sent' | 'seller_transfer' | 'host_withdrawal' | 'agency_commission';
  amount: number;
  currency: 'coins' | 'diamonds' | 'USD';
  status: 'completed' | 'pending' | 'rejected';
  timestamp: string;
  details: string;
}

export interface BrandConfig {
  appName: string;
  tagline: string;
  coinName: string;
  diamondName: string;
  primaryColor: string; // 'pink' | 'purple' | 'cyan' | 'gold' | 'emerald'
  logoUrl?: string;
}
