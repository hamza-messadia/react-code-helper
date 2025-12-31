import React from 'react';
import { Heart, Clock, ArrowRight, FileText, Calculator, ClipboardList, Pill as PillIcon, Newspaper, CalendarDays, GraduationCap, ListTree } from 'lucide-react';
import { Resource } from '@/types';
import { SPECIALTIES } from '@/data/constants';

interface ResourceCardProps {
  resource: Resource;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpen: (resource: Resource) => void;
  index: number;
}

const getCategoryStyle = (category: string) => {
  const styles: Record<string, { icon: React.ReactNode; label: string; accent: string }> = {
    pdf: { 
      icon: <FileText size={18} />, 
      label: 'PDF',
      accent: 'from-sky-500 to-sky-600'
    },
    classifications: { 
      icon: <ListTree size={18} />, 
      label: 'Classification',
      accent: 'from-violet-500 to-violet-600'
    },
    scores: { 
      icon: <Calculator size={18} />, 
      label: 'Score',
      accent: 'from-emerald-500 to-emerald-600'
    },
    protocols: { 
      icon: <ClipboardList size={18} />, 
      label: 'Protocole',
      accent: 'from-primary to-teal-600'
    },
    medicaments: { 
      icon: <PillIcon size={18} />, 
      label: 'Médicament',
      accent: 'from-amber-500 to-amber-600'
    },
    news: { 
      icon: <Newspaper size={18} />, 
      label: 'Actualité',
      accent: 'from-rose-500 to-rose-600'
    },
    congres: { 
      icon: <CalendarDays size={18} />, 
      label: 'Congrès',
      accent: 'from-indigo-500 to-indigo-600'
    },
    courses: { 
      icon: <GraduationCap size={18} />, 
      label: 'Formation',
      accent: 'from-orange-500 to-orange-600'
    },
  };
  return styles[category] || styles.pdf;
};

export const ResourceCard = ({ resource, isFavorite, onToggleFavorite, onOpen, index }: ResourceCardProps) => {
  const specialty = SPECIALTIES.find(s => s.id === resource.specialty);
  const categoryStyle = getCategoryStyle(resource.category);

  return (
    <div 
      className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 animate-fade-in cursor-pointer border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
      style={{ animationDelay: `${index * 0.03}s` }}
      onClick={() => onOpen(resource)}
    >
      {/* Top accent line */}
      <div className={`h-1 bg-gradient-to-r ${categoryStyle.accent}`} />

      <div className="p-5">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          {/* Category Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${categoryStyle.accent} text-white`}>
            {categoryStyle.icon}
            <span className="text-xs font-bold">{categoryStyle.label}</span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(resource.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-500' 
                : 'bg-muted/50 text-muted-foreground hover:bg-red-50 hover:text-red-400 dark:hover:bg-red-900/20'
            }`}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-bold text-foreground mb-4 line-clamp-2 min-h-[2.75rem] leading-snug group-hover:text-primary transition-colors duration-300">
          {resource.title}
        </h3>

        {/* Meta Row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
          {specialty && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/50">
              {React.cloneElement(specialty.icon as React.ReactElement, { size: 12 })}
              <span className="font-medium">{specialty.label}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{resource.time}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen(resource);
          }}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 bg-muted/50 text-foreground hover:bg-gradient-to-r hover:${categoryStyle.accent} hover:text-white group/btn border border-transparent hover:border-transparent`}
        >
          <span>Ouvrir</span>
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
