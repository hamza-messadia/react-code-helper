import { Mail, Twitter, Send } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-lg">
          <Mail size={24} className="text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-black text-foreground">Contact</h1>
      </div>

      <div className="bg-card rounded-2xl border border-border p-8 space-y-8">
        <p className="text-muted-foreground">
          Vous avez une question, une suggestion ou vous souhaitez contribuer ? 
          N'hésitez pas à nous contacter.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">contact@clinivium.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Twitter size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground">Réseaux Sociaux</p>
              <p className="text-sm text-muted-foreground">@CliniviumMedical</p>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Votre Nom</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Message</label>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          <button 
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold gradient-hero text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Send size={16} />
            Envoyer le message
          </button>
        </form>
      </div>
    </div>
  );
};
