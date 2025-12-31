import { 
  LayoutDashboard, FileText, ListTree, Activity, Stethoscope, 
  Pill, Newspaper, CalendarDays, BookOpen, Heart, Brain, 
  Baby, Bone, Droplets, Eye, Thermometer, Sparkles, Ear, 
  Scissors, Ribbon, Syringe, Smile, Dna, Zap, Hand, 
  Footprints, Microscope, ShieldPlus, HeartPulse, Scan, Wind
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
  { id: 'cardio', label: 'Cardiologie', icon: <Heart size={20} /> },
  { id: 'neuro', label: 'Neurologie', icon: <Brain size={20} /> },
  { id: 'pediatrie', label: 'Pédiatrie', icon: <Baby size={20} /> },
  { id: 'ortho', label: 'Orthopédie', icon: <Bone size={20} /> },
  { id: 'internal', label: 'Médecine Interne', icon: <Stethoscope size={20} /> },
  { id: 'hemo', label: 'Hématologie', icon: <Droplets size={20} /> },
  { id: 'ophta', label: 'Ophtalmologie', icon: <Eye size={20} /> },
  { id: 'infectio', label: 'Infectiologie', icon: <Thermometer size={20} /> },
  { id: 'pneumo', label: 'Pneumologie', icon: <Wind size={20} /> },
  { id: 'orl', label: 'ORL', icon: <Ear size={20} /> },
  { id: 'gastro', label: 'Gastro-entérologie', icon: <Pill size={20} /> },
  { id: 'chirurgie', label: 'Chirurgie', icon: <Scissors size={20} /> },
  { id: 'onco', label: 'Oncologie', icon: <Ribbon size={20} /> },
  { id: 'endocrino', label: 'Endocrinologie', icon: <Syringe size={20} /> },
  { id: 'dermato', label: 'Dermatologie', icon: <Hand size={20} /> },
  { id: 'nephro', label: 'Néphrologie', icon: <Activity size={20} /> },
  { id: 'uro', label: 'Urologie', icon: <ShieldPlus size={20} /> },
  { id: 'gyneco', label: 'Gynécologie', icon: <HeartPulse size={20} /> },
  { id: 'psy', label: 'Psychiatrie', icon: <Smile size={20} /> },
  { id: 'radio', label: 'Radiologie', icon: <Scan size={20} /> },
  { id: 'genetique', label: 'Génétique', icon: <Dna size={20} /> },
  { id: 'urgences', label: 'Urgences', icon: <Zap size={20} /> },
  { id: 'geriatrie', label: 'Gériatrie', icon: <Footprints size={20} /> },
  { id: 'bio', label: 'Biologie', icon: <Microscope size={20} /> },
];

export const generateMockData = () => {
  const scores = [
    { id: 101, title: 'Score CHA₂DS₂-VASc', scoreId: 'chadsvasc', specialty: 'cardio' },
    { id: 102, title: 'Score HAS-BLED', scoreId: 'hasbled', specialty: 'cardio' },
    { id: 103, title: 'Score de Wells - TVP', scoreId: 'wells-dvt', specialty: 'cardio' },
    { id: 104, title: 'Score de Wells - EP', scoreId: 'wells-pe', specialty: 'cardio' },
    { id: 105, title: 'Score de Glasgow (GCS)', scoreId: 'glasgow', specialty: 'neuro' },
    { id: 106, title: 'NIHSS - AVC', scoreId: 'nihss', specialty: 'neuro' },
    { id: 107, title: 'Score APGAR', scoreId: 'apgar', specialty: 'pediatrie' },
    { id: 108, title: 'Score Child-Pugh', scoreId: 'child-pugh', specialty: 'internal' },
    { id: 109, title: 'Score SOFA', scoreId: 'sofa', specialty: 'internal' },
    { id: 110, title: 'Score CURB-65', scoreId: 'curb65', specialty: 'internal' },
  ];

  // Sample cards for each category
  const sampleCards = [
    { id: 201, title: 'Guide des Antibiotiques 2024', category: 'pdf', specialty: 'infectio', time: '5 jours', size: '2.3 MB', version: '2024' },
    { id: 202, title: 'Classification TNM des Cancers', category: 'classifications', specialty: 'onco', time: '10 jours', size: '1.1 MB', version: '2024' },
    { id: 203, title: 'CAT devant une Douleur Thoracique', category: 'protocols', specialty: 'urgences', time: '3 jours', size: '0.8 MB', version: '2024' },
    { id: 204, title: 'Amoxicilline - Fiche Complète', category: 'medicaments', specialty: 'infectio', time: '7 jours', size: '0.5 MB', version: '2024' },
    { id: 205, title: 'Nouvelles recommandations HTA 2024', category: 'news', specialty: 'cardio', time: '1 jour', size: '-', version: '2024' },
    { id: 206, title: 'Congrès Européen de Cardiologie', category: 'congres', specialty: 'cardio', time: '15-18 Mars 2024', size: '-', version: '2024' },
    { id: 207, title: 'Formation ECG Avancée', category: 'courses', specialty: 'cardio', time: '8 heures', size: '-', version: '2024' },
  ];

  const otherResources = Array.from({ length: 38 }, (_, i) => ({
    id: i + 1,
    title: i % 4 === 0 
      ? `Protocole de prise en charge - Cas clinique ${i + 1}` 
      : i % 4 === 1 
      ? `Guide thérapeutique complet ${i + 1}` 
      : i % 4 === 2
      ? `Classification internationale ${i + 1}`
      : `Fiche médicament - Molécule ${i + 1}`,
    time: `${Math.floor(Math.random() * 30) + 1} jours`,
    size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
    version: "2024",
    specialty: ['cardio', 'neuro', 'pediatrie', 'ortho', 'internal', 'hemo'][i % 6],
    category: ['pdf', 'classifications', 'protocols', 'medicaments'][i % 4]
  }));

  const scoreResources = scores.map(s => ({
    ...s,
    time: 'Interactif',
    size: '-',
    version: '2024',
    category: 'scores',
  }));

  return [...scoreResources, ...sampleCards, ...otherResources];
};

export const LOGO_URL = "http://www.image-heberg.fr/files/17669817152199019983.png";
