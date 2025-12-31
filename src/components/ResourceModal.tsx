import { X, Clock, Share2, Heart, ShieldCheck, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { Resource } from '@/types';
import { SPECIALTIES } from '@/data/constants';
import { getCategoryConfig } from '@/data/categoryConfig';
import { useState } from 'react';

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

  const handleCopy = () => {
    navigator.clipboard.writeText(resource.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-card rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Category Color Header */}
        <div className={`relative h-32 bg-gradient-to-r ${categoryConfig.gradientClass} overflow-hidden`}>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border-4 border-white rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border-4 border-white rounded-full" />
          </div>
          
          {/* Header Icon */}
          <div className="absolute top-6 left-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              {categoryConfig.headerIcon}
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-6 right-6">
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold">
              {categoryConfig.modalBadge}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 hidden sm:flex p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 -mt-8 relative">
          {/* Title Card */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryConfig.bgClass} ${categoryConfig.colorClass}`}>
                Version {resource.version}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={12} />
                {resource.time}
              </span>
              {specialty && (
                <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                  {specialty.icon && React.cloneElement(specialty.icon as React.ReactElement, { size: 10 })}
                  {specialty.label}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {resource.title}
            </h2>
          </div>

          {/* Warning based on category */}
          <div className={`flex gap-3 p-4 rounded-xl ${categoryConfig.bgClass} border ${categoryConfig.borderClass} mb-6`}>
            <ShieldCheck size={20} className={categoryConfig.colorClass + " flex-shrink-0 mt-0.5"} />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {resource.category === 'medicaments' && 'Avertissement posologique'}
                {resource.category === 'protocols' && 'Note clinique importante'}
                {resource.category === 'scores' && 'Interprétation du score'}
                {resource.category === 'news' && 'Source vérifiée'}
                {resource.category === 'pdf' && 'Document certifié'}
                {resource.category === 'classifications' && 'Critères officiels'}
                {resource.category === 'congres' && 'Événement validé'}
                {resource.category === 'courses' && 'Formation accréditée'}
              </p>
              <p className="text-sm text-muted-foreground">
                {resource.category === 'medicaments' && 'Vérifiez toujours les contre-indications et adaptez la posologie au patient.'}
                {resource.category === 'protocols' && 'Ce protocole est un guide. Adaptez-le au contexte clinique spécifique.'}
                {resource.category === 'scores' && 'Ce score doit être interprété dans le contexte clinique global du patient.'}
                {resource.category === 'news' && 'Information validée par notre équipe éditoriale médicale.'}
                {resource.category === 'pdf' && 'Document vérifié et mis à jour régulièrement.'}
                {resource.category === 'classifications' && 'Basé sur les dernières recommandations internationales.'}
                {resource.category === 'congres' && 'Événement reconnu par les organismes de formation continue.'}
                {resource.category === 'courses' && 'Formation validante pour le DPC (Développement Professionnel Continu).'}
              </p>
            </div>
          </div>

          {/* Action Section */}
          <div className={`flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryConfig.gradientClass} flex items-center justify-center`}>
                {categoryConfig.actionIcon && React.cloneElement(categoryConfig.actionIcon as React.ReactElement, { className: 'text-white' })}
              </div>
              <div>
                <p className="font-bold text-foreground">{categoryConfig.actionLabel}</p>
                <p className="text-xs text-muted-foreground">{resource.size} • {categoryConfig.label}</p>
              </div>
            </div>
            <button className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${categoryConfig.gradientClass} text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2`}>
              {categoryConfig.actionIcon}
              {categoryConfig.actionLabel}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(resource.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                isFavorite 
                  ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
              {isFavorite ? 'Favori' : 'Ajouter'}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
              {copied ? 'Copié!' : 'Copier'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              Fermer
            </button>
            <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r ${categoryConfig.gradientClass} text-white hover:opacity-90 transition-opacity`}>
              <ExternalLink size={14} />
              Ouvrir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
