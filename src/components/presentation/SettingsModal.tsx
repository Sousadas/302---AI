import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Monitor, Zap, Volume2, RotateCcw } from 'lucide-react';
import type { PresentationSettings, ThemeMode } from '../../types/presentation';
import { playTick, playChime } from '../../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PresentationSettings;
  onUpdateSettings: (newSettings: PresentationSettings) => void;
  onResetPresentation: () => void;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetPresentation,
  animationsEnabled,
  soundEnabled,
}) => {
  const setTheme = (theme: ThemeMode) => {
    playTick(soundEnabled);
    onUpdateSettings({ ...settings, theme });
  };

  const toggleAnimations = () => {
    playTick(soundEnabled);
    onUpdateSettings({ ...settings, animationsEnabled: !settings.animationsEnabled });
  };

  const toggleSound = () => {
    const nextSound = !settings.soundEnabled;
    if (nextSound) playChime(true);
    onUpdateSettings({ ...settings, soundEnabled: nextSound });
  };

  const handleReset = () => {
    playChime(soundEnabled);
    onResetPresentation();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Presentation Settings"
        >
          <motion.div
            initial={animationsEnabled ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={animationsEnabled ? { opacity: 0, scale: 0.95 } : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-md rounded-2xl glass-panel-glow border border-indigo-500/30 bg-[#0C1021]/95 text-slate-200 shadow-2xl overflow-hidden p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  DISPLAY & PREFERENCES
                </span>
                <h2 className="text-xl font-heading font-bold text-white">Presentation Settings</h2>
              </div>
              <button
                onClick={() => {
                  playTick(soundEnabled);
                  onClose();
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Settings Options */}
            <div className="py-5 space-y-5 text-sm">
              {/* Theme Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                  Visual Theme & Contrast
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center space-y-1.5 transition cursor-pointer ${
                      settings.theme === 'dark'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-medium">Dark Navy</span>
                  </button>

                  <button
                    onClick={() => setTheme('contrast')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center space-y-1.5 transition cursor-pointer ${
                      settings.theme === 'contrast'
                        ? 'border-indigo-400 bg-indigo-950/40 text-indigo-200'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <Monitor className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-medium">High Contrast</span>
                  </button>

                  <button
                    onClick={() => setTheme('light')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center space-y-1.5 transition cursor-pointer ${
                      settings.theme === 'light'
                        ? 'border-amber-400 bg-amber-950/30 text-amber-200'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-medium">Classroom Light</span>
                  </button>
                </div>
              </div>

              {/* Animations Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-white block text-xs">Slide & Motion Animations</span>
                    <span className="text-[11px] text-slate-400">Can be disabled for low-latency projector display</span>
                  </div>
                </div>
                <button
                  onClick={toggleAnimations}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    settings.animationsEnabled ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={settings.animationsEnabled}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    } top-1 absolute`}
                  />
                </button>
              </div>

              {/* Sound Effects Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-white block text-xs">Tactile Audio Feedback</span>
                    <span className="text-[11px] text-slate-400">Subtle native Web Audio clicks & chimes</span>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    settings.soundEnabled ? 'bg-cyan-600' : 'bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={settings.soundEnabled}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    } top-1 absolute`}
                  />
                </button>
              </div>

              {/* Reset Presentation Button */}
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 px-4 rounded-xl border border-rose-500/30 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 flex items-center justify-center space-x-2 transition cursor-pointer text-xs font-semibold"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Presentation from Beginning</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
