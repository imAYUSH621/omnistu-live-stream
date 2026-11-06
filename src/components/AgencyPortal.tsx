import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2, Users, DollarSign, Percent, Copy, Check,
  UserPlus, ExternalLink, ShieldCheck, Diamond
} from 'lucide-react';

export const AgencyPortal: React.FC = () => {
  const { agencies, hosts, brandConfig } = useApp();
  const agency = agencies[0];
  const [copiedCode, setCopiedCode] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [newHostHandle, setNewHostHandle] = useState('');

  const agencyHosts = hosts.filter((h) => h.agencyId === agency.id);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(agency.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleInviteHost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHostHandle) return;
    alert(`Agency invitation dispatched to creator ${newHostHandle}! They will earn under Apex Talent.`);
    setNewHostHandle('');
    setInviteModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900 to-slate-900 border border-blue-500/30 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{agency.name}</h2>
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                OFFICIAL GUILD
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Director: {agency.ownerName} • Commission Tier: {(agency.commissionRate * 100).toFixed(0)}% Automated Split
            </p>
          </div>
        </div>

        {/* Agency Referral Code */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Agency Invite Code
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono font-black text-sm text-blue-400">{agency.code}</span>
              <button
                onClick={handleCopyCode}
                className="text-slate-400 hover:text-white transition cursor-pointer"
                title="Copy Agency Code"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            onClick={() => setInviteModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs px-4 py-3 rounded-xl shadow-lg transition cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign New Host</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Roster Streamers</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {agencyHosts.length} Creators
          </div>
          <span className="text-[11px] text-emerald-400 font-bold mt-1 inline-block">
            4 Live Now
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Agency Revenue (MTD)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            ${agency.monthlyRevenueUSD.toLocaleString()} USD
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">
            From 4.8M gross diamonds
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Commission Percentage</span>
            <Percent className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {(agency.commissionRate * 100).toFixed(0)}% Cut
          </div>
          <span className="text-[11px] text-purple-400 font-bold mt-1 inline-block">
            Auto-credited per gift sent
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Pending Payout</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            ${agency.pendingPayoutUSD.toLocaleString()} USD
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">
            Disbursed every Monday
          </span>
        </div>
      </div>

      {/* Signed Hosts Roster Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-white">Signed Creators Roster & Payout Breakdown</h3>
          <span className="text-xs text-slate-400">{agencyHosts.length} Active Contracts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Creator / Host</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Gross {brandConfig.diamondName}</th>
                <th className="px-6 py-3">Agency 20% Cut</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {agencyHosts.map((h) => {
                const hostGrossUSD = h.diamonds / 200;
                const agencyCutUSD = hostGrossUSD * agency.commissionRate;
                return (
                  <tr key={h.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={h.avatar}
                        alt={h.name}
                        className="w-9 h-9 rounded-full object-cover border border-purple-500"
                      />
                      <div>
                        <div className="font-extrabold text-white flex items-center gap-1.5">
                          <span>{h.name}</span>
                          {h.verified && <span className="text-blue-400">✓</span>}
                        </div>
                        <span className="text-[11px] text-slate-400">{h.handle}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">{h.category}</td>
                    <td className="px-6 py-4">
                      {h.isLive ? (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          🔴 LIVE NOW
                        </span>
                      ) : (
                        <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full text-[10px]">
                          Offline
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-white">
                      {h.diamonds.toLocaleString()} 💎
                    </td>
                    <td className="px-6 py-4 font-mono font-black text-emerald-400">
                      ${agencyCutUSD.toFixed(2)} USD
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => alert(`Opening contract management for ${h.name}`)}
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Manage</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Host Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-black text-white mb-2">Invite Creator to Agency</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter the host's username or user ID to assign them to {agency.name} with a 20% commission split.
            </p>
            <form onSubmit={handleInviteHost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Creator Handle / User ID
                </label>
                <input
                  type="text"
                  value={newHostHandle}
                  onChange={(e) => setNewHostHandle(e.target.value)}
                  placeholder="@streamer_star or user_id"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-500 shadow-md cursor-pointer"
                >
                  Send Invitation Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
