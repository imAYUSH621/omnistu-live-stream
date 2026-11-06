import React from 'react';
import { useApp } from '../context/AppContext';
import { Mic, MicOff, Volume2, UserPlus, Sparkles, Radio } from 'lucide-react';

interface AudioRoomStageProps {
  onOpenGiftTray: () => void;
}

export const AudioRoomStage: React.FC<AudioRoomStageProps> = ({ onOpenGiftTray }) => {
  const { audioSeats, toggleAudioSeat, activeHost, brandConfig, sendGift } = useApp();

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-900 via-purple-950/40 to-slate-950 p-4 justify-between">
      {/* Audio Room Header */}
      <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center">
            <Radio className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm text-white">Late Night Chill Talks & Chill Beats 🎧</h4>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                LIVE AUDIO
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Host: {activeHost.name} • 8 Speaker Pods Active
            </p>
          </div>
        </div>

        <button
          onClick={onOpenGiftTray}
          className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-lg transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Send Room Gift</span>
        </button>
      </div>

      {/* 8 Pod Speaker Grid */}
      <div className="grid grid-cols-4 gap-3 my-auto py-6">
        {audioSeats.map((seat) => (
          <div
            key={seat.seatNumber}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/50 transition relative group"
          >
            {seat.user ? (
              <div className="flex flex-col items-center cursor-pointer" onClick={() => toggleAudioSeat(seat.seatNumber)}>
                {/* Avatar with speaking wave ring */}
                <div className="relative">
                  <img
                    src={seat.user.avatar}
                    alt={seat.user.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 shadow-lg group-hover:scale-105 transition"
                  />
                  {!seat.isMuted && (
                    <span className="absolute -inset-1 rounded-full border-2 border-emerald-400 animate-ping opacity-75 pointer-events-none" />
                  )}
                  {/* Mic status badge */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border border-slate-900 ${
                      seat.isMuted ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {seat.isMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                  </div>
                </div>

                <span className="text-xs font-bold text-white mt-2 truncate max-w-[90px]">
                  {seat.user.name.split(' ')[0]}
                </span>
                <span className="text-[10px] font-semibold text-purple-400">
                  Seat #{seat.seatNumber}
                </span>
              </div>
            ) : (
              <button
                onClick={() => toggleAudioSeat(seat.seatNumber)}
                className="flex flex-col items-center justify-center py-2 cursor-pointer group-hover:scale-105 transition"
              >
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-purple-400 group-hover:text-purple-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 mt-2">Take Seat</span>
                <span className="text-[10px] text-slate-500">Seat #{seat.seatNumber}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Audience Section & Quick Actions */}
      <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-300">Audience: 1,842 Listeners</span>
        </div>

        {/* Quick gift buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => sendGift('gift_rose', activeHost.id)}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-white transition cursor-pointer"
          >
            <span>🌹 Rose (10 {brandConfig.coinName})</span>
          </button>
          <button
            onClick={() => sendGift('gift_heart', activeHost.id)}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-white transition cursor-pointer"
          >
            <span>💖 Love (50 {brandConfig.coinName})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
