import type { 
  SlideData, 
  ApplicationItem, 
  AdvantageOrLimitation, 
  CaseStudyStage,
  PromptVariation,
  EvaluationCriterion
} from '../types/presentation';

export const presentationMetadata = {
  title: 'APPLICATIONS OF GENERATIVE AI',
  subtitle: 'Exploring How Artificial Intelligence Creates Text, Images, Audio, Video, and New Digital Experiences',
  course: 'Artificial Intelligence',
  subjectCode: '302IT',
  subjectTeacher: 'Prof. Dipika D. Prajapati',
  presentationType: 'Academic Presentation',
  presenter: 'Fernando Mugiba',
  year: '2026',
  institution: 'Department of Computer Science & Artificial Intelligence',
  totalSlides: 10,
};

export const slidesData: SlideData[] = [
  {
    id: 'cover',
    number: 1,
    section: 'Introduction',
    sectionNumber: '00',
    title: 'APPLICATIONS OF GENERATIVE AI',
    subtitle: 'Exploring How Artificial Intelligence Creates Text, Images, Audio, Video, and New Digital Experiences',
    notes: {
      speakingTimeMin: '30 - 45s',
      keyPoints: [
        'Welcome everyone to this presentation on Applications of Generative AI.',
        'Generative AI marks a major shift from systems that only classify data to models that synthesize new content.',
        'Today we will explore how these models work, their real-world uses across six sectors, and an image generation case study.'
      ],
      pedagogicalTip: 'Speak with confidence and clarity. Emphasize that generative AI acts as a creative partner rather than a replacement for human judgment.',
      potentialQuestions: [
        {
          question: 'What is the main difference between traditional AI and Generative AI?',
          answer: 'Traditional predictive AI classifies or predicts based on existing patterns (e.g., spam vs non-spam), whereas Generative AI generates entirely novel artifacts such as text, images, or audio.'
        }
      ]
    }
  },
  {
    id: 'overview',
    number: 2,
    section: 'Agenda',
    sectionNumber: '01',
    title: 'Presentation Overview',
    subtitle: 'A structured roadmap covering generative foundations, mechanics, industrial deployments, ethics, and a visual case study.',
    notes: {
      speakingTimeMin: '30 - 40s',
      keyPoints: [
        'Outline the six chapters of today\'s presentation.',
        'We begin with core principles and the prompt-to-creation pipeline.',
        'Next, we survey practical applications, balance benefits against challenges, examine an image-generation case study, and conclude with responsible AI principles.'
      ],
      pedagogicalTip: 'Keep it brisk. Invite the audience to note that each section is interactive and can be revisited during the Q&A.',
      potentialQuestions: [
        {
          question: 'Which slide covers ethical questions like copyright and hallucinations?',
          answer: 'Section 04 (Slide 06) and our Case Study Evaluation (Slide 09) examine copyright, bias, and responsible use in depth.'
        }
      ]
    }
  },
  {
    id: 'what-is-genai',
    number: 3,
    section: 'Foundations',
    sectionNumber: '02',
    title: 'What Is Generative AI?',
    subtitle: 'Models that learn patterns from vast data to synthesize original text, imagery, sound, video, and code.',
    notes: {
      speakingTimeMin: '35 - 45s',
      keyPoints: [
        'State the core definition clearly: Generative AI learns patterns from existing data to produce new original content.',
        'Explain the four fundamental pillars: Learn, Understand Context, Generate, and Refine.',
        'Mention real tools familiar to everyone: ChatGPT for text, Midjourney and Stable Diffusion for images, Suno for audio, and GitHub Copilot for code.'
      ],
      pedagogicalTip: 'Click through the output tabs on the diagram to show how a single prompt concept branches into diverse modalities.',
      potentialQuestions: [
        {
          question: 'Do all generative models work the same way under the hood?',
          answer: 'No. Large language models use autoregressive transformers, whereas image generators typically use diffusion or flow-matching architectures.'
        }
      ]
    }
  },
  {
    id: 'how-genai-works',
    number: 4,
    section: 'Mechanics',
    sectionNumber: '03',
    title: 'From Prompt to Creation',
    subtitle: 'The four-stage pipeline: natural language prompt ingestion, model representation, content generation, and output synthesis.',
    notes: {
      speakingTimeMin: '35 - 45s',
      keyPoints: [
        'Walk through the four sequential stages: Input prompt -> Model Processing -> Content Generation -> Output synthesis.',
        'Demonstrate the interactive prompt: click "Try a Prompt" to show "Create a futuristic city at sunset" moving through the pipeline.',
        'Remind the audience that this is a conceptual educational demonstration showing data flow.'
      ],
      pedagogicalTip: 'Switch between Text, Image, Audio, Video, and Code tabs to illustrate multimodal versatility.',
      potentialQuestions: [
        {
          question: 'What happens during Stage 02 (Model Processing)?',
          answer: 'The system tokenizes the prompt, maps it into high-dimensional vector embeddings, and uses attention layers to understand semantic intent.'
        }
      ]
    }
  },
  {
    id: 'applications',
    number: 5,
    section: 'Industries',
    sectionNumber: '04',
    title: 'Where Is Generative AI Used?',
    subtitle: 'Empowering professionals across Education, Healthcare, Business, Software Development, Entertainment, and Design.',
    notes: {
      speakingTimeMin: '40 - 45s',
      keyPoints: [
        'Highlight six primary sectors where Generative AI is deployed today.',
        'In Education: personalized explanations and practice questions.',
        'In Healthcare: drafting clinical summaries for doctor review.',
        'In Business & Software: campaign drafting and automated code generation.',
        'In Entertainment & Design: storyboards, brand concepts, and rapid prototyping.'
      ],
      pedagogicalTip: 'Click on a card like Healthcare or Software Development to display the modal with benefits and limitations.',
      potentialQuestions: [
        {
          question: 'Why must healthcare documentation always be reviewed by a human professional?',
          answer: 'Because generative models can generate plausible-sounding medical inaccuracies that only a qualified clinician can catch.'
        }
      ]
    }
  },
  {
    id: 'benefits-challenges',
    number: 6,
    section: 'Analysis',
    sectionNumber: '05',
    title: 'Creative Power, Real Responsibilities',
    subtitle: 'A balanced assessment weighing rapid idea exploration against hallucinations, bias, and copyright concerns.',
    notes: {
      speakingTimeMin: '35 - 45s',
      keyPoints: [
        'Present the balanced duality: exceptional creative acceleration on the left, serious operational responsibilities on the right.',
        'Benefits: Brainstorming, automating tedious tasks, rapid prototyping, accessible personalized learning.',
        'Challenges: Hallucinations, training bias, intellectual property, deepfakes, and privacy risks.',
        'Emphasize the concluding quote: Generative AI is most useful when evaluated critically.'
      ],
      pedagogicalTip: 'Select an advantage and a challenge interactively to show a concrete real-world comparison.',
      potentialQuestions: [
        {
          question: 'What is an AI hallucination and why does it happen?',
          answer: 'A hallucination occurs when a model produces grammatically confident but factually incorrect assertions because it predicts statistical token sequences rather than verifying truth.'
        }
      ]
    }
  },
  {
    id: 'case-study-intro',
    number: 7,
    section: 'Case Study',
    sectionNumber: '06',
    title: 'Case Study: AI Image Generation',
    subtitle: 'From a natural language prompt to a high-impact architectural visual concept.',
    notes: {
      speakingTimeMin: '30 - 40s',
      keyPoints: [
        'Introduce the practical design problem: Traditional concept illustration can require days of manual sketching and 3D modeling.',
        'Present the generative solution: A text-to-image diffusion model translates descriptive natural language into visual concept drafts in seconds.',
        'Review the focal prompt: "Create a futuristic African city at sunset, with modern architecture, warm lighting, electric blue details, and a cinematic atmosphere."'
      ],
      pedagogicalTip: 'Direct audience attention to the illustrative rendering, highlighting how descriptive terms manifest as visual elements.',
      potentialQuestions: [
        {
          question: 'Can text-to-image models understand spatial composition like foreground and background?',
          answer: 'Yes, modern models use spatial cross-attention layers to associate descriptive adjectives with localized regions of the canvas.'
        }
      ]
    }
  },
  {
    id: 'case-study-lab',
    number: 8,
    section: 'Case Study',
    sectionNumber: '07',
    title: 'How Does Text-to-Image Generation Work?',
    subtitle: 'A clear four-stage pipeline showing how text prompts become visual concepts.',
    notes: {
      speakingTimeMin: '35 - 45s',
      keyPoints: [
        'Walk through the four stages: Prompt Creation, Prompt Processing, Image Generation, and Review & Refinement.',
        'Explain that the user writes a description, the model processes it, generates an image, and then the user can refine the prompt.',
        'Emphasize that changing descriptive words in a prompt can significantly change the visual result.'
      ],
      pedagogicalTip: 'Keep the explanation simple and visual. Focus on the pipeline flow rather than technical model internals.',
      potentialQuestions: [
        {
          question: 'How does changing words in the prompt affect the result?',
          answer: 'Different adjectives and descriptors guide the model to produce different visual styles — for example, adding "minimalist" leads to cleaner designs while "cinematic" creates more dramatic compositions.'
        }
      ]
    }
  },
  {
    id: 'case-study-evaluation',
    number: 9,
    section: 'Evaluation',
    sectionNumber: '08',
    title: 'Evaluating the Generated Results',
    subtitle: 'Four essential qualitative criteria: Prompt Alignment, Visual Quality, Creativity, and Responsible Use.',
    notes: {
      speakingTimeMin: '35 - 45s',
      keyPoints: [
        'Explain how professionals evaluate generative outputs: Prompt Alignment, Visual Quality, Creativity, and Responsible Use.',
        'Review the qualitative assessment matrix: Strong alignment on lighting and architecture, partial alignment on cultural nuances, needing refinement on structural consistency.',
        'Reinforce the keynote lesson: Human judgment remains the vital filter in creative workflows.'
      ],
      pedagogicalTip: 'Click on each criterion to reveal the practical rubric and testing questions.',
      potentialQuestions: [
        {
          question: 'How do designers avoid copyright infringement when using generative images?',
          answer: 'By using commercially safe models trained on licensed datasets, avoiding prompt keywords targeting living artists, and significantly transforming the output with human design work.'
        }
      ]
    }
  },
  {
    id: 'conclusion',
    number: 10,
    section: 'Conclusion',
    sectionNumber: '09',
    title: 'Imagine More. Create Responsibly.',
    subtitle: 'Synthesizing core takeaways: synthesis capabilities, cross-industry transformation, and human-centered ethics.',
    notes: {
      speakingTimeMin: '30 - 40s',
      keyPoints: [
        'Deliver the three core takeaways: Generative AI synthesizes new content, transforms major industries, and demands responsible evaluation.',
        'Conclude with the closing message: "Thank you for your time and attention. Any questions?"',
        'Be prepared to answer questions or return to any slide using the overview controller.'
      ],
      pedagogicalTip: 'Conclude with warmth and academic poise. Leave the slide open for interactive audience discussion.',
      potentialQuestions: [
        {
          question: 'What is the most promising future direction for Generative AI?',
          answer: 'Multimodal real-time interactive agents that seamlessly reason and create across text, vision, audio, and physical robotics simultaneously.'
        }
      ]
    }
  }
];

