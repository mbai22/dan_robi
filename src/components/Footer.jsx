import { useState } from 'react';
import { Music, Heart, ArrowUp, Instagram, Youtube, Facebook, Twitter, CheckCircle, Loader2, Send } from 'lucide-react';

// Configuration Mailchimp - À remplacer par tes vraies valeurs
const MAILCHIMP_URL = import.meta.env.VITE_MAILCHIMP_URL || 'https://youraccount.us1.list-manage.com/subscribe/post';
const MAILCHIMP_U = import.meta.env.VITE_MAILCHIMP_U || 'your_user_id';
const MAILCHIMP_ID = import.meta.env.VITE_MAILCHIMP_ID || 'your_list_id';

const footerLinks = {
  navigation: [
    { label: "Accueil", href: "#hero" },
    { label: "Beats", href: "#beats" },
    { label: "À Propos", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" }
  ],
  services: [
    { label: "Beatmaking", href: "#services" },
    { label: "Production", href: "#services" },
    { label: "Mixing", href: "#services" },
    { label: "Mastering", href: "#services" }
  ],
  legal: [
    { label: "Conditions d'utilisation", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Mentions légales", href: "#" }
  ]
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" }
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Méthode 1: Envoi via fetch à ton backend qui appelle l'API Mailchimp
      // Méthode 2: Soumission directe au formulaire Mailchimp
      const formData = new FormData();
      formData.append('EMAIL', email);
      formData.append('u', MAILCHIMP_U);
      formData.append('id', MAILCHIMP_ID);

      await fetch(`${MAILCHIMP_URL}?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}`, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="section-container footer-top">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#hero" className="footer-brand">
              <div className="footer-brand-icon">
                <Music size={20} />
              </div>
              <span className="footer-brand-text">
                DAN&apos;S<span style={{ color: '#fdb901' }}>ROBI</span>
              </span>
            </a>
            <p className="footer-description">
              Beatmaker & Producteur musical tchadien. Créateur de sons qui font vibrer l&apos;Afrique et le monde.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="footer-social-link" aria-label={social.label}>
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              {footerLinks.navigation.map((link) => (
                <li key={link.label} className="footer-link">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              {footerLinks.services.map((link) => (
                <li key={link.label} className="footer-link">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer-title">Restez informé</h4>
            <p className="footer-newsletter-text">
              Recevez les nouveaux beats et actualités directement dans votre boîte mail.
            </p>
            {isSubscribed ? (
              <div className="footer-success">
                <CheckCircle size={20} />
                <span>Merci ! Vous êtes inscrit.</span>
              </div>
            ) : (
              <form className="footer-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="footer-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="footer-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="section-container">
          <div className="footer-bottom-content">
            {/* Copyright */}
            <p className="footer-copyright">
              © 2024 Dan&apos;s Robi. Fait par Chelka Concept
            </p>

            {/* Legal Links */}
            <div className="footer-legal">
              {footerLinks.legal.map((link) => (
                <a key={link.label} href={link.href} className="footer-legal-link">{link.label}</a>
              ))}
            </div>

            {/* Back to Top */}
            <button onClick={scrollToTop} className="footer-scroll-top" aria-label="Retour en haut">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
