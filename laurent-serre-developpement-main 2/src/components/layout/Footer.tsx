import ManageCookiesButton from "@/components/ui/ManageCookiesButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-ink dark:bg-gray-anthracite text-primary-bg">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section principale du footer */}
        <div className="py-16 grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-title font-bold text-primary-bg mb-2">
                Laurent Serre Développement
              </h3>
              <div className="w-16 h-1 bg-mint-green rounded-full mb-4"></div>
              <p className="font-body text-white leading-relaxed">
                Transformez votre force de vente en équipe engagée, structurée et performante. 
                Avec 20 ans d&apos;expérience terrain et les meilleurs outils d&apos;aujourd&apos;hui.
              </p>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h4 className="font-title font-semibold text-primary-bg mb-4">Suivez-moi</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/laurentserre34/" 
                  className="w-12 h-12 bg-mint-green/20 hover:bg-mint-green rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="LinkedIn"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span className="text-xl group-hover:text-white transition-colors">💼</span>
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/" 
                  className="w-12 h-12 bg-orange-soft/20 hover:bg-orange-soft rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="YouTube"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span className="text-xl group-hover:text-white transition-colors">📺</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-title font-semibold text-primary-bg mb-6">Navigation</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Offre
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Diagnostic
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Cas clients
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact et infos pratiques */}
          <div>
            <h4 className="font-title font-semibold text-primary-bg mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-lg mt-1">📧</span>
                <div>
                  <p className="font-body text-white text-sm">Email</p>
                  <a href="mailto:ls@laurentserre.com" className="font-body text-primary-bg hover:text-mint-green transition-colors">
                    ls@laurentserre.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-lg mt-1">📞</span>
                <div>
                  <p className="font-body text-white text-sm">Téléphone</p>
                  <a href="tel:+33614944060" className="font-body text-primary-bg hover:text-mint-green transition-colors">
                    +33 6 14 94 40 60
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg mt-1">📍</span>
                <div>
                  <p className="font-body text-white text-sm">Zone d&apos;intervention</p>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <span>📍</span>
                    <span>Basé en France • Interventions nationales et internationales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-primary-bg/20"></div>

        {/* Mentions légales et copyright */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-body text-white text-sm">
              © {currentYear} Laurent Serre Développement. Tous droits réservés.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <a href="/mentions-legales" className="font-body text-white hover:text-mint-green text-sm transition-colors">
              Mentions légales
            </a>
            <a href="/cgv" className="font-body text-white hover:text-mint-green text-sm transition-colors">
              CGV
            </a>
            <a href="/politique-de-confidentialite" className="font-body text-white hover:text-mint-green text-sm transition-colors">
              Politique de confidentialité
            </a>
            <a href="/cookies" className="font-body text-white hover:text-mint-green text-sm transition-colors">
              Politique de cookies
            </a>
            <ManageCookiesButton />
          </div>
        </div>

        {/* Badge de qualité */}
        <div className="pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-mint-green/10 px-4 py-2 rounded-full">
            <span className="text-mint-green">🏆</span>
            <span className="font-body text-white text-sm">
              Consultant certifié • 20 ans d&apos;expérience • +50 entreprises accompagnées
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
} 