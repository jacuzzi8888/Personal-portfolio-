
export interface CaseStudy {
  problem: string;
  role: string;
  process: string;
  outcome: string;
  imageUrl: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  caseStudy: CaseStudy;
  // Fix: Add optional properties used in SimulationModal.tsx
  codeSnippet?: string;
  simulationOutput?: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  homepage: string | null;
}

export interface FetchedProjectInfo {
    name: string;
    description: string;
    tags: string[];
    caseStudy: CaseStudy;
}