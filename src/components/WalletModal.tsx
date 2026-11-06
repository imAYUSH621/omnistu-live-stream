import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Coins, Sparkles, CheckCircle2, History, CreditCard } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, brandConfig, buyCoins, transactions } = useApp();
  const [activeTab, setActiveTab] = useState<'recharge' | 'history'>('recharge');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const packages = [
    { coins: 100, usd: 0.99, bonus: 0, tag: 'Starter' },
    { coins: 500, usd: 4.99, bonus: 50, tag: 'Standard' },
    { coins: 1200, usd: 9.99, bonus: 150, tag: 'Most Popular', highlight: true },
    { coins: 6500, usd: 49.99, bonus: 1000, tag: 'VIP Pack' },
    { coins: 14000, usd: 99.99, bonus: 2500, tag: 'Whale Deal' },
  ];

  const handleBuy = (coins: number, usd: number, bonus: number) => {
    const totalCoins = coins + bonus;
    buyCoins(totalCoins, usd);
    setSuccessToast(`Successfully recharged +${totalCoins.toLocaleString()} ${brandConfig.coinName}!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" />
              <span>{brandConfig.coinName} Wallet & Top-Up</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Secure in-app token management with zero transaction fees
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Balance Card */}
        <div className="px-6 pt-5 pb-3">
          <div className="bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                Current Coin Balance
              </span>
              <div className="text-3xl font-black text-white mt-1 flex items-center gap-2">
                <Coins className="w-7 h-7 text-amber-400 animate-pulse" />
                <span>{currentUser.coins.toLocaleString()}</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-full">
                  {brandConfig.coinName}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium">VIP Progress</span>
              <div className="text-sm font-bold text-pink-400">Tier {currentUser.vipLevel}</div>
              <div className="text-[11px] text-slate-500">${(currentUser.totalSpent / 100).toFixed(2)} total spent</div>
            </div>
          </div>
        </div>

        {/* Tabs: Recharge vs History */}
        <div className="flex border-b border-slate-800 px-6">
          <button
            onClick={() => setActiveTab('recharge')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'recharge'
                ? 'border-pink-500 text-pink-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Instant Recharge Packages</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-pink-500 text-pink-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Transaction Ledger</span>
          </button>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="mx-6 mt-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'recharge' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Select a top-up package (One-click demo recharge):</span>
                <span className="text-pink-400 font-bold">Stripe / Apple Pay / Google Pay Ready</span>
              </div>

              {packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                    pkg.highlight
                      ? 'bg-gradient-to-r from-pink-900/30 via-purple-900/30 to-slate-800 border-pink-500/80 ring-1 ring-pink-500/50 shadow-lg'
                      : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-amber-300">
                      🪙
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-white">
                          {pkg.coins.toLocaleString()} {brandConfig.coinName}
                        </span>
                        {pkg.bonus > 0 && (
                          <span className="text-[10px] font-black bg-pink-500 text-white px-1.5 py-0.2 rounded-full">
                            +{pkg.bonus} BONUS
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="bg-slate-700/80 px-1.5 py-0.2 rounded text-[10px] text-slate-300 font-bold">
                          {pkg.tag}
                        </span>
                        <span>• Approx {Math.round(pkg.coins / 10)} Roses</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuy(pkg.coins, pkg.usd, pkg.bonus)}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-xs py-2 px-4 rounded-xl shadow-md transition cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>${pkg.usd} (Test Buy)</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.length === 0 ? (
                <p className="text-center text-slate-500 text-xs py-8">No transactions found.</p>
              ) : (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{tx.details}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        {tx.timestamp} • User: {tx.userName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-black ${
                          tx.type === 'coin_purchase'
                            ? 'text-emerald-400'
                            : tx.type === 'gift_sent'
                            ? 'text-pink-400'
                            : 'text-blue-400'
                        }`}
                      >
                        {tx.type === 'coin_purchase' ? '+' : '-'}
                        {tx.amount.toLocaleString()} {tx.currency}
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-bold uppercase">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
