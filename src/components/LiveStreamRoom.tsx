import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart, Send, Gift as GiftIcon, Camera, Swords, Radio,
  Users, Diamond, Sparkles, Check, Share2, Eye
} from 'lucide-react';
import { PKBattleOverlay } from './PKBattleOverlay';
import { AudioRoomStage } from './AudioRoomStage';

interface LiveStreamRoomProps {
  onOpenGiftTray: () => void;
  onOpenWallet: () => void;
}

export const LiveStreamRoom: React.FC<LiveStreamRoomProps> = ({ onOpenGiftTray, onOpenWallet }) => {
  const {
    activeHost,
    hosts,
    setActiveHostId,
    setStreamMode,
    isWebcamActive,
    toggleWebcam,
    chatMessages,
    sendChatMessage,
    brandConfig,
    startPKBattle,
    sendGift,
  } = useApp();

  const [chatInput, setChatInput] = useState('');
  const [likesCount, setLikesCount] = useState(14820);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; color: string }[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle Real Webcam Stream
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isWebcamActive && videoRef.current) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: false })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.warn('Webcam permission denied or unavailable:', err);
        });
    } else if (!isWebcamActive && videoRef.current) {
      if (videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isWebcamActive, activeHost.streamMode]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput('');
  };

  const handleLike = (e: React.MouseEvent) => {
    setLikesCount((prev) => prev + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const heartX = Math.random() * 80 - 40;
    const colors = ['#ec4899', '#f43f5e', '#a855f7', '#3b82f6', '#eab308'];
    const heartColor = colors[Math.floor(Math.random() * colors.length)];

    setFloatingHearts((prev) => [
      ...prev.slice(-15),
      { id: Date.now(), x: heartX, color: heartColor },
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 flex flex-col lg:flex-row gap-4 h-[calc(100vh-5rem)]">
      {/* Left/Main Column: Broadcast Stage */}
      <div className="flex-1 flex flex-col bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
        {/* Stream Mode Top Selector */}
        <div className="bg-slate-950/90 backdrop-blur-md px-4 py-2 border-b border-slate-800 flex items-center justify-between z-20">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setStreamMode('video')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeHost.streamMode === 'video'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Solo Live</span>
            </button>
            <button
              onClick={startPKBattle}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeHost.streamMode === 'pk'
                  ? 'bg-rose-600 text-white shadow-md ring-1 ring-rose-400'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <Swords className="w-3.5 h-3.5 text-yellow-300" />
              <span>PK Battle ⚔️</span>
            </button>
            <button
              onClick={() => setStreamMode('audio')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeHost.streamMode === 'audio'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Audio Pods 🎙️</span>
            </button>
          </div>

          {/* Quick Streamer Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-[11px] font-bold">Switch Host:</span>
            <div className="flex items-center gap-1">
              {hosts.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveHostId(h.id)}
                  className={`w-7 h-7 rounded-full overflow-hidden border transition cursor-pointer ${
                    activeHost.id === h.id ? 'border-pink-500 ring-2 ring-pink-500/50' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                  title={h.name}
                >
                  <img src={h.avatar} alt={h.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Stage Content */}
        <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col justify-between">
          {activeHost.streamMode === 'pk' ? (
            <PKBattleOverlay onOpenGiftTray={onOpenGiftTray} />
          ) : activeHost.streamMode === 'audio' ? (
            <AudioRoomStage onOpenGiftTray={onOpenGiftTray} />
          ) : (
            /* Solo Video Stream */
            <div className="w-full h-full relative flex flex-col justify-between" onClick={handleLike}>
              {/* Video background / Webcam */}
              {isWebcamActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={activeHost.avatar}
                  alt={activeHost.name}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-90 animate-[pulse_10s_ease-in-out_infinite]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70 pointer-events-none" />

              {/* Top Stream Info Bar */}
              <div className="relative z-10 p-4 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2.5 bg-slate-950/70 backdrop-blur-md p-1.5 pr-3 rounded-full border border-slate-700">
                  <img
                    src={activeHost.avatar}
                    alt={activeHost.name}
                    className="w-10 h-10 rounded-full object-cover border border-pink-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-white">{activeHost.name}</span>
                      <span className="text-[10px] bg-pink-500 text-white px-1.5 py-0.2 rounded font-black">
                        LIVE
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Users className="w-3 h-3 text-pink-400" />
                        {activeHost.viewers.toLocaleString()}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-blue-300">
                        <Diamond className="w-3 h-3 text-blue-400" />
                        {activeHost.diamonds.toLocaleString()} {brandConfig.diamondName}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                      isFollowing
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-pink-600 hover:bg-pink-500 text-white shadow'
                    }`}
                  >
                    {isFollowing ? 'Following' : '+ Follow'}
                  </button>
                </div>

                {/* Camera Toggle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWebcam();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer backdrop-blur-md border ${
                    isWebcamActive
                      ? 'bg-emerald-600/90 border-emerald-400 text-white'
                      : 'bg-slate-950/80 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isWebcamActive ? 'Webcam Active' : 'Use My Webcam'}</span>
                </button>
              </div>

              {/* Floating Hearts Physics */}
              <div className="absolute bottom-16 right-6 pointer-events-none z-20">
                {floatingHearts.map((h) => (
                  <div
                    key={h.id}
                    style={{
                      transform: `translateX(${h.x}px)`,
                      color: h.color,
                    }}
                    className="absolute bottom-0 text-3xl animate-float-heart"
                  >
                    ❤️
                  </div>
                ))}
              </div>

              {/* Bottom Quick Bar inside Solo Stream */}
              <div className="relative z-10 p-4 flex items-center justify-between pointer-events-auto">
                <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300">
                  <span>{activeHost.bio}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sendGift('gift_rose', activeHost.id);
                    }}
                    className="bg-slate-900/90 hover:bg-slate-800 border border-pink-500/50 text-white px-3 py-1.5 rounded-xl text-xs font-extrabold shadow-lg transition cursor-pointer flex items-center gap-1"
                  >
                    <span>🌹 Rose (10)</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sendGift('gift_car', activeHost.id);
                    }}
                    className="bg-slate-900/90 hover:bg-slate-800 border border-yellow-400/50 text-yellow-300 px-3 py-1.5 rounded-xl text-xs font-extrabold shadow-lg transition cursor-pointer flex items-center gap-1"
                  >
                    <span>🏎️ Car (1k)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Bottom Action Bar for Stream */}
        <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenGiftTray}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg shadow-pink-500/30 transition cursor-pointer"
            >
              <GiftIcon className="w-4 h-4 text-yellow-300" />
              <span>Send Gift Tray</span>
            </button>

            <button
              onClick={onOpenWallet}
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs px-3 py-2 rounded-xl border border-amber-500/30 transition cursor-pointer"
            >
              <span>+ Buy {brandConfig.coinName}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-rose-500/20 text-rose-400 px-3 py-2 rounded-xl border border-slate-700 text-xs font-bold transition cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>{likesCount.toLocaleString()}</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Stream link copied to clipboard!');
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition cursor-pointer"
              title="Share Stream"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Live Chat & Social Feed */}
      <div className="w-full lg:w-80 h-72 lg:h-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
        {/* Chat Header */}
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">
              Live Stream Chat
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {chatMessages.length} msgs
          </span>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded-xl transition ${
                msg.isSystem
                  ? 'bg-pink-600/15 border border-pink-500/30 text-pink-300 font-semibold'
                  : msg.giftIcon
                  ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200 font-semibold'
                  : 'bg-slate-800/50 hover:bg-slate-800/80 text-slate-200'
              }`}
            >
              {msg.isSystem ? (
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="w-3 h-3 text-pink-400 shrink-0" />
                  <span>{msg.text}</span>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {msg.vipLevel > 0 && (
                      <span className="text-[9px] font-black bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 px-1.5 py-0.2 rounded-full">
                        VIP {msg.vipLevel}
                      </span>
                    )}
                    <span className="font-extrabold text-white text-[11px]">{msg.userName}:</span>
                    {msg.giftIcon && <span className="text-base">{msg.giftIcon}</span>}
                  </div>
                  <p className="mt-0.5 text-slate-300 leading-relaxed text-[11px]">{msg.text}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSendChat}
          className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type a chat message..."
            className="flex-1 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
          />
          <button
            type="submit"
            className="p-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl transition cursor-pointer shadow-md disabled:opacity-50"
            disabled={!chatInput.trim()}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