export const overviewSections = [
  {
    number: '01',
    targetSlideIndex: 2,
    title: 'Introduction to Generative AI',
    description: 'Foundational definition, the learn-understand-generate-refine loop, and core modalities.',
    icon: 'BookOpen',
    badge: 'Foundations'
  },
  {
    number: '02',
    targetSlideIndex: 3,
    title: 'How Generative AI Works',
    description: 'The computational pipeline from natural prompt input to multimodal synthesized creation.',
    icon: 'Settings',
    badge: 'Mechanics'
  },
  {
    number: '03',
    targetSlideIndex: 4,
    title: 'Applications Across Industries',
    description: 'Practical deployment across Education, Healthcare, Business, Software, Media, and Design.',
    icon: 'Globe',
    badge: 'Industries'
  },
  {
    number: '04',
    targetSlideIndex: 5,
    title: 'Benefits and Challenges',
    description: 'Balancing rapid creative acceleration against hallucinations, copyright, and training bias.',
    icon: 'BarChart3',
    badge: 'Analysis'
  },
  {
    number: '05',
    targetSlideIndex: 6,
    title: 'Case Study: AI Image Generation',
    description: 'Exploring how text-to-image generation works, the creation pipeline, and output evaluation.',
    icon: 'Image',
    badge: 'Case Study'
  },
  {
    number: '06',
    targetSlideIndex: 9,
    title: 'Conclusion and Perspectives',
    description: 'Core takeaways, responsible creative stewardship, and open academic Q&A.',
    icon: 'GraduationCap',
    badge: 'Synthesis'
  }
];

