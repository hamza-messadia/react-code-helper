import { X, Clock, Download, Share2, Heart, ShieldCheck } from 'lucide-react';
import { Resource } from '@/types';

interface ResourceModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ResourceModal = ({ resource, isOpen, onClose, isFavorite, onToggleFavorite }: ResourceModalProps) => {
  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  Version {resource.version}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock size={12} />
                  {resource.time}
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground pr-8">
                {resource.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning */}
          <div className="flex gap-3 p-4 rounded-xl bg-accent border border-primary/20">
            <ShieldCheck size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-accent-foreground">
              Ce document est un résumé clinique destiné aux professionnels de santé. 
              Veuillez vérifier les mises à jour avant application clinique.
            </p>
          </div>

          {/* Download Section */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                <Download size={20} className="text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">Télécharger le PDF</p>
                <p className="text-xs text-muted-foreground">{resource.size} • PDF Standard</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl gradient-hero text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">
              Télécharger
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(resource.id);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              isFavorite 
                ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              Fermer
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm gradient-hero text-primary-foreground hover:opacity-90 transition-opacity">
              <Share2 size={14} />
              Partager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
