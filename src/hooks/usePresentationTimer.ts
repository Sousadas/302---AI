import { useState, useEffect } from 'react';

export function usePresentationTimer(currentSlide: number) {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [slideSeconds, setSlideSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Reset slide timer on slide change
  useEffect(() => {
    setSlideSeconds(0);
  }, [currentSlide]);

  // Main tick
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
      setSlideSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const resetTimer = () => {
    setTotalSeconds(0);
    setSlideSeconds(0);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
    totalFormatted: formatTime(totalSeconds),
    slideFormatted: formatTime(slideSeconds),
    totalSeconds,
    slideSeconds,
    isPaused,
    resetTimer,
    togglePause
  };
}
