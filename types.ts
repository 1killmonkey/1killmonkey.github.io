export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'instagram';
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    tagline: string;
    description: string;
    avatarUrl: string;
  };
  about: {
    bio: string;
    skills: Skill[];
  };
  projects: Project[];
  experience: Experience[];
  socials: SocialLink[];
  theme: ThemeConfig;
}