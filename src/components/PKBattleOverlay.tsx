import React from 'react';
import { useApp } from '../context/AppContext';
import { Swords, Flame, Trophy, RotateCcw, Sparkles } from 'lucide-react';

interface PKBattleOverlayProps {
  onOpenGiftTray: () => void;
}

export const PKBattleOverlay: React.FC<PKBattleOverlayProps> = ({ onOpenGiftTray }) => {
  const { pkBattle, hosts, resetPKBattle, sendGift } = useApp();

  const host1 = hosts.find((h) => h.id === pkBattle.host1Id) || hosts[0];
  const host2 = hosts.find((h) => h.id === pkBattle.host2Id) || hosts[1];

  const totalScore = Math.max(1, pkBattle.host1Score + pkBattle.host2Score);
  const host1Percentage = Math.min(90, Math.max(10, (pkBattle.host1Score / totalScore) * 100));
  const host2Percentage = 100 - host1Percentage;

  const minutes = Math.floor(pkBattle.timeLeftSeconds / 60);
  const seconds = pkBattle.timeLeftSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleQuickGift = (hostId: string) => {
    // Send a quick Magic Rose (10 coins) to chosen host
    sendGift('gift_rose', hostId);
  };

  const handleSupercarGift = (hostId: string) => {
    // Send a quick Super Sports Car (1000 coins)
    sendGift('gift_car', hostId);
  };

  return (
    <div className="w-full flex flex-col h-full relative">
      {/* PK Header: Timer & Tug-of-War Gauge */}
      <div className="absolute top-2 left-2 right-2 z-20 flex flex-col items-center">
        {/* Battle Status Pill */}
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-700 shadow-xl mb-1.5">
          <Swords className="w-4 h-4 text-rose-500 animate-spin" />
          <span className="font-mono font-black text-sm tracking-wider text-white">
            {pkBattle.timeLeftSeconds > 0 ? formattedTime : 'BATTLE FINISHED'}
          </span>
          <Flame className="w-4 h-4 text-blue-500 animate-pulse" />
        </div>

        {/* Dynamic Tug-of-War Bar */}
        <div className="w-full max-w-lg bg-slate-900/90 rounded-full h-7 p-1 border-2 border-slate-700/80 shadow-2xl relative flex items-center overflow-hidden">
          {/* Red Side (Left) */}
          <div
            style={{ width: `${host1Percentage}%` }}
            className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 rounded-l-full flex items-center justify-start px-3 text-xs font-black text-white transition-all duration-300 shadow-inner"
          >
            <span className="truncate">🔴 {pkBattle.host1Score.toLocaleString()}</span>
          </div>

          {/* Center Clashing Swords Icon */}
          <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-950 border-2 border-yellow-400 flex items-center justify-center z-10 shadow-lg">
            <Swords className="w-3.5 h-3.5 text-yellow-300" />
          </div>

          {/* Blue Side (Right) */}
          <div
            style={{ width: `${host2Percentage}%` }}
            className="h-full bg-gradient-to-l from-blue-600 via-cyan-500 to-indigo-500 rounded-r-full flex items-center justify-end px-3 text-xs font-black text-white transition-all duration-300 shadow-inner"
          >
            <span className="truncate">{pkBattle.host2Score.toLocaleString()} 🔵</span>
          </div>
        </div>
      </div>

      {/* Split-Screen Dual Stream Views */}
      <div className="flex-1 grid grid-cols-2 gap-1.5 p-1 relative h-full">
        {/* Host 1 (Red / Left) */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-rose-500/80 bg-slate-900 flex flex-col justify-between group shadow-xl">
          {/* Video Mock Canvas / Realistic Stream Feed */}
          <img
            src={host1.avatar}
            alt={host1.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />

          {/* Top Host 1 Info */}
          <div className="relative z-10 p-3 pt-14 flex items-center justify-between">
            <div className="bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-xl border border-rose-500/40 text-xs font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>{host1.name}</span>
            </div>
          </div>

          {/* Winner / Loser Tag */}
          {pkBattle.timeLeftSeconds === 0 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-xs">
              {pkBattle.winnerId === host1.id ? (
                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black px-6 py-2.5 rounded-2xl border-2 border-yellow-300 shadow-2xl animate-bounce flex items-center gap-2 text-base">
                  <Trophy className="w-6 h-6 fill-slate-950" />
                  <span>VICTORY! 🏆</span>
                </div>
              ) : (
                <div className="bg-slate-900/90 text-rose-400 font-bold px-4 py-2 rounded-xl border border-rose-500 text-xs text-center max-w-[80%]">
                  <div className="text-sm font-extrabold text-white">DEFEAT 🎭</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{pkBattle.punishment}</div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Quick Support Action */}
          <div className="relative z-10 p-3 flex flex-wrap gap-1.5 justify-center">
            <button
              onClick={() => handleQuickGift(host1.id)}
              className="bg-rose-600/90 hover:bg-rose-600 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-1"
            >
              <span>🌹 Gift Red (10)</span>
            </button>
            <button
              onClick={() => handleSupercarGift(host1.id)}
              className="bg-slate-900/90 hover:bg-slate-800 text-yellow-300 font-extrabold text-[11px] px-2.5 py-1.5 rounded-xl border border-yellow-400/50 shadow transition cursor-pointer flex items-center gap-1"
            >
              <span>🏎️ Supercar (+1k)</span>
            </button>
          </div>
        </div>

        {/* Host 2 (Blue / Right) */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-blue-500/80 bg-slate-900 flex flex-col justify-between group shadow-xl">
          <img
            src={host2.avatar}
            alt={host2.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />

          {/* Top Host 2 Info */}
          <div className="relative z-10 p-3 pt-14 flex items-center justify-between">
            <div className="bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-xl border border-blue-500/40 text-xs font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>{host2.name}</span>
            </div>
          </div>

          {/* Winner / Loser Tag */}
          {pkBattle.timeLeftSeconds === 0 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-xs">
              {pkBattle.winnerId === host2.id ? (
                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black px-6 py-2.5 rounded-2xl border-2 border-yellow-300 shadow-2xl animate-bounce flex items-center gap-2 text-base">
                  <Trophy className="w-6 h-6 fill-slate-950" />
                  <span>VICTORY! 🏆</span>
                </div>
              ) : (
                <div className="bg-slate-900/90 text-blue-400 font-bold px-4 py-2 rounded-xl border border-blue-500 text-xs text-center max-w-[80%]">
                  <div className="text-sm font-extrabold text-white">DEFEAT 🎭</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{pkBattle.punishment}</div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Quick Support Action */}
          <div className="relative z-10 p-3 flex flex-wrap gap-1.5 justify-center">
            <button
              onClick={() => handleQuickGift(host2.id)}
              className="bg-blue-600/90 hover:bg-blue-600 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-1"
            >
              <span>🌹 Gift Blue (10)</span>
            </button>
            <button
              onClick={() => handleSupercarGift(host2.id)}
              className="bg-slate-900/90 hover:bg-slate-800 text-yellow-300 font-extrabold text-[11px] px-2.5 py-1.5 rounded-xl border border-yellow-400/50 shadow transition cursor-pointer flex items-center gap-1"
            >
              <span>🏎️ Supercar (+1k)</span>
            </button>
          </div>
        </div>
      </div>

      {/* PK Controls Toolbar at Bottom */}
      <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={resetPKBattle}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rematch / Reset (3m)</span>
          </button>
        </div>

        <button
          onClick={onOpenGiftTray}
          className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold px-4 py-1.5 rounded-xl shadow-lg shadow-pink-500/20 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Full Gift Tray</span>
        </button>
      </div>
    </div>
  );
};
