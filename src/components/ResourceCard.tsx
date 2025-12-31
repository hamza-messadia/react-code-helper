import React from 'react';
import { Heart, Clock, ChevronRight } from 'lucide-react';
import { Resource } from '@/types';
import { MAIN_CATEGORIES, SPECIALTIES } from '@/data/constants';

interface ResourceCardProps {
  resource: Resource;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpen: (resource: Resource) => void;
  index: number;
}

export const ResourceCard = ({ resource, isFavorite, onToggleFavorite, onOpen, index }: ResourceCardProps) => {
  const specialty = SPECIALTIES.find(s => s.id === resource.specialty);
  const category = MAIN_CATEGORIES.find(c => c.id === resource.category);

  return (
    <div 
      className="group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/30 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary group-hover:gradient-hero group-hover:text-primary-foreground transition-all duration-500">
            {category?.icon}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(resource.id);
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isFavorite 
                ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' 
                : 'bg-transparent text-muted-foreground hover:bg-muted hover:text-destructive'
            }`}
            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {resource.title}
        </h3>

        {/* Specialty Tag */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            {specialty?.icon && React.cloneElement(specialty.icon as React.ReactElement, { size: 12 })}
            {specialty?.label || 'Général'}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock size={14} />
          {resource.time}
        </div>
        
        <button
          onClick={() => onOpen(resource)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-foreground text-background hover:gradient-hero hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg transform active:scale-95"
        >
          Ouvrir
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
