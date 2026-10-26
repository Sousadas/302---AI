import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';
import { playTick } from '../../utils/audio';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

const shortcuts = [
  { key: '→ or Space', action: 'Advance to next slide' },
  { key: '←', action: 'Return to previous slide' },
  { key: 'Esc', action: 'Toggle Presentation Agenda / Overview' },
  { key: 'N', action: 'Toggle Presenter Speaker Notes' },
  { key: 'F', action: 'Toggle Fullscreen Mode' },
  { key: 'S', action: 'Open Display & Theme Settings' },
  { key: 'Home', action: 'Jump to Cover Slide (Slide 01)' },
  { key: 'End', action: 'Jump to Conclusion (Slide 10)' },
  { key: '?', action: 'Show this keyboard reference' },
];

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
  animationsEnabled,
  soundEnabled,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard Shortcuts"
        >
          <motion.div
            initial={animationsEnabled ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={animationsEnabled ? { opacity: 0, scale: 0.95 } : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-md rounded-2xl glass-panel-glow border border-cyan-500/30 bg-[#0C1021]/95 text-slate-200 shadow-2xl overflow-hidden p-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Keyboard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">Keyboard Navigation</h2>
                  <p className="text-[11px] text-slate-400">Standard PowerPoint & Keynote projector shortcuts</p>
                </div>
              </div>
              <button
                onClick={() => {
                  playTick(soundEnabled);
                  onClose();
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="Close shortcuts"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-2">
              {shortcuts.map((sc, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                  <span className="text-slate-300">{sc.action}</span>
                  <kbd className="px-2 py-1 rounded bg-black/50 border border-white/20 font-mono text-cyan-300 font-semibold shadow-inner">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-slate-500">
                Safe mode: Typing inside inputs or modals will not accidentally advance slides.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
