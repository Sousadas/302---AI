import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Info,
  FileText,
  Image as ImageIcon,
  Music,
  Film,
  Code
} from 'lucide-react';
import { multimodalTabs } from '../../data/presentationData';
import { playChime, playSuccess, playTick } from '../../utils/audio';

interface Slide04HowGenAIWorksProps {
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

export const Slide04HowGenAIWorks: React.FC<Slide04HowGenAIWorksProps> = ({
  animationsEnabled,
  soundEnabled,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>('image');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStage, setSimStage] = useState<number>(0); // 0 to 4

  const activeTab = multimodalTabs.find((t) => t.id === activeTabId) || multimodalTabs[1];

  const stages = [
    {
      num: '01',
      title: 'INPUT',
      subtitle: 'Prompt & Conditioning',
      desc: 'A user provides a prompt, instruction, image, or other supported multimodal input.',
      tech: 'Tokenization & Vector Embedding'
    },
    {
      num: '02',
      title: 'MODEL PROCESSING',
      subtitle: 'Contextual Encoding',
      desc: 'The model processes the input using its learned representations, self-attention, and cross-attention matrices.',
      tech: 'Semantic Latent Projection'
    },
    {
      num: '03',
      title: 'CONTENT GENERATION',
      subtitle: 'Iterative Synthesis',
      desc: 'The model generates content according to its architecture: autoregressive token prediction or diffusion denoising.',
      tech: 'Sampling & Probabilistic Decoding'
    },
    {
      num: '04',
      title: 'OUTPUT',
      subtitle: 'Artifact Delivery',
      desc: 'The system presents generated text, images, audio, video, or executable code ready for review.',
      tech: 'Detokenization & Pixel Decoding'
    }
  ];

  const handleSelectTab = (id: string) => {
    if (isSimulating) return;
    playTick(soundEnabled);
    setActiveTabId(id);
    setSimStage(0);
  };

  const handleSelectStage = (idx: number) => {
    if (isSimulating) return;
    playTick(soundEnabled);
    setActiveStageIndex(idx);
    setSimStage(idx + 1);
  };

  const handleRunSimulation = () => {
    if (isSimulating) return;
    playChime(soundEnabled);
    setIsSimulating(true);
    setSimStage(1);
    setActiveStageIndex(0);

    const timeouts = [
      setTimeout(() => {
        setSimStage(2);
        setActiveStageIndex(1);
        playTick(soundEnabled);
      }, 1100),
      setTimeout(() => {
        setSimStage(3);
        setActiveStageIndex(2);
        playTick(soundEnabled);
      }, 2300),
      setTimeout(() => {
        setSimStage(4);
        setActiveStageIndex(3);
        playSuccess(soundEnabled);
      }, 3500),
      setTimeout(() => {
        setIsSimulating(false);
      }, 4800)
    ];

    return () => timeouts.forEach(clearTimeout);
  };

  const tabIcons: Record<string, React.ReactNode> = {
    text: <FileText className="w-3.5 h-3.5" />,
    image: <ImageIcon className="w-3.5 h-3.5" />,
    audio: <Music className="w-3.5 h-3.5" />,
    video: <Film className="w-3.5 h-3.5" />,
    code: <Code className="w-3.5 h-3.5" />,
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Title */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-1">
          <span>03 / THE MECHANICS</span>
          <span>•</span>
          <span>PIPELINE DYNAMICS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          From Prompt to Creation
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-3xl">
          An end-to-end operational pipeline converting abstract linguistic instructions into rich synthetic multimedia.
        </p>
      </motion.div>

      {/* Multimodal Selector Tabs */}
      <div className="flex items-center space-x-2 mb-5 overflow-x-auto pb-1">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
          Select Modality:
        </span>
        {multimodalTabs.map((t) => {
          const isSelected = activeTabId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleSelectTab(t.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition cursor-pointer flex items-center space-x-1.5 ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-sm'
                  : 'border-white/10 bg-white/5 hover:border-white/20 text-slate-400'
              }`}
            >
              {tabIcons[t.id]}
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* 4 Animated Horizontal Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {stages.map((st, idx) => {
          const isSelected = activeStageIndex === idx;
          const isStageActive = simStage === idx + 1;

          return (
            <button
              key={st.num}
              onClick={() => handleSelectStage(idx)}
              className={`text-left p-4 rounded-2xl border transition-colors duration-200 relative cursor-pointer overflow-hidden ${
                isSelected || isStageActive
                  ? 'border-cyan-400 bg-gradient-to-b from-[#131D38] to-[#0D152A] text-white shadow-sm'
                  : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10 text-slate-300'
              }`}
            >
              {/* Top highlight line */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                  isSelected || isStageActive ? 'bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500' : 'bg-transparent'
                }`}
              />

              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-lg font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                  STAGE {st.num}
                </span>
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded">
                  {st.title}
                </span>
              </div>

              <h3 className="font-heading font-bold text-sm text-white mb-1">
                {st.subtitle}
              </h3>
              <p className="text-xs text-slate-300 leading-snug">
                {st.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Demonstration Panel & Pipeline Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Active Stage Specification */}
        <div className="lg:col-span-5 p-5 rounded-2xl glass-panel-glow border border-indigo-500/30 bg-[#0E1528]/85 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                STAGE {stages[activeStageIndex].num}: {stages[activeStageIndex].subtitle}
              </span>
              <span className="text-[11px] font-mono text-slate-400">Technical Stage</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
              {stages[activeStageIndex].desc}
            </p>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-cyan-300 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                Primary Model Architecture:
              </span>
              <code>{activeTab.modelType}</code>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Select any stage card above</span>
            <span className="text-cyan-400 font-semibold">{activeStageIndex + 1} of 4</span>
          </div>
        </div>

        {/* Right: "Try a Prompt" Interactive Simulation Panel */}
        <div className="lg:col-span-7 p-5 rounded-2xl glass-panel border border-white/10 bg-[#0B1020]/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Interactive Generation Demonstration
                </span>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:brightness-110 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 transition-all duration-150 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Try a Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* Prompt Display Box */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 mb-3 space-y-1">
              <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block">
                Sample Input Prompt:
              </span>
              <p className="text-xs text-white font-mono font-medium">
                &ldquo;{activeTab.prompt}&rdquo;
              </p>
            </div>

            {/* Stepper Progress Visualizer */}
            <div className="space-y-1.5 py-1 mb-3">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={simStage >= 1 ? 'text-indigo-300 font-bold' : 'text-slate-600'}>1. Prompt Tokenized</span>
                <span className={simStage >= 2 ? 'text-cyan-300 font-bold' : 'text-slate-600'}>2. Semantic Embedding</span>
                <span className={simStage >= 3 ? 'text-violet-300 font-bold' : 'text-slate-600'}>3. Synthesis Loop</span>
                <span className={simStage >= 4 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>4. Output Rendered</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
                  animate={{ width: `${(simStage / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Predefined Output Demonstration Box */}
            <div className="p-3.5 rounded-xl bg-[#091122] border border-cyan-500/25">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  Illustrative AI-Generated Output:
                </span>
                {simStage === 4 && (
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 inline" />
                    <span>Complete</span>
                  </span>
                )}
              </div>

              <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed min-h-[50px] flex items-center">
                {simStage === 4 ? activeTab.outputSample : <span className="text-slate-500 italic">Click &quot;Try a Prompt&quot; to run the conceptual demonstration pipeline...</span>}
              </div>
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="mt-3 p-2 rounded-lg bg-amber-950/25 border border-amber-500/25 flex items-center space-x-2 text-[11px] text-amber-200">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <p>
              <strong>Educational Note: </strong> 
              This demonstration is conceptual and illustrates generation stages without executing a live external API call.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
