import {
  AchievementItem,
  ExperienceItem,
  HolographicNodeInfo,
  ProjectFilterCategory,
  ProjectItem,
  RoadmapTrack,
  SkillGroup,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Chinmay Choudhari',
  initials: 'CC',
  roleLine: 'Software Development | AI/ML | Generative AI',
  heroIntro:
    'Computer Science undergraduate building practical software applications, machine learning prototypes, and grounded generative AI systems.',
  availabilityStatus: 'Open to Internship Opportunities',
  degree: 'B.Tech in Computer Science and Engineering',
  university: 'Presidency University, Bengaluru',
  shortUniversity: 'Presidency University',
  location: 'Bengaluru, Karnataka, India',
  cgpa: '9.27/10',
  graduationClass: 'Class of 2028',
  email: 'chinmaychoudhari510@gmail.com',
  githubUrl: 'https://github.com/Chinmay-C12331',
  linkedinUrl: 'https://www.linkedin.com/in/chinmay-choudhari/',
  resumePath: '/resume.pdf',
};

export const ABOUT_SUMMARY =
  "I am a Computer Science and Engineering undergraduate at Presidency University, Bengaluru (CGPA 9.27/10, Class of 2028) focused on Python and practical software development. Through hands-on projects and academic machine learning exploration, I have built full-stack web dashboards, deep learning research prototypes, and grounded Generative AI pipelines. I am actively strengthening my data structures, algorithms, and software engineering foundations while pursuing software and AI internship opportunities.";

