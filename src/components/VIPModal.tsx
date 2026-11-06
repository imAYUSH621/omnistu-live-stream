import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Crown, CheckCircle2, Shield, Zap } from 'lucide-react';

interface VIPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWallet: () => void;
}

export const VIPModal: React.FC<VIPModalProps> = ({ isOpen, onClose, onOpenWallet }) => {
  const { currentUser, vipTiers, brandConfig } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg">
              <Crown className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">VIP Royalty Status System</h3>
              <p className="text-xs text-slate-400">
                Unlock exclusive entrance effects, anti-kick shield, & badges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current VIP Status Card */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Your Current Status
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                VIP Tier {currentUser.vipLevel}
              </span>
              <span className="text-[10px] font-black bg-pink-500/20 text-pink-400 border border-pink-500/40 px-2 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenWallet();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Spend Coins to Level Up</span>
          </button>
        </div>

        {/* VIP Tiers List */}
        <div className="p-6 overflow-y-auto space-y-3.5 max-h-[55vh]">
          {vipTiers.map((tier) => {
            const isUnlocked = currentUser.vipLevel >= tier.level;
            return (
              <div
                key={tier.level}
                className={`p-4 rounded-2xl border transition ${
                  isUnlocked
                    ? 'bg-slate-800/80 border-pink-500/40 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${tier.badgeColor} flex items-center justify-center font-black text-xs text-white shadow-md`}
                    >
                      V{tier.level}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-white flex items-center gap-2">
                        <span>{tier.name}</span>
                        {isUnlocked && (
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Unlocked
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Spend {tier.minCoins.toLocaleString()} {brandConfig.coinName}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-full border border-slate-700 font-semibold">
                      Level {tier.level}
                    </span>
                  </div>
                </div>

                {/* Perks Grid */}
                <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <Shield className="w-3 h-3 text-pink-400 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
