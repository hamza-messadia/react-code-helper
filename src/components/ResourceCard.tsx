import React from 'react';
import { Heart, Clock, ChevronRight, Bookmark } from 'lucide-react';
import { Resource } from '@/types';
import { SPECIALTIES } from '@/data/constants';
import { getCategoryConfig } from '@/data/categoryConfig';

interface ResourceCardProps {
  resource: Resource;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpen: (resource: Resource) => void;
  index: number;
}

export const ResourceCard = ({ resource, isFavorite, onToggleFavorite, onOpen, index }: ResourceCardProps) => {
  const specialty = SPECIALTIES.find(s => s.id === resource.specialty);
  const categoryConfig = getCategoryConfig(resource.category);

  return (
    <div 
      className={`group relative bg-card rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-fade-in cursor-pointer ${categoryConfig.borderClass} hover:shadow-xl`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onOpen(resource)}
    >
      {/* Category Color Bar */}
      <div className={`h-1.5 bg-gradient-to-r ${categoryConfig.gradientClass}`} />

      {/* Card Content */}
      <div className="relative p-5">
        {/* Header with Icon and Favorite */}
        <div className="flex items-start justify-between mb-4">
          {/* Category Icon with themed background */}
          <div className={`relative w-14 h-14 rounded-xl ${categoryConfig.bgClass} flex items-center justify-center ${categoryConfig.colorClass} transition-all duration-300 group-hover:scale-110`}>
            {categoryConfig.icon}
            {/* Floating badge */}
            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r ${categoryConfig.gradientClass} flex items-center justify-center`}>
              <Bookmark size={10} className="text-white" />
            </div>
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(resource.id);
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isFavorite 
                ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' 
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-destructive'
            }`}
            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Category Label */}
        <div className="mb-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${categoryConfig.bgClass} ${categoryConfig.colorClass}`}>
            {categoryConfig.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-foreground mb-3 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors duration-300">
          {resource.title}
        </h3>

        {/* Specialty Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
            {specialty?.icon && React.cloneElement(specialty.icon as React.ReactElement, { size: 12, className: 'text-muted-foreground' })}
            <span className="text-xs font-medium text-muted-foreground">{specialty?.label || 'Général'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock size={12} />
            {resource.time}
          </div>
        </div>
      </div>

      {/* Footer with Action Button */}
      <div className={`px-5 py-4 border-t ${categoryConfig.borderClass} bg-muted/20 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">v{resource.version}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{resource.size}</span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen(resource);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r ${categoryConfig.gradientClass} text-white hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-lg transform active:scale-95`}
        >
          {categoryConfig.actionLabel}
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`}>
        <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent`} />
      </div>
    </div>
  );
};
