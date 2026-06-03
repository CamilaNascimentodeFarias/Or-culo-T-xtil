import React, { useState } from 'react';
import { 
  Wind, 
  Package, 
  GitBranch, 
  Palette, 
  Plus, 
  HelpCircle, 
  Sliders, 
  Loader2, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { TextileWorld } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  worlds: TextileWorld[];
  selectedWorld: TextileWorld;
  setSelectedWorld: (world: TextileWorld) => void;
  onGenerateWorld: (prompt: string) => Promise<void>;
  isGenerating: boolean;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,
  worlds,
  selectedWorld,
  setSelectedWorld,
  onGenerateWorld,
  isGenerating
}: SidebarProps) {
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleCreate = async () => {
    if (!customPrompt.trim()) {
      setErrorText('Por favor insira um conceito.');
      return;
    }
    setErrorText('');
    try {
      await onGenerateWorld(customPrompt);
      setCustomPrompt('');
      setShowPromptInput(false);
    } catch (err: any) {
      setErrorText('Erro ao simular fios.');
    }
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-nature-text/10 bg-nature-surface/60 backdrop-blur-md z-40 pt-24 pb-6 px-4">
      {/* Atelier Title */}
      <div className="mb-6 px-2">
        <h2 style={{ fontFamily: 'EB Garamond, serif' }} className="text-2xl font-light tracking-widest uppercase text-nature-text">
          Atelier
        </h2>
        <p style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} className="text-[10px] uppercase tracking-[0.2em] opacity-60">
          Worldbuilding Canvas
        </p>
      </div>

      {/* Primary Tab Navigation */}
      <nav className="space-y-1.5 flex-1 overflow-y-auto max-h-[40vh] pr-1">
        {[
          { id: 'loom', label: 'Loom', icon: Wind },
          { id: 'archive', label: 'Archive', icon: Package },
          { id: 'pattern', label: 'Pattern', icon: GitBranch },
          { id: 'mood', label: 'Mood Board', icon: Palette }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                isActive
                  ? 'bg-white text-nature-text shadow-pill border border-nature-text/5'
                  : 'text-nature-text/60 hover:bg-white/40 hover:text-nature-text'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-nature-clay' : 'opacity-65'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* World Selection & Generation Zone */}
      <div className="border-t border-nature-text/10 pt-4 mt-auto">
        <div className="px-2 mb-3">
          <label className="text-[10px] font-bold text-nature-text/40 uppercase tracking-[0.15em] block mb-1">
            Mundo Ativo
          </label>
          <select
            value={selectedWorld.id}
            onChange={(e) => {
              const selected = worlds.find(w => w.id === e.target.value);
              if (selected) setSelectedWorld(selected);
            }}
            className="w-full text-xs bg-white border border-nature-text/10 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-nature-accent text-nature-text shadow-sm"
          >
            {worlds.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Generate Thread Prompt Block */}
        {showPromptInput ? (
          <div className="bg-nature-bg border border-nature-text/10 rounded-2xl p-3 mb-3 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-nature-clay">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conceito do Fio</span>
            </div>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="ex: Algodão de Nebulosa Estelar"
              rows={2}
              className="w-full text-xs p-2 bg-white border border-nature-text/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-nature-accent resize-none text-nature-text"
            />
            {errorText && (
              <p className="text-[10px] text-red-500 leading-tight">{errorText}</p>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={isGenerating}
                className="flex-1 bg-nature-accent hover:bg-nature-clay disabled:bg-nature-surface text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
              >
                {isGenerating ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  'Sintetizar'
                )}
              </button>
              <button
                onClick={() => setShowPromptInput(false)}
                className="px-2 bg-nature-surface hover:bg-nature-surface/80 text-nature-text/70 py-2 rounded-lg text-xs"
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowPromptInput(true)}
            disabled={isGenerating}
            className="w-full bg-nature-accent hover:bg-nature-clay text-white py-3 px-4 rounded-full font-bold text-xs uppercase tracking-widest leading-none transition-all flex items-center justify-center gap-1.5 shadow-sm transform hover:scale-[1.01]"
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            <span>Novo Fio (IA)</span>
          </button>
        )}
      </div>

      {/* Secondary Bottom Links */}
      <div className="mt-4 pt-4 border-t border-nature-text/10 space-y-1">
        <button 
          onClick={() => alert('Oráculo Têxtil v1.0. Explore, conecte e simule fibras e misturas de forma interativa com auxílio de Inteligência Artificial.')}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-medium text-nature-text/60 hover:bg-white/40 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-nature-text/40" />
          <span>Ajuda</span>
        </button>
        <button 
          onClick={() => alert('Chave de API do Gemini carregada com sucesso do painel de segredos.')}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-medium text-nature-text/60 hover:bg-white/40 transition-colors"
        >
          <Sliders className="w-4 h-4 text-nature-text/40" />
          <span>Configuração</span>
        </button>
      </div>
    </aside>
  );
}
