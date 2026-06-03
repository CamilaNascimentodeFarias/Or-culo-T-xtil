import React, { useState, useRef, useEffect } from 'react';
import { 
  Pin, 
  Spline, 
  Layers, 
  Download, 
  Maximize2, 
  Sparkles 
} from 'lucide-react';
import { TextileWorld, VisualArtifact } from '../types';

interface MoodBoardViewProps {
  world: TextileWorld;
}

export default function MoodBoardView({ world }: MoodBoardViewProps) {
  const [artifacts, setArtifacts] = useState<VisualArtifact[]>(world.artifacts);
  const [activeDraggableId, setActiveDraggableId] = useState<string | null>(null);
  const [draggingOffset, setDraggingOffset] = useState({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const storageKey = `moodboard:${world?.id || 'default'}`;

  useEffect(() => {
    setArtifacts(world.artifacts);
  }, [world]);

  // load persisted artifacts if present
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as VisualArtifact[];
        if (Array.isArray(parsed) && parsed.length) {
          setArtifacts(parsed);
          return;
        }
      }
    } catch (err) {
      // ignore
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist artifacts
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(artifacts));
    } catch (err) {
      // ignore
    }
  }, [artifacts, storageKey]);

  const handleDragStart = (e: React.MouseEvent, artId: string) => {
    e.stopPropagation();
    setActiveDraggableId(artId);
    
    // Bounds of current target
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDraggingOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!activeDraggableId || !boardRef.current) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    
    // Account for sidebar offset if absolute alignment is tricky
    const sidebarWidth = window.innerWidth >= 1024 ? 256 : 0;
    const x = e.clientX - boardRect.left - draggingOffset.x;
    const y = e.clientY - boardRect.top - draggingOffset.y;

    setArtifacts(prev => prev.map(art => {
      if (art.id === activeDraggableId) {
        return { 
          ...art, 
          x: Math.max(10, Math.min(x, 1200)), 
          y: Math.max(10, Math.min(y, 800)) 
        };
      }
      return art;
    }));
  };

  const handleDragEnd = () => {
    setActiveDraggableId(null);
  };

  // Preset pins generator
  const handleAddPin = () => {
    const randomSeed = Math.floor(Math.random() * 500);
    const newArt: VisualArtifact = {
      id: `art-rand-${randomSeed}`,
      type: 'node',
      title: 'Nota do Ateliê',
      subtitle: `PIN ${randomSeed}`,
      description: 'Pesquisa adicional sobre tecitura e dobras ecológicas.',
      colors: ['#845241'],
      x: Math.floor(Math.random() * 500 + 200),
      y: Math.floor(Math.random() * 300 + 150)
    };
    setArtifacts(prev => [...prev, newArt]);
  };  return (
    <div 
      ref={boardRef}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      className="flex-grow h-[calc(100vh-80px)] overflow-hidden relative select-none bg-nature-bg"
    >
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            const id = `img-${Date.now()}`;
            const newArt: VisualArtifact = {
              id,
              type: 'swatch',
              title: file.name,
              image: dataUrl,
              x: Math.floor(Math.random() * 500 + 150),
              y: Math.floor(Math.random() * 300 + 120)
            };
            setArtifacts(prev => [...prev, newArt]);
          };
          reader.readAsDataURL(file);
          // reset the input so same file can be reselected later
          e.currentTarget.value = '';
        }}
        className="hidden"
      />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#5a5a40_1.2px,transparent_1.2px)] bg-[size:36px_36px]" />

      {/* Connection thread lines drawn between visual artifacts */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
        {artifacts.map((art, idx) => {
          if (idx === artifacts.length - 1) return null;
          const nextArt = artifacts[idx + 1];
          return (
            <line 
              key={`thread-board-${idx}`}
              x1={art.x + 100}
              y1={art.y + 100}
              x2={nextArt.x + 100}
              y2={nextArt.y + 100}
              stroke="#5a5a40"
              strokeWidth="1.2"
            />
          );
        })}
      </svg>

      {/* Floating Canvas Elements */}
      {artifacts.map((art) => {
        const isDragging = activeDraggableId === art.id;

        return (
          <div
            key={art.id}
            onMouseDown={(e) => handleDragStart(e, art.id)}
            style={{ 
              left: `${art.x}px`, 
              top: `${art.y}px`,
              transform: `rotate(${art.rotation || 0}deg) ${isDragging ? 'scale(1.04)' : ''}`,
              zIndex: isDragging ? 100 : 10
            }}
            className={`absolute cursor-grab active:cursor-grabbing transition-transform duration-75 p-2 bg-white rounded-2xl shadow-pill border border-nature-text/10 hover:shadow-md ${
              isDragging ? 'grabbing shadow-xl ring-2 ring-nature-clay/20' : ''
            }`}
          >
            
            {/* 1. TEXTILE SWATCH TYPE */}
            {art.type === 'swatch' && (
              <div className="w-40 md:w-44 select-none">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full aspect-square object-cover mb-2 rounded-xl pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="px-1">
                  <span className="text-[10px] text-nature-clay font-bold block">{art.subtitle || 'SWATCH'}</span>
                  <p className="text-xs font-semibold text-nature-text leading-tight truncate">{art.title}</p>
                </div>
              </div>
            )}

            {/* 2. SKETCH STYLE PARCHMENT NOTE */}
            {art.type === 'sketch' && (
              <div className="w-48 p-2 bg-nature-surface/50 rounded-xl select-none">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full aspect-[3/4] object-cover mb-2 opacity-85 mix-blend-multiply rounded-lg pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <h4 style={{ fontFamily: 'EB Garamond, serif' }} className="text-lg font-medium italic text-nature-text px-1 leading-tight">
                  {art.title}
                </h4>
              </div>
            )}

            {/* 3. INSPIRATION PALETTE WITH SWATCH COLOR BLOCKS */}
            {art.type === 'palette' && (
              <div className="w-64 p-3 select-none">
                <div className="flex gap-2 mb-3">
                  {art.colors?.map((c, i) => (
                    <div 
                      key={i} 
                      style={{ backgroundColor: c }} 
                      title={c}
                      className="w-full h-10 rounded-lg border border-white shadow-sm"
                    />
                  ))}
                </div>
                <h3 className="text-[10px] font-bold text-nature-clay uppercase tracking-widest leading-none mb-1">
                  {art.title}
                </h3>
                <p className="text-xs text-nature-text/70 font-sans leading-relaxed">
                  {art.description}
                </p>
              </div>
            )}

            {/* 4. CIRCULAR ARCHITECTURAL SHADOWS MOODBOARD TILE */}
            {art.type === 'tile' && (
              <div className="w-36 h-36 rounded-full overflow-hidden relative group shadow-lg">
                <img 
                  src={art.image} 
                  alt="Architectural pattern lines" 
                  className="w-full h-full object-cover grayscale pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            {/* 5. CIRCULAR NETWORK NODE OR PINS */}
            {art.type === 'node' && (
              <div className="flex flex-col items-center gap-1.5 p-1 select-none">
                <div className="w-14 h-14 rounded-full bg-nature-surface border border-nature-text/10 flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5 text-nature-clay" />
                </div>
                <span className="text-[10px] font-semibold text-nature-text w-24 text-center truncate">
                  {art.title}
                </span>
                {art.description && (
                  <span className="text-[8px] text-nature-text/50 block max-w-[90px] text-center line-clamp-1">
                    {art.description}
                  </span>
                )}
              </div>
            )}

            {/* 6. TEXT NOTE */}
            {art.type === 'text' && (
              <div className="max-w-xs p-3 bg-yellow-50 rounded-lg border border-nature-text/10 shadow-sm select-none">
                <h4 className="text-sm font-semibold text-nature-text mb-1 truncate">{art.title}</h4>
                <p className="text-sm text-nature-text/80 leading-snug whitespace-pre-wrap">{art.content || art.description}</p>
              </div>
            )}

          </div>
        );
      })}

      {/* Floating Workspace controls pill: Pin, Thread, Layers, Export (Screen 4 Bottom Navigation) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-md border border-nature-text/10 px-6 py-2 rounded-full flex items-center gap-6 z-50 shadow-pill">
        
        <button 
          onClick={handleAddPin}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
        >
          <Pin className="w-4 h-4 text-nature-text/60 group-hover:text-nature-clay transition-transform duration-200 group-hover:scale-110" />
          <span className="text-[9px] font-bold text-nature-text/50 font-mono">Pin</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
        >
          <svg className="w-4 h-4 text-nature-text/60 group-hover:text-nature-clay" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21"/></svg>
          <span className="text-[9px] font-bold text-nature-text/50 font-mono">Image</span>
        </button>

        <button
          onClick={() => {
            setModalTitle('');
            setModalText('');
            setShowTextModal(true);
          }}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
        >
          <svg className="w-4 h-4 text-nature-text/60 group-hover:text-nature-clay" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>
          <span className="text-[9px] font-bold text-nature-text/50 font-mono">Text</span>
        </button>

        <button 
          onClick={() => alert('Fios de fiação adicionais sincronizados com todo o atelier.')}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
        >
          <Spline className="w-4 h-4 text-nature-text/60 group-hover:text-nature-clay transition-transform duration-200 group-hover:scale-110" />
          <span className="text-[9px] font-bold text-nature-text/50 font-mono">Thread</span>
        </button>

        <div className="w-[1px] h-6 bg-nature-text/10" />

        <button 
          onClick={() => alert(`Sincronizando ${artifacts.length} artefatos no moodboard conceitual.`)}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
        >
          <Layers className="w-4 h-4 text-nature-text/60 group-hover:text-nature-clay transition-transform duration-200 group-hover:scale-110" />
          <span className="text-[9px] font-bold text-nature-text/50 font-mono">Layers</span>
        </button>

        <button 
          onClick={() => alert('Todas as imagens e layouts do moodboard foram renderizados para download em alta resolução.')}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
        >
          <Download className="w-4 h-4 text-nature-text/60 group-hover:text-nature-clay transition-transform duration-200 group-hover:scale-110" />
          <span className="text-[9px] font-bold text-nature-text/50 font-mono">Export</span>
        </button>

      </nav>

      {/* Text modal */}
      {showTextModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowTextModal(false)} />
          <div className="relative z-10 w-full max-w-md bg-white rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Nova nota</h3>
            <input
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
              placeholder="Título (opcional)"
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <textarea
              value={modalText}
              onChange={(e) => setModalText(e.target.value)}
              placeholder="Digite o texto aqui..."
              rows={6}
              className="w-full border rounded px-2 py-1 mb-3 resize-y"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowTextModal(false)}
                className="px-3 py-1 rounded border"
              >Cancelar</button>
              <button
                onClick={() => {
                  const text = modalText.trim();
                  if (!text) return;
                  const id = `txt-${Date.now()}`;
                  const newArt: VisualArtifact = {
                    id,
                    type: 'text',
                    title: modalTitle || text.split('\n')[0].slice(0, 40),
                    content: text,
                    x: Math.floor(Math.random() * 500 + 150),
                    y: Math.floor(Math.random() * 300 + 120)
                  };
                  setArtifacts(prev => [...prev, newArt]);
                  setShowTextModal(false);
                }}
                className="px-3 py-1 rounded bg-nature-clay text-white"
              >Adicionar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