export const industryApplications: ApplicationItem[] = [
  {
    id: 'education',
    category: 'EDUCATION & LEARNING',
    title: 'Personalized Pedagogical Tutoring',
    tagline: 'Generating custom explanations, multi-level practice questions, and formative student feedback.',
    shortExample: 'Generates explanations, practice questions, summaries, and personalised learning materials.',
    iconName: 'GraduationCap',
    inDepth: {
      overview: 'Generative models adapt instructional tone and complexity to each learner, breaking down advanced subjects into digestible analogies and providing immediate 24/7 exercise guidance.',
      architectureUsed: 'Large Language Models (LLMs) & Instruction-Tuned Transformers',
      realWorldUseCases: [
        'Creating a simple explanation of a difficult physics concept tailored to a high school student',
        'Generating randomized math problem sets with step-by-step explanatory solutions',
        'Translating academic papers into accessible executive summaries for foreign language learners'
      ],
      benefit: 'Democratizes 1-on-1 tutoring, helping students learn at their own pace without prohibitive private tutoring costs.',
      ethicalConsideration: 'Must be monitored for subtle factual inaccuracies and ensure students develop critical thinking rather than relying on copy-paste.'
    }
  },
  {
    id: 'healthcare',
    category: 'HEALTHCARE & MEDICINE',
    title: 'Clinical Documentation & Synthesis',
    tagline: 'Drafting structured clinical summaries, patient letters, and privacy-preserving synthetic research datasets.',
    shortExample: 'Can assist with drafting clinical documentation, summarising medical information, and generating synthetic data.',
    iconName: 'Activity',
    inDepth: {
      overview: 'Generative AI assists clinicians by transcribing patient consultations into standardized electronic health records and generating synthetic cohorts that preserve privacy for medical research.',
      architectureUsed: 'Clinical Foundation Models & Privacy-Preserving Generative Adversarial Networks (GANs)',
      realWorldUseCases: [
        'Drafting a structured discharge summary for an attending physician to review and sign',
        'Synthesizing anonymous patient telemetry datasets to train medical diagnostic algorithms safely',
        'Translating complex laboratory blood test reports into plain-language guides for patients'
      ],
      benefit: 'Significantly reduces physician administrative paperwork burnout, returning valuable minutes to direct patient care.',
      ethicalConsideration: 'Must never diagnose autonomously; all clinical notes demand mandatory physician review and HIPAA compliance.'
    }
  },
  {
    id: 'business',
    category: 'BUSINESS & MARKETING',
    title: 'Content & Campaign Ideation',
    tagline: 'Synthesizing advertising copy, market campaign concepts, product descriptions, and visual assets.',
    shortExample: 'Generates advertising copy, campaign concepts, product descriptions, and visual content.',
    iconName: 'Briefcase',
    inDepth: {
      overview: 'Marketing teams leverage generative AI to brainstorm brand campaign angles, generate personalized email variants at scale, and test consumer value propositions rapidly.',
      architectureUsed: 'Multimodal Generative Models (Text, Image, & Video synthesis)',
      realWorldUseCases: [
        'Creating several creative advertising concepts for a new sustainable footwear product',
        'Generating multi-language product descriptions optimized for global e-commerce catalogs',
        'Drafting customer service response templates that match specific corporate brand voices'
      ],
      benefit: 'Shrinks campaign ideation cycles from weeks to hours, allowing rapid A/B testing of creative concepts.',
      ethicalConsideration: 'Guarding against misleading advertising claims, ensuring transparency regarding synthetic generated content.'
    }
  },
  {
    id: 'software',
    category: 'SOFTWARE DEVELOPMENT',
    title: 'Developer Copilots & Code Synthesis',
    tagline: 'Assisting engineers with boilerplate code generation, inline documentation, test suites, and debugging.',
    shortExample: 'Assists with code generation, documentation, debugging suggestions, and test creation.',
    iconName: 'Code',
    inDepth: {
      overview: 'Neural code models evaluate repository context and developer intent to suggest autocomplete functions, write automated unit tests, and translate legacy codebases across languages.',
      architectureUsed: 'Code-Specialized Autoregressive Transformers',
      realWorldUseCases: [
        'Generating a starter authentication function for a modern web application in TypeScript',
        'Automatically writing comprehensive unit and edge-case test suites for backend APIs',
        'Explaining complex regex patterns and legacy SQL queries in clear natural language'
      ],
      benefit: 'Boosts developer velocity on repetitive boilerplate tasks by 30-50%, freeing engineers for high-level system design.',
      ethicalConsideration: 'Code must be rigorously audited for cybersecurity vulnerabilities, hardcoded secrets, and open-source license compliance.'
    }
  },
  {
    id: 'entertainment',
    category: 'ENTERTAINMENT & MEDIA',
    title: 'Narrative & Media Pre-Production',
    tagline: 'Empowering storytellers with conceptual narrative arcs, dynamic game dialogues, and musical motifs.',
    shortExample: 'Supports the creation of stories, music, images, animations, and video concepts.',
    iconName: 'Film',
    inDepth: {
      overview: 'Filmmakers, game studios, and musicians use generative AI for exploratory pre-production, generating character backstories, acoustic soundscapes, and cinematic animatics.',
      architectureUsed: 'Diffusion Video Models & Neural Audio Transformers',
      realWorldUseCases: [
        'Creating a visual storyboard and mood board for an independent sci-fi short film',
        'Generating background ambient musical scores and sound effects for video games',
        'Drafting branching non-player character (NPC) dialogues for open-world role-playing games'
      ],
      benefit: 'Enables independent creators with limited budgets to visualize cinematic ideas previously reserved for major studios.',
      ethicalConsideration: 'Respecting artistic copyright, attribution, and fair compensation for original human creators.'
    }
  },
  {
    id: 'design',
    category: 'DESIGN & CREATIVITY',
    title: 'Visual Concept & Brand Exploration',
    tagline: 'Accelerating industrial design, graphic layouts, architectural drafts, and creative iterations.',
    shortExample: 'Helps generate visual concepts, illustrations, layouts, and creative variations.',
    iconName: 'Palette',
    inDepth: {
      overview: 'Designers utilize text-to-image and 3D generative models as digital mood boards, exploring hundreds of color harmonies, packaging forms, and ergonomic shapes in minutes.',
      architectureUsed: 'Latent Diffusion Models & 3D Gaussian Splatting Generators',
      realWorldUseCases: [
        'Generating initial futuristic logo and visual branding concepts for a clean-technology startup',
        'Creating dozens of interior architectural layout concepts showcasing natural lighting',
        'Prototyping ergonomic product packaging variations with distinct visual textures'
      ],
      benefit: 'Eliminates blank-canvas paralysis, offering unexpected visual associations that spark human creative breakthroughs.',
      ethicalConsideration: 'Recognizing that generative tools produce raw raw material; refined aesthetic judgment and final execution remain human.'
    }
  }
];

