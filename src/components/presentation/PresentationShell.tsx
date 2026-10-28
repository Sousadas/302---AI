import React, { useState, useEffect, useCallback } from 'react';
import { slidesData } from '../../data/presentationData';
import type { PresentationSettings } from '../../types/presentation';
import { loadSettings, saveSettings, loadLastSlide, saveLastSlide } from '../../utils/storage';
import { playSlideTransition } from '../../utils/audio';
import { useFullscreen } from '../../hooks/useFullscreen';

// Shell & Controller Components
import { BackgroundCanvas } from './BackgroundCanvas';
import { ProgressBar } from './ProgressBar';
import { SlideNavigation } from './SlideNavigation';
import { SlideContainer } from './SlideContainer';
import { PresenterNotesDrawer } from './PresenterNotesDrawer';
import { OverviewModal } from './OverviewModal';
import { SettingsModal } from './SettingsModal';
import { ShortcutsModal } from './ShortcutsModal';

// Slides for Applications of Generative AI
import { Slide01Cover } from '../slides/Slide01Cover';
import { Slide02Overview } from '../slides/Slide02Overview';
import { Slide03WhatIsGenAI } from '../slides/Slide03WhatIsGenAI';
import { Slide04HowGenAIWorks } from '../slides/Slide04HowGenAIWorks';
import { Slide05Applications } from '../slides/Slide05Applications';
import { Slide06CaseStudyUnified } from '../slides/Slide06CaseStudyUnified';
import { Slide10Conclusion } from '../slides/Slide10Conclusion';

