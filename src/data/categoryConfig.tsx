import { 
  FileText, ListTree, Activity, Stethoscope, Pill, 
  Newspaper, CalendarDays, BookOpen, Download, Calculator,
  ClipboardList, Globe, Users, GraduationCap,
  FileDown, Layers, Target, Syringe, Radio, UserCheck, Award
} from 'lucide-react';

export interface CategoryConfig {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  headerIcon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  gradientClass: string;
  modalBadge: string;
  actionLabel: string;
  actionIcon: React.ReactNode;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  pdf: {
    id: 'pdf',
    label: 'Ressources PDF',
    description: 'Documents et références téléchargeables',
    icon: <FileText size={20} />,
    headerIcon: <FileDown size={24} />,
    colorClass: 'text-category-pdf',
    bgClass: 'bg-category-pdf-light',
    borderClass: 'border-category-pdf/30',
    gradientClass: 'from-blue-500 to-blue-600',
    modalBadge: 'Document PDF',
    actionLabel: 'Télécharger',
    actionIcon: <Download size={16} />,
  },
  classifications: {
    id: 'classifications',
    label: 'Classifications',
    description: 'Classifications et critères diagnostiques',
    icon: <ListTree size={20} />,
    headerIcon: <Layers size={24} />,
    colorClass: 'text-category-classifications',
    bgClass: 'bg-category-classifications-light',
    borderClass: 'border-category-classifications/30',
    gradientClass: 'from-purple-500 to-purple-600',
    modalBadge: 'Classification',
    actionLabel: 'Consulter',
    actionIcon: <ListTree size={16} />,
  },
  scores: {
    id: 'scores',
    label: 'Scores Médicaux',
    description: 'Calculateurs et scores cliniques',
    icon: <Activity size={20} />,
    headerIcon: <Calculator size={24} />,
    colorClass: 'text-category-scores',
    bgClass: 'bg-category-scores-light',
    borderClass: 'border-category-scores/30',
    gradientClass: 'from-emerald-500 to-emerald-600',
    modalBadge: 'Score Médical',
    actionLabel: 'Calculer',
    actionIcon: <Target size={16} />,
  },
  protocols: {
    id: 'protocols',
    label: 'Protocoles - CAT',
    description: 'Conduite à tenir et protocoles thérapeutiques',
    icon: <Stethoscope size={20} />,
    headerIcon: <ClipboardList size={24} />,
    colorClass: 'text-category-protocols',
    bgClass: 'bg-category-protocols-light',
    borderClass: 'border-category-protocols/30',
    gradientClass: 'from-teal-500 to-teal-600',
    modalBadge: 'Protocole CAT',
    actionLabel: 'Appliquer',
    actionIcon: <Stethoscope size={16} />,
  },
  medicaments: {
    id: 'medicaments',
    label: 'Médicaments',
    description: 'Fiches médicamenteuses et posologies',
    icon: <Pill size={20} />,
    headerIcon: <Pill size={24} />,
    colorClass: 'text-category-medicaments',
    bgClass: 'bg-category-medicaments-light',
    borderClass: 'border-category-medicaments/30',
    gradientClass: 'from-orange-500 to-orange-600',
    modalBadge: 'Médicament',
    actionLabel: 'Voir posologie',
    actionIcon: <Syringe size={16} />,
  },
  news: {
    id: 'news',
    label: 'Actualités',
    description: 'Dernières actualités médicales',
    icon: <Newspaper size={20} />,
    headerIcon: <Radio size={24} />,
    colorClass: 'text-category-news',
    bgClass: 'bg-category-news-light',
    borderClass: 'border-category-news/30',
    gradientClass: 'from-red-500 to-red-600',
    modalBadge: 'Actualité',
    actionLabel: 'Lire plus',
    actionIcon: <Globe size={16} />,
  },
  congres: {
    id: 'congres',
    label: 'Congrès',
    description: 'Événements et conférences médicales',
    icon: <CalendarDays size={20} />,
    headerIcon: <Users size={24} />,
    colorClass: 'text-category-congres',
    bgClass: 'bg-category-congres-light',
    borderClass: 'border-category-congres/30',
    gradientClass: 'from-indigo-500 to-indigo-600',
    modalBadge: 'Congrès',
    actionLabel: "S'inscrire",
    actionIcon: <UserCheck size={16} />,
  },
  courses: {
    id: 'courses',
    label: 'Formations',
    description: 'Cours et formations continues',
    icon: <BookOpen size={20} />,
    headerIcon: <GraduationCap size={24} />,
    colorClass: 'text-category-courses',
    bgClass: 'bg-category-courses-light',
    borderClass: 'border-category-courses/30',
    gradientClass: 'from-amber-500 to-amber-600',
    modalBadge: 'Formation',
    actionLabel: 'Commencer',
    actionIcon: <Award size={16} />,
  },
};

export const getCategoryConfig = (categoryId: string): CategoryConfig => {
  return CATEGORY_CONFIG[categoryId] || CATEGORY_CONFIG.pdf;
};
