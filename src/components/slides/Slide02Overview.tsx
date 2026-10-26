import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Settings, 
  Globe, 
  BarChart3, 
  Image, 
  GraduationCap, 
  ArrowUpRight 
} from 'lucide-react';
import { overviewSections } from '../../data/presentationData';
import { playSlideTransition } from '../../utils/audio';

interface Slide02OverviewProps {
  onNavigateToSlide: (index: number) => void;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

const sectionIcons: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Image: <Image className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
};

const sectionColors = [
  { icon: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', hoverBorder: 'hover:border-cyan-500/30' },
  { icon: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', hoverBorder: 'hover:border-indigo-500/30' },
  { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', hoverBorder: 'hover:border-emerald-500/30' },
  { icon: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', hoverBorder: 'hover:border-amber-500/30' },
  { icon: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', hoverBorder: 'hover:border-violet-500/30' },
  { icon: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', hoverBorder: 'hover:border-rose-500/30' },
];

export const Slide02Overview: React.FC<Slide02OverviewProps> = ({
  onNavigateToSlide,
  animationsEnabled,
  soundEnabled,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Slide Heading */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-1">
          <span>01 / AGENDA</span>
          <span>•</span>
          <span>PRESENTATION STRUCTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          Presentation Overview
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl">
          Six foundational chapters linking generative theory to real-world deployment across education, software, design, and interactive media.
        </p>
      </motion.div>

      {/* 6 Interactive Section Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {overviewSections.map((sec, index) => {
          const colors = sectionColors[index] || sectionColors[0];
          return (
            <motion.button
              key={sec.number}
              onClick={() => {
                playSlideTransition(soundEnabled);
                onNavigateToSlide(sec.targetSlideIndex);
              }}
              initial={animationsEnabled ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className={`group text-left p-5 rounded-2xl border border-white/8 ${colors.hoverBorder} bg-[#0F1629]/70 hover:bg-[#131D38]/60 transition-all duration-200 flex flex-col justify-between cursor-pointer`}
            >
              <div>
                {/* Top Row: Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-slate-600 group-hover:text-slate-400 transition-colors duration-200">
                    {sec.number}
                  </span>

                  <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.border} border ${colors.icon}`}>
                    {sectionIcons[sec.icon] || <BookOpen className="w-5 h-5" />}
                  </div>
                </div>

                {/* Section Badge */}
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-white/5 text-slate-400 border border-white/8 mb-2">
                  {sec.badge}
                </span>

                {/* Title */}
                <h3 className="text-base font-heading font-bold text-white mb-2">
                  {sec.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {sec.description}
                </p>
              </div>

              {/* Bottom Jump CTA */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors duration-200">
                <span>Slide {sec.targetSlideIndex + 1}</span>
                <span className="flex items-center space-x-1">
                  <span>Enter Section</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
