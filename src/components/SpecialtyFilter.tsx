import React from 'react';
import { SPECIALTIES } from '@/data/constants';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SpecialtyFilterProps {
  activeSpecialty: string;
  setActiveSpecialty: (specialty: string) => void;
}

export const SpecialtyFilter = ({ activeSpecialty, setActiveSpecialty }: SpecialtyFilterProps) => {
  return (
    <section className="mb-8">
      <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {SPECIALTIES.map((spec) => {
            const isActive = activeSpecialty === spec.id;
            return (
              <Tooltip key={spec.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActiveSpecialty(spec.id)}
                    className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-primary to-teal-600 text-primary-foreground shadow-lg scale-110 ring-2 ring-primary/30 ring-offset-2 ring-offset-background' 
                        : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105'
                    }`}
                  >
                    {React.cloneElement(spec.icon as React.ReactElement, { 
                      size: isActive ? 20 : 18,
                      strokeWidth: isActive ? 2.5 : 2
                    })}
                    
                    {/* Active dot indicator */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="font-semibold text-xs"
                >
                  {spec.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
};
