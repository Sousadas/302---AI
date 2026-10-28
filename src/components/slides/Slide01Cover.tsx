import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Bookmark, 
  User, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Film, 
  Code,
  Cpu,
  Layers,
  RotateCw,
  CheckCircle2
} from 'lucide-react';
import { presentationMetadata } from '../../data/presentationData';
import { playSuccess, playTick } from '../../utils/audio';

interface Slide01CoverProps {
  onStart: () => void;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

export const Slide01Cover: React.FC<Slide01CoverProps> = ({
  onStart,
  animationsEnabled,
  soundEnabled,
}) => {
  const [pulseStage, setPulseStage] = useState<number>(0);
  const [activeOutput, setActiveOutput] = useState<number>(1); // Image default

  // Animated pulse along the 5 stages: PROMPT -> MODEL -> GENERATION -> OUTPUT -> REFINEMENT
  useEffect(() => {
    if (!animationsEnabled) return;
    const interval = setInterval(() => {
      setPulseStage((prev) => (prev + 1) % 5);
    }, 1600);
    return () => clearInterval(interval);
  }, [animationsEnabled]);

  const handleStart = () => {
    playSuccess(soundEnabled);
    onStart();
  };

  const outputTypes = [
    { name: 'Text Document', icon: <FileText className="w-4 h-4 text-cyan-400" />, desc: 'Articles, summaries & scripts' },
    { name: 'Synthetic Image', icon: <ImageIcon className="w-4 h-4 text-indigo-400" />, desc: 'Concept art & illustrations' },
    { name: 'Audio Waveform', icon: <Music className="w-4 h-4 text-violet-400" />, desc: 'Music & speech synthesis' },
    { name: 'Video Frames', icon: <Film className="w-4 h-4 text-emerald-400" />, desc: 'Motion scenes & animatics' },
    { name: 'Code Editor', icon: <Code className="w-4 h-4 text-amber-400" />, desc: 'Functions, APIs & tests' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Academic Keynote Typography and Metadata */}
        <motion.div 
          initial={animationsEnabled ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col space-y-6"
        >
          {/* College Institution Header with Official BVM Logo */}
          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 shadow-lg shadow-indigo-500/20 border border-white/20 flex items-center justify-center shrink-0">
              <img 
                src="/bvm-logo.png" 
                alt="Birla Vishvakarma Mahavidyalaya Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-heading font-bold text-white tracking-wide">
                  Birla Vishvakarma Mahavidyalaya
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold">
                  BVM
                </span>
              </div>
              <span className="text-[11px] text-slate-300 font-mono tracking-wider uppercase block">
                Engineering College • Vallabh Vidyanagar
              </span>
            </div>
          </div>

          {/* Academic Header Badges */}
          <div className="flex items-center space-x-2.5">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{presentationMetadata.course.toUpperCase()} ({presentationMetadata.subjectCode})</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-white/5 border border-white/10 text-slate-300">
              <Bookmark className="w-3 h-3 text-indigo-400" />
              <span>{presentationMetadata.presentationType.toUpperCase()}</span>
            </span>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.08]">
              APPLICATIONS OF <br />
              <span className="text-gradient-cyan">GENERATIVE AI</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              {presentationMetadata.subtitle}
            </p>
          </div>

          {/* Presenter Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Presenter</span>
                <span className="text-xs sm:text-sm font-semibold text-white block">{presentationMetadata.presenter}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Subject</span>
                <span className="text-xs sm:text-sm font-semibold text-white block">{presentationMetadata.subjectCode} — {presentationMetadata.course}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-violet-500/20 text-violet-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Subject Teacher</span>
                <span className="text-xs sm:text-sm font-semibold text-white block">{presentationMetadata.subjectTeacher}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Bookmark className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Institution</span>
                <span className="text-xs sm:text-sm font-semibold text-white block truncate">BVM Engineering College</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Academic Year</span>
                <span className="text-xs sm:text-sm font-semibold text-white block">{presentationMetadata.year}</span>
              </div>
            </div>
          </div>

          {/* Action Button & Navigation Guidance */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={handleStart}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:brightness-110 text-white font-heading font-semibold text-base shadow-md shadow-indigo-600/20 flex items-center space-x-3 transition duration-150 cursor-pointer"
            >
              <span>Start Presentation</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
              <span className="px-2 py-1 rounded bg-black/40 border border-white/15 text-cyan-300 font-bold">
                →
              </span>
              <span>or</span>
              <span className="px-2 py-1 rounded bg-black/40 border border-white/15 text-cyan-300 font-bold">
                SPACE
              </span>
              <span className="hidden sm:inline">to advance slides</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Generative AI Engine Visualisation Panel */}
        <motion.div
          initial={animationsEnabled ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="w-full max-w-[500px] p-6 rounded-3xl glass-panel-glow border border-indigo-500/30 bg-[#0B1023]/85 relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-44 h-44 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Panel Heading */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-[11px] font-mono tracking-wider text-cyan-400 font-semibold uppercase flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>GENERATIVE AI ENGINE</span>
              </span>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded border border-indigo-500/30">
                Multimodal Generation
              </span>
            </div>

            {/* 5 Connected Stages: PROMPT -> MODEL -> GENERATION -> OUTPUT -> REFINEMENT */}
            <div className="relative py-2 mb-4">
              <div className="flex items-center justify-between relative z-10">
                {[
                  { name: 'PROMPT', icon: <FileText className="w-3.5 h-3.5" /> },
                  { name: 'MODEL', icon: <Cpu className="w-3.5 h-3.5" /> },
                  { name: 'GENERATION', icon: <Layers className="w-3.5 h-3.5" /> },
                  { name: 'OUTPUT', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
                  { name: 'REFINEMENT', icon: <RotateCw className="w-3.5 h-3.5" /> },
                ].map((st, i) => {
                  const isActive = pulseStage === i;
                  return (
                    <div key={st.name} className="flex flex-col items-center">
                      <div 
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors duration-200 ${
                          isActive
                            ? 'bg-gradient-to-br from-cyan-400 to-indigo-600 border-cyan-300 text-white shadow-md shadow-cyan-500/25'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        {st.icon}
                      </div>
                      <span className={`text-[9px] font-mono font-bold mt-1.5 transition-colors ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>
                        {st.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Connecting animated track line */}
              <div className="absolute top-[18px] left-4 right-4 h-0.5 bg-white/10 -z-0">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500"
                  animate={{ width: `${((pulseStage) / 4) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Five Multimodal Output Representation Symbols */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Supported Output Modalities:
              </span>

              <div className="grid grid-cols-1 gap-1.5">
                {outputTypes.map((out, idx) => {
                  const isSelected = activeOutput === idx;
                  return (
                    <div
                      key={out.name}
                      onClick={() => {
                        playTick(soundEnabled);
                        setActiveOutput(idx);
                      }}
                      className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-cyan-400/50 bg-gradient-to-r from-indigo-950/60 to-cyan-950/40 text-white shadow-sm'
                          : 'border-white/5 bg-white/5 hover:border-white/15 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                          {out.icon}
                        </div>
                        <span className="text-xs font-heading font-semibold text-white">
                          {out.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                        {out.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="text-cyan-400">Generative Synthesis</span>
              <span>Text • Vision • Audio • Video • Code</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
