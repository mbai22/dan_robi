import { useState } from 'react';
import { Send, MessageCircle, Mail, MapPin, Phone, Clock, Instagram, Youtube, Facebook } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" }
];

const contactInfo = [
  { icon: MapPin, label: "Localisation", value: "N'djamena, Tchad" },
  { icon: Phone, label: "WhatsApp", value: "+235 62 08 27 85" },
  { icon: Mail, label: "Email", value: "contact@dansrobi.com" },
  { icon: Clock, label: "Disponibilité", value: "Lun - Sam, 9h - 20h" }
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="bg-primary contact-section">
      <div className="contact-bg">
        <img src="/src/assets/contact.png" alt="Background" className="contact-bg-image" />
      </div>
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Travaillons <span className="text-orange">ensemble</span></h2>
          <p className="section-description">
            Prêt à créer quelque chose d&apos;incroyable ? Contactez-moi pour discuter de votre projet.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="animate-slideInLeft">
            <div>
              <h3 className="contact-info-title">Informations</h3>
              <div className="contact-info-list">
                {contactInfo.map((item) => (
                  <div key={item.label} className="contact-info-item">
                    <div className="contact-info-icon">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="contact-info-label">{item.label}</p>
                      <p className="contact-info-value">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp */}
            <a
              href="https://wa.me/23562082785"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp"
            >
              <div className="contact-whatsapp-icon">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="contact-whatsapp-title">WhatsApp Direct</p>
                <p className="contact-whatsapp-text">Réponse rapide garantie</p>
              </div>
            </a>

            {/* Social Links */}
            <div>
              <p className="contact-social-title">Suivez-moi</p>
              <div className="contact-social-links">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} className="contact-social-link" aria-label={social.label}>
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper animate-slideInRight">
            <h3 className="contact-form-title">Envoyer un message</h3>

            {submitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <Send size={32} />
                </div>
                <h4 className="contact-success-title">Message envoyé !</h4>
                <p className="contact-success-text">Je vous répondrai dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label className="contact-form-label">Nom</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-form-input"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="contact-form-group">
                    <label className="contact-form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact-form-input"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Sujet</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="contact-form-select"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="beat">Achat de beat</option>
                    <option value="production">Production complète</option>
                    <option value="recording">Session d&apos;enregistrement</option>
                    <option value="mixing">Mixing & Mastering</option>
                    <option value="collab">Collaboration</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="contact-form-textarea"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="contact-form-submit">
                  {isSubmitting ? (
                    <>
                      <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
