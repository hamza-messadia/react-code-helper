import { 
  LayoutDashboard, FileText, ListTree, Activity, Stethoscope, 
  Pill, Newspaper, CalendarDays, BookOpen, Heart, Brain, 
  Baby, Bone, Droplets, Eye, Thermometer, Sparkles
} from 'lucide-react';

export const MAIN_CATEGORIES = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={18} /> },
  { id: 'favorites', label: 'Favoris', icon: <Heart size={18} /> },
  { id: 'pdf', label: 'Ressources PDF', icon: <FileText size={18} /> },
  { id: 'classifications', label: 'Classifications', icon: <ListTree size={18} /> },
  { id: 'scores', label: 'Scores Médicaux', icon: <Activity size={18} /> },
  { id: 'protocols', label: 'Protocoles - CAT', icon: <Stethoscope size={18} /> },
  { id: 'medicaments', label: 'Médicaments', icon: <Pill size={18} /> },
  { id: 'news', label: 'Actualités', icon: <Newspaper size={18} /> },
  { id: 'congres', label: 'Congrès', icon: <CalendarDays size={18} /> },
  { id: 'courses', label: 'Formations', icon: <BookOpen size={18} /> },
];

export const SPECIALTIES = [
  { id: 'all', label: 'Tous', icon: <Sparkles size={20} /> },
  { id: 'cardio', label: 'Cardio', icon: <Heart size={20} /> },
  { id: 'neuro', label: 'Neuro', icon: <Brain size={20} /> },
  { id: 'pediatrie', label: 'Pédia', icon: <Baby size={20} /> },
  { id: 'ortho', label: 'Ortho', icon: <Bone size={20} /> },
  { id: 'internal', label: 'Interne', icon: <Stethoscope size={20} /> },
  { id: 'hemo', label: 'Hémo', icon: <Droplets size={20} /> },
  { id: 'ophta', label: 'Ophta', icon: <Eye size={20} /> },
  { id: 'infectio', label: 'Infectio', icon: <Thermometer size={20} /> },
];

export const generateMockData = () => {
  return Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    title: i % 3 === 0 
      ? `Protocole de traitement de l'arthrite aiguë ${i + 1}` 
      : i % 2 === 0 
      ? `Guide posologique pédiatrique - Edition ${i + 1}` 
      : `Critères de diagnostic : Infarctus et AVC ${i + 1}`,
    time: `${i + 1} jours`,
    size: "1.2 MB",
    version: "2024",
    specialty: ['cardio', 'neuro', 'pediatrie', 'ortho', 'internal', 'hemo'][i % 6],
    category: ['pdf', 'scores', 'protocols', 'medicaments'][i % 4]
  }));
};

export const LOGO_URL = "http://www.image-heberg.fr/files/17669817152199019983.png";
