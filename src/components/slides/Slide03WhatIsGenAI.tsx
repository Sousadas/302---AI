import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Film, 
  Code, 
  Layers, 
  Brain, 
  Sliders, 
  ArrowRight, 
  HelpCircle,
  Lightbulb,
  Cpu,
  Network
} from 'lucide-react';
import { playTick } from '../../utils/audio';

interface Slide03WhatIsGenAIProps {
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

type ConceptKey = 'learn' | 'understand' | 'generate' | 'refine';
type OutputModality = 'text' | 'image' | 'audio' | 'video' | 'code';

export const Slide03WhatIsGenAI: React.FC<Slide03WhatIsGenAIProps> = ({
  animationsEnabled,
  soundEnabled,
}) => {
  const [selectedConcept, setSelectedConcept] = useState<ConceptKey>('generate');
  const [selectedOutput, setSelectedOutput] = useState<OutputModality>('image');

  const concepts: Record<ConceptKey, { title: string; subtitle: string; desc: string; icon: React.ReactNode }> = {
    learn: {
      title: 'LEARN',
      subtitle: 'Pattern Discovery from Vast Data',
      desc: 'Models analyze billions of text documents, images, or audio clips, discovering statistical distributions, structural syntax, and semantic relationships.',
      icon: <Brain className="w-4 h-4 text-indigo-400" />
    },
    understand: {
      title: 'UNDERSTAND CONTEXT',
      subtitle: 'Prompt Interpretation & Attention',
      desc: 'The model parses natural language prompts, breaking them into semantic tokens and mapping user intent via multi-head attention layers.',
      icon: <Layers className="w-4 h-4 text-cyan-400" />
    },
    generate: {
      title: 'GENERATE',
      subtitle: 'Synthesis of Novel Artifacts',
      desc: 'The system synthesizes original outputs token-by-token or pixel-by-pixel, predicting probable completions grounded in learned patterns.',
      icon: <Cpu className="w-4 h-4 text-violet-400" />
    },
    refine: {
      title: 'REFINE',
      subtitle: 'Iterative User Steering',
      desc: 'Users guide and polish the output through conversational follow-ups, parameter adjustments, negative prompts, or reference sketches.',
      icon: <Sliders className="w-4 h-4 text-emerald-400" />
    }
  };

  const outputModalities: Record<OutputModality, {
    label: string;
    icon: React.ReactNode;
    realExample: string;
    sampleResult: string;
    architectureNote: string;
  }> = {
    text: {
      label: 'Text Generation',
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      realExample: 'ChatGPT, Claude, Gemini',
      sampleResult: '"Explain photosynthesis: Plants convert sunlight, water, and CO₂ into oxygen and glucose..."',
      architectureNote: 'Uses Autoregressive Transformers to predict the most probable next token in sequence.'
    },
    image: {
      label: 'Image Synthesis',
      icon: <ImageIcon className="w-4 h-4 text-indigo-400" />,
      realExample: 'Midjourney, DALL-E, Stable Diffusion',
      sampleResult: 'High-fidelity cinematic concept art of a futuristic African city at golden sunset.',
      architectureNote: 'Uses Latent Diffusion to progressively subtract noise guided by CLIP text embeddings.'
    },
    audio: {
      label: 'Audio & Music',
      icon: <Music className="w-4 h-4 text-violet-400" />,
      realExample: 'Suno, Udio, ElevenLabs',
      sampleResult: 'Acoustic ambient chord progression with natural conversational Spanish voice synthesis.',
      architectureNote: 'Uses Neural Audio Codecs and Flow Matching to synthesize continuous audio waveforms.'
    },
    video: {
      label: 'Video Generation',
      icon: <Film className="w-4 h-4 text-emerald-400" />,
      realExample: 'OpenAI Sora, Runway Gen-3, Kling',
      sampleResult: 'Coherent 4-second camera dolly movement gliding past glowing glass architectural towers.',
      architectureNote: 'Uses Spatio-Temporal Diffusion Transformers modeling 3D video patches over time.'
    },
    code: {
      label: 'Code Generation',
      icon: <Code className="w-4 h-4 text-amber-400" />,
      realExample: 'GitHub Copilot, Cursor, CodeLlama',
      sampleResult: 'Complete TypeScript component with props validation, error handling, and unit test suite.',
      architectureNote: 'Specialized LLMs fine-tuned on open-source repositories and Abstract Syntax Trees.'
    }
  };

  const handleSelectConcept = (k: ConceptKey) => {
    playTick(soundEnabled);
    setSelectedConcept(k);
  };

  const handleSelectOutput = (m: OutputModality) => {
    playTick(soundEnabled);
    setSelectedOutput(m);
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
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-1">
          <span>02 / FOUNDATIONS</span>
          <span>•</span>
          <span>DEFINING THE PARADIGM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          What Is Generative AI?
        </h2>
        <div className="mt-2.5 p-3.5 rounded-xl bg-white/5 border border-white/10 max-w-4xl flex items-start space-x-3">
          <Lightbulb className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="text-white">Definition: </strong>
            Generative AI is a type of artificial intelligence that learns patterns from existing data and uses them to generate new content, such as text, images, audio, video, and code.
          </p>
        </div>
      </motion.div>

      {/* 4 Key Concepts Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {(Object.keys(concepts) as ConceptKey[]).map((key) => {
          const item = concepts[key];
          const isSelected = selectedConcept === key;
          return (
            <button
              key={key}
              onClick={() => handleSelectConcept(key)}
              className={`p-3 rounded-xl border text-left transition-colors duration-150 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-sm'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-mono font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {item.title}
                </span>
                <div className="p-1 rounded-md bg-white/5">
                  {item.icon}
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-200 line-clamp-1">
                {item.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Diagram & Output Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Interactive Multimodal Prompt Flow Visualizer */}
        <div className="lg:col-span-7 p-5 rounded-2xl glass-panel border border-white/10 bg-[#0E1528]/85 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs mb-3">
              <span className="font-mono text-cyan-400 uppercase font-semibold flex items-center space-x-1.5">
                <Network className="w-3.5 h-3.5" />
                <span>Prompt-to-Multimodal Flow</span>
              </span>
              <span className="text-[11px] text-slate-400">Select an output to inspect</span>
            </div>

            {/* Prompt Ingestion Box */}
            <div className="p-3 rounded-xl bg-black/40 border border-indigo-500/30 flex items-center justify-between text-xs mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-indigo-300 font-semibold">User Prompt:</span>
                <span className="text-white italic">&ldquo;Create a futuristic African city at sunset...&rdquo;</span>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />
            </div>

            {/* Multimodal Output Branching Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {(Object.keys(outputModalities) as OutputModality[]).map((m) => {
                const out = outputModalities[m];
                const isSelected = selectedOutput === m;
                return (
                  <button
                    key={m}
                    onClick={() => handleSelectOutput(m)}
                    className={`py-3 px-2 rounded-xl border text-center transition-colors duration-150 cursor-pointer flex flex-col items-center justify-center space-y-1.5 ${
                      isSelected
                        ? 'border-cyan-400 bg-gradient-to-b from-indigo-950/80 to-cyan-950/60 text-white shadow-sm'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8 text-slate-400'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-black/30">
                      {out.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                      {m}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Concept Deep Dive Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/40 to-cyan-950/30 border border-cyan-500/20 text-xs">
              <span className="font-mono text-cyan-300 font-bold block mb-1">
                Pillar in Focus: {concepts[selectedConcept].title}
              </span>
              <p className="text-slate-200 leading-relaxed">
                {concepts[selectedConcept].desc}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Click any concept tab or output button</span>
            <span className="text-cyan-400 font-semibold">MULTIMODAL SYNTHESIS</span>
          </div>
        </div>

        {/* Right Column: Output Modality Inspector */}
        <div className="lg:col-span-5 p-5 rounded-2xl glass-panel-glow border border-indigo-500/30 bg-[#10172D]/90 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOutput}
              initial={animationsEnabled ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={animationsEnabled ? { opacity: 0, x: -20 } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between h-full space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Modality Inspection
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {outputModalities[selectedOutput].realExample}
                  </span>
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-2 flex items-center space-x-2">
                  {outputModalities[selectedOutput].icon}
                  <span>{outputModalities[selectedOutput].label}</span>
                </h3>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 mb-3">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block mb-1">
                    Demonstration Result:
                  </span>
                  <p className="text-xs text-slate-200 font-mono leading-relaxed">
                    {outputModalities[selectedOutput].sampleResult}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/20 text-xs">
                  <span className="text-[10px] font-mono uppercase text-violet-300 font-bold block mb-1">
                    Underlying Architecture:
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {outputModalities[selectedOutput].architectureNote}
                  </p>
                </div>
              </div>

              {/* Technical Nuance Footnote */}
              <div className="pt-3 border-t border-white/5 flex items-center space-x-2 text-[10px] text-slate-400">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>
                  Note: Models differ significantly by modality (Diffusion vs Transformers vs GANs).
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
