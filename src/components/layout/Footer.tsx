import ManageCookiesButton from "@/components/ui/ManageCookiesButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-ink text-primary-bg">
      <div className="max-w-6xl mx-auto px-6">

        {/* Clients — Ils nous font confiance */}
        <div className="py-12 border-b border-primary-bg/20">
          <div className="text-center mb-8">
            <h4 className="font-title font-semibold text-primary-bg text-lg mb-2">Ils nous font confiance</h4>
            <div className="w-12 h-0.5 bg-mint-green mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <a href="https://www.septeo.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="Septeo">
              <img src="/images/septeo.png" alt="Septeo" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">Septeo</span>
            </a>
            <a href="https://www.kpmg.com/fr" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="KPMG France">
              <img src="/images/KPMGjpeg.jpeg" alt="KPMG" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">KPMG</span>
            </a>
            <a href="https://www.bernafon.com/fr" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="Bernafon">
              <img src="/images/Bernafon.png" alt="Bernafon" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">Bernafon</span>
            </a>
            <a href="https://www.moncoachbrico.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="Mon Coach Brico">
              <img src="/images/moncoachbrico-favicon.png" alt="Mon Coach Brico" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">Mon Coach Brico</span>
            </a>
            <a href="https://www.seguredecoration.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="Séguré Décoration">
              <img src="/images/Seguret decoration.png" alt="Séguré Décoration" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">Séguré Décoration</span>
            </a>
            <a href="https://www.bibal.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="Cafés Bibal">
              <img src="/images/Bibal.png" alt="Bibal" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">Cafés Bibal</span>
            </a>
            <a href="https://www.ovea.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="OVEA">
              <img src="/images/ovea-logo.svg" alt="OVEA" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">OVEA</span>
            </a>
            <a href="https://www.univ-perp.fr" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="Université de Perpignan">
              <img src="/images/UPVD.png" alt="UPVD" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">UPVD</span>
            </a>
            <a href="https://www.ipo-sa.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="IPO Technologie">
              <img src="/images/ipo-sa-favicon.png" alt="IPO Technologie" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">IPO Technologie</span>
            </a>
            <a href="https://www.compagnons-du-devoir.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1" title="Compagnons du Devoir">
              <img src="/images/compagnons-logo.png" alt="Compagnons du Devoir" className="h-10 md:h-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-white/50 group-hover:text-mint-green transition-colors">Compagnons du Devoir</span>
            </a>
          </div>
        </div>

        {/* Section principale du footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-title font-bold text-primary-bg mb-2">
                Laurent Serre
              </h3>
              <div className="w-16 h-1 bg-mint-green rounded-full mb-4"></div>
              <p className="font-body text-white leading-relaxed">
                Transformez votre force de vente en équipe engagée, structurée et performante.
                Avec 20 ans d&apos;expérience terrain et les meilleurs outils d&apos;aujourd&apos;hui.
              </p>
              <a
                href="/certificat-qualiopi-laurent-serre.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-mint-green text-blue-ink font-semibold px-5 py-3 rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mint-green focus-visible:ring-offset-blue-ink"
              >
                <span>Visualiser notre certificat Qualiopi</span>
                <span aria-hidden="true">↗</span>
              </a>
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
                  <svg className="w-6 h-6 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/"
                  className="w-12 h-12 bg-orange-soft/20 hover:bg-orange-soft rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation — liens absents du menu principal */}
          <div>
            <h4 className="font-title font-semibold text-primary-bg mb-6">Navigation</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a href="/blog" className="font-body text-white hover:text-mint-green font-semibold transition-colors hover:translate-x-1 transform duration-200 block">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/cas-clients" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Cas Clients
                  </a>
                </li>
                <li>
                  <a href="/a-propos" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    À Propos
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="font-title font-semibold text-primary-bg mb-6">Ressources</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a href="/ressources" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Toutes les ressources
                  </a>
                </li>
                <li>
                  <a href="/ressources/guide-prospection" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Guide Prospection
                  </a>
                </li>
                <li>
                  <a href="/ressources/guide-closing" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Guide Closing
                  </a>
                </li>
                <li>
                  <a href="/cas-clients" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    Cas Clients
                  </a>
                </li>
                <li>
                  <a href="/a-propos" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                    À Propos
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

              <div className="flex items-start gap-3">
                <span className="text-lg mt-1">⭐</span>
                <div>
                  <p className="font-body text-white text-sm">Avis Google</p>
                  <a href="https://www.google.com/search?q=Laurent+Serre+D%C3%A9veloppement+avis" className="font-body text-primary-bg hover:text-mint-green transition-colors" target="_blank" rel="noopener noreferrer">
                    Voir les avis →
                  </a>
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
              © {currentYear} Laurent Serre. Tous droits réservés.
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
