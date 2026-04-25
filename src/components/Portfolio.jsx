import { useState } from 'react';
import { Play, ExternalLink, Youtube, Music2, Mic2, Music, Sun, Flame, Crown, Star } from 'lucide-react';

const projects = [
  { id: 1, title: "Wala Tchad", artist: "Mc One", type: "Production", platform: "youtube", Icon: Mic2, bgColor: "#fdb901", views: "125K", image: "/src/assets/img/WhatsApp Image 2026-04-17 at 20.54.12.jpeg" },
  { id: 2, title: "N'djamena Flow", artist: "Lil Tchad", type: "Beatmaking", platform: "youtube", Icon: Music, bgColor: "#7a00ff", views: "89K", image: "/src/assets/img/WhatsApp Image 2026-04-17 at 20.54.11.jpeg" },
  { id: 3, title: "Sahel Dreams", artist: "Desert King", type: "Mix & Master", platform: "music", Icon: Sun, bgColor: "#fdb901", views: "45K", image: "/src/assets/img/WhatsApp Image 2026-04-17 at 20.54.11 (1).jpeg" },
  { id: 4, title: "Afro Drill Tchad", artist: "Street Voice", type: "Production Complète", platform: "youtube", Icon: Flame, bgColor: "#7a00ff", views: "67K", image: "/src/assets/img/WhatsApp Image 2026-04-17 at 20.54.10.jpeg" },
  { id: 5, title: "Mère Africa", artist: "Queen Maya", type: "Arrangement", platform: "music", Icon: Crown, bgColor: "#fdb901", views: "34K", image: "/src/assets/img/WhatsApp Image 2026-04-17 at 20.54.10 (1).jpeg" },
  { id: 6, title: "Tchad Rising", artist: "Various Artists", type: "Album Production", platform: "youtube", Icon: Star, bgColor: "#7a00ff", views: "200K", image: "/src/assets/img/WhatsApp Image 2026-04-17 at 20.54.09.jpeg" }
];

const filters = ["Tous", "Production", "Beatmaking", "Mix & Master", "Arrangement"];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [hoveredId, setHoveredId] = useState(null);

  const filteredProjects = activeFilter === "Tous"
    ? projects
    : projects.filter(p => p.type === activeFilter);

  return (
    <section id="portfolio" className="bg-primary portfolio-section">
      <div className="portfolio-bg">
        <img src="/src/assets/portfolio.png" alt="Background" className="portfolio-bg-image" />
      </div>
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label" style={{ color: '#7a00ff' }}>Réalisations</span>
          <h2 className="section-title">Portfolio <span className="text-orange">Musical</span></h2>
          <p className="section-description">
            Une sélection de mes collaborations et productions. Chaque projet raconte une histoire unique.
          </p>
        </div>

        {/* Filters */}
        <div className="portfolio-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`portfolio-filter-btn ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="portfolio-card"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Thumbnail */}
              <div className="portfolio-thumbnail">
                <img src={project.image} alt={project.title} className="portfolio-image" />
                
                {/* Overlay */}
                <div className="portfolio-overlay">
                  <div 
                    className="portfolio-play"
                    style={{ opacity: hoveredId === project.id ? 1 : 0, transform: hoveredId === project.id ? 'scale(1)' : 'scale(0.5)' }}
                  >
                    <Play size={24} fill="white" />
                  </div>
                </div>

                {/* Platform Icon */}
                <div className="portfolio-platform">
                  {project.platform === "youtube" ? (
                    <Youtube size={16} color="#ef4444" />
                  ) : (
                    <Music2 size={16} color="#22c55e" />
                  )}
                </div>

                {/* Views Badge */}
                <div className="portfolio-views">{project.views} vues</div>
              </div>

              {/* Content */}
              <div className="portfolio-content">
                <span className="portfolio-type">{project.type}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-artist">{project.artist}</p>
                <a href="#" className="portfolio-link">
                  <ExternalLink size={12} />
                  Voir le projet
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
