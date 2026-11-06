import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet, Coins, Send, CheckCircle2, TrendingUp,
  Percent, ArrowRightLeft, ShieldCheck, User
} from 'lucide-react';

export const CoinSellerPortal: React.FC = () => {
  const { coinSellers, users, sellerTransferCoins, brandConfig } = useApp();
  const seller = coinSellers[0];

  const [targetUserId, setTargetUserId] = useState(users[0].id);
  const [transferAmount, setTransferAmount] = useState('5000');
  const [cashCollectedUSD, setCashCollectedUSD] = useState('42');
  const [transferSuccessNotice, setTransferSuccessNotice] = useState<string | null>(null);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(transferAmount, 10);
    const cash = parseFloat(cashCollectedUSD);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid coin amount.');
      return;
    }

    if (amount > seller.stockCoins) {
      alert(`Insufficient wholesale stock! You have ${seller.stockCoins.toLocaleString()} coins.`);
      return;
    }

    const success = sellerTransferCoins(targetUserId, amount, isNaN(cash) ? 0 : cash);
    if (success) {
      const recipientUser = users.find((u) => u.id === targetUserId);
      setTransferSuccessNotice(
        `Transferred ${amount.toLocaleString()} ${brandConfig.coinName} to ${recipientUser?.name || targetUserId} successfully!`
      );
      setTimeout(() => setTransferSuccessNotice(null), 4000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900/50 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <Wallet className="w-8 h-8 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{seller.name}</h2>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                LICENSED DISTRIBUTOR
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Seller Code: {seller.sellerCode} • Wholesale Margin: {(seller.discountMargin * 100).toFixed(0)}% Profit
            </p>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Wholesale Stock in Vault
            </span>
            <div className="text-2xl font-black text-amber-400 flex items-center gap-1.5 mt-0.5">
              <Coins className="w-6 h-6 text-amber-400 animate-pulse" />
              <span>{seller.stockCoins.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={() => alert('Order dispatched to Admin for wholesale coin top-up batch.')}
            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            + Buy Bulk Batch
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Wholesale Inventory</span>
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {seller.stockCoins.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 font-bold mt-1 inline-block">
            Ready for instant dispatch
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Coins Distributed</span>
            <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {seller.totalSoldCoins.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">
            To 3,420 registered users
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Wholesale Profit Margin</span>
            <Percent className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {(seller.discountMargin * 100).toFixed(0)}% Margin
          </div>
          <span className="text-[11px] text-purple-400 font-bold mt-1 inline-block">
            Admin wholesale discount
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Cash Collected</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-400 mt-2">
            ${seller.totalRevenueUSD.toLocaleString()} USD
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">
            Local cash, UPI, & bank wires
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Direct Coin Transfer Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base text-white">Direct User Coin Transfer Terminal</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Transfer wholesale coins directly into any user's wallet using their User ID or username. Instant 0-second delivery.
          </p>

          {transferSuccessNotice && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{transferSuccessNotice}</span>
            </div>
          )}

          <form onSubmit={handleTransfer} className="space-y-4 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Select Recipient User (Demo Users)
              </label>
              <select
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role}) • Balance: {u.coins.toLocaleString()} Coins
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Coins to Transfer
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Cash Collected (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={cashCollectedUSD}
                  onChange={(e) => setCashCollectedUSD(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-xs py-3 rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Execute Instant Coin Transfer</span>
            </button>
          </form>
        </div>

        {/* Reseller Business Explainer for Client */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <h3 className="font-extrabold text-base text-white">How the Coin Seller Economy Works</h3>
          </div>
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="font-bold text-white block mb-0.5">1. Bulk Wholesale Purchasing</span>
              <span>The platform sells batches of 500,000+ coins to verified sellers at a 35% discount, generating upfront high-volume cashflow.</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="font-bold text-white block mb-0.5">2. Localized Payment Penetration</span>
              <span>Sellers collect cash, local bank transfers, or UPI directly from users who do not have international credit cards.</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="font-bold text-white block mb-0.5">3. Instant Transfer Terminal</span>
              <span>The seller uses this exact terminal to credit the buyer's wallet in 0.5 seconds, capturing a 35% retail margin.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
