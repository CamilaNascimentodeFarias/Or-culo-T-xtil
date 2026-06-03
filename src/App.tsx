import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoomView from './components/LoomView';
import ArchiveView from './components/ArchiveView';
import PatternView from './components/PatternView';
import MoodBoardView from './components/MoodBoardView';
import { DEFAULT_WORLDS } from './defaultData';
import { TextileWorld } from './types';
import { Sparkles, Loader2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('loom');
  const [worlds, setWorlds] = useState<TextileWorld[]>(DEFAULT_WORLDS);
  const [selectedWorld, setSelectedWorld] = useState<TextileWorld>(DEFAULT_WORLDS[0]);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load dynamically generated worlds from backend
  const fetchWorlds = async () => {
    try {
      const res = await fetch('/api/textile/worlds');
      if (res.ok) {
        const data = await res.json();
        if (data.worlds && data.worlds.length > 0) {
          setWorlds(data.worlds);
          setHasApiKey(data.hasApiKey);
          
          // Keep current world selected if it exists, otherwise select the first one
          const currentExist = data.worlds.find((w: TextileWorld) => w.id === selectedWorld.id);
          if (currentExist) {
            setSelectedWorld(currentExist);
          } else {
            setSelectedWorld(data.worlds[0]);
          }
        }
      }
    } catch (err) {
      console.warn('Backend server not fully ready yet, using client default worlds fallback.');
    }
  };

  useEffect(() => {
    fetchWorlds();
  }, []);

  // Trigger server-side Gemini generation for a new thread
  const handleGenerateWorld = async (promptText: string) => {
    setIsGenerating(true);
    setNotification('Iniciando simuladores quânticos de tecelagem...');
    try {
      const res = await fetch('/api/textile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.world) {
          // Update local select list
          setWorlds(prev => [...prev, data.world]);
          setSelectedWorld(data.world);
          setNotification(`Código "${data.world.name}" foi sintetizado com sucesso!`);
          setTimeout(() => setNotification(null), 4000);
        }
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Falha ao processar simulação.');
      }
    } catch (err: any) {
      console.error(err);
      alert(`Falha ao simular novo fio: ${err.message || 'Chave de API do Gemini desconfigurada.'}`);
      setNotification(null);
    } finally {
      setIsGenerating(false);
    }
  };

  // Dynamic question exploration in Loom view
  const handleExploreQuestion = async (question: string) => {
    const res = await fetch('/api/textile/explore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, theme: selectedWorld.theme })
    });
    if (!res.ok) {
      throw new Error('Falha ao obter dados do Oráculo Têxtil.');
    }
    return await res.json();
  };

  // Re-simulate molecular values in Pattern view
  const handleReSimulate = async (id: string, theme: string) => {
    const res = await fetch('/api/textile/resimulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ worldId: id, theme })
    });
    if (!res.ok) {
      throw new Error('Falha ao obter dados quânticos de re-simulação.');
    }
    return await res.json();
  };

  return (
    <div className="bg-nature-bg min-h-screen text-nature-text flex flex-col font-sans select-none antialiased">
      
      {/* Upper Navigation Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        hasApiKey={hasApiKey}
        selectedWorldName={selectedWorld.name}
      />

      {/* Main Core Full-Width Layout */}
      <div className="flex flex-1 pt-20 h-screen overflow-hidden">
        
        {/* Left Drawer / Nav sidebar (Desktop standard) */}
        <Sidebar 
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          worlds={worlds}
          selectedWorld={selectedWorld}
          setSelectedWorld={setSelectedWorld}
          onGenerateWorld={handleGenerateWorld}
          isGenerating={isGenerating}
        />

        {/* Dynamic active screen viewport */}
        <main className="flex-1 lg:ml-64 flex flex-col h-full bg-nature-bg">
          
          {currentTab === 'loom' && (
            <LoomView 
              world={selectedWorld} 
              onExploreQuestion={handleExploreQuestion} 
            />
          )}

          {currentTab === 'archive' && (
            <ArchiveView 
              world={selectedWorld} 
            />
          )}

          {currentTab === 'pattern' && (
            <PatternView 
              world={selectedWorld} 
              onReSimulate={handleReSimulate}
            />
          )}

          {currentTab === 'mood' && (
            <MoodBoardView 
              world={selectedWorld} 
            />
          )}

        </main>

      </div>

      {/* Floating System-Wide Micro Notification Pill */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-4 py-3 bg-nature-accent text-white rounded-xl shadow-pill border border-nature-text/10 flex items-center gap-2 z-50 animate-fadeIn hover:opacity-90 max-w-sm">
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin text-nature-clay flex-shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-white/90 flex-shrink-0" />
          )}
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} className="text-xs font-semibold leading-relaxed">
            {notification}
          </span>
        </div>
      )}

    </div>
  );
}
