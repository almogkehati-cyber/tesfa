'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app was installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowButton(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowButton(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowButton(false);
  };

  if (isInstalled || !showButton) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-gradient-to-r from-[#7B2FBE] to-[#5A1F8E] rounded-full shadow-lg shadow-purple-500/30 p-1">
        <div className="flex items-center gap-2 bg-[#0A0A1A] rounded-full px-4 py-3">
          <button
            onClick={handleInstall}
            className="flex items-center gap-2 text-white font-medium"
          >
            <span className="text-xl">📲</span>
            <span>התקן את TESFA</span>
          </button>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors pr-2 border-r border-white/20"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
