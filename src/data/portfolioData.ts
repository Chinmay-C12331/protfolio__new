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
    'Computer Science and Engineering undergraduate (CGPA 9.27/10) with university coursework in AI and Machine Learning and hands-on project experience in Python, LLM integrations and RAG applications.',
  availabilityStatus: 'Open to Internship Opportunities',
  degree: 'B.Tech in Computer Science and Engineering',
  university: 'Presidency University, Bengaluru',
  shortUniversity: 'Presidency University',
  location: 'Bengaluru, Karnataka, India',
  cgpa: '9.27/10',
  graduationClass: 'Class of 2028',
  relevantCoursework:
    'Essentials of Artificial Intelligence (completed); Machine Learning (currently studying, theory & laboratory; supervised learning module completed)',
  email: 'chinmaychoudhari510@gmail.com',
  githubUrl: 'https://github.com/Chinmay-C12331',
  linkedinUrl: 'https://www.linkedin.com/in/chinmay-choudhari/',
  portfolioUrl: 'https://chinmay-jc.vercel.app',
  resumePath: '/assets/aistudio/chinmay-resume_40026351.pdf',
};

export const ABOUT_SUMMARY =
  'Computer Science and Engineering undergraduate (CGPA 9.27/10) with university coursework in AI and Machine Learning and hands-on project experience in Python, LLM integrations and RAG applications. Projects include a Gemini-based scam inspector, a PDF question-answering system and a deep learning research prototype. Seeking Software Engineering, AI/ML and Generative AI internships.';

