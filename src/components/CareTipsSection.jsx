import React from 'react';
import Icon from './Icon';
import { careTips, careVideo } from '../data/careTips';
import './CareTipsSection.css';

// Home page section: a few care tips next to the care video
const CareTipsSection = () => {
  return (
    <section className="container" id="care-tips">
      <div className="care-section">
        <div className="care-text">
          <p className="hero-eyebrow">Care Tips</p>
          <h2>Caring for your new friend.</h2>
          <p>A little care every day goes a long way. Watch our short guide before you bring your pet home.</p>
          <ul className="check-list">
            {careTips.map((tip) => (
              <li key={tip}><Icon name="check" size={18} strokeWidth={2.4} /> {tip}</li>
            ))}
          </ul>
        </div>

        {/* Responsive 16:9 YouTube player */}
        <div className="care-video">
          <iframe
            src={careVideo.embedUrl}
            title={careVideo.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default CareTipsSection;
