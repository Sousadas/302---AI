import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  FileText, 
  LayoutGrid, 
  Settings, 
  Volume2, 
  VolumeX,
  Keyboard
} from 'lucide-react';
import { playTick } from '../../utils/audio';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onJumpToSlide: (index: number) => void;
  onToggleNotes: () => void;
  onToggleOverview: () => void;
  onToggleSettings: () => void;
  onToggleShortcuts: () => void;
  onToggleFullscreen: () => void;
  onToggleSound: () => void;
  isFullscreen: boolean;
  notesOpen: boolean;
  soundEnabled: boolean;
  slideTitle?: string;
  sectionName?: string;
}

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onJumpToSlide,
  onToggleNotes,
  onToggleOverview,
  onToggleSettings,
  onToggleShortcuts,
  onToggleFullscreen,
  onToggleSound,
  isFullscreen,
  notesOpen,
  soundEnabled,
  slideTitle,
  sectionName,
}) => {
  const currentFormatted = (currentSlide + 1).toString().padStart(2, '0');
  const totalFormatted = totalSlides.toString().padStart(2, '0');

  const handlePrev = () => {
    playTick(soundEnabled);
    onPrev();
  };

  const handleNext = () => {
    playTick(soundEnabled);
    onNext();
  };

  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 z-40 px-4 md:px-8 py-3.5 bg-[#080B16]/85 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-xs transition-all duration-300"
      aria-label="Presentation controller"
    >
      {/* Left: Slide context & Section */}
      <div className="flex items-center space-x-3 text-slate-400 min-w-0 pr-4">
        <button
          onClick={() => {
            playTick(soundEnabled);
            onToggleOverview();
          }}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md hover:bg-white/10 hover:text-white transition text-left cursor-pointer border border-transparent hover:border-white/10"
          title="Open Overview (Esc)"
          aria-label="Open presentation overview"
        >
          <LayoutGrid className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-cyan-400 font-semibold tracking-wider hidden sm:inline">AGENDA</span>
        </button>

        <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

        <div className="hidden md:flex flex-col truncate">
          <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400">{sectionName}</span>
          <span className="text-slate-200 font-medium truncate text-xs">{slideTitle}</span>
        </div>
      </div>

      {/* Center: Slide indicator & Prev/Next buttons */}
      <div className="flex items-center space-x-2 sm:space-x-4">
          <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`p-2 rounded-lg transition-colors duration-150 flex items-center justify-center cursor-pointer border ${
            currentSlide === 0
              ? 'opacity-30 cursor-not-allowed border-transparent text-slate-600'
              : 'border-white/10 bg-white/5 hover:bg-white/12 text-white shadow-sm'
          }`}
          aria-label="Previous slide (Left Arrow)"
          title="Previous slide (← or Page Up)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Counter and Clickable mini-dots */}
        <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10">
          <span className="font-mono text-sm tracking-widest font-semibold text-white">
            <span className="text-cyan-400">{currentFormatted}</span>
            <span className="text-slate-500 mx-1.5">/</span>
            <span className="text-slate-400">{totalFormatted}</span>
          </span>

          {/* Discreet Slide dots indicator */}
          <div className="hidden lg:flex items-center space-x-1.5 ml-2" aria-hidden="true">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playTick(soundEnabled);
                  onJumpToSlide(idx);
                }}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === currentSlide
                    ? 'w-6 bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-sm'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Jump to Slide ${idx + 1}`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
          className={`p-2 rounded-lg transition-colors duration-150 flex items-center justify-center cursor-pointer border ${
            currentSlide === totalSlides - 1
              ? 'opacity-30 cursor-not-allowed border-transparent text-slate-600'
              : 'border-cyan-500/30 bg-indigo-600/30 hover:bg-indigo-600/50 text-white shadow-sm'
          }`}
          aria-label="Next slide (Right Arrow or Space)"
          title="Next slide (→ or Space)"
        >
          <ChevronRight className="w-5 h-5 text-cyan-300" />
        </button>
      </div>

      {/* Right: Speaker notes, Settings, Fullscreen */}
      <div className="flex items-center space-x-1.5 sm:space-x-2">
        {/* Presenter Notes toggle */}
        <button
          onClick={() => {
            playTick(soundEnabled);
            onToggleNotes();
          }}
          className={`px-2.5 py-1.5 rounded-md flex items-center space-x-1.5 transition text-xs border cursor-pointer ${
            notesOpen 
              ? 'bg-indigo-600/40 text-cyan-300 border-cyan-500/40' 
              : 'border-white/10 hover:bg-white/10 text-slate-300'
          }`}
          title="Toggle Presenter Notes (N)"
          aria-label="Toggle Presenter Notes"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline font-mono">NOTES</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer border border-transparent hover:border-white/10"
          title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
          aria-label="Toggle audio effects"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-indigo-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {/* Keyboard Shortcuts Dialog */}
        <button
          onClick={() => {
            playTick(soundEnabled);
            onToggleShortcuts();
          }}
          className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer border border-transparent hover:border-white/10"
          title="Keyboard Shortcuts (?)"
          aria-label="Keyboard Shortcuts"
        >
          <Keyboard className="w-4 h-4 text-slate-400" />
        </button>

        {/* Presentation Settings */}
        <button
          onClick={() => {
            playTick(soundEnabled);
            onToggleSettings();
          }}
          className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer border border-transparent hover:border-white/10"
          title="Presentation Settings"
          aria-label="Open presentation settings"
        >
          <Settings className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => {
            playTick(soundEnabled);
            onToggleFullscreen();
          }}
          className="p-1.5 rounded-md bg-white/5 hover:bg-white/15 text-cyan-400 border border-white/10 transition cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </footer>
  );
};
