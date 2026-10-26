import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Lightbulb, 
  Cpu, 
  TrendingUp, 
  GraduationCap, 
  EyeOff, 
  Scale, 
  ShieldAlert, 
  Lock, 
  Quote 
} from 'lucide-react';
import { advantagesAndLimitations } from '../../data/presentationData';
import type { AdvantageOrLimitation } from '../../types/presentation';
import { playTick } from '../../utils/audio';

interface Slide06AdvantagesLimitationsProps {
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-4 h-4 text-emerald-400" />,
  Lightbulb: <Lightbulb className="w-4 h-4 text-emerald-400" />,
  Cpu: <Cpu className="w-4 h-4 text-emerald-400" />,
  TrendingUp: <TrendingUp className="w-4 h-4 text-emerald-400" />,
  GraduationCap: <GraduationCap className="w-4 h-4 text-emerald-400" />,
  AlertTriangle: <AlertTriangle className="w-4 h-4 text-amber-400" />,
  EyeOff: <EyeOff className="w-4 h-4 text-amber-400" />,
  Scale: <Scale className="w-4 h-4 text-amber-400" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4 text-amber-400" />,
  Lock: <Lock className="w-4 h-4 text-amber-400" />,
};

export const Slide06AdvantagesLimitations: React.FC<Slide06AdvantagesLimitationsProps> = ({
  animationsEnabled,
  soundEnabled,
}) => {
  const advantages = advantagesAndLimitations.filter((item) => item.category === 'advantage');
  const limitations = advantagesAndLimitations.filter((item) => item.category === 'limitation');

  const [activeItem, setActiveItem] = useState<AdvantageOrLimitation>(advantages[0]);

  const handleSelectItem = (item: AdvantageOrLimitation) => {
    playTick(soundEnabled);
    setActiveItem(item);
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
          <span>05 / CRITICAL ASSESSMENT</span>
          <span>•</span>
          <span>OBJECTIVE EVALUATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          Creative Power, Real Responsibilities
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-3xl">
          Balancing unprecedented creative acceleration against hallucinations, copyright ambiguity, and demographic bias.
        </p>
      </motion.div>

      {/* Two Balanced Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Advantages / Benefits (5 items) */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel border border-emerald-500/25 bg-[#0A141A]/70 flex flex-col space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-1">
            <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>BENEFITS (ADVANTAGES)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">5 Capabilities</span>
          </div>

          {advantages.map((item, idx) => {
            const isSelected = activeItem.id === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                initial={animationsEnabled ? { opacity: 0, x: -15 } : { opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center space-x-3 ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-950/40 text-white shadow-md'
                    : 'border-white/5 bg-white/5 hover:border-emerald-500/30 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                  {iconMap[item.icon] || <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-heading font-semibold block truncate">
                    {item.title}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Center / Inspection Detail Card */}
        <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl glass-panel-glow border border-indigo-500/30 bg-[#0E1529]/90 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={animationsEnabled ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={animationsEnabled ? { opacity: 0, scale: 0.96 } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                  <span 
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      activeItem.category === 'advantage' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {activeItem.category === 'advantage' ? 'Benefit Deep Dive' : 'Challenge Deep Dive'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Interactive Case</span>
                </div>

                <h3 className="text-base sm:text-lg font-heading font-bold text-white mb-2">
                  {activeItem.title}
                </h3>

                <p className="text-xs text-slate-200 leading-relaxed mb-4">
                  {activeItem.description}
                </p>

                {/* Practical Example Box */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <span className="text-cyan-400 font-mono font-bold block mb-1 uppercase text-[10px] tracking-wider">
                    Practical Real-World Example:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {activeItem.practicalExample}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Select any card on left or right to inspect</span>
                <span className="text-cyan-400">LIVE COMPARISON</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Challenges / Limitations (5 items) */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel border border-amber-500/25 bg-[#17120B]/70 flex flex-col space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-1">
            <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>CHALLENGES (RESPONSIBILITIES)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">5 Constraints</span>
          </div>

          {limitations.map((item, idx) => {
            const isSelected = activeItem.id === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                initial={animationsEnabled ? { opacity: 0, x: 15 } : { opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center space-x-3 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-950/40 text-white shadow-md'
                    : 'border-white/5 bg-white/5 hover:border-amber-500/30 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-amber-500/20' : 'bg-white/5'}`}>
                  {iconMap[item.icon] || <AlertTriangle className="w-4 h-4 text-amber-400" />}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-heading font-semibold block truncate">
                    {item.title}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Concluding Academic Quote */}
      <motion.div 
        initial={animationsEnabled ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-950/50 via-[#10172B] to-cyan-950/40 border border-indigo-500/30 flex items-center space-x-3 text-xs sm:text-sm text-slate-200"
      >
        <Quote className="w-5 h-5 text-cyan-400 shrink-0" />
        <p className="italic font-medium leading-relaxed">
          &ldquo;Generative AI is most useful when its outputs are evaluated critically and used responsibly.&rdquo;
        </p>
      </motion.div>
    </div>
  );
};
