import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Clock,
  Zap
} from 'lucide-react';

interface Slide07CaseStudyIntroProps {
  onExploreCaseStudy: () => void;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

export const Slide07CaseStudyIntro: React.FC<Slide07CaseStudyIntroProps> = ({
  animationsEnabled,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8 relative">
      {/* Header */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono tracking-widest uppercase mb-1">
          <span>06 / CASE STUDY</span>
          <span>•</span>
          <span>AI IMAGE GENERATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          Case Study: AI Image Generation
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl">
          Exploring how generative AI models can transform a written description into a visual concept — accelerating the creative process.
        </p>
      </motion.div>

      {/* Problem, Solution, Objective Triad Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-2xl glass-panel border border-rose-500/25 bg-[#170F14]/70"
        >
          <div className="flex items-center space-x-2 text-rose-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-3">
            <Clock className="w-4 h-4" />
            <span>THE CREATIVE BOTTLENECK</span>
          </div>
          <h3 className="text-base font-heading font-bold text-white mb-2">The Problem</h3>
          <p className="text-sm text-slate-200 leading-relaxed">
            Creating initial visual concept art from scratch requires substantial time, specialized 3D modeling skills, and lengthy manual sketch iterations.
          </p>
        </motion.div>

        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 rounded-2xl glass-panel border border-cyan-500/25 bg-[#0C1524]/70"
        >
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-3">
            <Zap className="w-4 h-4" />
            <span>THE GENERATIVE SOLUTION</span>
          </div>
          <h3 className="text-base font-heading font-bold text-white mb-2">The Solution</h3>
          <p className="text-sm text-slate-200 leading-relaxed">
            A text-to-image generative AI system translates descriptive natural-language prompts into high-fidelity visual concepts in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-2xl glass-panel border border-indigo-500/25 bg-[#10142B]/70"
        >
          <div className="flex items-center space-x-2 text-indigo-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-3">
            <Palette className="w-4 h-4" />
            <span>ACADEMIC OBJECTIVE</span>
          </div>
          <h3 className="text-base font-heading font-bold text-white mb-2">Our Goal</h3>
          <p className="text-sm text-slate-200 leading-relaxed">
            Demonstrate how generative AI serves as an ideation accelerator, enabling human creators to rapidly explore diverse aesthetics and cultural motifs.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
