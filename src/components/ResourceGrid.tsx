import { useState } from 'react';
import { Loader2, Plus, FolderOpen, LayoutGrid } from 'lucide-react';
import { Resource, TabType } from '@/types';
import { ResourceCard } from './ResourceCard';
import { getCategoryConfig } from '@/data/categoryConfig';

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

  // Get category config for the active tab
  const categoryConfig = activeTab !== 'dashboard' && activeTab !== 'favorites' 
    ? getCategoryConfig(activeTab)
    : null;

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
      {/* Header with Category Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {categoryConfig ? (
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryConfig.gradientClass} flex items-center justify-center text-white shadow-lg`}>
              {categoryConfig.icon}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground shadow-lg">
              <LayoutGrid size={20} />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {categoryConfig?.label || (activeTab === 'favorites' ? 'Mes Favoris' : 'Tableau de bord')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {categoryConfig?.description || `${resources.length} ressources disponibles`}
            </p>
          </div>
        </div>

        {/* Results count badge */}
        <div className={`px-4 py-2 rounded-xl font-bold text-sm ${
          categoryConfig 
            ? `${categoryConfig.bgClass} ${categoryConfig.colorClass}` 
            : 'bg-accent text-accent-foreground'
        }`}>
          {resources.length} résultats
        </div>
      </div>

      {/* Category Description Card (only for specific categories) */}
      {categoryConfig && (
        <div className={`p-4 rounded-xl ${categoryConfig.bgClass} border ${categoryConfig.borderClass} mb-6 flex items-center gap-4`}>
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${categoryConfig.gradientClass} flex items-center justify-center text-white`}>
            {categoryConfig.headerIcon}
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{categoryConfig.label}</p>
            <p className="text-xs text-muted-foreground">{categoryConfig.description}</p>
          </div>
        </div>
      )}

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
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 disabled:opacity-50 ${
              categoryConfig
                ? `bg-gradient-to-r ${categoryConfig.gradientClass} text-white hover:opacity-90`
                : 'bg-card border-2 border-border hover:border-primary hover:text-primary'
            }`}
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
