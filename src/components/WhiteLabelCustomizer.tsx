import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Palette, CheckCircle2, Sparkles, Sliders } from 'lucide-react';
import { BrandConfig } from '../types';

interface WhiteLabelCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhiteLabelCustomizer: React.FC<WhiteLabelCustomizerProps> = ({ isOpen, onClose }) => {
  const { brandConfig, updateBrand } = useApp();

  const [form, setForm] = useState<BrandConfig>({ ...brandConfig });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const presets = [
    {
      name: 'Bigo Live Neon',
      appName: 'Bigo Clone OS',
      tagline: 'Top PK Live Video & Talents',
      coinName: 'Beans',
      diamondName: 'Diamonds',
      primaryColor: 'pink',
    },
    {
      name: 'Chamet VIP Gold',
      appName: 'Chamet Global',
      tagline: 'Connect Live with High-Tier Hosts',
      coinName: 'Gold Coins',
      diamondName: 'Points',
      primaryColor: 'gold',
    },
    {
      name: 'TikTok Live Stream',
      appName: 'TikTok Battle Live',
      tagline: 'Creator PK Battles & Mega Gifts',
      coinName: 'Coins',
      diamondName: 'Gems',
      primaryColor: 'cyan',
    },
    {
      name: 'Client Custom Brand',
      appName: 'MyBrand Live',
      tagline: '100% White-Label Live Streaming Platform',
      coinName: 'Credits',
      diamondName: 'Stars',
      primaryColor: 'purple',
    },
  ];

  const handleApply = () => {
    updateBrand(form);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handlePreset = (preset: typeof presets[0]) => {
    setForm({
      appName: preset.appName,
      tagline: preset.tagline,
      coinName: preset.coinName,
      diamondName: preset.diamondName,
      primaryColor: preset.primaryColor,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">White-Label Rebranding Engine</h3>
              <p className="text-xs text-slate-400">
                Instantly relabel brand, currency names, & UI colors for your client
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

        {/* 1-Click Presets */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-b border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
            <Sliders className="w-3.5 h-3.5 text-pink-400" /> Quick Demo Presets
          </span>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => handlePreset(p)}
                className="text-left px-3 py-2 bg-slate-800/80 hover:bg-slate-750 border border-slate-700 rounded-xl transition cursor-pointer text-xs group"
              >
                <div className="font-bold text-white group-hover:text-pink-300">{p.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {p.appName} • {p.coinName}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[50vh]">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Platform Brand Name
            </label>
            <input
              type="text"
              value={form.appName}
              onChange={(e) => setForm({ ...form, appName: e.target.value })}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-pink-500"
              placeholder="e.g. MyBrand Live"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Tagline / Subheading
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-pink-500"
              placeholder="e.g. Real-Time Creator Live Streaming"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                In-App Currency (Buyer)
              </label>
              <input
                type="text"
                value={form.coinName}
                onChange={(e) => setForm({ ...form, coinName: e.target.value })}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-pink-500"
                placeholder="Coins / Beans / Credits"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Host Payout Unit (Host)
              </label>
              <input
                type="text"
                value={form.diamondName}
                onChange={(e) => setForm({ ...form, diamondName: e.target.value })}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-pink-500"
                placeholder="Diamonds / Stars"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {savedSuccess && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Rebrand applied live!
              </span>
            )}
          </div>
          <button
            onClick={handleApply}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-sm py-2.5 px-6 rounded-xl shadow-lg shadow-pink-500/30 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Apply Rebrand Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