export const HOLOGRAPHIC_NODES: HolographicNodeInfo[] = [
  {
    id: 'node-python',
    label: 'PYTHON',
    category: 'Core Language',
    summary: 'Primary language across RAG pipelines, PyTorch prototypes, and backend verification.',
    targetSection: 'skills',
    position: [-2.15, 1.35, 0.55],
    color: '#22D3EE',
  },
  {
    id: 'node-gemini',
    label: 'GEMINI',
    category: 'LLM Integration',
    summary: 'Applied in ScamSniffer and the RAG-Based PDF Chatbot for grounded analysis.',
    targetSection: 'projects',
    filterCategory: 'Generative AI',
    projectId: 'scamsniffer',
    position: [2.1, 1.5, 0.45],
    color: '#8B5CF6',
  },
  {
    id: 'node-aiml',
    label: 'AI / ML',
    category: 'Focus Track',
    summary: 'Deep learning fundamentals, PyTorch sequence models, feature engineering, and ONNX.',
    targetSection: 'projects',
    filterCategory: 'AI / ML',
    projectId: 'password-strength',
    position: [-2.3, 0.35, 0.9],
    color: '#38BDF8',
  },
  {
    id: 'node-genai',
    label: 'GENAI',
    category: 'Focus Track',
    summary: 'Building LLM applications, structured extraction, embeddings, and retrieval pipelines.',
    targetSection: 'projects',
    filterCategory: 'Generative AI',
    position: [2.35, 0.55, 0.85],
    color: '#22D3EE',
  },
  {
    id: 'node-sde',
    label: 'SOFTWARE ENGINEERING',
    category: 'Focus Track',
    summary: 'Modular application architecture, deterministic rule engines, and full-stack workflows.',
    targetSection: 'projects',
    filterCategory: 'Software Engineering',
    projectId: 'ecotech-pu',
    position: [-1.65, -0.55, 1.2],
    color: '#8B5CF6',
  },
  {
    id: 'node-rag',
    label: 'RAG',
    category: 'Retrieval Pipeline',
    summary: 'Document chunking (1,000 chars / 200 overlap), ChromaDB vectors, and grounded QA.',
    targetSection: 'projects',
    filterCategory: 'Generative AI',
    projectId: 'rag-pdf-chatbot',
    position: [1.75, -0.45, 1.15],
    color: '#38BDF8',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    subtitle: 'Core languages used across projects and university coursework.',
    skills: [
      { name: 'Python', exposure: 'Project Experience', note: 'Intermediate' },
      { name: 'TypeScript', exposure: 'Project Experience' },
      { name: 'JavaScript', exposure: 'Project Experience' },
      { name: 'C', exposure: 'Coursework / Lab Exposure' },
      { name: 'Java', exposure: 'Coursework / Lab Exposure', note: 'Beginner' },
    ],
  },
  {
    id: 'data-science-ml',
    title: 'Data Science and Machine Learning',
    subtitle: 'Model architectures, feature engineering, and inference exploration.',
    skills: [
      { name: 'PyTorch', exposure: 'Project Experience' },
      { name: 'Feature Engineering', exposure: 'Project Experience' },
      { name: 'ONNX Runtime / INT8 Export', exposure: 'Project Experience' },
      { name: 'Deep Learning Fundamentals', exposure: 'Coursework / Lab Exposure' },
      { name: 'Sequence Modeling (BiLSTM)', exposure: 'Project Experience' },
    ],
  },
  {
    id: 'ai-genai',
    title: 'AI and Generative AI',
    subtitle: 'LLM APIs, vector retrieval pipelines, and grounded response generation.',
    skills: [
      { name: 'Google Gemini API', exposure: 'Project Experience' },
      { name: 'Google GenAI SDK', exposure: 'Project Experience' },
      { name: 'Retrieval-Augmented Generation (RAG)', exposure: 'Project Experience' },
      { name: 'LangChain', exposure: 'Project Experience' },
      { name: 'ChromaDB', exposure: 'Project Experience' },
      { name: 'Hugging Face Embeddings', exposure: 'Project Experience' },
    ],
  },
  {
    id: 'web-technologies',
    title: 'Web Technologies',
    subtitle: 'Frontend and backend technologies applied in project builds and internships.',
    skills: [
      { name: 'React', exposure: 'Project Experience' },
      { name: 'Next.js', exposure: 'Project Experience' },
      { name: 'Node.js', exposure: 'Project Experience' },
      { name: 'Tailwind CSS', exposure: 'Project Experience' },
      { name: 'Streamlit', exposure: 'Project Experience' },
      { name: 'HTML, CSS & Bootstrap', exposure: 'Project Experience', note: 'Internship & Projects' },
    ],
  },
  {
    id: 'tools-platforms',
    title: 'Tools and Platforms',
    subtitle: 'Development environments, version control, databases, and workflow tools.',
    skills: [
      { name: 'Git & GitHub', exposure: 'Project Experience' },
      { name: 'Google AI Studio', exposure: 'Project Experience' },
      { name: 'Google Cloud Console & OAuth 2.0', exposure: 'Project Experience' },
      { name: 'Supabase & Vercel', exposure: 'Project Experience' },
      { name: 'Figma', exposure: 'Project Experience', note: 'Internship UI/UX' },
      { name: 'Docker & n8n', exposure: 'Project Experience' },
      { name: 'MySQL', exposure: 'Coursework / Lab Exposure' },
    ],
  },
];

