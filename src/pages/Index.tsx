import { useState, useMemo, useEffect } from 'react';
import { TabType, Resource } from '@/types';
import { generateMockData } from '@/data/constants';
import { useFavorites } from '@/hooks/useFavorites';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { HeroSection } from '@/components/HeroSection';
import { SpecialtyFilter } from '@/components/SpecialtyFilter';
import { ResourceGrid } from '@/components/ResourceGrid';
import { ResourceModal } from '@/components/ResourceModal';
import { Footer } from '@/components/Footer';
import { AboutPage } from '@/components/pages/AboutPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { PrivacyPage } from '@/components/pages/PrivacyPage';
import { TermsPage } from '@/components/pages/TermsPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [activeSpecialty, setActiveSpecialty] = useState('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const allCards = useMemo(() => generateMockData(), []);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const filteredResources = useMemo(() => {
    return allCards.filter(card => {
      if (activeTab === 'favorites') {
        return favorites.includes(card.id);
      }
      
      const matchesSpecialty = activeSpecialty === 'all' || card.specialty === activeSpecialty;
      const matchesCategory = activeTab === 'dashboard' || card.category === activeTab;
      return matchesSpecialty && matchesCategory;
    });
  }, [allCards, activeSpecialty, activeTab, favorites]);

  const handleResetFilters = () => {
    setActiveTab('dashboard');
    setActiveSpecialty('all');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return (
          <>
            {activeTab !== 'favorites' && (
              <SpecialtyFilter 
                activeSpecialty={activeSpecialty}
                setActiveSpecialty={setActiveSpecialty}
              />
            )}
            <ResourceGrid 
              resources={filteredResources}
              activeTab={activeTab}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onOpenResource={setSelectedResource}
              onResetFilters={handleResetFilters}
            />
          </>
        );
    }
  };

  const isStaticPage = ['about', 'contact', 'privacy', 'terms'].includes(activeTab);

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <Header 
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Hero Section - only on dashboard */}
      {activeTab === 'dashboard' && (
        <HeroSection 
          allCards={allCards}
          onOpenResource={setSelectedResource}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`flex gap-8 ${isStaticPage ? '' : 'flex-col lg:flex-row'}`}>
          {/* Sidebar - hide on static pages */}
          {!isStaticPage && (
            <Sidebar 
              activeTab={activeTab}
              setActiveTab={handleTabChange}
            />
          )}

          {/* Content Area */}
          <div className={isStaticPage ? 'w-full' : 'flex-1 min-w-0'}>
            {renderContent()}
          </div>
        </div>
      </main>

      <Footer 
        setActiveTab={handleTabChange}
        darkMode={darkMode}
      />

      {/* Resource Modal */}
      <ResourceModal 
        resource={selectedResource}
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        isFavorite={selectedResource ? isFavorite(selectedResource.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default Index;
