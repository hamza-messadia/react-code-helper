import React, { useState, useRef } from 'react';
import { X, Clock, Share2, Heart, ExternalLink, Copy, CheckCircle2, AlertTriangle, FileText, Calendar, Users, GraduationCap, Stethoscope, Calculator, ListTree, Newspaper, Pill as PillIcon, Target, Download, BookOpen, UserCheck } from 'lucide-react';
import { Resource } from '@/types';
import { SPECIALTIES } from '@/data/constants';
import { getScoreById } from '@/data/medicalScores';
import { ScoreCalculator } from './ScoreCalculator';

interface ResourceModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const getCategoryConfig = (category: string) => {
  const configs: Record<string, { icon: React.ReactNode; label: string; gradient: string; bgLight: string; textColor: string; actionLabel: string; actionIcon: React.ReactNode }> = {
    pdf: { 
      icon: <FileText size={24} />, 
      label: 'Document PDF',
      gradient: 'from-sky-500 to-sky-600',
      bgLight: 'bg-sky-50 dark:bg-sky-900/20',
      textColor: 'text-sky-600 dark:text-sky-400',
      actionLabel: 'Voir',
      actionIcon: <FileText size={16} />
    },
    classifications: { 
      icon: <ListTree size={24} />, 
      label: 'Classification',
      gradient: 'from-violet-500 to-violet-600',
      bgLight: 'bg-violet-50 dark:bg-violet-900/20',
      textColor: 'text-violet-600 dark:text-violet-400',
      actionLabel: 'Consulter',
      actionIcon: <ListTree size={16} />
    },
    scores: { 
      icon: <Calculator size={24} />, 
      label: 'Score Médical',
      gradient: 'from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50 dark:bg-emerald-900/20',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      actionLabel: 'Voir le résultat',
      actionIcon: <Target size={16} />
    },
    protocols: { 
      icon: <Stethoscope size={24} />, 
      label: 'Protocole CAT',
      gradient: 'from-primary to-teal-600',
      bgLight: 'bg-teal-50 dark:bg-teal-900/20',
      textColor: 'text-teal-600 dark:text-teal-400',
      actionLabel: 'Appliquer',
      actionIcon: <Stethoscope size={16} />
    },
    medicaments: { 
      icon: <PillIcon size={24} />, 
      label: 'Médicament',
      gradient: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-600 dark:text-amber-400',
      actionLabel: 'Voir posologie',
      actionIcon: <PillIcon size={16} />
    },
    news: { 
      icon: <Newspaper size={24} />, 
      label: 'Actualité',
      gradient: 'from-rose-500 to-rose-600',
      bgLight: 'bg-rose-50 dark:bg-rose-900/20',
      textColor: 'text-rose-600 dark:text-rose-400',
      actionLabel: 'Lire plus',
      actionIcon: <ExternalLink size={16} />
    },
    congres: { 
      icon: <Calendar size={24} />, 
      label: 'Congrès',
      gradient: 'from-indigo-500 to-indigo-600',
      bgLight: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      actionLabel: "S'inscrire",
      actionIcon: <UserCheck size={16} />
    },
    courses: { 
      icon: <GraduationCap size={24} />, 
      label: 'Formation',
      gradient: 'from-orange-500 to-orange-600',
      bgLight: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      actionLabel: 'Commencer',
      actionIcon: <BookOpen size={16} />
    },
  };
  return configs[category] || configs.pdf;
};

