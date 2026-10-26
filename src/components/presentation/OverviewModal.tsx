import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  BookOpen, 
  Settings, 
  Globe, 
  BarChart3, 
  Image, 
  Sliders, 
  ShieldCheck, 
  GraduationCap,
  Layout
} from 'lucide-react';
import { slidesData } from '../../data/presentationData';
import { playTick, playSlideTransition } from '../../utils/audio';

interface OverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  onSelectSlide: (index: number) => void;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

const slideIcons: Record<number, React.ReactNode> = {
  0: <Play className="w-5 h-5 text-cyan-400" />,
  1: <Layout className="w-5 h-5 text-indigo-400" />,
  2: <BookOpen className="w-5 h-5 text-cyan-400" />,
  3: <Settings className="w-5 h-5 text-violet-400" />,
  4: <Globe className="w-5 h-5 text-emerald-400" />,
  5: <BarChart3 className="w-5 h-5 text-amber-400" />,
  6: <Image className="w-5 h-5 text-rose-400" />,
  7: <Sliders className="w-5 h-5 text-cyan-400" />,
  8: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
  9: <GraduationCap className="w-5 h-5 text-cyan-400" />,
};

export const OverviewModal: React.FC<OverviewModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
  onSelectSlide,
  animationsEnabled,
  soundEnabled,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Presentation Overview"
        >
          <motion.div
            initial={animationsEnabled ? { opacity: 0, scale: 0.94 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={animationsEnabled ? { opacity: 0, scale: 0.94 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl glass-panel border border-white/15 bg-[#0A0F1F]/95 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase">
                  PRESENTATION ROADMAP
                </span>
                <h2 className="text-2xl font-heading font-bold text-white mt-1">
                  Slide Navigation Matrix
                </h2>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400 hidden sm:inline font-mono">
                  Press [Esc] to return
                </span>
                <button
                  onClick={() => {
                    playTick(soundEnabled);
                    onClose();
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition cursor-pointer"
                  aria-label="Close overview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Grid of 10 Slides */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {slidesData.map((slide, index) => {
                const isCurrent = index === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      playSlideTransition(soundEnabled);
                      onSelectSlide(index);
                      onClose();
                    }}
                    className={`group text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                      isCurrent
                        ? 'border-cyan-400/60 bg-gradient-to-br from-indigo-950/60 to-cyan-950/40'
                        : 'border-white/8 bg-white/5 hover:border-white/20 hover:bg-white/8'
                    }`}
                  >
                    {/* Active Indicator Pin */}
                    {isCurrent && (
                      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                        <div className="absolute transform rotate-45 bg-cyan-400 text-[#080B16] text-[9px] font-bold font-mono py-0.5 right-[-24px] top-[14px] w-[80px] text-center shadow-sm">
                          LIVE
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-slate-300">
                          {slide.number.toString().padStart(2, '0')}
                        </span>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/15">
                          {slideIcons[index] || <Play className="w-4 h-4 text-cyan-400" />}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block mb-1">
                        {slide.section}
                      </span>
                      <h3 className="font-heading font-semibold text-sm text-white line-clamp-2 leading-snug">
                        {slide.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{slide.notes.speakingTimeMin}</span>
                      <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition font-mono text-[10px]">
                        JUMP →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