export const PresentationShell: React.FC = () => {
  const [settings, setSettings] = useState<PresentationSettings>(loadSettings);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(loadLastSlide);
  const [slideDirection, setSlideDirection] = useState<number>(1);

  // Overlay states
  const [notesOpen, setNotesOpen] = useState<boolean>(false);
  const [overviewOpen, setOverviewOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [shortcutsOpen, setShortcutsOpen] = useState<boolean>(false);

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // Synchronize theme attribute to DOM documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    saveSettings(settings);
  }, [settings]);

  // Persist current slide index
  useEffect(() => {
    saveLastSlide(currentSlideIndex);
  }, [currentSlideIndex]);

  // Navigation handlers
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < slidesData.length - 1) {
      setSlideDirection(1);
      playSlideTransition(settings.soundEnabled);
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentSlideIndex, settings.soundEnabled]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setSlideDirection(-1);
      playSlideTransition(settings.soundEnabled);
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex, settings.soundEnabled]);

  const jumpToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slidesData.length) {
      setSlideDirection(index > currentSlideIndex ? 1 : -1);
      playSlideTransition(settings.soundEnabled);
      setCurrentSlideIndex(index);
    }
  }, [currentSlideIndex, settings.soundEnabled]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in text inputs or textareas
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      // If any modal is open, let Escape close it first
      if (e.key === 'Escape') {
        if (shortcutsOpen) {
          setShortcutsOpen(false);
          return;
        }
        if (settingsOpen) {
          setSettingsOpen(false);
          return;
        }
        if (overviewOpen) {
          setOverviewOpen(false);
          return;
        }
        if (notesOpen) {
          setNotesOpen(false);
          return;
        }
        // If nothing is open, toggle the Overview matrix!
        setOverviewOpen(true);
        return;
      }

      // Prevent default scrolling for Spacebar and Arrows during presentation
      if (['Space', 'ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp'].includes(e.code)) {
        e.preventDefault();
      }

      switch (e.code) {
        case 'ArrowRight':
        case 'PageDown':
        case 'Space':
          goToNextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          goToPrevSlide();
          break;
        case 'Home':
          jumpToSlide(0);
          break;
        case 'End':
          jumpToSlide(slidesData.length - 1);
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        case 'KeyN':
          setNotesOpen((prev) => !prev);
          break;
        case 'KeyS':
          setSettingsOpen((prev) => !prev);
          break;
        case 'Slash':
          if (e.shiftKey) { // '?' key
            setShortcutsOpen((prev) => !prev);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    goToNextSlide,
    goToPrevSlide,
    jumpToSlide,
    toggleFullscreen,
    overviewOpen,
    notesOpen,
    settingsOpen,
    shortcutsOpen,
  ]);

  const currentSlide = slidesData[currentSlideIndex] || slidesData[0];

  const handleUpdateSettings = (newSettings: PresentationSettings) => {
    setSettings(newSettings);
  };

  const handleResetPresentation = () => {
    setCurrentSlideIndex(0);
    setSlideDirection(-1);
  };

  // Render current slide component dynamically
  const renderSlideContent = () => {
    switch (currentSlideIndex) {
      case 0:
        return (
          <Slide01Cover
            onStart={() => jumpToSlide(1)}
            animationsEnabled={settings.animationsEnabled}
            soundEnabled={settings.soundEnabled}
          />
        );
      case 1:
        return (
          <Slide02Overview
            onNavigateToSlide={jumpToSlide}
            animationsEnabled={settings.animationsEnabled}
            soundEnabled={settings.soundEnabled}
          />
        );
      case 2:
        return (
          <Slide03WhatIsGenAI
            animationsEnabled={settings.animationsEnabled}
            soundEnabled={settings.soundEnabled}
          />
        );
      case 3:
        return (
          <Slide04HowGenAIWorks
            animationsEnabled={settings.animationsEnabled}
            soundEnabled={settings.soundEnabled}
          />
        );
      case 4:
        return (
          <Slide05Applications
            animationsEnabled={settings.animationsEnabled}
            soundEnabled={settings.soundEnabled}
          />
        );
      case 5:
        return (
          <Slide06CaseStudyUnified
            animationsEnabled={settings.animationsEnabled}
            soundEnabled={settings.soundEnabled}
          />
        );
      case 6:
        return (
          <Slide10Conclusion
            onRestart={() => jumpToSlide(0)}
            onReturnToOverview={() => jumpToSlide(1)}
            animationsEnabled={settings.animationsEnabled}
            soundEnabled={settings.soundEnabled}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-grid-pattern flex flex-col justify-between">
      {/* Dynamic Ambient Background Canvas */}
      <BackgroundCanvas enabled={settings.animationsEnabled} theme={settings.theme} />

      {/* Top Presentation Progress Bar */}
      <ProgressBar
        currentSlide={currentSlideIndex}
        totalSlides={slidesData.length}
        animationsEnabled={settings.animationsEnabled}
      />

      {/* Main Slide Transition Container */}
      <SlideContainer
        currentSlide={currentSlideIndex}
        direction={slideDirection}
        animationsEnabled={settings.animationsEnabled}
      >
        {renderSlideContent()}
      </SlideContainer>

      {/* Persistent Presentation Navigation Controller */}
      <SlideNavigation
        currentSlide={currentSlideIndex}
        totalSlides={slidesData.length}
        onPrev={goToPrevSlide}
        onNext={goToNextSlide}
        onJumpToSlide={jumpToSlide}
        onToggleNotes={() => setNotesOpen((prev) => !prev)}
        onToggleOverview={() => setOverviewOpen((prev) => !prev)}
        onToggleSettings={() => setSettingsOpen((prev) => !prev)}
        onToggleShortcuts={() => setShortcutsOpen((prev) => !prev)}
        onToggleFullscreen={toggleFullscreen}
        onToggleSound={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
        isFullscreen={isFullscreen}
        notesOpen={notesOpen}
        soundEnabled={settings.soundEnabled}
        slideTitle={currentSlide.title}
        sectionName={currentSlide.section}
      />

      {/* Presenter Notes Drawer Panel */}
      <PresenterNotesDrawer
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
        notes={currentSlide.notes}
        slideNumber={currentSlide.number}
        slideTitle={currentSlide.title}
        animationsEnabled={settings.animationsEnabled}
      />

      {/* Overview Matrix Modal (Esc) */}
      <OverviewModal
        isOpen={overviewOpen}
        onClose={() => setOverviewOpen(false)}
        currentSlide={currentSlideIndex}
        onSelectSlide={jumpToSlide}
        animationsEnabled={settings.animationsEnabled}
        soundEnabled={settings.soundEnabled}
      />

      {/* Display & Preferences Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onResetPresentation={handleResetPresentation}
        animationsEnabled={settings.animationsEnabled}
        soundEnabled={settings.soundEnabled}
      />

      {/* Keyboard Shortcuts Reference Dialog */}
      <ShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
        animationsEnabled={settings.animationsEnabled}
        soundEnabled={settings.soundEnabled}
      />
    </div>
  );
};
