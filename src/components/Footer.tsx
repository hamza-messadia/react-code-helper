import { Send } from 'lucide-react';
import { LOGO_URL } from '@/data/constants';
import { TabType } from '@/types';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  darkMode: boolean;
}

export const Footer = ({ setActiveTab, darkMode }: FooterProps) => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src={darkMode 
                ? "https://www.image-heberg.fr/files/17498449931691648663.png" 
                : LOGO_URL
              } 
              alt="Clinivium" 
              className="h-8 w-auto mb-4"
              onError={(e) => { 
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150x40?text=CLINIVIUM"; 
              }}
            />
            <p className="text-sm text-muted-foreground">
              La plateforme de référence pour les professionnels de santé.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Ressources</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setActiveTab('protocols')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Protocoles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('scores')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Scores
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('news')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Actualités
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Légal & Support</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setActiveTab('about')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terms')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Conditions d'utilisation
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="flex-1 px-4 py-2 rounded-xl bg-muted border border-border text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <button className="p-2.5 rounded-xl gradient-hero text-primary-foreground hover:opacity-90 transition-opacity">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 CLINIVIUM. TOUS DROITS RÉSERVÉS.
          </p>
        </div>
      </div>
    </footer>
  );
};
