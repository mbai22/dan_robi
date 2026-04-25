import { MapPin, Calendar, Award, Headphones, User, Flame } from 'lucide-react';

const achievements = [
  { icon: Headphones, number: "200+", label: "Beats Produits" },
  { icon: Award, number: "50+", label: "Artistes Collaborés" },
  { icon: MapPin, number: "Tchad", label: "Base à N'djamena" },
  { icon: Calendar, number: "3 ans", label: "D'expérience" }
];

const skills = ["Beatmaking", "Topline", "Arrangement", "Mixing", "Mastering", "Production"];

export default function About() {
  return (
    <section id="about" className="bg-primary">
      <div className="section-container">
        <div className="about-grid">
          {/* Image Side */}
          <div className="about-image-wrapper animate-slideInLeft">
            <div className="about-image">
              <img 
                src="/src/assets/img/about_dan.jpeg" 
                alt="Dan's Robi - Beatmaker & Producteur"
                className="about-image-img"
                loading="lazy"
              />
              <div className="about-image-overlay" />
              
              {/* Floating Badge */}
              <div className="about-badge animate-fadeIn delay-300">
                <div className="about-badge-icon">
                  <Flame size={20} />
                </div>
                <div>
                  <p className="about-badge-title">En studio maintenant</p>
                  <p className="about-badge-text">Disponible pour bookings</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="about-decor-1" />
            <div className="about-decor-2" />
          </div>

          {/* Content Side */}
          <div className="about-content animate-slideInRight">
            <span className="section-label">À Propos</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              L&apos;Afrique dans chaque <span className="text-orange">beat</span>
            </h2>
            
            <div>
              <p>
                Je suis <strong>Djerakoula Dankoula Robin</strong>, connu sous le nom de 
                <span className="text-orange" style={{ fontWeight: 600 }}> Dan&apos;s Robi</span>. 
                Né le 18 septembre 2002 à Kouno, au sud du Tchad, j&apos;ai rapidement développé 
                une passion pour la création musicale.
              </p>
              <p>
                En seulement trois ans, je me suis imposé comme l&apos;une des figures montantes 
                du beatmaking au Tchad. Mon style unique mêle les sonorités africaines 
                traditionnelles aux genres urbains contemporains.
              </p>
              <p>
                Mon ambition ? Porter la voix du Tchad sur la scène musicale internationale.
              </p>
            </div>

            {/* Skills Tags */}
            <div className="about-skills">
              {skills.map((skill) => (
                <span key={skill} className="about-skill">{skill}</span>
              ))}
            </div>

            {/* Achievement Grid */}
            <div className="about-stats">
              {achievements.map((item, index) => (
                <div key={item.label} className="about-stat" style={{ animationDelay: `${index * 100}ms` }}>
                  <item.icon className="about-stat-icon" />
                  <div className="about-stat-number">{item.number}</div>
                  <div className="about-stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