export const advantagesAndLimitations: AdvantageOrLimitation[] = [
  {
    id: 'ben-1',
    category: 'advantage',
    title: 'Accelerates Content Creation',
    description: 'Drafts articles, marketing copy, starter code, and imagery in seconds rather than hours.',
    practicalExample: 'A technical writer generating a first draft of user documentation in 2 minutes, then editing it for accuracy.',
    icon: 'Zap'
  },
  {
    id: 'ben-2',
    category: 'advantage',
    title: 'Supports Creativity and Brainstorming',
    description: 'Provides unexpected combinations, metaphors, and visual styles that spark new thinking.',
    practicalExample: 'A game designer generating 20 alien fauna concepts to inspire final 3D modeling.',
    icon: 'Lightbulb'
  },
  {
    id: 'ben-3',
    category: 'advantage',
    title: 'Helps Automate Repetitive Tasks',
    description: 'Handles boilerplate coding, format conversions, text summarization, and translation effortlessly.',
    practicalExample: 'Converting customer support tickets from 12 languages into standard structured English summaries.',
    icon: 'Cpu'
  },
  {
    id: 'ben-4',
    category: 'advantage',
    title: 'Enables Rapid Exploration of Ideas',
    description: 'Allows stakeholders to iterate through diverse visual or narrative concepts before committing resources.',
    practicalExample: 'An architect reviewing 50 lighting and facade variations for a client presentation within one afternoon.',
    icon: 'TrendingUp'
  },
  {
    id: 'ben-5',
    category: 'advantage',
    title: 'Supports Personalised Learning',
    description: 'Tailors tone, difficulty level, and examples to individual user knowledge and background.',
    practicalExample: 'Explaining quantum entanglement using basketball analogies for sports fans and music harmonies for musicians.',
    icon: 'GraduationCap'
  },
  {
    id: 'chal-1',
    category: 'limitation',
    title: 'Can Generate Inaccurate Information',
    description: 'Models generate fluent, persuasive statements that are factually wrong (hallucinations).',
    practicalExample: 'An LLM fabricating non-existent scientific citations and court legal precedents with confident phrasing.',
    icon: 'AlertTriangle'
  },
  {
    id: 'chal-2',
    category: 'limitation',
    title: 'May Reproduce Training Biases',
    description: 'Inherits cultural, gender, racial, and occupational stereotypes present in web scrape datasets.',
    practicalExample: 'Image generators defaulting to male executives and female assistants unless specifically prompted otherwise.',
    icon: 'EyeOff'
  },
  {
    id: 'chal-3',
    category: 'limitation',
    title: 'Copyright & Intellectual Property Questions',
    description: 'Unclear legal boundaries regarding training on copyrighted human artworks and ownership of outputs.',
    practicalExample: 'Courts worldwide deliberating whether generating artwork in a specific living artist\'s style infringes intellectual property.',
    icon: 'Scale'
  },
  {
    id: 'chal-4',
    category: 'limitation',
    title: 'Can Produce Misleading Media (Deepfakes)',
    description: 'Synthetic audio and photorealistic video can be misused for fraud, disinformation, and impersonation.',
    practicalExample: 'Cloned audio of enterprise executives used in phone phishing scams authorizing fraudulent wire transfers.',
    icon: 'ShieldAlert'
  },
  {
    id: 'chal-5',
    category: 'limitation',
    title: 'Requires Attention to Privacy & Responsible Use',
    description: 'Proprietary source code or sensitive personal data pasted into public models can risk unauthorized data leakage.',
    practicalExample: 'Employees accidentally uploading confidential financial spreadsheets to public cloud LLMs for summarization.',
    icon: 'Lock'
  }
];

