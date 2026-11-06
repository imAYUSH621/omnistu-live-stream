import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Coins, Sparkles, Flame } from 'lucide-react';
import { Gift } from '../types';

interface GiftTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWallet: () => void;
}

export const GiftTrayModal: React.FC<GiftTrayModalProps> = ({ isOpen, onClose, onOpenWallet }) => {
  const { gifts, currentUser, brandConfig, sendGift, activeHost, hosts, pkBattle } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'popular' | 'luxury' | 'mythic'>('all');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(gifts[0]);
  const [targetHostId, setTargetHostId] = useState<string>(activeHost.id);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredGifts = gifts.filter((g) =>
    selectedCategory === 'all' ? true : g.category === selectedCategory
  );

  const opponentHost = hosts.find((h) => h.id === activeHost.pkOpponentId) || hosts[1];

  const handleSend = () => {
    if (!selectedGift) return;
    setErrorMsg(null);

    const totalCost = selectedGift.cost * multiplier;
    if (currentUser.coins < totalCost) {
      setErrorMsg(`Insufficient coins! You need ${totalCost.toLocaleString()} ${brandConfig.coinName}.`);
      return;
    }

    // Send gifts according to multiplier
    for (let i = 0; i < multiplier; i++) {
      sendGift(selectedGift.id, targetHostId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-2xl bg-slate-900 border-t sm:border border-slate-700 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-200">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <h3 className="font-extrabold text-base text-white">Send Live Stream Gift</h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Coin balance & Recharge button */}
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full border border-amber-500/30 text-xs">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-amber-300">
                {currentUser.coins.toLocaleString()}
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenWallet();
                }}
                className="ml-1 text-[11px] font-bold text-pink-400 hover:text-pink-300 underline cursor-pointer"
              >
                + Top Up
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If in PK Battle: Streamer Target Selector (Red vs Blue) */}
        {activeHost.streamMode === 'pk' && pkBattle.isActive && (
          <div className="bg-slate-950/70 px-5 py-3 border-b border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-pink-400" /> Support Team:
            </span>
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <button
                onClick={() => setTargetHostId(activeHost.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                  targetHostId === activeHost.id
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-2 ring-rose-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                Team Red ({activeHost.name.split(' ')[0]})
              </button>
              <button
                onClick={() => setTargetHostId(opponentHost.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                  targetHostId === opponentHost.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Team Blue ({opponentHost.name.split(' ')[0]})
              </button>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-1 border-b border-slate-800/60 overflow-x-auto">
          {(['all', 'popular', 'luxury', 'mythic'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Gifts' : cat}
            </button>
          ))}
        </div>

        {/* Gift Grid */}
        <div className="p-5 grid grid-cols-3 sm:grid-cols-6 gap-3 overflow-y-auto max-h-72">
          {filteredGifts.map((gift) => {
            const isSelected = selectedGift?.id === gift.id;
            return (
              <button
                key={gift.id}
                onClick={() => setSelectedGift(gift)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition text-center cursor-pointer relative group ${
                  isSelected
                    ? 'bg-gradient-to-b from-pink-600/30 to-purple-600/30 border-pink-500 ring-2 ring-pink-500/50'
                    : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <span className="text-4xl group-hover:scale-110 transition duration-150">
                  {gift.icon}
                </span>
                <span className="text-xs font-bold text-white mt-1.5 truncate max-w-full">
                  {gift.name}
                </span>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-extrabold text-amber-300">
                  <Coins className="w-3 h-3 text-amber-400" />
                  <span>{gift.cost.toLocaleString()}</span>
                </div>
                {gift.category === 'mythic' && (
                  <span className="absolute -top-1.5 -right-1.5 text-[8px] font-black bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full uppercase">
                    SVGA
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Error notice if insufficient balance */}
        {errorMsg && (
          <div className="px-5 py-1 text-center text-xs font-semibold text-rose-400 bg-rose-500/10 border-t border-rose-500/20">
            {errorMsg}
          </div>
        )}

        {/* Footer: Multipliers & Send Action */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          {/* Multiplier Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[1, 5, 10, 99].map((m) => (
              <button
                key={m}
                onClick={() => setMultiplier(m)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  multiplier === m
                    ? 'bg-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                x{m}
              </button>
            ))}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!selectedGift}
            className="flex-1 max-w-[220px] bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-sm py-2.5 px-4 rounded-xl shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>
              Send {selectedGift ? `(${((selectedGift.cost * multiplier)).toLocaleString()} ${brandConfig.coinName})` : ''}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
