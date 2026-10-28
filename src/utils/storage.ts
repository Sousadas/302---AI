import type { PresentationSettings } from '../types/presentation';

const SETTINGS_KEY = 'ai_presentation_settings_v1';
const LAST_SLIDE_KEY = 'ai_presentation_last_slide_v1';

export const defaultSettings: PresentationSettings = {
  theme: 'dark',
  animationsEnabled: true,
  soundEnabled: true,
  autoPlaySimulations: false,
};

export function loadSettings(): PresentationSettings {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not load settings from localStorage', e);
  }
  return defaultSettings;
}

export function saveSettings(settings: PresentationSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    document.documentElement.setAttribute('data-theme', settings.theme);
  } catch (e) {
    console.warn('Could not save settings to localStorage', e);
  }
}

export function loadLastSlide(): number {
  try {
    const saved = localStorage.getItem(LAST_SLIDE_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        return Math.min(parsed, 6);
      }
    }
  } catch (e) {
    console.warn('Could not load last slide', e);
  }
  return 0;
}

export function saveLastSlide(slideIndex: number): void {
  try {
    localStorage.setItem(LAST_SLIDE_KEY, slideIndex.toString());
  } catch (e) {
    console.warn('Could not save last slide', e);
  }
}
