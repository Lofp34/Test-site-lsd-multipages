"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { 
    label: "Expert PME", 
    href: "/expert-developpement-commercial-pme",
    isHighlight: true 
  },
  { label: "Services", href: "/services" },
  { label: "Diagnostic", href: "/diagnostic" },
  {
    label: "Ressources",
    href: "/ressources",
    subItems: [
      { label: "Blog", href: "/blog" },
      { label: "Meilleurs livres", href: "/ressources/meilleurs-livres" },
      { label: "Toutes les ressources", href: "/ressources" },
    ]
  },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  // Ajout refs pour bouton et sous-menu
  const ressourcesBtnRef = useRef<HTMLButtonElement>(null);
  const ressourcesMenuRef = useRef<HTMLUListElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const isBlogArticle = pathname.startsWith('/blog/') && pathname !== '/blog';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu mobile si on clique/touche en dehors
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setOpenSubMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    // Si c'est une ancre et qu'on est sur une page différente, on navigue vers l'accueil
    if (href.startsWith('/#') && pathname !== '/') {
      window.location.href = href;
    }
  };

  // Nouvelle gestion du sous-menu Ressources (desktop)
  const handleRessourcesMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenSubMenu("Ressources");
  };
  const handleRessourcesMouseLeave = () => {
    // Délai pour tolérer les micro-sorties
    closeTimeout.current = setTimeout(() => {
      setOpenSubMenu(null);
    }, 120);
  };
  const handleRessourcesMenuEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenSubMenu("Ressources");
  };
  const handleRessourcesMenuLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenSubMenu(null);
    }, 120);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700
        ${scrolled || isBlogArticle
          ? "bg-blue-ink/70 backdrop-blur-lg border-b border-blue-ink/30 shadow-lg"
          : "bg-transparent border-none shadow-none"}
      `}
      style={{ WebkitBackdropFilter: scrolled || isBlogArticle ? "blur(16px)" : undefined }}
    >
      <nav className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Titre */}
          <Link href="/" className="font-title font-bold text-base sm:text-lg text-primary-bg tracking-tight select-none drop-shadow-sm hover:text-mint-green transition-colors">
            Laurent Serre<span className="hidden sm:inline"> Développement</span>
          </Link>

          {/* Menu Burger pour Mobile */}
          <button
            className="md:hidden p-2 text-primary-bg hover:text-mint-green transition-colors"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menu Desktop */}
          <ul className="hidden md:flex gap-2 sm:gap-4 md:gap-8">
            {NAV_ITEMS.map((item) => (
              item.subItems && item.label === "Ressources" ? (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={handleRessourcesMouseEnter}
                  onMouseLeave={handleRessourcesMouseLeave}
                >
                  <span ref={ressourcesBtnRef} className="inline-block">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-3 py-2 flex items-center gap-1 ${
                        (scrolled || isBlogArticle)
                          ? 'text-white hover:text-mint-green'
                          : 'text-primary-bg/90 hover:text-mint-green'
                      } hover:bg-mint-green/10`}
                      aria-haspopup="true"
                      aria-expanded={openSubMenu === item.label}
                      onClick={() => setOpenSubMenu(openSubMenu === item.label ? null : item.label)}
                    >
                      {item.label}
                      <span className="ml-1">▼</span>
                    </Button>
                  </span>
                  <ul
                    ref={ressourcesMenuRef}
                    className={`absolute left-0 top-full mt-2 min-w-[180px] bg-white dark:bg-gray-anthracite rounded-xl shadow-lg border border-mint-green/20 z-50 transition-all duration-200 ${openSubMenu === item.label ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onMouseEnter={handleRessourcesMenuEnter}
                    onMouseLeave={handleRessourcesMenuLeave}
                  >
                    {item.subItems.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={() => setOpenSubMenu(null)}
                        >
                          <span className="block px-5 py-3 text-primary-secondary hover:bg-mint-green/10 hover:text-mint-green transition-colors cursor-pointer">
                            {sub.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href} className="relative">
                  <Link href={item.href} onClick={() => handleNavClick(item.href)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-3 py-2 ${
                        item.isHighlight 
                          ? 'bg-mint-green text-white hover:bg-mint-green/90' 
                          : (scrolled || isBlogArticle)
                            ? 'text-white hover:text-mint-green'
                            : 'text-primary-bg/90 hover:text-mint-green'
                      } hover:bg-mint-green/10 ${
                        pathname === item.href ? 'text-mint-green bg-mint-green/10' : ''
                      }`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                </li>
              )
            ))}
          </ul>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden fixed top-0 left-0 w-full h-full z-50 flex items-start justify-center"
            style={{ background: 'rgba(20, 40, 80, 0.45)', backdropFilter: 'blur(8px)' }}
          >
            <div
              className="mt-24 w-[90vw] max-w-md bg-blue-ink/80 dark:bg-gray-anthracite/90 rounded-2xl shadow-2xl border border-mint-green/20 p-6 animate-slideDown"
              style={{
                animation: 'slideDown 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}
              onMouseLeave={() => { setIsMenuOpen(false); setOpenSubMenu(null); }}
            >
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, idx) => (
                  <li key={item.href} className="w-full">
                    {item.subItems ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full px-6 py-3 flex items-center justify-center text-white font-semibold text-center rounded-xl transition-all duration-200 ${openSubMenu === item.label ? 'bg-mint-green/10' : ''}`}
                          onClick={() => setOpenSubMenu(openSubMenu === item.label ? null : item.label)}
                          aria-expanded={openSubMenu === item.label}
                          aria-controls={`submenu-${item.label}`}
                        >
                          {item.label}
                          <span className="ml-2">{openSubMenu === item.label ? '▲' : '▼'}</span>
                        </Button>
                        <ul
                          id={`submenu-${item.label}`}
                          className={`transition-all duration-300 overflow-hidden ${openSubMenu === item.label ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} animate-fadeIn`}
                        >
                          {item.subItems.map((sub) => (
                            <li key={sub.href} className="border-b border-mint-green/10 last:border-none">
                              <Link href={sub.href}>
                                <span className="block px-5 py-3 text-mint-green font-semibold hover:bg-mint-green/10 hover:text-mint-green transition-colors cursor-pointer text-center rounded-lg">
                                  {sub.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link href={item.href} onClick={() => handleNavClick(item.href)}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full px-6 py-3 text-white font-semibold text-center rounded-xl hover:bg-mint-green/10 transition-all duration-200"
                        >
                          {item.label}
                        </Button>
                      </Link>
                    )}
                    {idx < NAV_ITEMS.length - 1 && <div className="border-b border-mint-green/10 my-1" />}
                  </li>
                ))}
              </ul>
            </div>
            <style jsx global>{`
              @keyframes slideDown {
                0% { opacity: 0; transform: translateY(-40px) scale(0.98); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
              }
              .animate-slideDown {
                animation: slideDown 0.35s cubic-bezier(0.4,0,0.2,1);
              }
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
              .animate-fadeIn {
                animation: fadeIn 0.4s;
              }
            `}</style>
          </div>
        )}
      </nav>
    </header>
  );
} 