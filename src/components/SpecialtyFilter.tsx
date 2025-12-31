import React from 'react';
import { SPECIALTIES } from '@/data/constants';

interface SpecialtyFilterProps {
  activeSpecialty: string;
  setActiveSpecialty: (specialty: string) => void;
}

export const SpecialtyFilter = ({ activeSpecialty, setActiveSpecialty }: SpecialtyFilterProps) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Spécialités</h2>
        <span className="text-xs text-muted-foreground">Filtrer par domaine</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {SPECIALTIES.map((spec) => {
          const isActive = activeSpecialty === spec.id;
          return (
            <button
              key={spec.id}
              onClick={() => setActiveSpecialty(spec.id)}
              className={`group relative flex-shrink-0 w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 border ${
                isActive 
                  ? 'gradient-hero border-primary text-primary-foreground shadow-xl scale-105 -translate-y-1' 
                  : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`}>
                {spec.icon}
              </div>
              <span className="text-xs font-bold">{spec.label}</span>
              
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary-foreground/50" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
