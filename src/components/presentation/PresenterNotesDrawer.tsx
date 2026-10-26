import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, HelpCircle, Lightbulb, Play, Pause, RotateCcw } from 'lucide-react';
import type { PresenterNotes } from '../../types/presentation';
import { usePresentationTimer } from '../../hooks/usePresentationTimer';

interface PresenterNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: PresenterNotes;
  slideNumber: number;
  slideTitle: string;
  animationsEnabled: boolean;
}

export const PresenterNotesDrawer: React.FC<PresenterNotesDrawerProps> = ({
  isOpen,
  onClose,
  notes,
  slideNumber,
  slideTitle,
  animationsEnabled,
}) => {
  const {
    totalFormatted,
    slideFormatted,
    isPaused,
    togglePause,
    resetTimer
  } = usePresentationTimer(slideNumber);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={animationsEnabled ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={animationsEnabled ? { opacity: 0, y: 100 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-14 left-4 right-4 md:left-auto md:right-8 md:w-[460px] max-h-[80vh] z-50 rounded-2xl glass-panel-glow bg-[#0A0E1A]/95 backdrop-blur-xl border border-indigo-500/30 text-slate-200 shadow-2xl flex flex-col overflow-hidden"
          aria-label="Presenter notes panel"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-indigo-950/30">
            <div className="flex items-center space-x-2.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SLIDE {slideNumber.toString().padStart(2, '0')}
              </span>
              <h2 className="font-heading font-semibold text-sm text-white truncate max-w-[220px]">
                {slideTitle}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Close presenter notes"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Live Timer Bar */}
          <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-cyan-400">
                <Clock className="w-3.5 h-3.5" />
                <span>SLIDE: <strong className="text-white">{slideFormatted}</strong></span>
              </div>
              <div className="text-slate-400">
                TOTAL: <strong className="text-slate-200">{totalFormatted}</strong>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] text-slate-400 hidden sm:inline">REC: {notes.speakingTimeMin}</span>
              <button
                onClick={togglePause}
                className="p-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white cursor-pointer"
                title={isPaused ? 'Resume timer' : 'Pause timer'}
              >
                {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white cursor-pointer"
                title="Reset timer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Notes Content */}
          <div className="p-4 overflow-y-auto space-y-4 max-h-[calc(70vh-100px)] text-xs leading-relaxed select-text">
            {/* Key Talking Points */}
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2 flex items-center space-x-1.5">
                <span>Key Speaker Prompts</span>
              </h3>
              <ul className="space-y-2">
                {notes.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pedagogical Tip */}
            {notes.pedagogicalTip && (
              <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 text-violet-200">
                <div className="flex items-center space-x-1.5 font-semibold text-violet-300 mb-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Classroom Delivery Tip</span>
                </div>
                <p className="text-[11px] text-violet-200/90 leading-normal">
                  {notes.pedagogicalTip}
                </p>
              </div>
            )}

            {/* Anticipated Q&A */}
            {notes.potentialQuestions.length > 0 && (
              <div>
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-2 flex items-center space-x-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Anticipated Questions & Model Answers</span>
                </h3>
                <div className="space-y-2.5">
                  {notes.potentialQuestions.map((q, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <p className="font-semibold text-white mb-1">Q: {q.question}</p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        <strong className="text-cyan-400">A: </strong>{q.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
