import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Flame } from 'lucide-react';

export const GiftAnimationOverlay: React.FC = () => {
  const { activeAnimation } = useApp();

  if (!activeAnimation) return null;

  const { gift, senderName, recipientName } = activeAnimation;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Top Floating Announcement Banner */}
      <div className="absolute top-24 animate-bounce bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 border-2 border-yellow-300/80 text-white px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md">
        <Flame className="w-5 h-5 text-yellow-300 animate-pulse" />
        <span className="text-sm font-extrabold tracking-wide uppercase">
          <span className="text-yellow-200">{senderName}</span> sent{' '}
          <span className="text-pink-200">{gift.name}</span> {gift.icon} to{' '}
          <span className="text-yellow-200">{recipientName}</span>!
        </span>
        <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
      </div>

      {/* Animation based on gift type */}
      {gift.animationType === 'rose' && (
        <div className="flex flex-col items-center justify-center animate-pulse">
          <div className="text-8xl filter drop-shadow-[0_10px_20px_rgba(236,72,153,0.8)] animate-bounce">
            🌹
          </div>
          <p className="mt-4 text-xl font-black text-pink-400 bg-slate-900/80 px-4 py-1 rounded-full border border-pink-500/50">
            Magic Rose Shower! +{gift.diamondsEarned} 💎
          </p>
        </div>
      )}

      {gift.animationType === 'heart' && (
        <div className="flex flex-col items-center justify-center animate-pulse">
          <div className="text-8xl filter drop-shadow-[0_10px_25px_rgba(244,63,94,0.9)] animate-ping">
            💖
          </div>
          <p className="mt-4 text-xl font-black text-rose-400 bg-slate-900/80 px-4 py-1 rounded-full border border-rose-500/50">
            Full Heart Blast! +{gift.diamondsEarned} 💎
          </p>
        </div>
      )}

      {gift.animationType === 'car' && (
        <div className="w-full relative flex flex-col items-center">
          {/* Zooming Car Animation */}
          <div className="text-9xl filter drop-shadow-[0_15px_30px_rgba(59,130,246,0.9)] animate-[drive_2.5s_ease-in-out_forwards] transform -scale-x-100">
            🏎️💨
          </div>
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-2xl px-6 py-2 rounded-2xl border-2 border-cyan-400 shadow-2xl mt-6">
            ⚡ LUXURY SUPERCAR ENTRY! (+{gift.diamondsEarned} 💎)
          </div>
        </div>
      )}

      {gift.animationType === 'yacht' && (
        <div className="w-full flex flex-col items-center">
          <div className="text-9xl filter drop-shadow-[0_20px_35px_rgba(14,165,233,0.9)] animate-pulse">
            🛥️🌊
          </div>
          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white font-black text-2xl px-8 py-2.5 rounded-2xl border-2 border-yellow-400 shadow-2xl mt-4">
            🌊 MEGA LUXURY YACHT ARRIVAL! (+{gift.diamondsEarned} 💎)
          </div>
        </div>
      )}

      {gift.animationType === 'dragon' && (
        <div className="w-full flex flex-col items-center">
          {/* Dragon Roar & Flame Effect */}
          <div className="text-9xl filter drop-shadow-[0_25px_50px_rgba(234,179,8,1)] animate-bounce">
            🐉🔥
          </div>
          <div className="bg-gradient-to-r from-amber-500 via-red-600 to-purple-700 text-white font-black text-3xl px-10 py-3 rounded-2xl border-4 border-yellow-300 shadow-[0_0_50px_rgba(234,179,8,0.8)] mt-4">
            👑 MYTHIC GOLDEN DRAGON AWAKENED! (+{gift.diamondsEarned} 💎)
          </div>
        </div>
      )}
    </div>
  );
};
