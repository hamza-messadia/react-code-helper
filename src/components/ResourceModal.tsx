import React, { useState } from 'react';
import { X, Clock, Share2, Heart, ExternalLink, Copy, CheckCircle2, BookOpen, AlertTriangle, FileText, Calendar, Users, GraduationCap, Pill, Stethoscope } from 'lucide-react';
import { Resource } from '@/types';
import { SPECIALTIES } from '@/data/constants';
import { getCategoryConfig } from '@/data/categoryConfig';
import { getScoreById } from '@/data/medicalScores';
import { ScoreCalculator } from './ScoreCalculator';

interface ResourceModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ResourceModal = ({ resource, isOpen, onClose, isFavorite, onToggleFavorite }: ResourceModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !resource) return null;

  const categoryConfig = getCategoryConfig(resource.category);
  const specialty = SPECIALTIES.find(s => s.id === resource.specialty);
  
  // Check if this is a score with calculator
  const scoreData = resource.category === 'scores' ? getScoreById(resource.scoreId || '') : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(resource.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCategoryContent = () => {
    // If it's a score with calculator data, show the calculator
    if (scoreData) {
      return <ScoreCalculator score={scoreData} />;
    }

    // Different content based on category
    switch (resource.category) {
      case 'pdf':
        return (
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                  <FileText size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground mb-1">Document PDF</h4>
                  <p className="text-sm text-muted-foreground mb-3">Téléchargez ce document pour consultation hors ligne</p>
                  <button className="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 transition-colors">
                    Télécharger le PDF
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Ce document est fourni à titre informatif. Vérifiez toujours les sources officielles pour les mises à jour.
              </p>
            </div>
          </div>
        );

      case 'protocols':
        return (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
              <div className="flex items-center gap-3 mb-4">
                <Stethoscope size={24} className="text-teal-600" />
                <h4 className="font-bold text-foreground">Conduite à Tenir</h4>
              </div>
              <div className="space-y-3">
                {['Évaluation initiale du patient', 'Examens complémentaires', 'Prise en charge thérapeutique', 'Surveillance et suivi'].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-card border border-teal-100 dark:border-teal-800">
                    <span className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                    <span className="text-sm font-medium text-foreground">{step}</span>
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
                { label: 'Posologie adulte', value: '500mg x 2/j' },
                { label: 'Durée', value: '7-14 jours' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <Pill size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-800 dark:text-red-200 text-sm mb-1">Contre-indications</p>
                <p className="text-sm text-red-700 dark:text-red-300">Allergie connue, insuffisance rénale sévère, grossesse (1er trimestre)</p>
              </div>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-4">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-900/10 flex items-center justify-center border border-red-200 dark:border-red-800">
              <div className="text-center">
                <BookOpen size={32} className="text-red-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Image d'illustration</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Découvrez les dernières avancées et recommandations dans le domaine médical. 
              Cet article présente les points clés à retenir pour votre pratique clinique quotidienne.
            </p>
          </div>
        );

      case 'congres':
        return (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="font-bold text-foreground">15-17 Mars 2024</p>
                  <p className="text-sm text-muted-foreground">Paris, France</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Users size={16} />
                <span>+500 participants attendus</span>
              </div>
            </div>
            <button className="w-full py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors">
              S'inscrire au congrès
            </button>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap size={24} className="text-amber-600" />
                <h4 className="font-bold text-foreground">Programme de formation</h4>
              </div>
              <div className="space-y-2">
                {['Module 1: Introduction', 'Module 2: Théorie', 'Module 3: Pratique', 'Évaluation finale'].map((mod, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-card">
                    <span className="text-sm font-medium text-foreground">{mod}</span>
                    <span className="text-xs text-muted-foreground">2h</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div>
                <p className="font-bold text-green-800 dark:text-green-200">Formation DPC</p>
                <p className="text-sm text-green-600 dark:text-green-400">8 crédits</p>
              </div>
              <CheckCircle2 size={24} className="text-green-500" />
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6 rounded-xl bg-muted/50 border border-border text-center">
            <p className="text-muted-foreground">Contenu à venir...</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-card rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
        {/* Header */}
        <div className={`relative h-28 bg-gradient-to-r ${categoryConfig.gradientClass} overflow-hidden flex-shrink-0`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-8 w-40 h-40 border-4 border-white rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 border-4 border-white rounded-full" />
          </div>
          
          <div className="relative h-full flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                {categoryConfig.headerIcon}
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                  {categoryConfig.modalBadge}
                </span>
                {specialty && (
                  <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
                    {React.cloneElement(specialty.icon as React.ReactElement, { size: 14 })}
                    <span>{specialty.label}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="px-6 py-4 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-bold text-foreground leading-tight">
            {scoreData?.fullName || resource.title}
          </h2>
          {scoreData && (
            <p className="text-sm text-muted-foreground mt-1">{scoreData.description}</p>
          )}
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderCategoryContent()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between flex-shrink-0 bg-muted/30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(resource.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                isFavorite 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-500' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
              {isFavorite ? 'Favori' : 'Ajouter'}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-muted-foreground hover:bg-muted transition-colors">
              <Share2 size={16} />
            </button>
          </div>

          <button 
            onClick={onClose}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r ${categoryConfig.gradientClass} text-white hover:opacity-90 transition-opacity`}
          >
            <ExternalLink size={14} />
            {categoryConfig.actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