export const ResourceModal = ({ resource, isOpen, onClose, isFavorite, onToggleFavorite }: ResourceModalProps) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !resource) return null;

  const config = getCategoryConfig(resource.category);
  const specialty = SPECIALTIES.find(s => s.id === resource.specialty);
  const scoreData = resource.category === 'scores' ? getScoreById(resource.scoreId || '') : null;

  const handleAction = () => {
    if (resource.category === 'scores' && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resource.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    if (scoreData) {
      return <ScoreCalculator score={scoreData} />;
    }

    switch (resource.category) {
      case 'pdf':
        return (
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl ${config.bgLight} border border-sky-200 dark:border-sky-800`}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${config.gradient} flex items-center justify-center text-white shadow-lg`}>
                  <FileText size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">Télécharger le document</p>
                  <p className="text-sm text-muted-foreground">Format PDF • Consultation hors ligne</p>
                </div>
                <button className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${config.gradient} text-white font-bold text-sm hover:opacity-90 transition-opacity`}>
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        );

      case 'protocols':
        return (
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl ${config.bgLight}`}>
              <h4 className={`font-bold ${config.textColor} mb-4`}>Étapes de la conduite à tenir</h4>
              <div className="space-y-3">
                {['Évaluation initiale', 'Examens complémentaires', 'Prise en charge', 'Surveillance'].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-r ${config.gradient} text-white flex items-center justify-center text-sm font-bold`}>{idx + 1}</span>
                    <span className="font-medium text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'medicaments':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Classe', value: 'Antibiotique' },
                { label: 'Voie', value: 'PO / IV' },
                { label: 'Posologie', value: '500mg x 2/j' },
                { label: 'Durée', value: '7-14 jours' },
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${config.bgLight}`}>
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-700 dark:text-red-300 text-sm">Contre-indications</p>
                <p className="text-sm text-red-600 dark:text-red-400">Allergie connue, insuffisance rénale sévère</p>
              </div>
            </div>
          </div>
        );

      case 'congres':
        return (
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl ${config.bgLight}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${config.gradient} flex items-center justify-center text-white`}>
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="font-bold text-foreground">15-17 Mars 2024</p>
                  <p className="text-sm text-muted-foreground">Paris, France</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} />
                <span>+500 participants attendus</span>
              </div>
            </div>
            <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${config.gradient} text-white font-bold hover:opacity-90 transition-opacity`}>
              S'inscrire au congrès
            </button>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl ${config.bgLight}`}>
              <h4 className={`font-bold ${config.textColor} mb-4`}>Programme de formation</h4>
              <div className="space-y-2">
                {['Introduction', 'Théorie', 'Pratique', 'Évaluation'].map((mod, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                    <span className="font-medium text-foreground">Module {idx + 1}: {mod}</span>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded-lg bg-muted">2h</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
              <div>
                <p className="font-bold text-green-700 dark:text-green-300">Formation DPC</p>
                <p className="text-sm text-green-600 dark:text-green-400">8 crédits validants</p>
              </div>
              <CheckCircle2 size={24} className="text-green-500" />
            </div>
          </div>
        );

      default:
        return (
          <div className={`p-6 rounded-2xl ${config.bgLight} text-center`}>
            <p className="text-muted-foreground">Contenu détaillé à venir...</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] bg-card rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
        {/* Header */}
        <div className={`relative h-24 bg-gradient-to-r ${config.gradient} overflow-hidden flex-shrink-0`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-40 h-40 border-4 border-white rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-4 border-white rounded-full translate-y-1/2 -translate-x-1/4" />
          </div>
          
          <div className="relative h-full flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                {config.icon}
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                  {config.label}
                </span>
                {specialty && (
                  <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
                    {React.cloneElement(specialty.icon as React.ReactElement, { size: 14 })}
                    <span>{specialty.label}</span>
                  </div>
                )}
              </div>
            </div>

            <button onClick={onClose} className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="px-6 py-4 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-bold text-foreground">
            {scoreData?.fullName || resource.title}
          </h2>
          {scoreData && <p className="text-sm text-muted-foreground mt-1">{scoreData.description}</p>}
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>{resource.time}</span>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between flex-shrink-0 bg-muted/30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(resource.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                isFavorite 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-500' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button onClick={handleCopy} className="p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors">
              {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
            <button className="p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors">
              <Share2 size={18} />
            </button>
          </div>

          <button 
            onClick={handleAction}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 transition-opacity`}
          >
            {config.actionIcon}
            {config.actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
