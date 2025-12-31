import { MAIN_CATEGORIES } from '@/data/constants';
import { TabType } from '@/types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="lg:sticky lg:top-24">
        <h3 className="hidden lg:block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-3">
          Menu Principal
        </h3>
        
        {/* Mobile: Horizontal scroll, Desktop: Vertical list */}
        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
          {MAIN_CATEGORIES.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                  isActive 
                    ? 'gradient-hero text-primary-foreground shadow-lg' 
                    : 'bg-card border border-border hover:bg-accent hover:border-primary/20'
                }`}
              >
                <span className={`transition-colors duration-300 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                  {item.icon}
                </span>
                <span className="font-semibold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Ad Placeholder */}
        <div className="hidden lg:block mt-6 p-4 rounded-2xl bg-muted/50 border border-border">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Publicité</div>
          <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">300x400</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