export const caseStudyStages: CaseStudyStage[] = [
  {
    id: 1,
    title: 'PROMPT CREATION',
    subtitle: 'Natural Language Description',
    detail: 'The user writes a text description of the image they want to create, including details like the subject, style, lighting, and mood.',
    inputDescription: 'A written description in plain natural language',
    outputDescription: 'A clear text prompt ready for the AI model'
  },
  {
    id: 2,
    title: 'PROMPT PROCESSING',
    subtitle: 'Understanding the Description',
    detail: 'The AI model reads and analyzes the text prompt, breaking it into meaningful parts and understanding the relationships between the described elements.',
    inputDescription: 'The text prompt written by the user',
    outputDescription: 'A numerical representation the model can work with'
  },
  {
    id: 3,
    title: 'IMAGE GENERATION',
    subtitle: 'Creating the Visual Output',
    detail: 'The model gradually builds the image step by step, starting from randomness and progressively adding structure, colors, and details guided by the prompt.',
    inputDescription: 'Processed prompt + initial random starting point',
    outputDescription: 'A fully formed digital image'
  },
  {
    id: 4,
    title: 'REVIEW & REFINEMENT',
    subtitle: 'Human Evaluation & Adjustment',
    detail: 'The human reviews the generated image, checks if it matches the original vision, and can adjust the prompt wording to improve the results in a new generation.',
    inputDescription: 'Generated image + human feedback',
    outputDescription: 'Final approved concept art or a refined prompt for re-generation'
  }
];

