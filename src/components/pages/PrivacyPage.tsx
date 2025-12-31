import { ShieldCheck } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-lg">
          <ShieldCheck size={24} className="text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-black text-foreground">Politique de confidentialité</h1>
      </div>

      <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Introduction</h2>
          <p className="text-muted-foreground">
            Bienvenue sur Clinivium. Nous respectons votre vie privée et nous nous engageons à protéger 
            vos données personnelles. Cette politique de confidentialité vous informera sur la manière 
            dont nous traitons vos données lorsque vous visitez notre site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. Les données que nous collectons</h2>
          <p className="text-muted-foreground mb-3">
            Nous pouvons collecter, utiliser, stocker et transférer différents types de données, y compris :
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Données d'identité (nom, prénom si vous créez un compte).</li>
            <li>Données de contact (adresse email).</li>
            <li>Données techniques (adresse IP, type de navigateur).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. Utilisation des données</h2>
          <p className="text-muted-foreground">
            Nous utilisons vos données uniquement pour améliorer votre expérience utilisateur, 
            gérer votre compte, et vous envoyer notre newsletter si vous y avez souscrit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">4. Cookies</h2>
          <p className="text-muted-foreground">
            Notre site utilise des cookies pour améliorer l'expérience utilisateur. 
            Vous pouvez configurer votre navigateur pour refuser tous ou certains cookies.
          </p>
        </section>
      </div>
    </div>
  );
};
