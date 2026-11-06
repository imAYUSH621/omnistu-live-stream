import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coins, Diamond, Crown, Palette, User, Video, ShieldCheck,
  Building2, Wallet, Sparkles, ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  onOpenWallet: () => void;
  onOpenVIP: () => void;
  onOpenRebrand: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenWallet, onOpenVIP, onOpenRebrand }) => {
  const {
    currentUser,
    brandConfig,
    activeTab,
    setActiveTab,
    switchRole,
    activeHost,
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const roles: { role: UserRole; label: string; desc: string; icon: React.ReactNode }[] = [
    { role: 'viewer', label: 'VIP Viewer', desc: 'Watch, chat, buy coins & send gifts', icon: <User className="w-4 h-4 text-pink-400" /> },
    { role: 'host', label: 'Star Host (Streamer)', desc: 'Go live, PK battle & withdraw earnings', icon: <Video className="w-4 h-4 text-purple-400" /> },
    { role: 'agency', label: 'Agency Owner', desc: 'Manage hosts & track 20% commission', icon: <Building2 className="w-4 h-4 text-blue-400" /> },
    { role: 'coin_seller', label: 'Coin Seller / Reseller', desc: 'Transfer wholesale coins to user ID', icon: <Wallet className="w-4 h-4 text-emerald-400" /> },
    { role: 'admin', label: 'Super Admin', desc: 'Full platform metrics, ban & approvals', icon: <ShieldCheck className="w-4 h-4 text-amber-400" /> },
  ];

  const currentRoleObj = roles.find((r) => r.role === currentUser.role) || roles[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner Notice for Client Demo */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px]">
            Ready-Made White-Label Platform
          </span>
          <span className="hidden sm:inline text-pink-100">
            Switch roles to test Viewer, Host PK Battle, 20% Agency Cut, Coin Seller & Admin Panel!
          </span>
        </div>
        <button
          onClick={onOpenRebrand}
          className="flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-white px-2.5 py-0.5 rounded transition cursor-pointer font-semibold"
        >
          <Palette className="w-3.5 h-3.5 text-yellow-300" />
          <span>Live Rebrand Demo</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('stream')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-105 transition">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  {brandConfig.appName}
                </span>
                <span className="text-[10px] bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded font-mono font-bold">
                  v3.2 PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-[200px]">
                {brandConfig.tagline}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 ml-4 bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setActiveTab('stream')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'stream'
                  ? 'bg-pink-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              📺 Live Stream & PK
            </button>
            <button
              onClick={() => setActiveTab('host_dash')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'host_dash'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              🎙️ Host Studio
            </button>
            <button
              onClick={() => setActiveTab('agency_dash')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'agency_dash'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              🏢 Agency Portal (20%)
            </button>
            <button
              onClick={() => setActiveTab('seller_dash')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'seller_dash'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              💰 Coin Seller Hub
            </button>
            <button
              onClick={() => setActiveTab('admin_dash')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'admin_dash'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              🛡️ Master Admin
            </button>
          </nav>
        </div>

        {/* Right Section: Coins, VIP & Role Switcher */}
        <div className="flex items-center gap-3">
          {/* User Coins Button */}
          <button
            onClick={onOpenWallet}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 hover:border-amber-400 px-3 py-1.5 rounded-full transition cursor-pointer shadow-sm group"
          >
            <Coins className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition" />
            <span className="font-bold text-xs text-amber-300">
              {currentUser.coins.toLocaleString()} {brandConfig.coinName}
            </span>
            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-900 font-extrabold text-[10px] flex items-center justify-center leading-none">
              +
            </span>
          </button>

          {/* VIP Level Badge */}
          <button
            onClick={onOpenVIP}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 hover:border-purple-400 px-2.5 py-1.5 rounded-full transition cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
            <span className="font-bold text-xs bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              VIP {currentUser.vipLevel}
            </span>
          </button>

          {/* Host Diamonds (if on host tab) */}
          {activeTab === 'host_dash' && (
            <div className="hidden lg:flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-blue-300">
              <Diamond className="w-3.5 h-3.5 text-blue-400" />
              <span>{activeHost.diamonds.toLocaleString()} {brandConfig.diamondName}</span>
            </div>
          )}

          {/* Interactive Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 px-3 py-1.5 rounded-xl transition cursor-pointer text-left"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-pink-500"
              />
              <div className="hidden xl:block">
                <div className="text-xs font-semibold leading-tight text-white flex items-center gap-1">
                  <span>{currentUser.name}</span>
                </div>
                <div className="text-[10px] text-pink-400 font-medium">{currentRoleObj.label}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Persona (Test All Roles)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Click any role to test full permissions & views instantly
                  </p>
                </div>
                <div className="mt-1 space-y-1">
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition cursor-pointer ${
                        currentUser.role === r.role
                          ? 'bg-pink-600/20 border border-pink-500/40 text-white'
                          : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="p-1.5 bg-slate-800 rounded-lg shrink-0 mt-0.5">{r.icon}</div>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1">
                          {r.label}
                          {currentUser.role === r.role && (
                            <span className="text-[9px] bg-pink-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