export const promptVariations: PromptVariation[] = [
  {
    id: 'minimalist',
    title: 'PROMPT A — MINIMALIST',
    badge: 'Clean Geometric',
    prompt: '"A minimalist futuristic African city at sunset, clean geometric architecture, soft warm lighting."',
    styleDescription: 'Emphasizes elegant negative space, pure geometric volumes, smooth sandstone surfaces, and serene solar reflections.',
    lighting: 'Soft golden-hour ambient glow',
    palette: ['#F59E0B', '#F8FAFC', '#38BDF8', '#1E293B']
  },
  {
    id: 'cinematic',
    title: 'PROMPT B — CINEMATIC',
    badge: 'Dramatic Metropolis',
    prompt: '"A cinematic futuristic African metropolis at sunset, dramatic lighting, reflective glass towers, electric blue accents."',
    styleDescription: 'Features soaring vertical spires, holographic sky bridges, atmospheric haze, and striking high-contrast neon highlights.',
    lighting: 'Dramatic directional sunset with electric blue illumination',
    palette: ['#0284C7', '#6366F1', '#F97316', '#0F172A']
  },
  {
    id: 'artistic',
    title: 'PROMPT C — ARTISTIC',
    badge: 'Vibrant Concept Art',
    prompt: '"A colourful futuristic African city, imaginative architecture, vibrant sunset, digital concept art."',
    styleDescription: 'Blends traditional organic fractal patterns with futuristic bio-domes, vivid chromatic gradients, and expressive artistic brushwork.',
    lighting: 'Vibrant multi-tonal violet and magenta dusk',
    palette: ['#A855F7', '#EC4899', '#F59E0B', '#06B6D4']
  }
];

