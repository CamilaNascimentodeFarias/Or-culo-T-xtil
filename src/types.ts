export interface TextileNode {
  id: string;
  type: 'central' | 'question' | 'climate' | 'fiber' | 'dyeworks' | 'hierarchy' | 'pattern';
  title: string;
  description?: string;
  x?: number;
  y?: number;
  status?: string;
  colors?: string[]; // hex codes
  image?: string;
  data?: Record<string, any>;
}

export interface CaseStudy {
  id: string;
  code: string;
  title: string;
  description: string;
  swatchName: string;
  swatchColor: string;
  swatchImage: string;
  landscapeImage: string;
  landscapeTitle: string;
  landscapeDescription: string;
  snippet: string;
  snippetAuthor: string;
  techSpecs: {
    composition: string;
    weight: string;
    weave: string;
    warpCount: string;
    weftCount: string;
    permeability: string;
  };
}

export interface FabricDNA {
  durability: number; // percentage
  porosity: number;
  tensile: number;
  luster: number;
  weight: number;
}

export interface VisualArtifact {
  id: string;
  type: 'swatch' | 'sketch' | 'palette' | 'tile' | 'node';
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  colors?: string[];
  x: number;
  y: number;
  rotation?: number; // degrees
}

export interface TextileWorld {
  id: string;
  name: string;
  theme: string; // e.g., "Arid Highland"
  description: string;
  centralNode: TextileNode;
  questions: TextileNode[];
  archiveNodes: TextileNode[];
  caseStudy: CaseStudy;
  fabricDNA: FabricDNA;
  recommendedBase: {
    name: string;
    grade: string;
    heatRetention: number;
    moistureWick: number;
  };
  culturalAnchors: Array<{ title: string; desc: string }>;
  synthesisAccuracy: number;
  artifacts: VisualArtifact[];
}
