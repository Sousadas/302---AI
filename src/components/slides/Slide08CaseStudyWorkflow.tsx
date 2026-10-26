import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Info, 
  MessageSquare,
  Cpu,
  ImageIcon,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { caseStudyStages } from '../../data/presentationData';
import { playTick } from '../../utils/audio';

interface Slide08CaseStudyWorkflowProps {
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

export const Slide08CaseStudyWorkflow: React.FC<Slide08CaseStudyWorkflowProps> = ({
  animationsEnabled,
  soundEnabled,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);

  const currentStage = caseStudyStages.find((s) => s.id === selectedStageId) || caseStudyStages[0];

  const handleSelectStage = (id: number) => {
    playTick(soundEnabled);
    setSelectedStageId(id);
  };

  const stageIcons = [
    <MessageSquare className="w-5 h-5" />,
    <Cpu className="w-5 h-5" />,
    <ImageIcon className="w-5 h-5" />,
    <RefreshCw className="w-5 h-5" />,
  ];

  const stageColors = [
    { border: 'border-cyan-400', bg: 'bg-cyan-950/40', text: 'text-cyan-400', glow: 'shadow-cyan-500/10', iconBg: 'bg-cyan-500/20' },
    { border: 'border-indigo-400', bg: 'bg-indigo-950/40', text: 'text-indigo-400', glow: 'shadow-indigo-500/10', iconBg: 'bg-indigo-500/20' },
    { border: 'border-violet-400', bg: 'bg-violet-950/40', text: 'text-violet-400', glow: 'shadow-violet-500/10', iconBg: 'bg-violet-500/20' },
    { border: 'border-emerald-400', bg: 'bg-emerald-950/40', text: 'text-emerald-400', glow: 'shadow-emerald-500/10', iconBg: 'bg-emerald-500/20' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Header */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono tracking-widest uppercase mb-1">
          <span>07 / CASE STUDY</span>
          <span>•</span>
          <span>TEXT-TO-IMAGE PIPELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          How Does Text-to-Image Generation Work?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl">
          A clear four-stage pipeline showing how a written description is transformed into a visual concept by a generative AI model.
        </p>
      </motion.div>

      {/* 4-Stage Pipeline — Interactive Cards */}
      <div className="relative mb-6">
        {/* Horizontal Connector Line */}
        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-white/10 -translate-y-1/2 hidden md:block" />
        
        {/* Active Progress Track */}
        <div 
          className="absolute top-1/2 left-8 h-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 -translate-y-1/2 transition-all duration-500 hidden md:block"
          style={{ width: `${((selectedStageId - 1) / 3) * 85}%` }}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative z-10">
          {caseStudyStages.map((stage, index) => {
            const isSelected = selectedStageId === stage.id;
            const colors = stageColors[index];
            return (
              <button
                key={stage.id}
                onClick={() => handleSelectStage(stage.id)}
                className={`text-left p-4 rounded-2xl border transition-colors duration-200 cursor-pointer ${
                  isSelected
                    ? `${colors.border} ${colors.bg} text-white shadow-sm ${colors.glow}`
                    : 'border-white/10 bg-[#0C1221]/90 hover:border-white/20 hover:bg-white/5 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isSelected ? colors.text : 'text-slate-500'}`}>
                    STAGE 0{stage.id}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isSelected ? `${colors.bg} ${colors.border} border` : 'bg-white/20'}`} />
                </div>
                <h3 className="font-heading font-bold text-sm text-white mb-0.5">
                  {stage.title}
                </h3>
                <span className="text-[10px] text-slate-400 block">
                  {stage.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Selected Stage Detail + Visual Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left: Selected Stage Detail Panel */}
        <motion.div
          key={selectedStageId}
          initial={animationsEnabled ? { opacity: 0, x: -15 } : { opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-5 p-5 rounded-2xl border border-white/10 bg-[#0E1528]/85 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2.5 rounded-xl ${stageColors[selectedStageId - 1].iconBg} ${stageColors[selectedStageId - 1].text}`}>
                {stageIcons[selectedStageId - 1]}
              </div>
              <div>
                <span className={`font-mono text-xs font-bold ${stageColors[selectedStageId - 1].text}`}>
                  STAGE 0{currentStage.id}
                </span>
                <h3 className="font-heading font-bold text-lg text-white">
                  {currentStage.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {currentStage.detail}
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">Input</span>
                <p className="text-xs text-slate-300">{currentStage.inputDescription}</p>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-violet-400 font-bold block mb-1">Output</span>
                <p className="text-xs text-slate-300">{currentStage.outputDescription}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Visual Flow Diagram */}
        <div className="lg:col-span-7 p-5 rounded-2xl border border-white/10 bg-[#0B1020]/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Generation Pipeline Flow
              </span>
            </div>

            {/* Visual Pipeline SVG */}
            <svg viewBox="0 0 560 200" className="w-full h-auto select-none" role="img" aria-label="Text-to-image generation pipeline">
              <defs>
                <linearGradient id="pipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="33%" stopColor="#6366F1" />
                  <stop offset="66%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connection line */}
              <line x1="80" y1="80" x2="480" y2="80" stroke="url(#pipelineGrad)" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />

              {/* Stage 1 — Prompt */}
              <g onClick={() => handleSelectStage(1)} className="cursor-pointer">
                <rect x="15" y="40" width="130" height="80" rx="14" fill={selectedStageId === 1 ? '#0E3A4A' : '#111827'} stroke={selectedStageId === 1 ? '#22D3EE' : '#374151'} strokeWidth={selectedStageId === 1 ? 2 : 1} />
                <text x="80" y="68" textAnchor="middle" fill={selectedStageId === 1 ? '#22D3EE' : '#94A3B8'} fontSize="9" fontFamily="monospace" fontWeight="bold">STAGE 01</text>
                <text x="80" y="88" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="bold">PROMPT</text>
                <text x="80" y="105" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="'Inter'">User Description</text>
              </g>

              {/* Arrow 1 */}
              <polygon points="150,80 162,74 162,86" fill={selectedStageId >= 2 ? '#22D3EE' : '#4B5563'} />

              {/* Stage 2 — Processing */}
              <g onClick={() => handleSelectStage(2)} className="cursor-pointer">
                <rect x="168" y="40" width="130" height="80" rx="14" fill={selectedStageId === 2 ? '#1E1B4B' : '#111827'} stroke={selectedStageId === 2 ? '#6366F1' : '#374151'} strokeWidth={selectedStageId === 2 ? 2 : 1} />
                <text x="233" y="68" textAnchor="middle" fill={selectedStageId === 2 ? '#818CF8' : '#94A3B8'} fontSize="9" fontFamily="monospace" fontWeight="bold">STAGE 02</text>
                <text x="233" y="88" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="bold">PROCESSING</text>
                <text x="233" y="105" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="'Inter'">Model Analysis</text>
              </g>

              {/* Arrow 2 */}
              <polygon points="303,80 315,74 315,86" fill={selectedStageId >= 3 ? '#6366F1' : '#4B5563'} />

              {/* Stage 3 — Generation */}
              <g onClick={() => handleSelectStage(3)} className="cursor-pointer">
                <rect x="321" y="40" width="130" height="80" rx="14" fill={selectedStageId === 3 ? '#2E1065' : '#111827'} stroke={selectedStageId === 3 ? '#A78BFA' : '#374151'} strokeWidth={selectedStageId === 3 ? 2 : 1} />
                <text x="386" y="68" textAnchor="middle" fill={selectedStageId === 3 ? '#C4B5FD' : '#94A3B8'} fontSize="9" fontFamily="monospace" fontWeight="bold">STAGE 03</text>
                <text x="386" y="88" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="bold">GENERATION</text>
                <text x="386" y="105" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="'Inter'">Image Synthesis</text>
              </g>

              {/* Arrow 3 */}
              <polygon points="456,80 468,74 468,86" fill={selectedStageId >= 4 ? '#A78BFA' : '#4B5563'} />

              {/* Stage 4 — Review */}
              <g onClick={() => handleSelectStage(4)} className="cursor-pointer">
                <rect x="474" y="40" width="76" height="80" rx="14" fill={selectedStageId === 4 ? '#064E3B' : '#111827'} stroke={selectedStageId === 4 ? '#10B981' : '#374151'} strokeWidth={selectedStageId === 4 ? 2 : 1} />
                <text x="512" y="68" textAnchor="middle" fill={selectedStageId === 4 ? '#6EE7B7' : '#94A3B8'} fontSize="9" fontFamily="monospace" fontWeight="bold">04</text>
                <text x="512" y="88" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontFamily="'Space Grotesk'" fontWeight="bold">REVIEW</text>
                <text x="512" y="105" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="'Inter'">Refine</text>
              </g>

              {/* Example prompt text */}
              <rect x="15" y="140" width="535" height="45" rx="10" fill="#0B1020" stroke="#374151" strokeWidth="1" />
              <text x="30" y="160" fill="#94A3B8" fontSize="9" fontFamily="monospace">Example Prompt:</text>
              <text x="30" y="176" fill="#22D3EE" fontSize="9" fontFamily="monospace" fontStyle="italic">
                "A futuristic African city at sunset, modern architecture, warm lighting, electric blue details."
              </text>
            </svg>
          </div>

          {/* Key Insight */}
          <div className="mt-4 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-start space-x-2.5">
            <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-indigo-300">Key Insight:</strong> Changing descriptive words in the prompt (e.g. "minimalist" vs "cinematic") guides the model to produce different visual styles without retraining the model itself.
            </p>
          </div>

          {/* Educational Disclaimer */}
          <div className="mt-3 p-2.5 rounded-lg bg-amber-950/25 border border-amber-500/25 flex items-center space-x-2 text-[11px] text-amber-200">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <p>
              &ldquo;This diagram is an educational simplification. Real-world systems involve additional steps like tokenization, attention, and iterative refinement.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
