import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Diamond, DollarSign, Key, Copy, Check, ArrowUpRight,
  ShieldCheck, Video, Clock, Building2, AlertCircle
} from 'lucide-react';

export const HostDashboard: React.FC = () => {
  const { activeHost, brandConfig, requestHostWithdrawal, setActiveTab, startPKBattle } = useApp();
  const [copiedKey, setCopiedKey] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('200');
  const [payoutMethod, setPayoutMethod] = useState('PayPal: aria@live.com');
  const [withdrawNotice, setWithdrawNotice] = useState<string | null>(null);

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(activeHost.streamKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount < 50) {
      alert('Minimum payout amount is $50.00 USD.');
      return;
    }

    if (amount > activeHost.todayEarningsUSD) {
      alert(`Insufficient available earnings! You have $${activeHost.todayEarningsUSD.toFixed(2)} USD.`);
      return;
    }

    requestHostWithdrawal(amount, payoutMethod);
    setWithdrawNotice(`Withdrawal request of $${amount.toFixed(2)} USD submitted! Status: Pending Approval.`);
    setTimeout(() => setWithdrawNotice(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Host Profile & KPI Banner */}
      <div className="bg-gradient-to-r from-purple-900/50 via-slate-900 to-slate-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={activeHost.avatar}
            alt={activeHost.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-500 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{activeHost.name}</h2>
              {activeHost.verified && (
                <span className="flex items-center gap-1 bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED CREATOR
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">{activeHost.handle} • {activeHost.category}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-purple-300 font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Signed Agency: {activeHost.agencyName} (20% Split)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setActiveTab('stream');
              startPKBattle();
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-xs px-5 py-3 rounded-xl shadow-lg shadow-pink-500/30 transition cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Launch PK Live Broadcast</span>
          </button>
        </div>
      </div>

      {/* Financial Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Today's {brandConfig.diamondName}</span>
            <Diamond className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {activeHost.diamonds.toLocaleString()} 💎
          </div>
          <span className="text-[11px] text-emerald-400 font-bold mt-1 inline-block">
            +18.4% vs yesterday
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Estimated Cashout Value</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            ${activeHost.todayEarningsUSD.toFixed(2)} USD
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">
            Rate: 200 {brandConfig.diamondName} = $1.00 USD
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Broadcast Hours (7d)</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            42.5 hrs
          </div>
          <span className="text-[11px] text-purple-400 font-bold mt-1 inline-block">
            Meets agency tier quota
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>PK Battle Win Rate</span>
            <ArrowUpRight className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 mt-2">
            78.4% (28W - 8L)
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">
            Rank #1 Regional Leaderboard
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stream Encoder & RTMP Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-400" />
            <h3 className="font-extrabold text-base text-white">OBS / Hardware RTMP Encoder Settings</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Use OBS Studio, vMix, or Prism Live to broadcast 1080p 60fps streams directly to your channel.
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                RTMP Ingest Server URL
              </label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300">
                <span className="truncate flex-1">rtmp://live.omnistu.com/stream</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Private Stream Key
              </label>
              <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300">
                <span className="truncate flex-1">live_sk_aria_99812_secure</span>
                <button
                  onClick={handleCopyKey}
                  className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 font-bold ml-2 cursor-pointer"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal / Cashout Request Tool */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base text-white">Creator Earnings Cashout</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Withdraw earned diamonds directly to your local bank account, PayPal, or USDT wallet.
          </p>

          {withdrawNotice && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{withdrawNotice}</span>
            </div>
          )}

          <form onSubmit={handleWithdraw} className="space-y-3 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Payout Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-500">$</span>
                <input
                  type="number"
                  min="50"
                  step="10"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Available: ${activeHost.todayEarningsUSD.toFixed(2)} USD (Min: $50.00)
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Payout Destination
              </label>
              <select
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="PayPal: aria@live.com">PayPal (aria@live.com)</option>
                <option value="USDT TRC20: TQ89...k291">USDT TRC20 (TQ89...k291)</option>
                <option value="Bank Wire: Chase Account ending in 4102">Bank Wire (Chase ...4102)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-xs py-3 rounded-xl shadow-lg transition cursor-pointer mt-2"
            >
              Submit Withdrawal Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
