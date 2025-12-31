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
  // Modal-specific styles
  gradient: string;
  bgLight: string;
  textColor: string;
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
    actionLabel: 'Voir',
    actionIcon: <FileText size={16} />,
    gradient: 'from-sky-500 to-sky-600',
    bgLight: 'bg-sky-50 dark:bg-sky-900/20',
    textColor: 'text-sky-600 dark:text-sky-400',
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
    gradient: 'from-violet-500 to-violet-600',
    bgLight: 'bg-violet-50 dark:bg-violet-900/20',
    textColor: 'text-violet-600 dark:text-violet-400',
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
    actionLabel: 'Voir le résultat',
    actionIcon: <Target size={16} />,
    gradient: 'from-emerald-500 to-emerald-600',
    bgLight: 'bg-emerald-50 dark:bg-emerald-900/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
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
    gradient: 'from-teal-500 to-teal-600',
    bgLight: 'bg-teal-50 dark:bg-teal-900/20',
    textColor: 'text-teal-600 dark:text-teal-400',
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
    gradient: 'from-amber-500 to-amber-600',
    bgLight: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400',
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
    gradient: 'from-rose-500 to-rose-600',
    bgLight: 'bg-rose-50 dark:bg-rose-900/20',
    textColor: 'text-rose-600 dark:text-rose-400',
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
    gradient: 'from-indigo-500 to-indigo-600',
    bgLight: 'bg-indigo-50 dark:bg-indigo-900/20',
    textColor: 'text-indigo-600 dark:text-indigo-400',
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
    gradient: 'from-orange-500 to-orange-600',
    bgLight: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400',
  },
};

export const getCategoryConfig = (categoryId: string): CategoryConfig => {
  return CATEGORY_CONFIG[categoryId] || CATEGORY_CONFIG.pdf;
};