export const PROJECT_FILTER_CATEGORIES: ProjectFilterCategory[] = [
  'All Projects',
  'Software Engineering',
  'AI / ML',
  'Generative AI',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'scamsniffer',
    index: '01',
    title: 'ScamSniffer — AI Recruitment Fraud and Phishing Inspector',
    shortTitle: 'ScamSniffer',
    categoryLabel: 'GenAI · Software Engineering · Cybersecurity',
    filterCategories: ['Software Engineering', 'AI / ML', 'Generative AI'],
    githubUrl: 'https://github.com/Chinmay-C12331/ScamSniffer_',
    technologies: ['TypeScript', 'Node.js', 'Python', 'Google Gemini', 'Google GenAI SDK'],
    problemStatement:
      'Convincing job offers, recruiter outreach, and phishing links make it difficult for job seekers to verify recruitment authenticity.',
    cardFeatures: [
      'Evaluates six recruitment fraud vectors using Gemini linguistic evidence extraction.',
      'Computes an auditable 0–100% Scam Threat Index via a deterministic rule engine.',
      'Supports explicit UNABLE_TO_VERIFY outcomes without fabricating domain metadata.',
    ],
    overview:
      'ScamSniffer inspects suspicious job offers, recruiter messages, and recruitment URLs by pairing Gemini-based linguistic evidence extraction with a deterministic rule engine to produce an auditable 0–100% Scam Threat Index.',
    approach:
      'Combines LLM-based linguistic evidence extraction with deterministic scoring so natural-language indicators are captured while final risk calculation remains transparent and reproducible.',
    engineeringValue:
      'Separates language understanding from final risk calculation to make scoring auditable, avoids fabricating unavailable domain metadata, and supports UNABLE_TO_VERIFY outcomes.',
    fullFeatures: [
      'Evaluates six recruitment fraud vectors across offers, messages, and URLs.',
      'Uses Gemini to extract structured linguistic evidence from unstructured text.',
      'Uses a deterministic rule engine to calculate an auditable 0–100% Scam Threat Index.',
      'Produces evidence-backed risk findings tied to specific extracted indicators.',
      'Avoids fabricating unavailable domain metadata.',
      'Supports UNABLE_TO_VERIFY outcomes when information cannot be established.',
    ],
    testingDocumentation:
      'Repository README documentation: 24 passing Node.js tests and 12 passing Python tests.',
    limitations: {
      badge: 'Verification Scope',
      shortNote: 'Evidence-backed risk inspection (not guaranteed fraud prevention).',
      details: [
        'Surfaces evidence-backed risk indicators to assist users; does not claim guaranteed detection or complete fraud prevention.',
        'Returns explicit UNABLE_TO_VERIFY outcomes when external domain or recruiter metadata cannot be established.',
      ],
    },
    schematicType: 'scamsniffer',
  },
  {
    id: 'ecotech-pu',
    index: '02',
    title: 'EcoTech PU — Campus Resource Intelligence Dashboard',
    shortTitle: 'EcoTech PU',
    categoryLabel: 'Software Engineering · Full-Stack · Sustainability',
    filterCategories: ['Software Engineering'],
    githubUrl: 'https://github.com/Chinmay-C12331/EcoTech_PU',
    technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Supabase', 'Vercel'],
    problemStatement:
      'Campus electricity, water, and waste inefficiencies are difficult to investigate without structured baseline comparisons and action tracking.',
    cardFeatures: [
      'Monitors electricity baselines, after-hours energy usage, water, and waste categories.',
      'Implements an explainable Measure → Detect → Act → Verify corrective workflow.',
      'Prioritizes resource anomalies with 59 repository-documented passing tests.',
    ],
    overview:
      'EcoTech PU organizes campus electricity, water, and waste monitoring into an explainable dashboard structured around a Measure → Detect → Act → Verify corrective-action workflow.',
    approach:
      'Organizes resource telemetry against baselines, highlights deviations for investigation, and structures corrective actions from detection through verification.',
    engineeringValue:
      'Full-stack dashboard architecture, baseline deviation analysis logic, explainable prioritization, and structured operational workflows.',
    fullFeatures: [
      'Electricity baseline analysis for identifying unusual consumption patterns.',
      'After-hours energy investigation views.',
      'Water consumption analysis across monitored campus zones.',
      'Waste category monitoring and breakdown views.',
      'Explainable prioritization of flagged resource anomalies.',
      'Measure → Detect → Act → Verify corrective-action workflow.',
    ],
    testingDocumentation:
      'Repository documentation: 59 passing tests and a verified production build.',
    limitations: {
      badge: 'Simulated Demonstration Data',
      shortNote: 'Uses simulated demo data (not connected to live campus sensors).',
      details: [
        'This project uses simulated demonstration data and is not connected to live campus hardware sensors.',
        'Displayed deviations serve as investigation triggers in the workflow, not proof of real-world leaks, energy losses, or financial savings.',
      ],
    },
    schematicType: 'ecotech',
  },
  {
    id: 'rag-pdf-chatbot',
    index: '03',
    title: 'RAG-Based PDF Chatbot',
    shortTitle: 'RAG PDF Chatbot',
    categoryLabel: 'Generative AI · Retrieval Pipeline',
    filterCategories: ['Generative AI', 'AI / ML'],
    githubUrl: 'https://github.com/Chinmay-C12331/RAG',
    technologies: [
      'Python',
      'Streamlit',
      'LangChain',
      'ChromaDB',
      'Hugging Face Embeddings',
      'Google Gemini API',
    ],
    problemStatement:
      'Unconstrained language models can hallucinate facts that do not exist within a user’s source PDF document.',
    cardFeatures: [
      'Splits uploaded PDFs into 1,000-character chunks with 200-character overlap.',
      'Indexes Hugging Face sentence-transformer embeddings in ChromaDB for top-3 retrieval.',
      'Generates grounded Gemini answers with source-page references and absent-answer checks.',
    ],
    overview:
      'A document question-answering application that processes uploaded PDFs into overlapping chunks, embeds them in ChromaDB, and answers questions using top-three retrieved chunks with source-page attribution.',
    approach:
      'Retrieves the top three relevant document chunks from ChromaDB and supplies them as strict grounding context to Gemini.',
    engineeringValue:
      'End-to-end PDF ingestion, overlapping chunking strategy, vector similarity search, source-page citations, and hallucination-guard prompting.',
    fullFeatures: [
      'PDF upload and automated text extraction pipeline.',
      'Text chunking configured at 1,000-character chunks with 200-character overlap.',
      'Hugging Face sentence-transformer embeddings generation.',
      'ChromaDB vector storage and similarity indexing.',
      'Top-three relevant chunk retrieval per user query.',
      'Gemini answer generation grounded in retrieved document context.',
      'Source-page display alongside generated answers.',
      'Explicit instructions for indicating when an answer is absent from the document.',
    ],
    limitations: {
      badge: 'Grounded Retrieval Scope',
      shortNote: 'Single-turn grounded QA over uploaded PDF chunks.',
      details: [
        'Focused on grounded question-answering over uploaded PDF chunks with source-page citations.',
        'Does not claim multi-agent orchestration or persistent cross-session memory beyond the repository implementation.',
      ],
    },
    schematicType: 'rag',
  },
  {
    id: 'password-strength',
    index: '04',
    title: 'AI-Based Password Strength Prediction — Research Prototype',
    shortTitle: 'Password Strength Prototype',
    categoryLabel: 'AI / ML · Deep Learning Research Prototype',
    filterCategories: ['AI / ML'],
    githubUrl: 'https://github.com/Chinmay-C12331/AI-Based_Password_Strength_Prediction',
    technologies: ['Python', 'PyTorch', 'Deep Learning', 'Feature Engineering', 'ONNX'],
    problemStatement:
      'Basic character-rule password meters often miss structural sequence patterns and combined guessability indicators.',
    cardFeatures: [
      'Combines a 2-layer bidirectional LSTM + attention pooling with a 22-feature MLP branch.',
      'Trains with asymmetric Huber loss via a structured PyTorch data pipeline.',
      'Exports quantized ONNX INT8 weights for lightweight client-side inference.',
    ],
    overview:
      'An experimental deep learning research prototype combining a two-layer bidirectional LSTM with additive attention pooling and a parallel MLP branch over 22 engineered pattern features, exported to ONNX INT8.',
    approach:
      'Merges character-level sequence representation (BiLSTM + attention) with 22 explicit engineered structural features in a hybrid PyTorch network.',
    engineeringValue:
      'Multi-branch neural architecture design, domain feature engineering, asymmetric Huber loss formulation, and ONNX INT8 model quantization.',
    fullFeatures: [
      'Two-layer bidirectional LSTM for character sequence modeling.',
      'Additive attention pooling over sequence hidden states.',
      'Parallel MLP branch utilizing 22 engineered password pattern features.',
      'Asymmetric Huber loss function during training.',
      'Structured data preparation and training pipeline in PyTorch.',
      'ONNX INT8 export for client-side inference exploration.',
    ],
    limitations: {
      badge: 'Research Prototype · Synthetic Data Only',
      shortNote: 'Validated on synthetic demonstration data only (research prototype).',
      details: [
        'Clearly labeled as a research prototype: the pipeline has been validated on synthetic demonstration data only.',
        'Does not claim real-world breach-corpus accuracy benchmarks or production-grade security validation.',
      ],
    },
    schematicType: 'password',
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'inamigos-foundation',
    role: 'Web Development Intern',
    organization: 'InAmigos Foundation',
    dates: 'May 13–26, 2026',
    duration: '14-Day Internship',
    summary:
      'Contributed to NGO web awareness content, UI/UX layout reviews, and responsive frontend design during a focused two-week internship.',
    highlights: [
      'Developed and refined NGO awareness webpage sections and analysed existing user flows to recommend UI/UX improvements.',
      'Designed Figma wireframes and layouts for donation workflows, volunteer registration, impact metrics, and campaign showcases.',
      'Applied HTML, CSS, Bootstrap, and AI-assisted frontend workflows to improve responsive layout structure.',
    ],
    technologiesUsed: ['HTML', 'CSS', 'Bootstrap', 'Figma', 'UI/UX Analysis'],
  },
];

