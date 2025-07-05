"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Accueil", target: "top" },
  { label: "Offre", target: "offre" },
  // { label: "Ressources", target: "ressources" },
  { label: "Diagnostic", target: "diagnostic" },
  { label: "Cas clients", target: "cas-clients" },
  { label: "Contact", target: "contact" },
];

function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (target: string) => {
    scrollToSection(target);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700
        ${scrolled
          ? "bg-blue-ink/70 backdrop-blur-lg border-b border-blue-ink/30 shadow-lg"
          : "bg-transparent border-none shadow-none"}
      `}
      style={{ WebkitBackdropFilter: scrolled ? "blur(16px)" : undefined }}
    >
      <nav className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Titre */}
          <span className="font-title font-bold text-base sm:text-lg text-primary-bg tracking-tight select-none drop-shadow-sm">
            Laurent Serre<span className="hidden sm:inline"> Développement</span>
          </span>

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
              <li key={item.target}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.target)}
                  className="px-3 py-2 text-primary-bg/90 hover:text-mint-green hover:bg-mint-green/10"
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-blue-ink/95 backdrop-blur-lg border-b border-blue-ink/30 shadow-lg py-4">
            <ul className="flex flex-col items-center gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.target} className="w-full">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavClick(item.target)}
                    className="w-full px-6 py-3 text-primary-bg/90 hover:text-mint-green hover:bg-mint-green/10"
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
} 