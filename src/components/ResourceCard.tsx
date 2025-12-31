import React from 'react';
import { Heart, Clock, ArrowRight, TrendingUp } from 'lucide-react';
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
      className={`group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-fade-in cursor-pointer shadow-sm hover:shadow-xl border border-transparent hover:border-opacity-50`}
      style={{ 
        animationDelay: `${index * 0.05}s`,
        borderColor: `hsl(var(--cat-${resource.category}))`,
      }}
      onClick={() => onOpen(resource)}
    >
      {/* Gradient Header */}
      <div className={`relative h-24 bg-gradient-to-br ${categoryConfig.gradientClass} p-4 overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -right-2 top-8 w-16 h-16 rounded-full bg-white/5" />
        
        {/* Category Icon */}
        <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
          {categoryConfig.headerIcon}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(resource.id);
          }}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isFavorite 
              ? 'bg-white text-red-500' 
              : 'bg-white/20 text-white hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Label */}
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${categoryConfig.bgClass} ${categoryConfig.colorClass}`}>
          {categoryConfig.label}
        </span>

        {/* Title */}
        <h3 className="font-bold text-foreground mb-3 line-clamp-2 min-h-[2.75rem] leading-snug group-hover:text-primary transition-colors duration-300">
          {resource.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-4">
          {specialty && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {React.cloneElement(specialty.icon as React.ReactElement, { size: 12 })}
              <span>{specialty.label}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
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
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${categoryConfig.bgClass} ${categoryConfig.colorClass} hover:bg-gradient-to-r hover:${categoryConfig.gradientClass} hover:text-white group/btn`}
        >
          {categoryConfig.actionLabel}
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>

      {/* Score indicator for scores category */}
      {resource.category === 'scores' && (
        <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm">
          <TrendingUp size={12} className="text-white" />
          <span className="text-[10px] font-bold text-white">CALC</span>
        </div>
      )}
    </div>
  );
};
