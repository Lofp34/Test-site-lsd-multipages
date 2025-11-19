"use client";

import { MouseEvent, useState } from "react";
import ManageCookiesButton from "@/components/ui/ManageCookiesButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  const openCertificateModal = () => setIsCertificateOpen(true);
  const closeCertificateModal = () => setIsCertificateOpen(false);
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeCertificateModal();
    }
  };

  return (
    <>
      <footer className="bg-blue-ink text-primary-bg">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section principale du footer */}
          <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-title font-bold text-primary-bg mb-2">
                  Laurent Serre Développement
                </h3>
                <div className="w-16 h-1 bg-mint-green rounded-full mb-4"></div>
                <p className="font-body text-white leading-relaxed">
                  Transformez votre force de vente en équipe engagée, structurée et performante. 
                  Avec 20 ans d&apos;expérience terrain et les meilleurs outils d&apos;aujourd&apos;hui.
                </p>
                <button
                  type="button"
                  onClick={openCertificateModal}
                  className="mt-6 inline-flex items-center gap-2 bg-mint-green text-blue-ink font-semibold px-5 py-3 rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mint-green focus-visible:ring-offset-blue-ink"
                >
                  <span>Voir la certification Qualiopi</span>
                  <span aria-hidden="true">🔎</span>
                </button>
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
                    <a href="/" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                      Accueil
                    </a>
                  </li>
                  <li>
                    <a href="/expert-developpement-commercial-pme" className="font-body text-mint-green hover:text-white font-semibold transition-colors hover:translate-x-1 transform duration-200 block">
                      Expert PME
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                      Nos Services
                    </a>
                  </li>
                  <li>
                    <a href="/diagnostic" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                      Diagnostic Gratuit
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="font-body text-white hover:text-mint-green transition-colors hover:translate-x-1 transform duration-200 block">
                      Contact
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

      {isCertificateOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue-ink/80 backdrop-blur-sm px-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-semibold text-mint-green uppercase tracking-widest">
                  Certification officielle
                </p>
                <h5 id="certificate-modal-title" className="font-title text-xl text-blue-ink">
                  Certificat Qualiopi
                </h5>
              </div>
              <button
                type="button"
                onClick={closeCertificateModal}
                className="text-blue-ink/70 hover:text-blue-ink text-2xl leading-none"
                aria-label="Fermer la modale du certificat"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-slate-50">
              <iframe
                src="/certificat-qualiopi-laurent-serre.pdf#view=FitH"
                title="Certificat Qualiopi Laurent Serre"
                className="w-full h-full"
              />
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="font-body text-blue-ink text-sm">
                Consultez ou téléchargez le certificat officiel Qualiopi de Laurent Serre Développement.
              </p>
              <a
                href="/certificat-qualiopi-laurent-serre.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-ink text-white px-4 py-2 rounded-lg hover:bg-blue-ink/90 transition-colors font-semibold"
              >
                Télécharger le PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
