import { Music, Mic2, Sliders, Wand2, Zap, Star, Check } from 'lucide-react';

const services = [
  {
    icon: Music,
    title: "Beatmaking",
    description: "Création de beats personnalisés dans tous les styles : Afrobeat, Drill, Trap, Hip Hop.",
    price: "À partir de 45,000 FCFA",
    features: ["Beat exclusif", "Stems inclus", "2 révisions", "Livraison 48h"],
    popular: true,
    color: "#fdb901"
  },
  {
    icon: Mic2,
    title: "Enregistrement",
    description: "Sessions d'enregistrement professionnelles avec matériel haut de gamme.",
    price: "À partir de 25,000 FCFA/session",
    features: ["Studio équipé", "Ingénieur dédié", "Mix live", "Backup sécurisé"],
    popular: false,
    color: "#7a00ff"
  },
  {
    icon: Sliders,
    title: "Mixing & Mastering",
    description: "Mix professionnel et mastering prêt pour les plateformes.",
    price: "À partir de 75,000 FCFA",
    features: ["Mix multipiste", "Mastering pro", "Formats streaming", "Revision gratuite"],
    popular: false,
    color: "#fdb901"
  },
  {
    icon: Wand2,
    title: "Production Complète",
    description: "Accompagnement de A à Z : composition, arrangement, enregistrement, mix.",
    price: "Sur devis",
    features: ["Production clé en main", "Direction artistique", "Booking sessions", "Promotion incluse"],
    popular: true,
    color: "#7a00ff"
  }
];

export default function Services() {
  return (
    <section id="services" className="bg-primary">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Services</span>
          <h2 className="section-title">Ce que je <span className="text-orange">propose</span></h2>
          <p className="section-description">
            Des services professionnels pour accompagner les artistes dans la réalisation de leurs projets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={service.title} className={`service-card ${service.popular ? 'popular' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
              {/* Popular Badge */}
              {service.popular && (
                <div className="service-badge">
                  <Star size={12} />
                  Populaire
                </div>
              )}

              {/* Icon */}
              <div className="service-icon" style={{ backgroundColor: service.color }}>
                <service.icon />
              </div>

              {/* Content */}
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              {/* Features */}
              <ul className="service-features">
                {service.features.map((feature) => (
                  <li key={feature} className="service-feature">
                    <div className="service-feature-check">
                      <Check size={12} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="service-price-section">
                <p className="service-price-label">Tarif</p>
                <p className="service-price">{service.price}</p>
              </div>

              {/* CTA */}
              <a href="#contact" className={`service-btn ${service.popular ? 'popular' : ''}`}>
                <Zap size={16} />
                Réserver
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
