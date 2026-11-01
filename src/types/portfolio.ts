export type ProjectFilterCategory =
  | 'All Projects'
  | 'Software Engineering'
  | 'AI / ML'
  | 'Generative AI';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  categoryLabel: string;
  filterCategories: Exclude<ProjectFilterCategory, 'All Projects'>[];
  githubUrl: string;
  technologies: string[];
  problemStatement: string;
  cardFeatures: [string, string, string];
  overview: string;
  approach: string;
  engineeringValue: string;
  fullFeatures: string[];
  testingDocumentation?: string;
  limitations?: {
    badge: string;
    shortNote: string;
    details: string[];
  };
  schematicType: 'scamsniffer' | 'ecotech' | 'rag' | 'password';
}

export type ExposureLevel = 'Project Experience' | 'Coursework / Lab Exposure';

export interface SkillItem {
  name: string;
  exposure: ExposureLevel;
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  dates: string;
  duration: string;
  summary: string;
  highlights: string[];
  technologiesUsed: string[];
}

export type AchievementCategory =
  | 'Award'
  | 'Hackathon / Challenge'
  | 'Workshop & Participation';

export interface AchievementItem {
  id: string;
  title: string;
  eventOrOrganizer: string;
  date?: string;
  category: AchievementCategory;
  badgeText: string;
  summary: string;
  linkedProjectId?: string;
}

export interface RoadmapTrack {
  id: string;
  number: string;
  title: string;
  summary: string;
  items: string[];
  accentColor: 'cyan' | 'violet' | 'blue';
}

export interface HolographicNodeInfo {
  id: string;
  label: string;
  category: string;
  summary: string;
  targetSection: string;
  filterCategory?: ProjectFilterCategory;
  projectId?: string;
  position: [number, number, number];
  color: string;
}