export const HOLOGRAPHIC_NODES: HolographicNodeInfo[] = [
  {
    id: 'node-python',
    label: 'PYTHON',
    category: 'Core Language',
    summary: 'Intermediate proficiency across RAG pipelines, PyTorch prototypes, and ML labs.',
    targetSection: 'skills',
    position: [-2.15, 1.35, 0.55],
    color: '#22D3EE',
  },
  {
    id: 'node-gemini',
    label: 'GEMINI',
    category: 'LLM Integration',
    summary: 'Applied in ScamSniffer and RAG-Based PDF Chatbot for grounded analysis.',
    targetSection: 'projects',
    filterCategory: 'Generative AI',
    projectId: 'scamsniffer',
    position: [2.1, 1.5, 0.45],
    color: '#8B5CF6',
  },
  {
    id: 'node-aiml',
    label: 'AI / ML',
    category: 'Coursework & Prototypes',
    summary: 'Supervised learning coursework, Pandas/scikit-learn labs, and PyTorch BiLSTM prototype.',
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
    summary: 'Full-stack dashboards, deterministic rule engines, and automated test suites.',
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
    title: 'Programming & Fundamentals',
    subtitle: 'Languages and core computer science foundations.',
    skills: [
      { name: 'Python', exposure: 'Project Experience', note: 'Intermediate' },
      { name: 'JavaScript & TypeScript', exposure: 'Project Experience' },
      { name: 'C', exposure: 'Coursework / Lab Exposure' },
      { name: 'Java', exposure: 'Coursework / Lab Exposure', note: 'Beginner' },
      {
        name: 'Data Structures & Algorithms',
        exposure: 'Coursework / Lab Exposure',
        note: 'Beginner · HackerRank practice',
      },
      { name: 'DBMS & Object-Oriented Programming', exposure: 'Coursework / Lab Exposure' },
    ],
  },
  {
    id: 'data-science-ml',
    title: 'Data Science and Machine Learning',
    subtitle: 'University ML coursework, lab libraries, and deep learning prototype tools.',
    skills: [
      { name: 'Pandas & scikit-learn', exposure: 'Coursework / Lab Exposure' },
      { name: 'Matplotlib & Seaborn', exposure: 'Coursework / Lab Exposure' },
      { name: 'Supervised Learning Fundamentals', exposure: 'Coursework / Lab Exposure' },
      { name: 'Data Preprocessing, Analysis & Visualization', exposure: 'Coursework / Lab Exposure' },
      { name: 'PyTorch, Feature Engineering & ONNX', exposure: 'Project Experience' },
      { name: 'Deep Learning Fundamentals', exposure: 'Project Experience' },
    ],
  },
  {
    id: 'ai-genai',
    title: 'AI and Generative AI',
    subtitle: 'LLM integrations, embeddings, and retrieval-augmented generation.',
    skills: [
      { name: 'Google Gemini API & Google GenAI SDK', exposure: 'Project Experience' },
      { name: 'LLM Integration & RAG', exposure: 'Project Experience' },
      { name: 'LangChain & ChromaDB', exposure: 'Project Experience' },
      { name: 'Embeddings & Hugging Face Embeddings', exposure: 'Project Experience' },
    ],
  },
  {
    id: 'web-technologies',
    title: 'Web Technologies',
    subtitle: 'Frontend and backend technologies applied in projects and internships.',
    skills: [
      { name: 'HTML, CSS & Bootstrap', exposure: 'Project Experience', note: 'Project exposure' },
      { name: 'React, Next.js & Tailwind CSS', exposure: 'Project Experience', note: 'Project exposure' },
      { name: 'Node.js, Express & Vite', exposure: 'Project Experience', note: 'Project exposure' },
      { name: 'Streamlit', exposure: 'Project Experience', note: 'Project exposure' },
    ],
  },
  {
    id: 'tools-platforms',
    title: 'Tools and Platforms',
    subtitle: 'Version control, cloud/API configuration, and AI-assisted development.',
    skills: [
      { name: 'Git & GitHub', exposure: 'Project Experience' },
      { name: 'Google AI Studio', exposure: 'Project Experience' },
      {
        name: 'Google Cloud Console & OAuth 2.0',
        exposure: 'Project Experience',
        note: 'Project & API config',
      },
      {
        name: 'AI-Assisted Development',
        exposure: 'Project Experience',
        note: 'Gemini, Claude',
      },
      { name: 'Docker, n8n & Figma', exposure: 'Project Experience' },
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
    title: 'ScamSniffer — AI Fake Offer Letter and Phishing Inspector',
    shortTitle: 'ScamSniffer',
    categoryLabel: 'Individual Project · PromptWars AI Challenge',
    filterCategories: ['Software Engineering', 'AI / ML', 'Generative AI'],
    githubUrl: 'https://github.com/Chinmay-C12331/ScamSniffer_',
    technologies: ['TypeScript', 'Node.js', 'Python', 'Google Gemini', 'Google GenAI SDK'],
    problemStatement:
      'Convincing fake offer letters, recruiter outreach, and phishing URLs make it difficult for job seekers to verify recruitment authenticity.',
    cardFeatures: [
      'Inspects job offers, recruiter messages and URLs across six fraud vectors with cited evidence.',
      'Separates Gemini linguistic extraction from a deterministic 0–100% Scam Threat Index rule engine.',
      'Returns UNABLE_TO_VERIFY instead of fabricating domain metadata; 24 Node.js & 12 Python tests passing.',
    ],
    overview:
      'Built an individual web application for the PromptWars AI Challenge that inspects job offers, recruiter messages and recruitment URLs across six fraud vectors and returns risk findings backed by evidence cited from the input.',
    approach:
      'Separated language understanding from scoring: Gemini extracts linguistic evidence while a deterministic rule engine computes an auditable 0–100% Scam Threat Index.',
    engineeringValue:
      'Auditable hybrid risk scoring, zero fabricated domain metadata via explicit UNABLE_TO_VERIFY states, and an interactive in-app self-test.',
    fullFeatures: [
      'Inspects job offers, recruiter messages and recruitment URLs across six fraud vectors.',
      'Returns risk findings backed by linguistic evidence cited directly from the input.',
      'Uses Gemini to extract linguistic evidence while a deterministic rule engine computes an auditable 0–100% Scam Threat Index.',
      'Returns "UNABLE_TO_VERIFY" instead of fabricating unavailable domain metadata.',
      'Includes an interactive in-app self-test alongside automated test suites.',
    ],
    testingDocumentation:
      'Repository README documents 24 Node.js and 12 Python tests passing, plus an interactive in-app self-test.',
    limitations: {
      badge: 'Individual Project · Verification Scope',
      shortNote: 'Individual project · Evidence-backed inspection with UNABLE_TO_VERIFY fallback.',
      details: [
        'Individual project built for the PromptWars AI Challenge.',
        'Returns explicit UNABLE_TO_VERIFY outcomes instead of fabricating unavailable domain metadata; does not claim guaranteed fraud prevention.',
      ],
    },
    schematicType: 'scamsniffer',
  },
  {
    id: 'ecotech-pu',
    index: '02',
    title: 'EcoTech PU — Campus Resource Intelligence Dashboard',
    shortTitle: 'EcoTech PU',
    categoryLabel: 'Team Project · IEEE 5-Hour Hackathon',
    filterCategories: ['Software Engineering'],
    githubUrl: 'https://github.com/Chinmay-C12331/EcoTech_PU',
    technologies: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express'],
    problemStatement:
      'Campus electricity, water and waste data require baseline comparison and structured prioritization to investigate potential inefficiencies.',
    cardFeatures: [
      'Team-built dashboard for electricity, water & waste with baseline comparison, anomaly rules and CSV ingestion.',
      'Individual contribution: research-driven AI Studio prompting, development and deployment.',
      'Includes an explainable 0–100 priority score and Measure → Detect → Act → Verify workflow.',
    ],
    overview:
      'Contributed to a team-built dashboard (React, TypeScript, Tailwind CSS, Express) during an IEEE 5-hour hackathon for electricity, water and waste data with baseline comparison, rule-based anomaly detection and CSV ingestion.',
    approach:
      'My individual contributions focused on research-driven AI Studio prompting, application development and deployment, supporting an explainable 0–100 priority score (severity, persistence, confidence, effort) and a Measure, Detect, Act, Verify workflow.',
    engineeringValue:
      'Explainable 0–100 anomaly prioritization, CSV ingestion, rule-based baseline comparisons, and 59 passing automated tests.',
    fullFeatures: [
      'Electricity, water and waste monitoring with baseline comparison and rule-based anomaly detection.',
      'CSV data ingestion and structured anomaly investigation views.',
      'Individual contributions: research-driven AI Studio prompting, development and deployment.',
      'Explainable 0–100 priority score based on severity, persistence, confidence and effort.',
      'Measure → Detect → Act → Verify corrective-action workflow.',
    ],
    testingDocumentation:
      'Repository README documents 59 passing automated tests.',
    limitations: {
      badge: 'Team Project · Simulated Demonstration Data',
      shortNote: 'Team project (IEEE 5-hour hackathon) · Uses simulated demo data, not live sensors.',
      details: [
        'Team project built during an IEEE 5-hour hackathon (individual contributions: research-driven AI Studio prompting, development and deployment).',
        'Uses simulated demonstration data, not live sensors; deviations are framed as investigation triggers, not confirmed waste.',
      ],
    },
    schematicType: 'ecotech',
  },
  {
    id: 'rag-pdf-chatbot',
    index: '03',
    title: 'RAG-Based PDF Chatbot',
    shortTitle: 'RAG PDF Chatbot',
    categoryLabel: 'Individual Project · Generative AI & RAG',
    filterCategories: ['Generative AI', 'AI / ML'],
    githubUrl: 'https://github.com/Chinmay-C12331/RAG',
    technologies: [
      'Python',
      'Streamlit',
      'LangChain',
      'ChromaDB',
      'Hugging Face Sentence Transformers',
      'Google Gemini API',
    ],
    problemStatement:
      'Standard LLM queries over long documents can produce ungrounded answers without verifiable source page citations.',
    cardFeatures: [
      'Splits uploaded PDFs into 1,000-character chunks with 200-character overlap.',
      'Embeds text with Hugging Face sentence-transformers and stores vectors in ChromaDB.',
      'Retrieves top-3 chunks to ground Gemini answers with source page numbers and absent-info checks.',
    ],
    overview:
      'Built an individual document question-answering application using Retrieval-Augmented Generation that splits uploaded PDFs into overlapping chunks, indexes them in ChromaDB, and grounds Gemini responses in the top three retrieved chunks.',
    approach:
      'Retrieves the top three chunks from ChromaDB to ground Gemini answers in document context, with explicit prompt instructions to state when information is absent and display source page numbers.',
    engineeringValue:
      'End-to-end RAG ingestion, 1,000/200 overlapping chunk strategy, Hugging Face vector indexing in ChromaDB, and source-page attribution.',
    fullFeatures: [
      'Uploaded PDFs are split into 1,000-character chunks with 200-character overlap.',
      'Embedded using Hugging Face sentence-transformers and stored in ChromaDB.',
      'Retrieves the top three chunks per query to ground Gemini answers in document context.',
      'Includes prompt instructions to state clearly when information is absent from the PDF.',
      'Displays source page numbers alongside generated answers.',
    ],
    limitations: {
      badge: 'Individual Project · Grounded Retrieval Scope',
      shortNote: 'Individual project · Grounded top-3 chunk QA with source page numbers.',
      details: [
        'Individual project focused on grounded document question-answering over uploaded PDFs.',
        'Explicitly instructs the model to state when information is absent rather than guessing.',
      ],
    },
    schematicType: 'rag',
  },
  {
    id: 'password-strength',
    index: '04',
    title: 'AI-Based Password Strength Prediction — Research Prototype',
    shortTitle: 'Password Strength Prototype',
    categoryLabel: 'Individual Research Prototype · Deep Learning',
    filterCategories: ['AI / ML'],
    githubUrl: 'https://github.com/Chinmay-C12331/AI-Based_Password_Strength_Prediction',
    technologies: ['Python', 'PyTorch', 'Deep Learning', 'Feature Engineering', 'ONNX'],
    problemStatement:
      'Rule-only password meters often overlook sequence patterns and combined structural guessability.',
    cardFeatures: [
      'Fuses a 2-layer bidirectional LSTM + additive attention pooling with a 22-feature MLP branch.',
      'Trained with an asymmetric Huber loss in PyTorch to penalize strength overestimation.',
      'Includes data preparation, training/evaluation pipeline and ONNX INT8 export for client inference.',
    ],
    overview:
      'Developed an individual hybrid password guessability research prototype: a two-layer bidirectional LSTM with additive attention pooling fused with an MLP branch over 22 engineered pattern features, trained with an asymmetric Huber loss.',
    approach:
      'Built the data preparation, training and evaluation pipeline in PyTorch along with an ONNX INT8 export for client-side inference exploration.',
    engineeringValue:
      'Multi-branch sequence + feature neural architecture, asymmetric Huber loss to penalize overestimation, and quantized ONNX INT8 export.',
    fullFeatures: [
      'Two-layer bidirectional LSTM with additive attention pooling.',
      'Fused with an MLP branch over 22 engineered password pattern features.',
      'Trained with an asymmetric Huber loss to penalize strength overestimation.',
      'Complete data preparation, training and evaluation pipeline in PyTorch.',
      'ONNX INT8 export for lightweight client-side inference.',
    ],
    limitations: {
      badge: 'Individual Research Prototype · Synthetic Data Only',
      shortNote: 'Individual research prototype · Validated on synthetic demonstration data only.',
      details: [
        'Individual research prototype validated on synthetic demonstration data only, with no real-world performance claims.',
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
    dates: 'May 13 – 26, 2026',
    duration: '14-Day Internship',
    summary:
      'Focused two-week web development and UI/UX contribution sprint improving NGO web content and layouts.',
    highlights: [
      'Developed and improved NGO awareness webpage content using HTML, CSS and Bootstrap concepts.',
      'Analyzed the NGO website and contributed UI/UX improvement suggestions; designed Figma layouts for donation, volunteer registration, impact statistics, campaign showcase and testimonial features.',
      'Improved a portfolio website using AI-assisted development tools and frontend fundamentals.',
    ],
    technologiesUsed: ['HTML', 'CSS', 'Bootstrap', 'Figma', 'UI/UX Analysis', 'AI-Assisted Development'],
  },
];

export const ACHIEVEMENT_ITEMS: AchievementItem[] = [
  {
    id: 'tech-tambola',
    title: 'Second Place — Tech Tambola',
    eventOrOrganizer: 'Technopia, Presidency University',
    date: 'January 2026',
    category: 'Award',
    badgeText: 'Second Place · Two-Person Team',
    summary:
      'Second Place in Tech Tambola at Technopia, Presidency University (January 2026) as part of a two-person team.',
  },
  {
    id: 'promptwars',
    title: 'PromptWars AI Challenge',
    eventOrOrganizer: 'GEN AI CLUB, Presidency University & Hack2Skill',
    category: 'Hackathon / Challenge',
    badgeText: 'Participant · Individual Project Build',
    summary:
      'Participated in the PromptWars AI Challenge and built ScamSniffer (AI Fake Offer Letter and Phishing Inspector).',
    linkedProjectId: 'scamsniffer',
  },
  {
    id: 'build-with-trea',
    title: 'Build with Trea Hackathon (Team Dark Pulse)',
    eventOrOrganizer: 'Build with Trea Hackathon',
    category: 'Hackathon / Challenge',
    badgeText: 'Participant · Team Contribution',
    summary:
      'Contributed to a team University Face Attendance System using face recognition as part of Team Dark Pulse.',
  },
  {
    id: 'aws-bootcamp',
    title: 'AWS Core Skills Bootcamp',
    eventOrOrganizer: 'AWS Student Builder Group, Presidency University',
    date: '1 September 2026',
    category: 'Workshop & Participation',
    badgeText: 'Participant · Bootcamp Activity',
    summary:
      'Participated in the AWS Core Skills Bootcamp organized by the AWS Student Builder Group at Presidency University.',
  },
  {
    id: 'mcp-workshop',
    title: 'Model Context Protocol (MCP) Mega Workshop',
    eventOrOrganizer: 'NxtWave CCBP 4.0 Academy',
    category: 'Workshop & Participation',
    badgeText: 'Completed Workshop',
    summary:
      'Completed the Model Context Protocol (MCP) Mega Workshop by NxtWave CCBP 4.0 Academy.',
  },
];

export const LEARNING_ROADMAP: RoadmapTrack[] = [
  {
    id: 'roadmap-sde',
    number: '01',
    title: 'Software Engineering and DSA',
    summary: 'Strengthening core algorithmic problem-solving and object-oriented software design.',
    accentColor: 'cyan',
    items: [
      'Data Structures & Algorithms (HackerRank practice in arrays, strings, loops & functions)',
      'Object-Oriented Programming & DBMS fundamentals',
      'Testable backend & full-stack application workflows',
    ],
  },
  {
    id: 'roadmap-ml',
    number: '02',
    title: 'Machine Learning',
    summary: 'Advancing university ML theory, laboratory work, and neural model prototyping.',
    accentColor: 'violet',
    items: [
      'Machine Learning theory & lab coursework (Supervised Learning completed)',
      'Data preprocessing, analysis & visualization with Pandas, scikit-learn, Matplotlib & Seaborn',
      'PyTorch sequence models, feature engineering & ONNX export',
    ],
  },
  {
    id: 'roadmap-genai',
    number: '03',
    title: 'Generative AI',
    summary: 'Building grounded LLM integrations, embeddings, and retrieval pipelines.',
    accentColor: 'blue',
    items: [
      'Grounded RAG pipelines with LangChain, ChromaDB & Hugging Face Embeddings',
      'Structured extraction & verification with Google Gemini API & GenAI SDK',
      'Model Context Protocol (MCP) & AI-assisted engineering workflows',
    ],
  },
];