export const evaluationCriteria: EvaluationCriterion[] = [
  {
    id: 'alignment',
    title: 'PROMPT ALIGNMENT',
    question: 'Does the image reflect the requested subject and visual characteristics?',
    explanation: 'Verifies whether all explicit entities from the text prompt (African metropolis, sunset lighting, futuristic architecture, electric blue accents) are faithfully represented.',
    rating: 'Strong alignment',
    comment: 'The model successfully integrated sunset lighting, futuristic spires, and modern African architectural motifs without missing core prompt tokens.'
  },
  {
    id: 'quality',
    title: 'VISUAL QUALITY',
    question: 'Are the composition, lighting, and details visually coherent?',
    explanation: 'Scrutinizes edge sharpness, realistic shadow geometry, perspective consistency, and the absence of common generative distortion artifacts.',
    rating: 'Strong alignment',
    comment: 'Lighting reflections across glass facades align naturally with the sunset horizon; perspective lines converge accurately toward the central avenue.'
  },
  {
    id: 'creativity',
    title: 'CREATIVITY',
    question: 'Does the output offer useful or interesting visual possibilities?',
    explanation: 'Assesses whether the generative output synthesizes novel architectural silhouettes and original aesthetic combinations beyond generic stock tropes.',
    rating: 'Strong alignment',
    comment: 'The synthesis of organic solar canopies with sleek glass towers provides an inspiring, forward-looking aesthetic concept for designers.'
  },
  {
    id: 'responsible',
    title: 'RESPONSIBLE USE',
    question: 'Are copyright, representation, bias, and appropriate use considered?',
    explanation: 'Examines whether the generation respects cultural dignity, avoids stereotypical caricatures, and acknowledges the dataset source foundations.',
    rating: 'Partial alignment',
    comment: 'Presents an uplifting, technologically advanced African urban vision; however, human designers should actively consult regional architects for authentic cultural nuances.'
  }
];

