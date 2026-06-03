import React, { useState } from 'react';
import { 
  BarChart, 
  Sparkles, 
  Download, 
  Cpu, 
  Workflow, 
  RotateCw, 
  Loader2 
} from 'lucide-react';
import { TextileWorld } from '../types';

interface PatternViewProps {
  world: TextileWorld;
  onReSimulate: (id: string, theme: string) => Promise<{ 
    synthesisAccuracy: number; 
    dna: Record<string, number>; 
    morphologyReport: string; 
  }>;
}

export default function PatternView({ world, onReSimulate }: PatternViewProps) {
  const [dna, setDna] = useState(world.fabricDNA);
  const [accuracy, setAccuracy] = useState(world.synthesisAccuracy);
  const [morphologyMsg, setMorphologyMsg] = useState(
    'O alinhamento molecular de base mohair sintetiza eficientemente sob câmaras térmicas hiperbáricas.'
  );
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const result = await onReSimulate(world.id, world.theme);
      if (result.dna) {
        // Map any lowercase values
        setDna({
          durability: result.dna.durability || 80,
          porosity: result.dna.porosity || 60,
          tensile: result.dna.tensile || 75,
          luster: result.dna.luster || 50,
          weight: result.dna.weight || 85
        });
      }
      if (result.synthesisAccuracy) {
        setAccuracy(result.synthesisAccuracy);
      }
      if (result.morphologyReport) {
        setMorphologyMsg(result.morphologyReport);
      }
    } catch (err) {
      console.error('Simulation error:', err);
      // Give a random slight alteration as standard organic feedback
      setDna(prev => ({
        durability: Math.min(100, Math.max(10, prev.durability + Math.floor(Math.random() * 11 - 5))),
        porosity: Math.min(100, Math.max(10, prev.porosity + Math.floor(Math.random() * 11 - 5))),
        tensile: Math.min(100, Math.max(10, prev.tensile + Math.floor(Math.random() * 11 - 5))),
        luster: Math.min(100, Math.max(10, prev.luster + Math.floor(Math.random() * 11 - 5))),
        weight: Math.min(100, Math.max(10, prev.weight + Math.floor(Math.random() * 11 - 5)))
      }));
      setAccuracy(prev => parseFloat((prev + (Math.random() * 2 - 1)).toFixed(1)));
    } finally {
      setIsSimulating(false);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(world, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${world.id}-codex.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-[calc(100vh-80px)] px-6 py-8 md:px-16 pb-24 relative bg-nature-bg">
      
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#5a5a40_1.2px,transparent_1.2px)] bg-[size:40px_40px] z-0" />

      {/* Overview Header (Screen 3) */}
      <header className="max-w-6xl mx-auto mb-10 relative z-10 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} className="text-nature-clay font-bold text-xs tracking-[0.2em] uppercase">
              World Logic
            </span>
            <h1 style={{ fontFamily: 'EB Garamond, serif' }} className="text-4xl md:text-5xl font-light text-nature-text mt-1 tracking-tight">
              {world.theme} Synthesis
            </h1>
            <p className="text-sm text-nature-text/75 max-w-2xl mt-2 font-sans leading-relaxed">
              {world.description} — A simulação científica de fibras estabelece uma correlação direta entre o estresse geográfico e a densidade da trama.
            </p>
          </div>
          
          <div className="flex gap-3 sf-buttons">
            <button 
              onClick={handleExport}
              className="px-5 py-2.5 border border-nature-clay text-nature-clay hover:bg-nature-clay hover:text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Codex</span>
            </button>
            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="px-5 py-2.5 bg-nature-accent hover:bg-nature-clay disabled:bg-nature-surface text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isSimulating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RotateCw className="w-3.5 h-3.5" />
              )}
              <span>Re-Simulate</span>
            </button>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Decorative thread line passing background */}
        <div className="absolute top-1/2 left-0 h-[1px] w-full bg-[#5a5a40]/10 -z-10 pointer-events-none" />

        {/* Fabric DNA Chart (Large Card - md:col-span-8) */}
        <div className="md:col-span-8 bg-white/80 rounded-2xl p-6 shadow-pill border border-nature-text/10 group hover:shadow-md transition-all duration-500 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 style={{ fontFamily: 'EB Garamond, serif' }} className="text-2xl font-medium text-nature-text">
                Fabric DNA
              </h3>
              <p className="text-xs text-nature-text/50 font-sans tracking-wide mt-0.5">
                Structural &amp; Molecular Composition
              </p>
            </div>
            <span className="p-2 bg-nature-surface/50 rounded-xl text-nature-clay">
              <Cpu className="w-4 h-4" />
            </span>
          </div>

          {/* Bar Chart Visualization styled symmetrically like the mockup */}
          <div className="h-60 flex items-end justify-around gap-4 pb-4 border-b border-[#2D2D2A]/10">
            {[
              { label: 'Durability', val: dna.durability, color: 'bg-nature-surface', barColor: 'bg-nature-accent' },
              { label: 'Porosity', val: dna.porosity, color: 'bg-nature-surface', barColor: 'bg-nature-clay' },
              { label: 'Tensile', val: dna.tensile, color: 'bg-nature-surface', barColor: 'bg-nature-text' },
              { label: 'Luster', val: dna.luster, color: 'bg-nature-surface', barColor: 'bg-nature-accent/70' },
              { label: 'Weight', val: dna.weight, color: 'bg-nature-surface', barColor: 'bg-nature-text/50' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 w-full h-full justify-end group/bar">
                <div className="w-full relative rounded-t-lg overflow-hidden h-full flex flex-col justify-end bg-nature-bg/30 border border-nature-text/5">
                  <div 
                    style={{ height: `${item.val}%` }}
                    className={`w-full ${item.color} rounded-t-lg transition-all duration-1000 relative`}
                  >
                    {/* Inner core value indicator */}
                    <div 
                      style={{ height: '40%' }} 
                      className={`absolute bottom-0 left-0 w-full ${item.barColor} opacity-30`} 
                    />
                    <div className="absolute top-1 left-0 right-0 text-center font-bold text-[9px] text-nature-text/70">
                      {item.val}%
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-nature-text/70 tracking-tight text-center truncate w-full">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-nature-surface/40 rounded-xl border border-nature-text/5 text-xs italic text-nature-text/80 leading-relaxed font-sans">
            "A amplitude molecular das fibras de {world.theme} expande-se sob níveis ideais de umidade para permitir a transpiração da trama primária, contraindo sob ventos extremos."
          </div>
        </div>

        {/* Environmental & Recommendation Zone (md:col-span-4) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Climate Profile card card */}
          <div className="bg-white/80 rounded-2xl overflow-hidden border border-nature-text/10 shadow-pill hover:shadow-md transition-all group p-1">
            <div className="h-32 overflow-hidden relative rounded-lg">
              <img 
                className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFsfMA7ikSWIvIR_rYZueGw3bDVbmzxCn8QHsI6zwW6kXsAL-0vhGdA1_Kj6xup0to_wRyt4b9LpixFFDRI4Pr3OnH9RNxj1n_iwUEdDGOkcTy333Nl9NiDCbyszR_pRSCBAIXnySUilZjOoBOejXh3RYaymorrEOR2Xbmisj2wBN9ScNJGzKPxFFtxz_7ZkdB2YCEYcqy21Ut6bcl7ao09mqELATmG-SB_p17ZknCqYnhWD69600vPv9egtuI0mIk2DCpIb3an6SF" 
                alt="Plateau backdrop"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-4 pt-2 bg-white">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-nature-clay w-1.5 h-1.5 rounded-full bg-nature-clay" />
                <span style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} className="text-[10px] font-bold text-nature-clay uppercase tracking-wider">
                  Climate Profile
                </span>
              </div>
              <h4 style={{ fontFamily: 'EB Garamond, serif' }} className="text-xl font-medium text-nature-text">
                Arid Atmosphere
              </h4>
              <p className="text-xs text-nature-text/60 mt-1.5 leading-relaxed leading-[1.6]">
                Baixa umidade extrema, picos de radiação UV e ventos polares exigem revestimentos com mohair e bases ricas em índigo.
              </p>
            </div>
          </div>

          {/* Recommended Base card (black/dark ribbon card styled elegantly) */}
          <div className="bg-nature-accent text-white rounded-2xl p-5 shadow-pill transform hover:-translate-y-0.5 transition-all duration-300">
            <h5 className="text-[10px] tracking-widest uppercase font-bold text-white/50 mb-3">
              Recommended Base
            </h5>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white font-serif text-lg">
                ✦
              </div>
              <div>
                <p style={{ fontFamily: 'EB Garamond, serif' }} className="text-xl font-light font-serif leading-none text-white">
                  {world.recommendedBase.name}
                </p>
                <span className="text-[10px] text-white/70 font-bold opacity-80 mt-1 block font-mono">
                  {world.recommendedBase.grade}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 flex justify-between text-[11px] border-t border-white/10 text-white/80">
              <span>Heat Retention: <strong>{world.recommendedBase.heatRetention}%</strong></span>
              <span>Moisture Wick: <strong>{world.recommendedBase.moistureWick}%</strong></span>
            </div>
          </div>

        </div>

        {/* Ink / Cultural Anchors Card (md:col-span-4) */}
        <div className="md:col-span-4 bg-white/80 rounded-2xl p-6 border border-nature-text/10 shadow-pill flex flex-col justify-between">
          <div>
            <h3 style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} className="text-xs font-bold text-nature-clay tracking-wider uppercase mb-5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-nature-clay" />
              Cultural Anchors
            </h3>
            
            <ul className="space-y-5">
              {world.culturalAnchors.map((anchor, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="w-[1.5px] h-12 bg-nature-clay/25 rounded-full flex-shrink-0" />
                  <div>
                    <h5 style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} className="font-bold text-xs text-nature-text uppercase tracking-wide">
                      {anchor.title}
                    </h5>
                    <p className="text-xs text-nature-text/60 mt-1 leading-[1.5]">
                      {anchor.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-nature-text/10 pt-4 mt-6 text-[9px] text-nature-text/40 font-mono tracking-wider">
            * Referências cruzadas com arquivo geográfico.
          </div>
        </div>

        {/* Fiber Morphology and Synthesis Card (md:col-span-8) */}
        <div className="md:col-span-8 bg-white/80 rounded-2xl p-6 border border-nature-text/10 shadow-pill grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Micro-fiber rotating card */}
          <div className="relative overflow-hidden rounded-xl group aspect-video md:aspect-auto md:h-44">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkrQ9hHSPbW6pKFJLj_BcmlXrQe3RE4rr4aJwB3cVJmZSpkKItAUhTLwbEl3B_4BN0tX4ViasGhrWS9h1xA7lGbNdBlnxNEb1jHF8xkAf-Kcnulh3je-gdLGoEHjc2JKwY1f-9292YwoJrv_iIULYKA-iE2jp1o3QGIoyeN7Vd4kXebivVC8xhVDJZNYi1PveUk7msaUtBdJphIMcVQqwiIzLGq0nEqZr5Ag0GSjyhxK51V6YHuTReofnq1SU0g1Xh9hPlb1N3Avd1" 
              alt="Fiber structure detail" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            
            {/* Spinning micro spiral indicating active simulation morphology */}
            <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-4">
              <div className="flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-nature-clay animate-spin" />
                <span className="text-[10px] text-white font-bold uppercase tracking-wider font-sans">
                  Fiber Morphology Active
                </span>
              </div>
            </div>
          </div>

          {/* Synthesis Accuracy meter */}
          <div className="flex flex-col justify-between h-full py-1">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-nature-text/50 uppercase tracking-wider font-sans">
                  Synthesis Accuracy
                </span>
                <span style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} className="text-xl font-bold text-nature-clay">
                  {accuracy}%
                </span>
              </div>
              
              <div className="w-full bg-[#E8E8E0] h-2 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${accuracy}%` }}
                  className="bg-nature-clay h-full rounded-full transition-all duration-1000" 
                />
              </div>
            </div>

            <p className="text-xs text-nature-text/60 italic leading-relaxed mt-4">
              "{morphologyMsg}"
            </p>
            
            <button 
              onClick={() => alert(`Arquivos de simulação: ${world.caseStudy.code} contém 14.2k registros de alinhamento molecular.`)}
              className="text-xs font-bold text-nature-clay hover:text-nature-accent underline underline-offset-4 self-start mt-4 cursor-pointer"
            >
              Exibir log detalhado do simulador
            </button>
          </div>

        </div>

      </section>

    </div>
  );
}
