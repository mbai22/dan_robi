import { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      beats: 'Beats',
      about: 'À Propos',
      portfolio: 'Portfolio',
      services: 'Services',
      contact: 'Contact',
      bookSession: 'Book Session',
    },
    // Hero
    hero: {
      badge: 'Disponible pour collaborations',
      subtitle: 'Crafting sounds that move Africa',
      description: 'Beatmaker & Producteur musical tchadien. Spécialisé en Afrobeat, Drill et Trap. Transformons votre vision en hits internationaux.',
      listenBeats: 'Écouter les Beats',
      stats: {
        beats: 'Beats créés',
        artists: 'Artistes',
        experience: 'Expérience',
      },
      scroll: 'Scroll',
    },
    // Beats
    beats: {
      title: 'Beats Exclusifs',
      subtitle: 'Catalogue',
      description: 'Découvrez ma collection de beats premium. Écoutez les previews et achetez vos favoris.',
      filter: 'Tous',
      bpm: 'BPM',
      plays: 'plays',
      addToCart: 'Ajouter au panier',
      seeAll: 'Voir tous les beats',
    },
    // About
    about: {
      title: "L'Afrique dans chaque beat",
      subtitle: 'À Propos',
      description: 'Je suis Djerakoula Dankoula Robin, connu sous le nom de Dan\'s Robi. Né le 18 septembre 2002 à Kouno, au sud du Tchad.',
      skills: ['Beatmaking', 'Topline', 'Arrangement', 'Mixing', 'Mastering', 'Production'],
      achievements: {
        beats: 'Beats Produits',
        artists: 'Artistes Collaborés',
        location: 'Base à N\'djamena',
        experience: 'D\'expérience',
      },
      inStudio: 'En studio maintenant',
      available: 'Disponible pour bookings',
    },
    // Services
    services: {
      title: 'Ce que je propose',
      subtitle: 'Services',
      description: 'Des services professionnels pour accompagner les artistes dans la réalisation de leurs projets.',
      popular: 'Populaire',
      price: 'Tarif',
      book: 'Réserver',
      features: {
        beatmaking: ['Beat exclusif', 'Stems inclus', '2 révisions', 'Livraison 48h'],
        recording: ['Studio équipé', 'Ingénieur dédié', 'Mix live', 'Backup sécurisé'],
        mixing: ['Mix multipiste', 'Mastering pro', 'Formats streaming', 'Revision gratuite'],
        production: ['Production clé en main', 'Direction artistique', 'Booking sessions', 'Promotion incluse'],
      },
    },
    // Contact
    contact: {
      title: 'Travaillons ensemble',
      subtitle: 'Contact',
      description: 'Prêt à créer quelque chose d\'incroyable ? Contactez-moi pour discuter de votre projet.',
      info: {
        location: 'Localisation',
        whatsapp: 'WhatsApp',
        email: 'Email',
        availability: 'Disponibilité',
        value: 'Lun - Sam, 9h - 20h',
      },
      whatsappDirect: 'WhatsApp Direct',
      fastReply: 'Réponse rapide garantie',
      followMe: 'Suivez-moi',
      form: {
        title: 'Envoyer un message',
        name: 'Nom',
        email: 'Email',
        subject: 'Sujet',
        message: 'Message',
        subjects: {
          beat: 'Achat de beat',
          production: 'Production complète',
          recording: 'Session d\'enregistrement',
          mixing: 'Mixing & Mastering',
          collab: 'Collaboration',
          other: 'Autre',
        },
        placeholder: 'Décrivez votre projet...',
        send: 'Envoyer le message',
        sending: 'Envoi en cours...',
        success: 'Message envoyé !',
        successText: 'Je vous répondrai dans les plus brefs délais.',
      },
    },
    // Footer
    footer: {
      description: 'Beatmaker & Producteur musical tchadien. Créateur de sons qui font vibrer l\'Afrique et le monde.',
      newsletter: {
        title: 'Restez informé',
        text: 'Recevez les nouveaux beats et actualités directement dans votre boîte mail.',
        success: 'Merci ! Vous êtes inscrit.',
      },
      copyright: 'Fait avec',
      in: 'au Tchad',
      legal: {
        terms: 'Conditions d\'utilisation',
        privacy: 'Politique de confidentialité',
        legal: 'Mentions légales',
      },
    },
    // Cart
    cart: {
      title: 'Votre Panier',
      empty: 'Votre panier est vide',
      continue: 'Continuer les achats',
      total: 'Total',
      checkout: 'Procéder au paiement',
      clear: 'Vider le panier',
    },
    // Checkout
    checkout: {
      title: 'Paiement',
      summary: 'Résumé de la commande',
      email: 'Email',
      cardInfo: 'Informations de carte',
      secure: 'Paiement sécurisé par Stripe',
      pay: 'Payer',
      success: 'Paiement réussi !',
      successText: 'Merci pour votre achat. Vos beats vous seront envoyés par email.',
      note: 'Les beats vous seront envoyés par email après confirmation du paiement.',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      beats: 'Beats',
      about: 'About',
      portfolio: 'Portfolio',
      services: 'Services',
      contact: 'Contact',
      bookSession: 'Book Session',
    },
    // Hero
    hero: {
      badge: 'Available for collaborations',
      subtitle: 'Crafting sounds that move Africa',
      description: 'Chadian Beatmaker & Music Producer. Specialized in Afrobeat, Drill and Trap. Let\'s turn your vision into international hits.',
      listenBeats: 'Listen to Beats',
      stats: {
        beats: 'Beats Created',
        artists: 'Artists',
        experience: 'Experience',
      },
      scroll: 'Scroll',
    },
    // Beats
    beats: {
      title: 'Exclusive Beats',
      subtitle: 'Catalog',
      description: 'Discover my premium beats collection. Listen to previews and buy your favorites.',
      filter: 'All',
      bpm: 'BPM',
      plays: 'plays',
      addToCart: 'Add to Cart',
      seeAll: 'See all beats',
    },
    // About
    about: {
      title: 'Africa in every beat',
      subtitle: 'About',
      description: 'I am Djerakoula Dankoula Robin, known as Dan\'s Robi. Born September 18, 2002 in Kouno, southern Chad.',
      skills: ['Beatmaking', 'Topline', 'Arrangement', 'Mixing', 'Mastering', 'Production'],
      achievements: {
        beats: 'Beats Produced',
        artists: 'Artists Collaborated',
        location: 'Based in N\'djamena',
        experience: 'Experience',
      },
      inStudio: 'In the studio now',
      available: 'Available for bookings',
    },
    // Services
    services: {
      title: 'What I offer',
      subtitle: 'Services',
      description: 'Professional services to support artists in the realization of their projects.',
      popular: 'Popular',
      price: 'Price',
      book: 'Book Now',
      features: {
        beatmaking: ['Exclusive beat', 'Stems included', '2 revisions', '48h delivery'],
        recording: ['Equipped studio', 'Dedicated engineer', 'Live mix', 'Secure backup'],
        mixing: ['Multitrack mix', 'Pro mastering', 'Streaming formats', 'Free revision'],
        production: ['Turnkey production', 'Artistic direction', 'Session booking', 'Promotion included'],
      },
    },
    // Contact
    contact: {
      title: 'Let\'s work together',
      subtitle: 'Contact',
      description: 'Ready to create something incredible? Contact me to discuss your project.',
      info: {
        location: 'Location',
        whatsapp: 'WhatsApp',
        email: 'Email',
        availability: 'Availability',
        value: 'Mon - Sat, 9am - 8pm',
      },
      whatsappDirect: 'WhatsApp Direct',
      fastReply: 'Fast reply guaranteed',
      followMe: 'Follow me',
      form: {
        title: 'Send a message',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        subjects: {
          beat: 'Beat purchase',
          production: 'Full production',
          recording: 'Recording session',
          mixing: 'Mixing & Mastering',
          collab: 'Collaboration',
          other: 'Other',
        },
        placeholder: 'Describe your project...',
        send: 'Send message',
        sending: 'Sending...',
        success: 'Message sent!',
        successText: 'I will reply as soon as possible.',
      },
    },
    // Footer
    footer: {
      description: 'Chadian Beatmaker & Music Producer. Creator of sounds that make Africa and the world vibrate.',
      newsletter: {
        title: 'Stay informed',
        text: 'Receive new beats and updates directly in your inbox.',
        success: 'Thank you! You are subscribed.',
      },
      copyright: 'Made with',
      in: 'in Chad',
      legal: {
        terms: 'Terms of Use',
        privacy: 'Privacy Policy',
        legal: 'Legal Notice',
      },
    },
    // Cart
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty',
      continue: 'Continue shopping',
      total: 'Total',
      checkout: 'Proceed to checkout',
      clear: 'Clear cart',
    },
    // Checkout
    checkout: {
      title: 'Payment',
      summary: 'Order Summary',
      email: 'Email',
      cardInfo: 'Card Information',
      secure: 'Secure payment by Stripe',
      pay: 'Pay',
      success: 'Payment successful!',
      successText: 'Thank you for your purchase. Your beats will be sent by email.',
      note: 'Beats will be sent by email after payment confirmation.',
    },
  },
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('fr');

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Retourne la clé si la traduction n'existe pas
      }
    }
    
    return value || key;
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale(prev => prev === 'fr' ? 'en' : 'fr');
  }, []);

  const setLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLocale(lang);
    }
  }, []);

  const value = {
    locale,
    t,
    toggleLocale,
    setLanguage,
    isFrench: locale === 'fr',
    isEnglish: locale === 'en',
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
