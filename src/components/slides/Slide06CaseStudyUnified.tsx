import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Eye, 
  Palette, 
  ShieldCheck, 
  Lightbulb, 
  ArrowRight,
  CheckCircle2,
  Cpu,
  Copy,
  Check
} from 'lucide-react';
import { promptVariations } from '../../data/presentationData';
import type { PromptVariation } from '../../types/presentation';
import { playTick } from '../../utils/audio';

interface Slide06CaseStudyUnifiedProps {
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

export const Slide06CaseStudyUnified: React.FC<Slide06CaseStudyUnifiedProps> = ({
  animationsEnabled,
  soundEnabled,
}) => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>('cinematic');
  const [copied, setCopied] = useState<boolean>(false);

  const activePrompt: PromptVariation = 
    promptVariations.find((p) => p.id === selectedPromptId) || promptVariations[1];

  const handleSelectPrompt = (id: string) => {
    playTick(soundEnabled);
    setSelectedPromptId(id);
  };

  const handleCopyPrompt = () => {
    playTick(soundEnabled);
    navigator.clipboard.writeText(activePrompt.prompt.replace(/^"|"$/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const evaluationPillars = [
    {
      title: 'Prompt Alignment',
      rating: 'Strong',
      desc: 'Faithfully captures sunset, architecture & lighting tokens',
      icon: <Eye className="w-4 h-4 text-cyan-400" />,
      color: 'border-cyan-500/30 bg-cyan-950/30 text-cyan-300'
    },
    {
      title: 'Visual Coherence',
      rating: 'High Quality',
      desc: 'Consistent perspective, horizon reflections & sharp details',
      icon: <Palette className="w-4 h-4 text-indigo-400" />,
      color: 'border-indigo-500/30 bg-indigo-950/30 text-indigo-300'
    },
    {
      title: 'Creative Novelty',
      rating: 'Inspiring',
      desc: 'Original synthesis of modern structures with cultural motifs',
      icon: <Lightbulb className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/30 bg-amber-950/30 text-amber-300'
    },
    {
      title: 'Human Oversight',
      rating: 'Essential',
      desc: 'Designers validate cultural nuances & refine output',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Slide Header */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono tracking-widest uppercase mb-1">
          <span>05 / CASE STUDY</span>
          <span>•</span>
          <span>AI IMAGE GENERATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          Case Study: AI Image Generation
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-3xl">
          From a natural-language descriptive prompt to a high-fidelity visual concept in seconds.
        </p>
      </motion.div>

      {/* Main Grid: Prompt & Workflow on Left, Visual Concept & Evaluation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Prompt Selection & Input Details (lg:col-span-6) */}
        <motion.div
          initial={animationsEnabled ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6 flex flex-col justify-between space-y-4"
        >
          {/* Prompt Style Selector */}
          <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-[#0C1221]/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
              Select Prompt Style Variation:
            </span>

            <div className="grid grid-cols-3 gap-2">
              {promptVariations.map((p) => {
                const isSelected = p.id === activePrompt.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPrompt(p.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/50 text-white shadow-sm shadow-cyan-500/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono block uppercase font-bold text-cyan-400">
                      {p.id}
                    </span>
                    <span className="text-xs font-semibold block truncate text-slate-200">
                      {p.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Prompt Box */}
          <div className="p-5 rounded-2xl glass-panel border border-indigo-500/30 bg-[#0F1629]/90 relative">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Text Prompt Ingestion</span>
              </span>

              <button
                onClick={handleCopyPrompt}
                className="flex items-center space-x-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition cursor-pointer"
                title="Copy prompt text"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="font-mono text-sm text-cyan-200 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/10 italic">
              {activePrompt.prompt}
            </p>

            <div className="mt-3 text-xs text-slate-300 space-y-1">
              <p><span className="text-slate-400 font-mono text-[11px]">Style:</span> {activePrompt.styleDescription}</p>
              <p><span className="text-slate-400 font-mono text-[11px]">Lighting:</span> {activePrompt.lighting}</p>
            </div>
          </div>

          {/* 3-Step Execution Pipeline Pill */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Prompt Ingestion</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Diffusion Denoising</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Concept Render</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Result & Qualitative Evaluation (lg:col-span-6) */}
        <motion.div
          initial={animationsEnabled ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-6 flex flex-col justify-between space-y-4"
        >
          {/* Visual Concept Display Card */}
          <div className="p-5 rounded-2xl glass-panel-glow border border-violet-500/30 bg-[#0E152B]/85 relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-300">
                  AI Synthesized Output Concept
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Latent Diffusion 1024×1024
              </span>
            </div>

            {/* Visual concept illustration preview */}
            <div className="h-36 sm:h-40 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950/70 border border-white/15 p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <span className="px-2 py-0.5 rounded bg-black/60 border border-white/20 text-[10px] font-mono text-cyan-300">
                  Architectural Concept #{activePrompt.id.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-amber-300 flex items-center space-x-1">
                  <span>Golden Hour Sunset</span>
                </span>
              </div>

              {/* Architectural silhouette stylized representation */}
              <div className="relative z-10 flex items-end justify-between pt-2">
                <div className="space-y-1">
                  <div className="text-base sm:text-lg font-heading font-bold text-white tracking-tight drop-shadow">
                    Futuristic Metropolis
                  </div>
                  <div className="text-xs text-slate-300 drop-shadow">
                    Glass towers • Organic canopies • High-contrast lighting
                  </div>
                </div>

                {/* Color Palette Chips */}
                <div className="flex items-center space-x-1.5 bg-black/60 p-1.5 rounded-lg border border-white/15">
                  {activePrompt.palette.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Evaluation Criteria Badges */}
          <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-[#0B1021]/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
              Qualitative Assessment Criteria:
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {evaluationPillars.map((item) => (
                <div 
                  key={item.title} 
                  className={`p-3 rounded-xl border flex flex-col justify-between ${item.color}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-heading font-bold flex items-center space-x-1.5">
                      {item.icon}
                      <span>{item.title}</span>
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 border border-white/15">
                      {item.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
