export type ThemeMode = 'dark' | 'light' | 'contrast';

export interface PresenterNotes {
  speakingTimeMin: string;
  keyPoints: string[];
  pedagogicalTip: string;
  potentialQuestions: { question: string; answer: string }[];
}

export interface SlideData {
  id: string;
  number: number;
  section: string;
  sectionNumber: string;
  title: string;
  subtitle?: string;
  notes: PresenterNotes;
}

export interface PresentationSettings {
  theme: ThemeMode;
  animationsEnabled: boolean;
  soundEnabled: boolean;
  autoPlaySimulations: boolean;
}

export interface ApplicationItem {
  id: string;
  category: string;
  title: string;
  shortExample: string;
  iconName: string;
  tagline: string;
  inDepth: {
    overview: string;
    architectureUsed: string;
    realWorldUseCases: string[];
    benefit: string;
    ethicalConsideration: string;
  };
}

export interface AdvantageOrLimitation {
  id: string;
  title: string;
  description: string;
  practicalExample: string;
  category: 'advantage' | 'limitation';
  icon: string;
}

export interface CaseStudyStage {
  id: number;
  title: string;
  subtitle: string;
  detail: string;
  inputDescription: string;
  outputDescription: string;
}

export interface PromptVariation {
  id: 'minimalist' | 'cinematic' | 'artistic';
  title: string;
  badge: string;
  prompt: string;
  styleDescription: string;
  lighting: string;
  palette: string[];
}

export interface EvaluationCriterion {
  id: string;
  title: string;
  question: string;
  explanation: string;
  rating: 'Strong alignment' | 'Partial alignment' | 'Needs refinement';
  comment: string;
}
