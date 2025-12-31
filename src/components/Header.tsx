import { Home, Mail, Info, Facebook, Twitter, Linkedin, Moon, Sun, Plus } from 'lucide-react';
import { TabType } from '@/types';
import logoImage from '@/assets/logo.png';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header = ({ activeTab, setActiveTab, darkMode, toggleDarkMode }: HeaderProps) => {
  const handleLogoClick = () => {
    setActiveTab('dashboard');
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex-shrink-0">
            <img 
              src={logoImage}
              alt="Clinivium" 
              className={`h-14 w-auto transition-all duration-500 ${
                darkMode 
                  ? 'brightness-0 invert' 
                  : ''
              }`}
            />
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              icon={<Home size={16} />}
            >
              Accueil
            </NavLink>
            <NavLink 
              active={activeTab === 'contact'} 
              onClick={() => setActiveTab('contact')}
              icon={<Mail size={16} />}
            >
              Contact
            </NavLink>
            <NavLink 
              active={activeTab === 'about'} 
              onClick={() => setActiveTab('about')}
              icon={<Info size={16} />}
            >
              À propos
            </NavLink>

            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
              <SocialIcon href="#"><Facebook size={16} /></SocialIcon>
              <SocialIcon href="#"><Twitter size={16} /></SocialIcon>
              <SocialIcon href="#"><Linkedin size={16} /></SocialIcon>
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative w-14 h-7 rounded-full p-0.5 transition-colors duration-500 bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Toggle Dark Mode"
            >
              <div className="absolute inset-1 flex justify-between items-center px-1">
                <Sun size={12} className="text-amber-500" />
                <Moon size={12} className="text-primary" />
              </div>
              <div 
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-card shadow-lg flex items-center justify-center transition-transform duration-500 ${
                  darkMode ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              >
                {darkMode ? (
                  <Moon size={12} className="text-primary" />
                ) : (
                  <Sun size={12} className="text-amber-500" />
                )}
              </div>
            </button>

            {/* CTA Button */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm gradient-hero text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Plus size={16} />
              Contribuer
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ 
  active, 
  onClick, 
  icon, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
      active 
        ? 'text-primary' 
        : 'text-muted-foreground hover:text-primary'
    }`}
  >
    {icon}
    {children}
  </button>
);

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-all duration-300"
  >
    {children}
  </a>
);
