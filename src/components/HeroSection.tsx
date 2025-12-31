import { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, Sparkles } from 'lucide-react';
import { Resource } from '@/types';
import { MAIN_CATEGORIES, SPECIALTIES } from '@/data/constants';

interface HeroSectionProps {
  allCards: Resource[];
  onOpenResource: (resource: Resource) => void;
}

export const HeroSection = ({ allCards, onOpenResource }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.length > 0 
    ? allCards.filter(card => card.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <section className="relative py-16 lg:py-24 overflow-visible">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-8 animate-fade-in">
          <Sparkles size={14} className="text-primary" />
          <span className="text-xs font-bold text-accent-foreground">Référentiel Médical Certifié</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          L'excellence médicale{' '}
          <span className="text-gradient">à portée de clic</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Accédez instantanément aux derniers protocoles, scores et guides thérapeutiques validés par les experts.
        </p>

        {/* Search */}
        <div ref={searchRef} className="relative max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl gradient-hero opacity-20 blur-xl" />
            <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
              <div className="flex items-center px-5">
                <Search size={22} className="text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowResults(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  placeholder="Rechercher un protocole, médicament, score..."
                  className="w-full bg-transparent border-none focus:ring-0 text-lg py-4 px-4 outline-none text-foreground font-medium placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-[9999] animate-scale-in">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search size={14} className="text-primary" />
                  <span className="text-xs font-bold text-muted-foreground uppercase">
                    Résultats ({searchResults.length})
                  </span>
                </div>
                <button 
                  onClick={() => setShowResults(false)} 
                  className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.slice(0, 8).map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          onOpenResource(result);
                          setShowResults(false);
                        }}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-accent cursor-pointer transition-all duration-300 group text-left"
                      >
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary group-hover:gradient-hero group-hover:text-primary-foreground transition-all duration-300">
                          {MAIN_CATEGORIES.find(c => c.id === result.category)?.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                            {result.title}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {SPECIALTIES.find(s => s.id === result.specialty)?.label}
                          </span>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Aucun résultat trouvé
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
