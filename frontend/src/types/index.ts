export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  balance: number;
  totalInvested: number;
  totalEarnings: number;
  referralEarnings: number;
  referralCode: string;
  referralLink: string;
  referralCount: number;
  language: string;
  currency: string;
}

export interface Investment {
  id: string;
  amount: number;
  rate: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  dailyEarnings: number;
  totalEarnings: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
}

export interface RechargeRequest {
  id: string;
  transactionId: string;
  amount: number;
  method: 'transcash' | 'neosurf' | 'paysafecard';
  status: 'pending' | 'validated' | 'rejected';
  createdAt: Date;
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  method: 'bank' | 'USDT' | 'BTC' | 'TON';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
