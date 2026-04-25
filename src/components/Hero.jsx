import { Play, Calendar, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Background Effects */}
      <div className="hero-bg">
        <img src="/assets/hero-bg.png" alt="Background" className="hero-bg-image" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      {/* Content */}
      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge animate-fadeInUp">
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">Disponible pour collaborations</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title animate-fadeInUp delay-200">
          DAN&apos;S <span className="text-orange">ROBI</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle animate-fadeInUp delay-300">
          Crafting sounds that move Africa
        </p>

        {/* Description */}
        <p className="hero-description animate-fadeInUp delay-400">
          Beatmaker & Producteur musical tchadien. Spécialisé en Afrobeat, Drill et Trap.
          Transformons votre vision en hits internationaux.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons animate-fadeInUp delay-500">
          <a href="#beats" className="btn-primary">
            <Play size={18} style={{ transition: 'transform 0.3s' }} />
            Écouter les Beats
          </a>
          <a href="#contact" className="btn-secondary">
            <Calendar size={18} />
            Book Session
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats animate-fadeInUp delay-600">
          <div>
            <div className="hero-stat-number">200+</div>
            <div className="hero-stat-label">Beats créés</div>
          </div>
          <div>
            <div className="hero-stat-number">50+</div>
            <div className="hero-stat-label">Artistes</div>
          </div>
          <div>
            <div className="hero-stat-number">3 ans</div>
            <div className="hero-stat-label">Expérience</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll animate-fadeIn delay-800">
        <span className="hero-scroll-text">Scroll</span>
        <ChevronDown size={20} className="hero-scroll-icon" />
      </div>
    </section>
  );
}
