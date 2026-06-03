import React, { useState, useRef, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  HelpCircle, 
  Layers, 
  MapPin, 
  Target, 
  Sparkles,
  CloudLightning,
  Boxes
} from 'lucide-react';
import { TextileWorld, TextileNode } from '../types';

interface ArchiveViewProps {
  world: TextileWorld;
}

export default function ArchiveView({ world }: ArchiveViewProps) {
  const [scale, setScale] = useState(0.85);
  const [nodes, setNodes] = useState<TextileNode[]>(world.archiveNodes);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Update nodes if the selected world changes
  useEffect(() => {
    setNodes(world.archiveNodes);
  }, [world]);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    setDraggingNodeId(id);
    setActiveHighlight(id);
    
    // Client bounds
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - canvasRect.left - offset.x) / scale;
    const y = (e.clientY - canvasRect.top - offset.y) / scale;

    setNodes(prev => prev.map(n => {
      if (n.id === draggingNodeId) {
        return { ...n, x: Math.round(x), y: Math.round(y) };
      }
      return n;
    }));
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const resetPosition = () => {
    setScale(0.85);
    setNodes(world.archiveNodes);
  };

  return (
    <div 
      className="flex-1 relative w-full h-[calc(100vh-80px)] overflow-hidden select-none bg-nature-bg"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      
      {/* Background Dots Canvas Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#5A5A40_1.2px,transparent_1.2px)] bg-[size:28px_28px] z-0" />

      {/* Main Interactive Canvas Container */}
      <div 
        ref={canvasRef} 
        style={{ transform: `scale(${scale})` }}
        className="w-[3000px] h-[2000px] absolute top-[-100px] left-[-200px] transition-transform duration-100 ease-out z-10 origin-top-left"
      >
        
        {/* Dynamic connection threads */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {nodes.map((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            return (
              <line 
                key={`${world.id}-line-${i}`}
                x1={(node.x || 300) + 128}
                y1={(node.y || 300) + 80}
                x2={(nextNode.x || 300) + 128}
                y2={(nextNode.y || 300) + 80}
                stroke="#5A5A40"
                strokeOpacity="0.25"
                strokeWidth="1.2"
              />
            );
          })}
        </svg>

        {/* Dynamic Node Cards */}
        {nodes.map((node) => {
          const isHighlighted = activeHighlight === node.id;
          
          return (
            <div
              key={node.id}
              onMouseDown={(e) => handleMouseDown(e, node.id)}
              style={{ 
                left: `${node.x || 300}px`, 
                top: `${node.y || 300}px`,
                fontFamily: 'Hanken Grotesk, sans-serif'
              }}
              className={`node-card absolute p-5 bg-white rounded-2xl w-64 shadow-pill border-l-4 transition-all duration-300 z-10 cursor-grab active:cursor-grabbing hover:scale-[1.01] ${
                isHighlighted ? 'ring-2 ring-nature-clay/20 shadow-lg' : ''
              } ${
                node.type === 'climate' ? 'border-nature-accent' : 
                node.type === 'fiber' ? 'border-nature-clay' : 
                node.type === 'dyeworks' ? 'border-nature-text' :
                node.type === 'hierarchy' ? 'border-nature-clay' : 'border-nature-text/30'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-nature-clay p-2 bg-nature-surface/55 rounded-xl">
                  {node.type === 'climate' && <CloudLightning className="w-4 h-4 text-nature-accent" />}
                  {node.type === 'fiber' && <Boxes className="w-4 h-4 text-nature-clay" />}
                  {node.type === 'dyeworks' && <Sparkles className="w-4 h-4 text-nature-text" />}
                  {node.type === 'hierarchy' && <Layers className="w-4 h-4 text-nature-clay" />}
                  {node.type === 'pattern' && <Target className="w-4 h-4 text-nature-text/40" />}
                </span>
                
                {node.status && (
                  <span className="text-[9px] bg-[#E8E8E0] text-nature-accent px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {node.status}
                  </span>
                )}
              </div>

              <h3 style={{ fontFamily: 'EB Garamond, serif' }} className="text-xl font-medium text-nature-text mb-1">
                {node.title}
              </h3>

              <p className="text-xs text-nature-text/70 leading-relaxed font-sans line-clamp-3">
                {node.description}
              </p>

              {/* Node-specific customizations as in mock image templates */}
              {node.type === 'climate' && node.colors && (
                <div className="mt-4 flex gap-1.55">
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-nature-surface" />
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-nature-accent/50" />
                </div>
              )}

              {node.type === 'fiber' && node.image && (
                <img 
                  src={node.image} 
                  alt="Fiber Detail Close-up" 
                  className="mt-4 w-full h-24 object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              )}

              {node.type === 'dyeworks' && node.colors && (
                <div className="mt-4 flex gap-1.5">
                  {node.colors.map((c, idx) => (
                    <div 
                      key={idx} 
                      style={{ backgroundColor: c }} 
                      title={c} 
                      className="w-4.5 h-4.5 rounded-full border border-white shadow-pill" 
                    />
                  ))}
                </div>
              )}

              {node.type === 'pattern' && (
                <div className="mt-3">
                  <div className="grid grid-cols-4 gap-1.5 my-2.5">
                    <div className="aspect-square bg-nature-surface/40 rounded-sm" />
                    <div className="aspect-square bg-nature-accent/20 rounded-sm" />
                    <div className="aspect-square bg-nature-surface/40 rounded-sm" />
                    <div className="aspect-square bg-nature-accent/20 rounded-sm" />
                  </div>
                  <span className="text-[10px] text-nature-text/40 font-bold block bg-nature-bg py-1 px-2 rounded font-mono">
                    Twill weave variant #43B
                  </span>
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* Floating Pill Controls at the bottom center (Screen 2) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-pill border border-nature-text/10 z-50">
        <div className="flex items-center gap-1.5 px-3 border-r border-[#2D2D2A]/10">
          <button 
            type="button"
            aria-label="Minimizar zoom"
            onClick={handleZoomOut} 
            className="p-1 hover:bg-nature-surface rounded-full text-nature-text/70 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-nature-text w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button 
            type="button"
            aria-label="Maximizar zoom" 
            onClick={handleZoomIn} 
            className="p-1 hover:bg-nature-surface rounded-full text-nature-text/70 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 px-1">
          <button 
            type="button"
            aria-label="Focar no centro"
            onClick={resetPosition} 
            className="p-1.5 hover:bg-nature-surface rounded-full text-nature-text/60 hover:text-nature-text transition-colors cursor-pointer"
          >
            <Target className="w-4 h-4" />
          </button>
          <button 
            type="button"
            aria-label="Exibir camadas"
            onClick={() => alert('Todas as camadas de profundidade têxtil estão ativas para este arquivo.')} 
            className="p-1.5 hover:bg-nature-surface rounded-full text-nature-text/60 hover:text-nature-text transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button 
            type="button"
            aria-label="Mostrar dicas de ajuda"
            onClick={() => alert(`Dica: Pressione e arraste qualquer cartão para reorganizar o mapa molecular têxtil de ${world.name}!`)} 
            className="p-1.5 hover:bg-nature-surface rounded-full text-nature-text/60 hover:text-nature-text transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Right Draggable Mini-Map / Navigator */}
      <div className="fixed bottom-6 right-6 w-36 h-20 bg-white/40 backdrop-blur-md rounded-lg border border-nature-text/15 hidden md:block overflow-hidden shadow-pill pointer-events-none z-30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[length:10px_10px]" />
        
        {/* Dynamic tracker indicating proportional zoom window inside 3000x2000 */}
        <div 
          style={{ 
            width: `${40 * (1 / scale)}px`, 
            height: `${28 * (1 / scale)}px`,
            left: '42px',
            top: '26px'
          }} 
          className="border-2 border-nature-clay/60 rounded absolute transition-all" 
        />
      </div>

    </div>
  );
}
