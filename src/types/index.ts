export interface Resource {
  id: number;
  title: string;
  time: string;
  size: string;
  version: string;
  specialty: string;
  category: string;
  scoreId?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface Specialty {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export type TabType = 
  | 'dashboard' 
  | 'favorites' 
  | 'pdf' 
  | 'classifications' 
  | 'scores' 
  | 'protocols' 
  | 'medicaments' 
  | 'news' 
  | 'congres' 
  | 'courses'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';
