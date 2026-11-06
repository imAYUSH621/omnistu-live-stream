import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck, Users, DollarSign, Activity, AlertTriangle,
  CheckCircle2, Ban, Video, Eye, Settings, Sliders
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    users,
    hosts,
    agencies,
    adminToggleBanUser,
    adminApproveHost,
    adminUpdateAgencyCommission,
    brandConfig,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'kpi' | 'users' | 'hosts' | 'monitor' | 'settings'>('kpi');
  const [searchTerm, setSearchTerm] = useState('');
  const [agencyCutSlider, setAgencyCutSlider] = useState(20);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-amber-900/50 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">Master Admin Control Panel</h2>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                ROOT PRIVILEGES
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Platform Governance, KYC Verification, Stream Moderation & Economy Tuning
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveAdminTab('kpi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeAdminTab === 'kpi' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Analytics
          </button>
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeAdminTab === 'users' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            👥 Users & Bans
          </button>
          <button
            onClick={() => setActiveAdminTab('hosts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeAdminTab === 'hosts' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⭐ Host Approvals
          </button>
          <button
            onClick={() => setActiveAdminTab('monitor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeAdminTab === 'monitor' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📺 Live Grid
          </button>
          <button
            onClick={() => setActiveAdminTab('settings')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeAdminTab === 'settings' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ Economy
          </button>
        </div>
      </div>

      {/* Tab 1: KPI Dashboard */}
      {activeAdminTab === 'kpi' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold block">Total Users</span>
              <div className="text-2xl font-black text-white mt-1">24,812</div>
              <span className="text-[11px] text-emerald-400 font-bold mt-1 inline-block">+1,240 this week</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold block">24h Gross Revenue</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">$18,400.00</div>
              <span className="text-[11px] text-slate-400 mt-1 inline-block">1,840,000 Coins minted</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold block">Host Payouts (60%)</span>
              <div className="text-2xl font-black text-blue-400 mt-1">$11,040.00</div>
              <span className="text-[11px] text-slate-400 mt-1 inline-block">Auto-calculated</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold block">Platform Net Profit (20%)</span>
              <div className="text-2xl font-black text-amber-400 mt-1">$3,680.00</div>
              <span className="text-[11px] text-emerald-400 font-bold mt-1 inline-block">Pure Net Margin</span>
            </div>
          </div>

          {/* Revenue Allocation Chart Mock */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-extrabold text-base text-white mb-4">
              Automated Micro-Economy Split (Standard Bigo Architecture)
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Streamer Share (Diamonds Cashout)</span>
                  <span className="text-blue-400 font-black">60% ($11,040)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Talent Agencies Commission Cut</span>
                  <span className="text-purple-400 font-black">20% ($3,680)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '20%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Platform Retained Profit & Infrastructure</span>
                  <span className="text-amber-400 font-black">20% ($3,680)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Moderation & Ban System */}
      {activeAdminTab === 'users' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-white">Registered Users & Moderation</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user name or role..."
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Coin Balance</th>
                  <th className="px-4 py-3">VIP Level</th>
                  <th className="px-4 py-3">Account Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 flex items-center gap-2">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                      <span className="font-bold text-white">{u.name}</span>
                    </td>
                    <td className="px-4 py-3 uppercase text-[10px] font-bold text-slate-400">{u.role}</td>
                    <td className="px-4 py-3 font-mono font-bold text-amber-300">{u.coins.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold text-[10px]">
                        VIP {u.vipLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {u.isBanned ? (
                        <span className="text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded font-bold text-[10px]">
                          BANNED
                        </span>
                      ) : (
                        <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-bold text-[10px]">
                          ACTIVE
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => adminToggleBanUser(u.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                          u.isBanned
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-rose-600 hover:bg-rose-500 text-white'
                        }`}
                      >
                        <Ban className="w-3 h-3" />
                        <span>{u.isBanned ? 'Unban User' : 'Ban User'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Host Verification Queue */}
      {activeAdminTab === 'hosts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl p-6">
          <h3 className="font-extrabold text-base text-white mb-4">Streamer Verification & Approval Queue</h3>
          <div className="space-y-3">
            {hosts.map((h) => (
              <div
                key={h.id}
                className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={h.avatar} alt={h.name} className="w-12 h-12 rounded-xl object-cover border border-purple-500" />
                  <div>
                    <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <span>{h.name}</span>
                      {h.verified ? (
                        <span className="text-blue-400 text-xs font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-amber-400 text-xs font-bold flex items-center gap-0.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> Pending Verification
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {h.handle} • {h.category} • Signed to {h.agencyName}
                    </div>
                  </div>
                </div>

                <div>
                  {!h.verified ? (
                    <button
                      onClick={() => adminApproveHost(h.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Creator Badge</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-500 bg-slate-800 px-3 py-1 rounded-xl">
                      Already Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Live Stream Monitor Grid */}
      {activeAdminTab === 'monitor' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="font-extrabold text-base text-white mb-4">
            Live Stream Broadcast Surveillance Grid (4 Simultaneous Feeds)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hosts.map((h) => (
              <div key={h.id} className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 aspect-video flex flex-col justify-between p-3">
                <img src={h.avatar} alt={h.name} className="absolute inset-0 w-full h-full object-cover filter brightness-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />

                <div className="relative z-10 flex justify-between items-center text-xs">
                  <span className="bg-slate-950/80 px-2.5 py-1 rounded-lg text-white font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    {h.name}
                  </span>
                  <span className="bg-slate-950/80 px-2 py-0.5 rounded text-slate-300 font-mono text-[10px]">
                    {h.viewers.toLocaleString()} Viewers
                  </span>
                </div>

                <div className="relative z-10 flex justify-between items-center pt-2">
                  <span className="text-[11px] text-yellow-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded">
                    Mode: {h.streamMode.toUpperCase()}
                  </span>
                  <button
                    onClick={() => alert(`Warning dispatched to streamer ${h.name} for content compliance.`)}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-lg shadow cursor-pointer"
                  >
                    Kill Stream
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Economy & Settings */}
      {activeAdminTab === 'settings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-base text-white">Platform Commission & Economy Tuning</h3>

          <div className="max-w-md space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Default Agency Commission Cut</span>
                <span className="text-amber-400 font-black">{agencyCutSlider}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={agencyCutSlider}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setAgencyCutSlider(val);
                  adminUpdateAgencyCommission(agencies[0].id, val / 100);
                }}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Adjusts the automatic revenue share assigned to all licensed talent agencies.
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span>Diamond Cashout Ratio:</span>
                <span className="font-mono font-bold text-white">200 Diamonds = $1.00 USD</span>
              </div>
              <div className="flex justify-between">
                <span>Coin Buyer Retail Price:</span>
                <span className="font-mono font-bold text-white">100 Coins = $0.99 USD</span>
              </div>
              <div className="flex justify-between">
                <span>Coin Seller Wholesale Margin:</span>
                <span className="font-mono font-bold text-emerald-400">35% Gross Discount</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
