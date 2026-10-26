# Applications of Generative AI
## Premium Interactive AI Presentation Simulator

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)

> **Academic Presentation for the Artificial Intelligence Course**  
> **Presenter:** Fernando Mugiba  
> **Field:** Artificial Intelligence  
> **Academic Year:** 2026  

---

## 1. Project Overview

**Applications of Generative AI** is a state-of-the-art interactive presentation simulator engineered specifically for live classroom lectures and academic defenses using a projector or large auditorium display.

Unlike conventional static slide decks or ordinary scrolling web pages, this application functions as a high-fidelity presentation operating system:
- **Projector-Optimized Keynote Aesthetics**: Dark navy background (`#080B16`, `#0B1020`), card background (`#111827`), electric blue (`#3B82F6`), cyan (`#22D3EE`), and violet (`#A78BFA`) accents, Space Grotesk headings, Inter body, and JetBrains Mono technical labels.
- **Zero-Backend, 100% Offline-Ready**: Runs completely locally in the browser with zero external APIs, keys, or cloud dependencies.
- **Persistent Slide Controller**: Floating dock with previous/next navigation, slide counter (`03 / 10`), interactive mini-dots, agenda matrix, speaker notes drawer, and fullscreen toggle.
- **Presenter Notes Panel**: Real-time slide timer, recommended speaking pacing (20–45s per slide), key speaker cues, pedagogical tips, and anticipated audience Q&A with model answers.
- **Native Web Audio Synthesis**: Synthesized tactile audio feedback (clicks, chimes, and slide transition sounds) plus celebratory audio via the native browser Web Audio API with zero external audio assets.
- **Interactive Simulations**: Live Multimodal GenAI Engine, 5-modality prompt-to-creation pipeline (Text, Image, Audio, Video, Code), 6 industry sector modal inspectors, and a Prompt Laboratory with 3 selectable prompt variations (Minimalist, Cinematic, Artistic) and qualitative evaluation criteria.

---

## 2. Slide Structure & Syllabus

| Slide | Title | Category | Interactive Feature |
|---|---|---|---|
| **01** | **Cover Page** | Introduction | **Generative AI Engine** panel with 5 connected stages (`PROMPT → MODEL → GENERATION → OUTPUT → REFINEMENT`), glowing light pulses, and 5 multimodal output symbols (Text, Image, Audio, Video, Code). |
| **02** | **Presentation Overview** | Agenda | 6 interactive section cards with direct navigation to any presentation topic, hover animations, and slide badges. |
| **03** | **What Is Generative AI?** | Foundations | 4 key conceptual pillars (**Learn**, **Understand Context**, **Generate**, **Refine**) + interactive multimodal prompt visualizer with clickable output type explanations. |
| **04** | **From Prompt to Creation** | Mechanics | 4-stage pipeline + **"Try a Prompt"** live conceptual simulation with 5 multimodal tabs (**Text**, **Image**, **Audio**, **Video**, **Code**). |
| **05** | **Where Is Generative AI Used?** | Industry Applications | 6 sector cards (**Education**, **Healthcare**, **Business & Marketing**, **Software Development**, **Entertainment & Media**, **Design & Creativity**) with detailed modal panels covering description, practical examples, benefits, and limitations. |
| **06** | **Creative Power, Real Responsibilities** | Critical Analysis | Balanced dual-column comparison (**Benefits** vs. **Challenges**) with interactive inspection and concluding critical evaluation guideline. |
| **07** | **Case Study: AI Image Generation** | Case Study | Text-to-image concept exploration + Problem vs Solution framing + SVG visual concept of a futuristic African city at sunset. |
| **08** | **Case Study: The Generation Process** | Case Study & Lab | 4-stage generation pipeline + **Interactive Prompt Laboratory** with 3 selectable prompt variations (**Minimalist**, **Cinematic**, **Artistic**) and simulated generation with step-by-step progress. |
| **09** | **Case Study: Analysis and Evaluation** | Qualitative Review | 4 interactive evaluation criteria (**Prompt Alignment**, **Visual Quality**, **Creativity**, **Responsible Use**) with qualitative rubric ratings and human-in-the-loop takeaway. |
| **10** | **Imagine More. Create Responsibly.** | Synthesis & Finale | 3 core takeaways, Thank You / Q&A banner, Restart / Return actions, and a 5-second automatic celebratory "¡Hala Madrid!" fanfare & vocal chant. |

---

## 3. Keyboard & Remote Presentation Shortcuts

The presentation controller listens to standard PowerPoint and Keynote clicker shortcuts:

| Shortcut | Action |
|---|---|
| <kbd>→</kbd> or <kbd>Space</kbd> or <kbd>PageDown</kbd> | Advance to next slide |
| <kbd>←</kbd> or <kbd>PageUp</kbd> | Return to previous slide |
| <kbd>Esc</kbd> | Toggle Presentation Agenda Matrix (Overview) |
| <kbd>N</kbd> | Toggle Presenter Speaker Notes Drawer |
| <kbd>F</kbd> | Toggle Fullscreen Display Mode |
| <kbd>S</kbd> | Open Display & Contrast Settings |
| <kbd>Home</kbd> | Jump immediately to Cover Page (Slide 01) |
| <kbd>End</kbd> | Jump immediately to Conclusion (Slide 10) |
| <kbd>?</kbd> | Open Keyboard Shortcuts Cheat Sheet |

*Input safety guarantee: When interacting with forms or modals, typing will never accidentally advance slides.*

---

## 4. Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Motion & Transitions**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Feedback**: Native Browser Web Audio API synthesizer + SpeechSynthesis API
- **Persistence**: `localStorage` (theme preferences, sound toggle, motion toggle, last visited slide)

---

## 5. Getting Started & Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm`, `yarn`, or `pnpm`

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Run Locally
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### Production Build
Generate an optimized production bundle:
```bash
npm run build
```

Preview the production bundle locally:
```bash
npm run preview
```

---

## 6. Deployment Instructions

### Deploy to Vercel
1. Install the Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Vercel automatically detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Deploy to Netlify
1. Build the production files: `npm run build`
2. Deploy via Netlify CLI: `npx netlify deploy --dir=dist --prod`
3. Or connect your Git repository in the Netlify web dashboard:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

---

## 7. Educational & Ethical Disclaimer

> **IMPORTANT ACADEMIC NOTICE:**  
> This presentation and its interactive components (including the Prompt Laboratory and multimodal generation simulators) are educational demonstrations designed for conceptual presentation in an undergraduate Artificial Intelligence course.
>
> All generated visual concepts, outputs, and evaluation ratings are predefined illustrative examples. The application operates entirely locally without connecting to live commercial model APIs. Outputs should always be critically evaluated and used responsibly with human oversight.

---

## 8. Author & Academic Credits

- **Presenter & Author:** Fernando Mugiba
- **Course:** Artificial Intelligence
- **Academic Year:** 2026
