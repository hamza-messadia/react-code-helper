import { useState } from 'react';
import { Loader2, Plus, FolderOpen } from 'lucide-react';
import { Resource, TabType } from '@/types';
import { MAIN_CATEGORIES } from '@/data/constants';
import { ResourceCard } from './ResourceCard';

interface ResourceGridProps {
  resources: Resource[];
  activeTab: TabType;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onOpenResource: (resource: Resource) => void;
  onResetFilters: () => void;
}

export const ResourceGrid = ({ 
  resources, 
  activeTab, 
  favorites, 
  onToggleFavorite, 
  onOpenResource,
  onResetFilters 
}: ResourceGridProps) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + 8);
      setIsLoadingMore(false);
    }, 500);
  };

  const activeCategory = MAIN_CATEGORIES.find(c => c.id === activeTab);

  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <FolderOpen size={32} className="text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold text-muted-foreground mb-4">
          {activeTab === 'favorites' 
            ? "Vous n'avez aucun favori pour le moment." 
            : 'Aucune ressource disponible.'
          }
        </p>
        {activeTab !== 'favorites' && (
          <button 
            onClick={onResetFilters}
            className="text-primary font-bold text-sm hover:underline"
          >
            Réinitialiser les filtres →
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground">
            {activeCategory?.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{activeCategory?.label}</h2>
            <p className="text-sm text-muted-foreground">{resources.length} résultats</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {resources.slice(0, visibleItems).map((resource, index) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            isFavorite={favorites.includes(resource.id)}
            onToggleFavorite={onToggleFavorite}
            onOpen={onOpenResource}
            index={index}
          />
        ))}
      </div>

      {/* Load More */}
      {visibleItems < resources.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm bg-card border-2 border-border hover:border-primary hover:text-primary transition-all duration-300 disabled:opacity-50"
          >
            {isLoadingMore ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Plus size={18} />
            )}
            {isLoadingMore ? 'Chargement...' : 'Voir plus de résultats'}
          </button>
        </div>
      )}
    </div>
  );
};
