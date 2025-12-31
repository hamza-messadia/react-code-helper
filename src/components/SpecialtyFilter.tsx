import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SPECIALTIES } from '@/data/constants';

interface SpecialtyFilterProps {
  activeSpecialty: string;
  setActiveSpecialty: (specialty: string) => void;
}

export const SpecialtyFilter = ({ activeSpecialty, setActiveSpecialty }: SpecialtyFilterProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-8">
      <div className="relative">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 -ml-2"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar px-10 py-2"
        >
          {SPECIALTIES.map((spec) => {
            const isActive = activeSpecialty === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => setActiveSpecialty(spec.id)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-teal-600 border-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105' 
                    : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-primary hover:shadow-md'
                }`}
              >
                <span className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                  {React.cloneElement(spec.icon as React.ReactElement, { 
                    size: 18,
                    strokeWidth: isActive ? 2.5 : 2
                  })}
                </span>
                <span className="font-semibold text-sm whitespace-nowrap">{spec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 -mr-2"
        >
          <ChevronRight size={20} />
        </button>

        {/* Fade edges */}
        <div className="absolute left-8 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-8 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
