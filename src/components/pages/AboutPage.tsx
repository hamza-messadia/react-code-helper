import { Info, Target, Star } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-lg">
          <Info size={24} className="text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-black text-foreground">À propos</h1>
      </div>

      <div className="bg-card rounded-2xl border border-border p-8 space-y-8">
        <div className="p-6 rounded-xl bg-accent border border-primary/20">
          <p className="text-accent-foreground leading-relaxed">
            <strong>Clinivium</strong> est une plateforme numérique innovante dédiée aux professionnels de santé. 
            Notre mission est de centraliser et de simplifier l'accès aux connaissances médicales validées.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Target size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Notre Mission</h2>
            <p className="text-muted-foreground">
              Fournir un accès rapide, fiable et gratuit aux protocoles, scores et classifications médicales 
              pour améliorer la prise en charge des patients.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Star size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Notre Équipe</h2>
            <p className="text-muted-foreground">
              Fondé par une équipe de médecins passionnés par l'éducation médicale et la technologie, 
              Clinivium s'efforce de devenir la référence francophone pour l'aide à la décision clinique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
