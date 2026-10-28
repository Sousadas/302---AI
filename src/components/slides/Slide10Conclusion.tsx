import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  RotateCcw, 
  LayoutGrid, 
  CheckCircle2, 
  X,
  Maximize,
  Minimize
} from 'lucide-react';
import { presentationMetadata } from '../../data/presentationData';
import { playSuccess, playTick } from '../../utils/audio';

interface Slide10ConclusionProps {
  onRestart: () => void;
  onReturnToOverview: () => void;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

const takeaways = [
  {
    number: '01',
    title: 'Content Creation from Patterns',
    text: 'Generative AI creates new content from learned patterns and user inputs, transforming how we write, design, code, and brainstorm.'
  },
  {
    number: '02',
    title: 'Broad Practical Applications',
    text: 'It has applications across education, business, healthcare, software development, and creative industries, democratizing specialized workflows.'
  },
  {
    number: '03',
    title: 'Critical & Responsible Use',
    text: 'Its effective use requires critical evaluation, responsible practices, and human judgement to ensure truthfulness, privacy, and fairness.'
  }
];

export const Slide10Conclusion: React.FC<Slide10ConclusionProps> = ({
  onRestart,
  onReturnToOverview,
  animationsEnabled,
  soundEnabled,
}) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState<boolean>(false);
  const [showControlsHeader, setShowControlsHeader] = useState<boolean>(true);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const hideControlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Prime the media element for unmuted audio playback on user interaction
  useEffect(() => {
    const unlockMediaAudio = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
      }
    };

    window.addEventListener('click', unlockMediaAudio, { passive: true });
    window.addEventListener('keydown', unlockMediaAudio, { passive: true });
    window.addEventListener('pointerdown', unlockMediaAudio, { passive: true });

    return () => {
      window.removeEventListener('click', unlockMediaAudio);
      window.removeEventListener('keydown', unlockMediaAudio);
      window.removeEventListener('pointerdown', unlockMediaAudio);
    };
  }, []);

  // Automatically trigger fullscreen video with sound 35 seconds after reaching the final slide
  useEffect(() => {
    if (hasTriggered) return;

    const timer = setTimeout(() => {
      setShowVideo(true);
      setHasTriggered(true);

      // Play unmuted audio automatically
      if (videoRef.current) {
        const video = videoRef.current;
        video.muted = false;
        video.volume = 1.0;
        video.currentTime = 0;
        
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If strictly blocked, start playback and unmute immediately on first gesture
            video.muted = false;
            video.volume = 1.0;
            video.play().catch(() => {});
          });
        }
      }
    }, 35000);

    return () => clearTimeout(timer);
  }, [hasTriggered]);

  // When showVideo turns true, ensure audio is unmuted and playing
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current;
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(() => {});
    }
  }, [showVideo]);

  // Handle Escape key to close video modal cleanly
  useEffect(() => {
    if (!showVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleCloseVideo();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [showVideo]);

  // Auto-hide floating controls overlay during video playback
  const handleMouseMove = () => {
    setShowControlsHeader(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    hideControlsTimerRef.current = setTimeout(() => {
      setShowControlsHeader(false);
    }, 3000);
  };

  const handleToggleNativeFullscreen = () => {
    try {
      if (!document.fullscreenElement && videoContainerRef.current) {
        videoContainerRef.current.requestFullscreen().then(() => {
          setIsFullscreenMode(true);
        }).catch(() => {});
      } else if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreenMode(false);
        }).catch(() => {});
      }
    } catch {}
  };

  const handleCloseVideo = () => {
    playTick(soundEnabled);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (document.fullscreenElement && document.exitFullscreen) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch {}
    }
    setIsFullscreenMode(false);
    setShowVideo(false);
  };

  const handleRestart = () => {
    handleCloseVideo();
    playSuccess(soundEnabled);
    onRestart();
  };

  const handleReturnToOverview = () => {
    handleCloseVideo();
    playTick(soundEnabled);
    onReturnToOverview();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-8 relative">
      {/* Slide Header */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-1">
          <Award className="w-3.5 h-3.5" />
          <span>06 / CONCLUSION & PERSPECTIVES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Imagine More. <span className="text-gradient-cyan">Create Responsibly.</span>
        </h2>
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
          &ldquo;Generative AI marks an unprecedented evolution in how humans synthesize ideas. When coupled with rigorous human critical judgment, it empowers transformative breakthroughs across society.&rdquo;
        </p>
      </motion.div>

      {/* Three Final Takeaways Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {takeaways.map((item, idx) => (
          <motion.div
            key={item.number}
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-5 rounded-2xl glass-panel-glow border border-indigo-500/25 bg-[#0D1426]/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-2xl font-bold text-cyan-400">
                  {item.number}
                </span>
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.text}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-white/5 text-[10px] font-mono text-indigo-400">
              Core Pillar {item.number}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Thank You & Q&A Banner with Action Buttons */}
      <motion.div
        initial={animationsEnabled ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-3xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-indigo-950/60 via-[#0B1020] to-cyan-950/60 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden"
      >
        <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold block mb-1">
          {presentationMetadata.course.toUpperCase()} — {presentationMetadata.year}
        </span>

        <h3 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-1 tracking-tight">
          THANK YOU
        </h3>
        
        <br></br>

        <p className="text-xs text-slate-400 mb-6 font-mono">
          Presenter: <strong className="text-white">{presentationMetadata.presenter}</strong> • {presentationMetadata.college}
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-mono text-xs font-semibold flex items-center space-x-2 transition duration-150 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Presentation</span>
          </button>

          <button
            onClick={handleReturnToOverview}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-mono text-xs font-semibold flex items-center space-x-2 transition duration-150 cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
            <span>Return to Overview</span>
          </button>
        </div>
      </motion.div>

      {/* Fullscreen Edge-to-Edge Autoplay Video Overlay (Always mounted to preload & retain audio permission) */}
      <div
        ref={videoContainerRef}
        onMouseMove={handleMouseMove}
        className={`fixed inset-0 w-screen h-screen z-[100] bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-300 ${
          showVideo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Fullscreen Closing Video"
      >
        {/* Top Floating Control Bar (Fades smoothly on inactivity) */}
        <AnimatePresence>
          {showVideo && showControlsHeader && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 right-0 z-20 px-6 py-4 bg-gradient-to-b from-black/85 via-black/45 to-transparent flex items-center justify-between pointer-events-auto"
            >
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-heading font-bold text-white text-base tracking-wide">
                  {presentationMetadata.title}
                </span>
                <span className="text-xs font-mono text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 hidden sm:inline">
                  Fernando Mugiba • 2026
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <button
                  onClick={handleToggleNativeFullscreen}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer border border-white/10"
                  title={isFullscreenMode ? 'Exit browser fullscreen' : 'Enter browser fullscreen'}
                  aria-label="Toggle native fullscreen"
                >
                  {isFullscreenMode ? (
                    <Minimize className="w-4 h-4" />
                  ) : (
                    <Maximize className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={handleCloseVideo}
                  className="px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer shadow-lg"
                  aria-label="Exit video (Esc)"
                  title="Exit video (Esc)"
                >
                  <X className="w-4 h-4" />
                  <span>Fechar (Esc)</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edge-to-Edge Video Element (Preloaded with Sound Enabled) */}
        <video
          ref={videoRef}
          src="/video.mp4"
          preload="auto"
          controls
          playsInline
          className="w-full h-full object-contain bg-black select-none"
          onEnded={() => setShowControlsHeader(true)}
        />
      </div>
    </div>
  );
};