export const multimodalTabs = [
  {
    id: 'text',
    name: 'TEXT',
    icon: 'FileText',
    prompt: 'Summarize the future of clean energy in three concise bullet points.',
    outputLabel: 'AI Text Output',
    outputSample: '• Solar & wind grid parity is accelerating global adoption.\n• Solid-state storage batteries solve intermittent supply challenges.\n• AI-driven smart grids optimize decentralized distribution in real time.',
    modelType: 'Autoregressive Transformer (e.g. GPT-4, Gemini, Claude)'
  },
  {
    id: 'image',
    name: 'IMAGE',
    icon: 'Image',
    prompt: 'Create a futuristic African city at sunset with electric blue details.',
    outputLabel: 'AI Visual Output',
    outputSample: '[Illustrative visual: Soaring solar towers, warm amber sky, and electric blue glowing skyways]',
    modelType: 'Latent Diffusion Model (e.g. Midjourney, Stable Diffusion, DALL-E)'
  },
  {
    id: 'audio',
    name: 'AUDIO',
    icon: 'Music',
    prompt: 'Compose an upbeat ambient acoustic motif with warm marimba and synth pad.',
    outputLabel: 'AI Acoustic Output',
    outputSample: '♪ Harmonic progression: Cmaj9 → Am7 → Fmaj7 with 120 BPM polyrhythmic percussion ♪',
    modelType: 'Neural Audio Transformer & Flow Matching (e.g. Suno, Udio, AudioCraft)'
  },
  {
    id: 'video',
    name: 'VIDEO',
    icon: 'Video',
    prompt: 'Smooth drone shot gliding through futuristic glass towers at dusk, 4K 60fps.',
    outputLabel: 'AI Video Output',
    outputSample: '▶ 4-second spatio-temporal video clip with coherent parallax motion and sunset lens flare',
    modelType: 'Spatio-Temporal Diffusion Transformer (e.g. Sora, Runway Gen-3, Kling)'
  },
  {
    id: 'code',
    name: 'CODE',
    icon: 'Code',
    prompt: 'Write a TypeScript function to calculate cosine similarity between two embeddings.',
    outputLabel: 'AI Code Output',
    outputSample: 'function cosineSimilarity(a: number[], b: number[]): number {\n  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);\n  return dot / (Math.hypot(...a) * Math.hypot(...b));\n}',
    modelType: 'Code-Specialized Transformer (e.g. GitHub Copilot, StarCoder, CodeLlama)'
  }
];
