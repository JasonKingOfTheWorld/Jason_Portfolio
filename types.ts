export interface ProjectSection {
  title: string;
  content: string;
  items?: string[];
  layout?: 'standard' | 'split' | 'grid-cards' | 'terminal';
  cards?: { title: string; content: string }[];
  code?: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  caseStudy: {
    problem: string;
    role: string;
    solution: string;
  };
  sections?: ProjectSection[]; // New field for flexible long-form content
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  exif: string; // e.g., "Sony A7III • 35mm f/1.4"
  width: number; // simplistic aspect ratio handling
  height: number;
}

export enum ViewState {
  HOME = 'HOME',
  PROJECT_DETAIL = 'PROJECT_DETAIL',
  GALLERY = 'GALLERY',
  ABOUT = 'ABOUT',
}

export type Language = 'en' | 'zh';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}