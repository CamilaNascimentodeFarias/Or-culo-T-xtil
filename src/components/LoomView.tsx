import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Share2, 
  Edit, 
  Sparkles, 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  History, 
  FileSpreadsheet 
} from 'lucide-react';
import { TextileWorld } from '../types';

interface LoomViewProps {
  world: TextileWorld;
  onExploreQuestion: (question: string) => Promise<{ title: string; description: string; newQuestions: string[] }>;
}

export default function LoomView({ world, onExploreQuestion }: LoomViewProps) {
  // Navigation & animation states
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeQA, setActiveQA] = useState<{ title: string; answer: string } | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<string[]>(
    world.questions.map((q) => q.title)
  );
  const [isExpanding, setIsExpanding] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [showSpecs, setShowSpecs] = useState(false);

  // Triggering the expansion of a node when clicked
  const handleQuestionClick = async (question: string) => {
    setIsExpanding(true);
    try {
      const result = await onExploreQuestion(question);
      setActiveQA({
        title: result.title,
        answer: result.description
      });
      if (result.newQuestions && result.newQuestions.length > 0) {
        setCurrentQuestions(result.newQuestions);
      }
    } catch (err) {
      console.error('Error expanding node:', err);
    } finally {
      setIsExpanding(false);
    }
  };

  const handleCustomQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    await handleQuestionClick(customQuestion);
    setCustomQuestion('');
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">
      
      {/* Left Area: The interactive thread canvas (Screen 1) */}
      <section className="relative w-full md:w-1/2 bg-nature-bg overflow-hidden flex flex-col items-center justify-center p-8 border-r border-nature-text/10">
        
        {/* Subtle radial dot background */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#5A5A40_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Dynamic connection lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0">
          <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="#5A5A40" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#5A5A40" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="50%" y1="50%" x2="65%" y2="75%" stroke="#5A5A40" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Primary central thread nucleus */}
        <div 
          className="relative z-10 text-center transition-transform duration-500 hover:scale-105"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div className="w-44 h-44 rounded-full bg-white shadow-pill border border-nature-text/10 flex flex-col items-center justify-center p-6 cursor-pointer group node-glow">
            <span className="text-[#A67C52] mb-1 text-2xl group-hover:rotate-12 transition-transform duration-300">
              ⚡
            </span>
            <h2 className="font-medium text-nature-text leading-tight px-2 text-center" style={{ fontFamily: 'EB Garamond, serif', fontSize: '18px' }}>
              {world.centralNode.title}
            </h2>
            <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold mt-1.5 font-sans">Nucleus Active</p>
          </div>
        </div>

        {/* Branch 1 Question bubble */}
        <div 
          onClick={() => handleQuestionClick(currentQuestions[0])}
          className="absolute top-[20%] left-[10%] max-w-[190px] group cursor-pointer z-20"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div className="p-3.5 bg-white/85 backdrop-blur-md rounded-2xl border border-nature-text/10 shadow-sm hover:shadow-pill hover:bg-white transition-all transform hover:-translate-y-0.5">
            <p className="text-xs text-nature-text/80 leading-relaxed italic">
              {currentQuestions[0] || '"How did the altitude modify fiber binding?"'}
            </p>
          </div>
        </div>

        {/* Branch 2 Question bubble */}
        <div 
          onClick={() => handleQuestionClick(currentQuestions[1])}
          className="absolute top-[25%] right-[8%] max-w-[210px] group cursor-pointer z-20"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div className="p-3.5 bg-white/85 backdrop-blur-md rounded-2xl border border-nature-text/10 shadow-sm hover:shadow-pill hover:bg-white transition-all transform hover:-translate-y-0.5">
            <p className="text-xs text-nature-text/80 leading-relaxed italic">
              {currentQuestions[1] || '"Symbolism of the Terracotta weave in high-court garments?"'}
            </p>
          </div>
        </div>

        {/* Branch 3 Question bubble */}
        <div 
          onClick={() => handleQuestionClick(currentQuestions[2])}
          className="absolute bottom-[16%] right-[18%] max-w-[180px] group cursor-pointer z-20"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div className="p-3.5 bg-white/85 backdrop-blur-md rounded-2xl border border-nature-text/10 shadow-sm hover:shadow-pill hover:bg-white transition-all transform hover:-translate-y-0.5">
            <p className="text-xs text-nature-text/80 leading-relaxed italic">
              {currentQuestions[2] || '"Mineral pigments found in plateau basins?"'}
            </p>
          </div>
        </div>

        {/* Custom question prompt builder directly in Loom view */}
        <div className="absolute bottom-16 left-4 right-4 max-w-sm mx-auto z-30">
          <form onSubmit={handleCustomQuestionSubmit} className="flex bg-white/95 backdrop-blur-md border border-nature-text/10 rounded-full shadow-pill p-1">
            <input 
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="Perguntar ao tecelão divino..."
              className="flex-1 text-xs px-4 focus:outline-none text-nature-text bg-transparent font-sans"
              disabled={isExpanding}
            />
            <button 
              type="submit" 
              disabled={isExpanding || !customQuestion.trim()}
              className="bg-nature-accent hover:bg-nature-clay text-white p-2.5 rounded-full disabled:bg-nature-surface transition-colors cursor-pointer"
            >
              {isExpanding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>

        {/* Floating pill navigation at the bottom (Zoom, share, custom edits) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-nature-text/10 px-4 py-2 rounded-full flex gap-4 items-center z-35 shadow-pill">
          <button 
            type="button"
            aria-label="Aumentar zoom"
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, 1.4))}
            className="text-nature-clay hover:scale-110 transition-transform cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            type="button"
            aria-label="Diminuir zoom"
            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.75))}
            className="text-nature-text/40 hover:scale-110 hover:text-nature-text transition-transform cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="w-[1px] h-4 bg-nature-text/10" />
          <button 
            type="button"
            aria-label="Compartilhar"
            onClick={() => alert(`Link de compartilhamento para o fio "${world.name}" copiado!`)}
            className="text-nature-accent hover:scale-110 transition-transform cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

      </section>

      {/* Right Area: Dynamic case studies, fabric weaves, and technical files (Screen 1 right side) */}
      <section className="w-full md:w-1/2 bg-nature-surface/30 overflow-y-auto px-6 py-8 md:px-12 flex flex-col justify-between">
        <div className="max-w-xl mx-auto space-y-6 w-full">
          
          {/* Detail Header */}
          <header className="space-y-1">
            <span style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} className="text-xs font-bold text-nature-clay uppercase tracking-widest block">
              {world.caseStudy.code}
            </span>
            <h1 style={{ fontFamily: 'EB Garamond, serif' }} className="text-3xl font-light text-nature-text tracking-tight">
              {world.caseStudy.title}
            </h1>
            <p className="text-sm text-nature-text/75 leading-relaxed font-sans mt-2">
              {world.caseStudy.description}
            </p>
          </header>

          {/* AI Loom explanation response overlay if active */}
          {activeQA && (
            <div className="bg-white/80 border-l-4 border-nature-accent rounded-r-2xl p-4 space-y-2 animate-fadeIn shadow-pill border border-nature-text/5">
              <div className="flex items-center gap-1.5 text-xs text-nature-clay font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Revelação do Oráculo</span>
              </div>
              <h4 className="text-xs font-bold text-nature-text/90 italic">{activeQA.title}</h4>
              <p className="text-xs text-nature-text/80 leading-relaxed leading-[1.6]">
                {activeQA.answer}
              </p>
              <button 
                onClick={() => setActiveQA(null)}
                className="text-[10px] uppercase tracking-widest text-nature-clay hover:opacity-80 font-bold block pt-1 hover:underline cursor-pointer"
              >
                Voltar à especificação básica
              </button>
            </div>
          )}

          {/* Card 1: Textile Swatch */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-pill hover:shadow-md transition-all border border-nature-text/5">
            <div className="h-52 overflow-hidden relative bg-nature-bg">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src={world.caseStudy.swatchImage} 
                alt={world.caseStudy.swatchName}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-nature-text/10 shadow-sm">
                <span className="text-xs font-mono font-bold text-nature-clay select-all">
                  {world.caseStudy.swatchColor}
                </span>
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 style={{ fontFamily: 'EB Garamond, serif' }} className="text-lg font-medium text-nature-text">
                {world.caseStudy.swatchName}
              </h3>
              <p style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} className="text-xs text-nature-text/60 mt-1">
                Especímen arqueológico catalogado. Prensado e selado com extratos minerais nativos.
              </p>
            </div>
          </div>

          {/* Card 2: Landscape Reference */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-pill hover:shadow-md transition-all border border-nature-text/5">
            <div className="h-32 overflow-hidden relative">
              <img 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                src={world.caseStudy.landscapeImage} 
                alt={world.caseStudy.landscapeTitle}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-white">
              <h3 style={{ fontFamily: 'EB Garamond, serif' }} className="text-base font-medium text-nature-text">
                {world.caseStudy.landscapeTitle}
              </h3>
              <p className="text-xs text-nature-text/60 mt-0.5">
                {world.caseStudy.landscapeDescription}
              </p>
            </div>
          </div>

          {/* Historical Snippet Card */}
          <div className="p-5 bg-white/70 border-l-4 border-nature-clay rounded-r-2xl shadow-pill relative overflow-hidden border border-nature-text/5">
            <span style={{ fontFamily: 'EB Garamond, serif' }} className="absolute right-3 top-3 text-7xl font-bold text-nature-clay/15 select-none pointer-events-none">
              “
            </span>
            <div className="flex items-center gap-2 mb-2">
              <History className="w-4 h-4 text-nature-clay" />
              <span className="text-[10px] font-extrabold text-nature-clay tracking-wider uppercase font-mono">
                Historical Snippet
              </span>
            </div>
            <p style={{ fontFamily: 'EB Garamond, serif' }} className="text-base italic text-nature-text leading-relaxed">
              {world.caseStudy.snippet}
            </p>
            <p className="mt-2 text-[10px] font-semibold text-nature-text/50">
              — {world.caseStudy.snippetAuthor}
            </p>
          </div>

          {/* Expandable spec drawer */}
          <div className="border-t border-nature-text/10 pt-4">
            <button 
              onClick={() => setShowSpecs(!showSpecs)}
              className="w-full py-2 flex justify-between items-center group text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-nature-text/40 group-hover:text-nature-clay transition-colors" />
                <span className="font-bold text-xs uppercase tracking-wider text-nature-text/60 group-hover:text-nature-text transition-colors">
                  Technical Specifications
                </span>
              </div>
              {showSpecs ? <ChevronUp className="w-4 h-4 text-nature-text/40" /> : <ChevronDown className="w-4 h-4 text-nature-text/40" />}
            </button>
            
            {showSpecs && (
              <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-nature-text/10 space-y-3 animate-slideDown shadow-pill">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-nature-text/40 block font-medium">Composition</span>
                    <span className="text-nature-text font-semibold">{world.caseStudy.techSpecs.composition}</span>
                  </div>
                  <div>
                    <span className="text-nature-text/40 block font-medium">Weave Structure</span>
                    <span className="text-nature-text font-semibold">{world.caseStudy.techSpecs.weave}</span>
                  </div>
                  <div>
                    <span className="text-nature-text/40 block font-medium">Base Weight</span>
                    <span className="text-nature-text font-semibold">{world.caseStudy.techSpecs.weight}</span>
                  </div>
                  <div>
                    <span className="text-nature-text/40 block font-medium">Tensile Density</span>
                    <span className="text-nature-text font-semibold">{world.caseStudy.techSpecs.warpCount} warp / {world.caseStudy.techSpecs.weftCount} weft</span>
                  </div>
                </div>
                <div className="border-t border-nature-text/5 pt-2.5 text-xs text-nature-text/75 italic">
                  <strong>Porosity Profile:</strong> {world.caseStudy.techSpecs.permeability}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