export const ACHIEVEMENT_ITEMS: AchievementItem[] = [
  {
    id: 'tech-tambola',
    title: 'Second Place — Tech Tambola',
    eventOrOrganizer: 'Technopia, Presidency University',
    date: 'January 2026',
    category: 'Award',
    badgeText: '2nd Place Award · Two-Person Team',
    summary:
      'Earned Second Place in the Tech Tambola technical competition at Technopia as part of a two-person team.',
  },
  {
    id: 'promptwars',
    title: 'PromptWars AI Challenge',
    eventOrOrganizer: 'GEN AI CLUB, Presidency University & Hack2Skill',
    category: 'Hackathon / Challenge',
    badgeText: 'Challenge Project Build · Individual/Project',
    summary:
      'Developed ScamSniffer (AI Recruitment Fraud and Phishing Inspector) combining Gemini extraction with deterministic scoring.',
    linkedProjectId: 'scamsniffer',
  },
  {
    id: 'build-with-trea',
    title: 'Build with Trea Hackathon',
    eventOrOrganizer: 'Team: Dark Pulse',
    category: 'Hackathon / Challenge',
    badgeText: 'Team Hackathon Contribution',
    summary:
      'Collaborated with Team Dark Pulse to prototype a University Face Attendance System using face recognition.',
  },
  {
    id: 'aws-bootcamp',
    title: 'AWS Core Skills Bootcamp',
    eventOrOrganizer: 'AWS Student Builder Group, Presidency University',
    date: 'September 1, 2026',
    category: 'Workshop & Participation',
    badgeText: 'Bootcamp Participation (Not a Certification)',
    summary:
      'Participated in hands-on cloud fundamentals sessions organized by the AWS Student Builder Group.',
  },
  {
    id: 'mcp-workshop',
    title: 'MCP Mega Workshop',
    eventOrOrganizer: 'NxtWave CCBP 4.0 Academy',
    category: 'Workshop & Participation',
    badgeText: 'Completed Workshop (Not a Certification)',
    summary:
      'Completed technical workshop on Model Context Protocol (MCP) context integration patterns for LLM applications.',
  },
];

export const LEARNING_ROADMAP: RoadmapTrack[] = [
  {
    id: 'roadmap-sde',
    number: '01',
    title: 'Software Engineering and DSA',
    summary: 'Strengthening core algorithmic problem-solving and maintainable software design.',
    accentColor: 'cyan',
    items: [
      'Data Structures & Algorithms in Python',
      'Object-Oriented Programming & modular design',
      'Backend API structure & automated testing',
    ],
  },
  {
    id: 'roadmap-ml',
    number: '02',
    title: 'Machine Learning',
    summary: 'Deepening practical understanding of neural architectures and evaluation pipelines.',
    accentColor: 'violet',
    items: [
      'Deep learning fundamentals & PyTorch workflows',
      'Feature engineering & model evaluation rigor',
      'Lightweight model export & inference (ONNX)',
    ],
  },
  {
    id: 'roadmap-genai',
    number: '03',
    title: 'Generative AI',
    summary: 'Building reliable, grounded LLM applications and retrieval architectures.',
    accentColor: 'blue',
    items: [
      'Grounded RAG pipelines & vector indexing',
      'Structured outputs with Google Gemini & GenAI SDK',
      'Reliable prompt engineering & verification guardrails',
    ],
  },
];
