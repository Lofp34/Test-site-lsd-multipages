"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Bootcamp", href: "/bootcamp" },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isBlogArticle = pathname.startsWith('/blog/') && pathname !== '/blog';

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

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    // Si c'est une ancre et qu'on est sur une page différente, on navigue vers l'accueil
    if (href.startsWith('/#') && pathname !== '/') {
      window.location.href = href;
    }
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
              <li key={item.href}>
                <Link href={item.href} onClick={() => handleNavClick(item.href)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-3 py-2 ${
                      (scrolled || isBlogArticle)
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
            ))}
          </ul>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-blue-ink/95 backdrop-blur-lg border-b border-blue-ink/30 shadow-lg py-4">
            <ul className="flex flex-col items-center gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="w-full">
                  <Link href={item.href} onClick={() => handleNavClick(item.href)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full px-6 py-3 text-primary-bg/90 hover:text-mint-green hover:bg-mint-green/10 ${
                        pathname === item.href ? 'text-mint-green bg-mint-green/10' : ''
                      }`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
} 