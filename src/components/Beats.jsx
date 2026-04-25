import { useState, useEffect } from 'react';
import { Play, Pause, Heart, Share2, Clock, ShoppingCart, Music, Flame, Sparkles, Crown, Zap, Moon, Loader2 } from 'lucide-react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { useCart } from '../contexts/CartContext';

const beats = [
  { id: 1, title: "N'djamena Nights", genre: "Afrobeat", bpm: 115, duration: "2:45", price: "50,000 FCFA", plays: "1.2k", Icon: Moon, color: "#fdb901" },
  { id: 2, title: "Sahara Drill", genre: "Drill", bpm: 140, duration: "3:12", price: "75,000 FCFA", plays: "856", Icon: Zap, color: "#7a00ff" },
  { id: 3, title: "Tchad Vibes", genre: "Afro-Fusion", bpm: 128, duration: "2:58", price: "60,000 FCFA", plays: "2.1k", Icon: Music, color: "#fdb901" },
  { id: 4, title: "Kouno Dreams", genre: "Melodic Trap", bpm: 130, duration: "3:05", price: "55,000 FCFA", plays: "945", Icon: Sparkles, color: "#7a00ff" },
  { id: 5, title: "Afro King", genre: "Afrobeat", bpm: 118, duration: "2:30", price: "65,000 FCFA", plays: "1.5k", Icon: Crown, color: "#fdb901" },
  { id: 6, title: "Street Anthem", genre: "Hip Hop", bpm: 95, duration: "3:20", price: "45,000 FCFA", plays: "723", Icon: Flame, color: "#7a00ff" }
];

const genres = ["Tous", "Afrobeat", "Drill", "Trap", "Hip Hop", "Afro-Fusion"];

export default function Beats() {
  const [activeGenre, setActiveGenre] = useState("Tous");
  const [likedBeats, setLikedBeats] = useState(new Set());
  const [waveHeights, setWaveHeights] = useState({});
  
  const { 
    currentBeat, 
    isPlaying, 
    isLoading,
    currentTime, 
    duration, 
    progress,
    playBeat, 
    pause,
    formatTime 
  } = useAudioPlayer();
  
  const { addToCart } = useCart();

  // Animation de la waveform
  useEffect(() => {
    let interval;
    if (isPlaying && currentBeat) {
      interval = setInterval(() => {
        setWaveHeights(prev => {
          const newHeights = {};
          for (let i = 0; i < 16; i++) {
            newHeights[i] = 8 + Math.random() * 32;
          }
          return newHeights;
        });
      }, 150);
    } else {
      setWaveHeights({});
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentBeat]);

  const togglePlay = (beat) => {
    playBeat(beat);
  };

  const handleAddToCart = (beat) => {
    addToCart(beat);
  };

  const toggleLike = (id) => {
    setLikedBeats(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredBeats = activeGenre === "Tous" 
    ? beats 
    : beats.filter(beat => beat.genre === activeGenre);

  const isCurrentBeat = (beat) => currentBeat?.id === beat.id;

  return (
    <section id="beats" className="bg-primary">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Catalogue</span>
          <h2 className="section-title">Beats <span className="text-orange">Exclusifs</span></h2>
          <p className="section-description">
            Découvrez ma collection de beats premium. Écoutez les previews et achetez vos favoris.
          </p>
        </div>

        {/* Genre Filter */}
        <div className="beats-filters">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`beats-filter-btn ${activeGenre === genre ? 'active' : ''}`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Beats Grid */}
        <div className="beats-grid">
          {filteredBeats.map((beat) => (
            <div key={beat.id} className="beat-card">
              <div className="beat-card-glow" style={{ backgroundColor: beat.color }} />
              
              {/* Header */}
              <div className="beat-header">
                <div className="beat-info">
                  <div className="beat-icon" style={{ backgroundColor: `${beat.color}20` }}>
                    <beat.Icon size={24} color={beat.color} />
                  </div>
                  <div>
                    <h3 className="beat-title">{beat.title}</h3>
                    <span className="beat-genre">{beat.genre}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleLike(beat.id)}
                  className={`beat-like-btn ${likedBeats.has(beat.id) ? 'liked' : ''}`}
                >
                  <Heart size={20} fill={likedBeats.has(beat.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Waveform avec vrai player */}
              <div className="beat-waveform-wrapper">
                <div className="beat-waveform">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="beat-wave-bar"
                      style={{
                        backgroundColor: isCurrentBeat(beat) && isPlaying 
                          ? beat.color 
                          : 'var(--text-muted)',
                        height: isCurrentBeat(beat) && isPlaying
                          ? `${waveHeights[i] || 8}px`
                          : '8px',
                        opacity: isCurrentBeat(beat) ? 1 : 0.5,
                        transition: 'height 0.15s ease, background-color 0.3s ease'
                      }}
                    />
                  ))}
                </div>
                
                {/* Progress bar si ce beat est en lecture */}
                {isCurrentBeat(beat) && duration > 0 && (
                  <div className="beat-progress-wrapper">
                    <div className="beat-progress-bar" style={{ width: `${progress}%`, backgroundColor: beat.color }} />
                    <span className="beat-progress-time">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="beat-meta">
                <span><Clock size={12} /> {beat.duration}</span>
                <span>{beat.bpm} BPM</span>
                <span>{beat.plays} plays</span>
              </div>

              {/* Footer avec play + add to cart */}
              <div className="beat-footer">
                <span className="beat-price">{beat.price}</span>
                <div className="beat-actions">
                  <button className="beat-share-btn">
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => togglePlay(beat)}
                    className="beat-play-btn"
                    disabled={isCurrentBeat(beat) && isLoading}
                  >
                    {isCurrentBeat(beat) && isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : isCurrentBeat(beat) && isPlaying ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleAddToCart(beat)}
                    className="beat-cart-btn"
                    style={{ backgroundColor: beat.color }}
                    title="Ajouter au panier"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="beats-cta">
          <a href="#contact" className="btn-secondary">Voir tous les beats</a>
        </div>
      </div>
    </section>
  );
}
