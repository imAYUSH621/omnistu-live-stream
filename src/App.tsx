import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { LiveStreamRoom } from './components/LiveStreamRoom';
import { HostDashboard } from './components/HostDashboard';
import { AgencyPortal } from './components/AgencyPortal';
import { CoinSellerPortal } from './components/CoinSellerPortal';
import { AdminPanel } from './components/AdminPanel';
import { GiftTrayModal } from './components/GiftTrayModal';
import { WalletModal } from './components/WalletModal';
import { VIPModal } from './components/VIPModal';
import { WhiteLabelCustomizer } from './components/WhiteLabelCustomizer';
import { GiftAnimationOverlay } from './components/GiftAnimationOverlay';

const MainApp: React.FC = () => {
  const { activeTab } = useApp();
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isVIPOpen, setIsVIPOpen] = useState(false);
  const [isRebrandOpen, setIsRebrandOpen] = useState(false);
  const [isGiftTrayOpen, setIsGiftTrayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Header */}
      <Header
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenVIP={() => setIsVIPOpen(true)}
        onOpenRebrand={() => setIsRebrandOpen(true)}
      />

      {/* Main Body View */}
      <main className="flex-1 overflow-x-hidden">
        {activeTab === 'stream' && (
          <LiveStreamRoom
            onOpenGiftTray={() => setIsGiftTrayOpen(true)}
            onOpenWallet={() => setIsWalletOpen(true)}
          />
        )}
        {activeTab === 'host_dash' && <HostDashboard />}
        {activeTab === 'agency_dash' && <AgencyPortal />}
        {activeTab === 'seller_dash' && <CoinSellerPortal />}
        {activeTab === 'admin_dash' && <AdminPanel />}
      </main>

      {/* Floating Canvas Overlays & Modals */}
      <GiftAnimationOverlay />

      <GiftTrayModal
        isOpen={isGiftTrayOpen}
        onClose={() => setIsGiftTrayOpen(false)}
        onOpenWallet={() => setIsWalletOpen(true)}
      />

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
      />

      <VIPModal
        isOpen={isVIPOpen}
        onClose={() => setIsVIPOpen(false)}
        onOpenWallet={() => setIsWalletOpen(true)}
      />

      <WhiteLabelCustomizer
        isOpen={isRebrandOpen}
        onClose={() => setIsRebrandOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;
