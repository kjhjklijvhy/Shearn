import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">🚀 Shearn</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">The secure investment platform for everyone</p>
          <div className="flex gap-4 justify-center">
            <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition">
              Get Started
            </a>
            <a href="/login" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-bold py-3 px-8 rounded-lg hover:shadow-lg transition">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
