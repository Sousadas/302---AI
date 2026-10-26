import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, 
  Palette, 
  Eye, 
  Lightbulb, 
  ShieldCheck, 
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { evaluationCriteria } from '../../data/presentationData';
import type { EvaluationCriterion } from '../../types/presentation';
import { playTick } from '../../utils/audio';

interface Slide09CaseStudyImpactProps {
  animationsEnabled: boolean;
  soundEnabled?: boolean;
}

export const Slide09CaseStudyImpact: React.FC<Slide09CaseStudyImpactProps> = ({
  animationsEnabled,
  soundEnabled,
}) => {
  const [activeCriterionId, setActiveCriterionId] = useState<string>('alignment');

  const activeCriterion = evaluationCriteria.find((c) => c.id === activeCriterionId) || evaluationCriteria[0];

  const handleSelectCriterion = (c: EvaluationCriterion) => {
    playTick(soundEnabled);
    setActiveCriterionId(c.id);
  };

  const getBadgeStyle = (rating: string) => {
    switch (rating) {
      case 'Strong alignment':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Partial alignment':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    alignment: <Eye className="w-4 h-4 text-cyan-400" />,
    quality: <Palette className="w-4 h-4 text-indigo-400" />,
    creativity: <Lightbulb className="w-4 h-4 text-amber-400" />,
    responsible: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Header */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono tracking-widest uppercase mb-1">
          <span>08 / QUALITY & ETHICS</span>
          <span>•</span>
          <span>QUALITATIVE ASSESSMENT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          Evaluating the Generated Results
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-3xl">
          Four foundational qualitative criteria for critiquing synthesized content: prompt alignment, visual coherence, creative novelty, and ethical responsibility.
        </p>
      </motion.div>

      {/* Main Grid: 4 Interactive Criteria Cards + In-Depth Qualitative Evaluation Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-4">
        
        {/* Left: 4 Clickable Criteria Selection Cards */}
        <div className="lg:col-span-5 p-5 rounded-2xl glass-panel border border-white/10 bg-[#0E1528]/85 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Evaluation Rubric</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Click to inspect</span>
            </div>

            <div className="space-y-2.5">
              {evaluationCriteria.map((c) => {
                const isSelected = activeCriterionId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCriterion(c)}
                    className={`w-full text-left p-3 rounded-xl border transition-colors duration-150 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-sm'
                        : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/8 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                        {iconMap[c.id]}
                      </div>
                      <div>
                        <span className="text-xs font-heading font-bold block text-white">
                          {c.title}
                        </span>
                        <span className="text-[10px] text-slate-400 line-clamp-1">
                          {c.question}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${getBadgeStyle(c.rating)}`}>
                      {c.rating}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>4 Rubric Dimensions</span>
            <span className="text-cyan-400 font-semibold">HUMAN AUDIT</span>
          </div>
        </div>

        {/* Right: In-Depth Qualitative Assessment Panel */}
        <div className="lg:col-span-7 p-5 rounded-2xl glass-panel-glow border border-indigo-500/30 bg-[#0B1020]/90 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCriterion.id}
              initial={animationsEnabled ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={animationsEnabled ? { opacity: 0, scale: 0.96 } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between h-full space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Criterion Deep Dive: {activeCriterion.title}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getBadgeStyle(activeCriterion.rating)}`}>
                    {activeCriterion.rating}
                  </span>
                </div>

                {/* Core Question */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 mb-3">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block mb-0.5">
                    Evaluator Core Question:
                  </span>
                  <p className="text-sm font-heading font-semibold text-white">
                    &ldquo;{activeCriterion.question}&rdquo;
                  </p>
                </div>

                {/* Explanation */}
                <div className="mb-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Assessment Methodology:
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeCriterion.explanation}
                  </p>
                </div>

                {/* Sample Qualitative Review Comment */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/40 to-cyan-950/30 border border-cyan-500/20 text-xs">
                  <span className="font-mono text-cyan-300 font-bold block mb-1">
                    Sample Review Critique:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {activeCriterion.comment}
                  </p>
                </div>
              </div>

              {/* Qualitative Disclaimer */}
              <div className="pt-2 flex items-center space-x-2 text-[10px] text-slate-400">
                <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  Illustrative qualitative review demonstrating evaluation methodology without claiming commercial benchmarks.
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mandatory Exact Concluding Statement */}
      <motion.div 
        initial={animationsEnabled ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-[#10172B] to-cyan-950/40 border border-cyan-500/30 flex items-center space-x-3 text-xs sm:text-sm text-slate-200"
      >
        <Quote className="w-5 h-5 text-cyan-400 shrink-0" />
        <p className="font-semibold text-white leading-relaxed">
          &ldquo;Generative AI can accelerate creative exploration, but human judgement remains important for evaluating and refining the result.&rdquo;
        </p>
      </motion.div>
    </div>
  );
};
