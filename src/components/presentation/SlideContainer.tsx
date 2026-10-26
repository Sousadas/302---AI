import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface SlideContainerProps {
  currentSlide: number;
  direction: number; // 1 for forward, -1 for backward
  animationsEnabled: boolean;
  children: React.ReactNode;
}

export const SlideContainer: React.FC<SlideContainerProps> = ({
  currentSlide,
  direction,
  animationsEnabled,
  children,
}) => {
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: 'easeInOut',
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.99,
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
    }),
  };

  const simpleFadeVariants: Variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.05 } },
  };

  return (
    <main 
      className="relative w-full h-[calc(100vh-60px)] mt-1 overflow-y-auto overflow-x-hidden flex flex-col justify-center select-none"
      role="region"
      aria-label={`Slide ${currentSlide + 1}`}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={animationsEnabled ? slideVariants : simpleFadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full min-h-full flex flex-col justify-center"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};
