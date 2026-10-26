import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  RotateCcw, 
  LayoutGrid, 
  CheckCircle2, 
  HelpCircle,
  Volume2,
  X,
  Crown
} from 'lucide-react';
import { presentationMetadata } from '../../data/presentationData';
import { playSuccess, playTick, playHalaMadridAnthem, stopCelebrationAudio } from '../../utils/audio';

interface Slide10ConclusionProps {
  onRestart: () => void;
  onReturnToOverview: () => void;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

const takeaways = [
  {
    number: '01',
    title: 'Content Creation from Patterns',
    text: 'Generative AI creates new content from learned patterns and user inputs, transforming how we write, design, code, and brainstorm.'
  },
  {
    number: '02',
    title: 'Broad Practical Applications',
    text: 'It has applications across education, business, healthcare, software development, and creative industries, democratizing specialized workflows.'
  },
  {
    number: '03',
    title: 'Critical & Responsible Use',
    text: 'Its effective use requires critical evaluation, responsible practices, and human judgement to ensure truthfulness, privacy, and fairness.'
  }
];

export const Slide10Conclusion: React.FC<Slide10ConclusionProps> = ({
  onRestart,
  onReturnToOverview,
  animationsEnabled,
  soundEnabled,
}) => {
  const [showHalaMadrid, setShowHalaMadrid] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(5);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);

  // 5-second countdown timer after reaching the final slide
  useEffect(() => {
    if (hasTriggered) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowHalaMadrid(true);
          setHasTriggered(true);
          playHalaMadridAnthem(soundEnabled);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasTriggered, soundEnabled]);

  // Stop celebration audio on unmount
  useEffect(() => {
    return () => {
      stopCelebrationAudio();
    };
  }, []);

  const handleRestart = () => {
    stopCelebrationAudio();
    playSuccess(soundEnabled);
    onRestart();
  };

  const handleReturnToOverview = () => {
    stopCelebrationAudio();
    playTick(soundEnabled);
    onReturnToOverview();
  };

  const handleReplayHalaMadrid = () => {
    playHalaMadridAnthem(soundEnabled);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8 relative">
      {/* Slide Header */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-1">
          <Award className="w-3.5 h-3.5" />
          <span>09 / CONCLUSION & PERSPECTIVES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Imagine More. <span className="text-gradient-cyan">Create Responsibly.</span>
        </h2>
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
          &ldquo;Generative AI marks an unprecedented evolution in how humans synthesize ideas. When coupled with rigorous human critical judgment, it empowers transformative breakthroughs across society.&rdquo;
        </p>
      </motion.div>

      {/* Three Final Takeaways Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {takeaways.map((item, idx) => (
          <motion.div
            key={item.number}
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-5 rounded-2xl glass-panel-glow border border-indigo-500/25 bg-[#0D1426]/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-2xl font-bold text-cyan-400">
                  {item.number}
                </span>
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.text}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-white/5 text-[10px] font-mono text-indigo-400">
              Core Pillar {item.number}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Thank You & Q&A Banner with Action Buttons */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-3xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-indigo-950/60 via-[#0B1020] to-cyan-950/60 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden"
      >
        <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold block mb-1">
          {presentationMetadata.course.toUpperCase()} — {presentationMetadata.year}
        </span>

        <h3 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-1 tracking-tight">
          THANK YOU
        </h3>
        
        <p className="text-base sm:text-lg text-slate-300 font-medium mb-4 flex items-center justify-center space-x-2">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <span>ANY QUESTIONS?</span>
        </p>

        <p className="text-xs text-slate-400 mb-6 font-mono">
          Presenter: <strong className="text-white">{presentationMetadata.presenter}</strong>
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-mono text-xs font-semibold flex items-center space-x-2 transition duration-150 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Presentation</span>
          </button>

          <button
            onClick={handleReturnToOverview}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-mono text-xs font-semibold flex items-center space-x-2 transition duration-150 cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
            <span>Return to Overview</span>
          </button>

          {/* Discreet Hala Madrid trigger button if already dismissed */}
          {hasTriggered && !showHalaMadrid && (
            <button
              onClick={() => {
                setShowHalaMadrid(true);
                handleReplayHalaMadrid();
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span>¡Hala Madrid!</span>
            </button>
          )}
        </div>

        {/* 5-second countdown hint before triggering */}
        {!hasTriggered && secondsRemaining > 0 && (
          <div className="mt-4 flex items-center justify-center space-x-1.5 text-[10px] font-mono text-slate-500">
            <span>Special celebration in:</span>
            <span className="text-amber-400 font-bold">{secondsRemaining}s</span>
          </div>
        )}
      </motion.div>

      {/* ================================================================ */}
      {/* CELEBRATORY "¡HALA MADRID!" MODAL / BANNER (AFTER 5 SECONDS)    */}
      {/* ================================================================ */}
      <AnimatePresence>
        {showHalaMadrid && (
          <motion.div
            initial={animationsEnabled ? { opacity: 0, scale: 0.8, y: 50 } : { opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={animationsEnabled ? { opacity: 0, scale: 0.8, y: 50 } : { opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-label="¡Hala Madrid! Celebration"
          >
            {/* Modal Card */}
            <div className="relative w-full max-w-lg rounded-3xl p-8 bg-gradient-to-b from-[#131B38] via-[#0E152D] to-[#080B16] border-2 border-amber-400/60 shadow-[0_0_80px_-10px_rgba(250,204,21,0.35)] text-center overflow-hidden">
              
              {/* Golden Ambient Glows */}
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => {
                  stopCelebrationAudio();
                  playTick(soundEnabled);
                  setShowHalaMadrid(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
                aria-label="Close celebration"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Royal Crown & Stars */}
              <motion.div 
                animate={animationsEnabled ? { rotate: [0, -6, 6, 0], scale: [1, 1.08, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2.4 }}
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 mb-4"
              >
                <Crown className="w-10 h-10 stroke-[2.2]" />
              </motion.div>

              {/* Stars */}
              <div className="flex items-center justify-center space-x-2 text-amber-300 text-sm font-bold tracking-widest mb-2 font-mono">
                <span>★ ★ ★ ★ ★</span>
              </div>

              {/* Triumphant Headline */}
              <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-white mb-2 drop-shadow-md">
                ¡HALA <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">MADRID!</span>
              </h2>

              <p className="text-lg sm:text-xl font-heading font-bold text-amber-300 tracking-wide mb-3">
                ¡Y NADA MÁS!
              </p>

              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed mb-6 font-medium">
                Celebrando o encerramento da apresentação acadêmica com excelência, vitória e paixão pelo conhecimento!
              </p>

              {/* Sound & Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleReplayHalaMadrid}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-105 text-slate-950 font-heading font-bold text-sm shadow-md shadow-amber-500/20 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Tocar Som Novamente</span>
                </button>

                <button
                  onClick={() => {
                    stopCelebrationAudio();
                    playTick(soundEnabled);
                    setShowHalaMadrid(false);
                  }}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-mono text-xs font-semibold cursor-pointer transition"
                >
                  Continuar
                </button>
              </div>

              {/* Decorative Football / Real Madrid Subtext */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-amber-400 font-semibold">15x Champions League</span>
                <span>Fernando Mugiba • 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
