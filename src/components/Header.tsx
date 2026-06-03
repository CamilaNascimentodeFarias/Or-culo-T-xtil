import React from 'react';
import { Search, CircleUser, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  hasApiKey: boolean;
  selectedWorldName: string;
}

export default function Header({
  currentTab,
  setCurrentTab,
  hasApiKey,
  selectedWorldName
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 h-20 bg-[#F5F5F0]/85 backdrop-blur-md border-b border-nature-text/10">
      <div className="flex items-center gap-3">
        <span 
          style={{ fontFamily: 'EB Garamond, serif' }} 
          className="text-2xl font-light tracking-widest uppercase text-nature-text cursor-pointer"
          onClick={() => setCurrentTab('loom')}
        >
          Oráculo Têxtil
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-nature-surface text-nature-accent shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-nature-clay animate-pulse"></span>
          {selectedWorldName}
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {[
          { id: 'loom', label: 'Loom' },
          { id: 'archive', label: 'Archive' },
          { id: 'pattern', label: 'Pattern' },
          { id: 'mood', label: 'Mood Board' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            className={`text-xs font-bold uppercase tracking-widest relative py-1.5 transition-colors duration-300 ${
              currentTab === tab.id
                ? 'text-nature-text'
                : 'text-nature-text/40 hover:text-nature-text'
            }`}
          >
            {tab.label}
            {currentTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-nature-accent rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        {hasApiKey ? (
          <div className="hidden lg:flex items-center gap-1 text-xs text-white bg-nature-accent px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-nature-clay animate-pulse" />
            IA Conectada
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-1 text-xs text-nature-text/60 bg-nature-surface px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Slots Limpos
          </div>
        )}

        <button className="p-1.5 hover:bg-nature-surface rounded-full text-nature-text/50 hover:text-nature-text transition-all">
          <CircleUser className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setCurrentTab('loom')} 
          className="p-1.5 hover:bg-nature-surface rounded-full text-nature-text/50 hover:text-nature-text transition-all"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
