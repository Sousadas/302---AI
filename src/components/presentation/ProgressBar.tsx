import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentSlide: number;
  totalSlides: number;
  animationsEnabled: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentSlide,
  totalSlides,
  animationsEnabled,
}) => {
  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5 backdrop-blur-sm overflow-hidden"
      role="progressbar"
      aria-valuenow={currentSlide + 1}
      aria-valuemin={1}
      aria-valuemax={totalSlides}
      aria-label="Presentation progress"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 relative"
        initial={false}
        animate={{ width: `${progressPercent}%` }}
        transition={animationsEnabled ? { type: 'spring', stiffness: 120, damping: 20 } : { duration: 0 }}
      >
        {/* Glowing leading dot */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/70 blur-[2px]" />
      </motion.div>
    </div>
  );
};
