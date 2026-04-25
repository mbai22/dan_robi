import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Music, ShoppingCart, Globe, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useI18n } from '../contexts/I18nContext';

const navLinks = [
  { name: 'Accueil', href: '#hero' },
  { name: 'Beats', href: '#beats' },
  { name: 'A Propos', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const { cartCount, toggleCart } = useCart();
  const { locale, toggleLocale, t } = useI18n();
  
  // Refs pour le swipe
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isSwiping = useRef(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers pour le swipe
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchCurrentX.current = touch.clientX;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isSwiping.current) return;
    
    const touch = e.touches[0];
    touchCurrentX.current = touch.clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    
    // Swipe vers la gauche pour fermer le menu (quand ouvert)
    if (isOpen && diff < 0) {
      setSwipeOffset(Math.max(-100, diff));
    }
    // Swipe vers la droite pour ouvrir (depuis le bord gauche)
    else if (!isOpen && touchStartX.current < 30 && diff > 0) {
      setSwipeOffset(Math.min(diff, 100));
    }
  }, [isOpen]);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    
    const diff = touchCurrentX.current - touchStartX.current;
    const threshold = 80; // Seuil pour déclencher l'action
    
    if (isOpen && diff < -threshold) {
      // Swipe gauche -> fermer
      setIsOpen(false);
    } else if (!isOpen && touchStartX.current < 30 && diff > threshold) {
      // Swipe droite depuis bord -> ouvrir
      setIsOpen(true);
    }
    
    setSwipeOffset(0);
  }, [isOpen]);

  // Gestionnaire global pour le swipe d'ouverture
  useEffect(() => {
    const handleGlobalTouchStart = (e) => {
      // Seulement si on est près du bord gauche et que le menu est fermé
      if (!isOpen && e.touches[0].clientX < 30) {
        touchStartX.current = e.touches[0].clientX;
      }
    };

    document.addEventListener('touchstart', handleGlobalTouchStart, { passive: true });
    return () => document.removeEventListener('touchstart', handleGlobalTouchStart);
  }, [isOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="#hero" className="navbar-logo animate-fadeInUp">
          <div className="navbar-logo-icon">
            <Music size={20} color="white" />
          </div>
          <span className="navbar-logo-text">
            DAN&apos;S<span className="text-orange">ROBI</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links animate-fadeInUp delay-100">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="navbar-link">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary" style={{ fontSize: '14px', padding: '12px 24px' }}>
            Book Session
          </a>
          
          {/* Language Switcher */}
          <button 
            className="navbar-lang-btn" 
            onClick={toggleLocale}
            aria-label="Changer de langue"
            title={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <Globe size={18} />
            <span className="navbar-lang-text">{locale.toUpperCase()}</span>
          </button>
          
          {/* Cart Button */}
          <button 
            className="navbar-cart-btn" 
            onClick={toggleCart}
            aria-label="Ouvrir le panier"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="navbar-cart-badge">{cartCount}</span>
            )}
          </button>
        </div>

        {/* Mobile/Tablet Menu Button */}
        <button
          className="navbar-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile/Tablet Menu */}
      <div 
        ref={menuRef}
        className={`navbar-mobile-menu ${isOpen ? 'open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: isOpen ? `translateX(${swipeOffset}px)` : `translateX(calc(-100% + ${Math.max(0, swipeOffset)}px))`,
        }}
      >
        <div className="navbar-mobile-container">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="navbar-mobile-link"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary"
            style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}
            onClick={() => setIsOpen(false)}
          >
            Book Session
          </a>
        </div>
        
        {/* Indicateur de swipe */}
        <div className="navbar-swipe-indicator">
          <ChevronRight size={20} />
        </div>
      </div>

      {/* Zone de swipe invisible sur le bord gauche */}
      {!isOpen && (
        <div 
          className="navbar-swipe-zone"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}
    </nav>
  );
}
