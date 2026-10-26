import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Briefcase, 
  Code, 
  GraduationCap, 
  Film, 
  Palette, 
  ArrowRight, 
  X, 
  Cpu, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { industryApplications } from '../../data/presentationData';
import type { ApplicationItem } from '../../types/presentation';
import { playTick, playChime } from '../../utils/audio';

interface Slide05ApplicationsProps {
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6 text-indigo-400" />,
  Activity: <Activity className="w-6 h-6 text-rose-400" />,
  Briefcase: <Briefcase className="w-6 h-6 text-amber-400" />,
  Code: <Code className="w-6 h-6 text-cyan-400" />,
  Film: <Film className="w-6 h-6 text-emerald-400" />,
  Palette: <Palette className="w-6 h-6 text-violet-400" />,
};

export const Slide05Applications: React.FC<Slide05ApplicationsProps> = ({
  animationsEnabled,
  soundEnabled,
}) => {
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  const handleOpenModal = (app: ApplicationItem) => {
    playChime(soundEnabled);
    setSelectedApp(app);
  };

  const handleCloseModal = () => {
    playTick(soundEnabled);
    setSelectedApp(null);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8 relative">
      {/* Slide Heading */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-1">
          <span>04 / REAL-WORLD IMPACT</span>
          <span>•</span>
          <span>SECTOR DEPLOYMENT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          Where Is Generative AI Used?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl">
          From drafting code and synthesizing clinical documents to generating creative marketing and narrative concept art.
        </p>
      </motion.div>

      {/* 6 Application Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {industryApplications.map((app, index) => {
          return (
            <motion.div
              key={app.id}
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group p-5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-400/30 bg-[#0E1528]/70 hover:bg-[#121B35]/80 transition-colors duration-200 flex flex-col justify-between shadow-sm relative"
            >
              <div>
                {/* Top Row: Category & Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-wider text-indigo-400 uppercase font-semibold">
                    {app.category}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                    {iconMap[app.iconName] || <Palette className="w-6 h-6 text-cyan-400" />}
                  </div>
                </div>

                <h3 className="text-base font-heading font-bold text-white group-hover:text-cyan-200 transition-colors mb-2">
                  {app.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {app.shortExample}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenModal(app)}
                className="w-full py-2 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/12 hover:border-cyan-400/30 text-slate-200 hover:text-white text-xs font-mono font-semibold flex items-center justify-center space-x-2 transition-colors duration-150 cursor-pointer shadow-sm"
              >
                <span>Explore Application</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* In-Depth Application Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedApp.title} details`}
          >
            <motion.div
              initial={animationsEnabled ? { opacity: 0, scale: 0.94 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={animationsEnabled ? { opacity: 0, scale: 0.94 } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl rounded-3xl glass-panel-glow border border-cyan-500/30 bg-[#0B1020]/95 text-slate-200 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {iconMap[selectedApp.iconName] || <Palette className="w-6 h-6 text-cyan-400" />}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold block">
                      {selectedApp.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                      {selectedApp.title}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-5 space-y-4 text-xs sm:text-sm">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold mb-1">
                    Application Description & Scope
                  </h3>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedApp.inDepth.overview}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/25 flex items-center space-x-2.5 font-mono text-xs">
                  <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>
                    <strong className="text-indigo-300">Target Architecture: </strong> 
                    <span className="text-slate-200">{selectedApp.inDepth.architectureUsed}</span>
                  </span>
                </div>

                {/* Practical Real-World Scenarios */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2">
                    Practical Deployment Scenarios:
                  </h3>
                  <div className="space-y-2">
                    {selectedApp.inDepth.realWorldUseCases.map((uc, i) => (
                      <div key={i} className="flex items-start space-x-2 text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Benefit */}
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/25 text-emerald-200">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                    Potential Benefit:
                  </span>
                  <p className="text-xs text-slate-200">
                    {selectedApp.inDepth.benefit}
                  </p>
                </div>

                {/* Relevant Limitation */}
                <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/25 text-amber-200 flex items-start space-x-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-amber-300 block mb-0.5">
                      Relevant Limitation & Governance:
                    </span>
                    <p className="text-xs text-slate-300">
                      {selectedApp.inDepth.ethicalConsideration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Footer */}
              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold cursor-pointer transition"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
