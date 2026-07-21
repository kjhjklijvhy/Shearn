import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { userService } from '@/services/userService';

const mockChartData = [
  { date: 'Jan 1', earnings: 0.05 },
  { date: 'Jan 2', earnings: 0.10 },
  { date: 'Jan 3', earnings: 0.15 },
  { date: 'Jan 4', earnings: 0.20 },
  { date: 'Jan 5', earnings: 0.25 },
];

export const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [earningsData, setEarningsData] = useState(mockChartData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your financial overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Balance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">€{user?.balance.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Invested</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">€{user?.totalInvested.toFixed(2)}</p>
              </div>
              <Target className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">€{user?.totalEarnings.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Referrals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{user?.referralCount}</p>
              </div>
              <Users className="w-12 h-12 text-pink-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Daily Earnings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="earnings" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
