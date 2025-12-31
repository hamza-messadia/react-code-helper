import { FileText } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-lg">
          <FileText size={24} className="text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-black text-foreground">Conditions d'utilisation</h1>
      </div>

      <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Avertissement Médical Important</h2>
          <p className="text-muted-foreground">
            Les informations fournies sur Clinivium sont destinées uniquement à des fins éducatives 
            et informatives pour les professionnels de santé. Elles ne remplacent en aucun cas 
            le jugement clinique d'un médecin qualifié.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. Acceptation des conditions</h2>
          <p className="text-muted-foreground">
            En accédant à ce site web, vous acceptez d'être lié par les présentes conditions 
            d'utilisation, toutes les lois et réglementations applicables.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. Propriété intellectuelle</h2>
          <p className="text-muted-foreground">
            Le contenu publié sur ce site (textes, images, logos) est la propriété de Clinivium 
            ou de ses concédants de licence et est protégé par le droit d'auteur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">4. Limitation de responsabilité</h2>
          <p className="text-muted-foreground">
            Clinivium ne saurait être tenu responsable des dommages directs ou indirects 
            résultant de l'utilisation ou de l'impossibilité d'utiliser les documents présents sur le site.
          </p>
        </section>
      </div>
    </div>
  );
};
