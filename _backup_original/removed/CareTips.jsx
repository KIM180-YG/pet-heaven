import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import careTips, { careVideo } from '../data/careTips';
import Icon from '../components/Icon';
import './CareTips.css';

// Tabs to switch between dog and cat tips
const tabs = [
  { key: 'dog', label: 'Dogs' },
  { key: 'cat', label: 'Cats' },
];

const CareTips = () => {
  // Which pet type's tips are showing
  const [petType, setPetType] = useState('dog');
  const tips = careTips[petType];

  return (
    <>
      <section className="care-hero">
        <p className="hero-eyebrow">Care Tips</p>
        <h1>A happy pet starts at home.</h1>
        <p>Simple, everyday tips from our carers to help your new family member settle in and stay healthy.</p>
      </section>

      {/* Care video: responsive YouTube player */}
      <section className="container care-video-wrap">
        <div className="care-video">
          <iframe
            src={careVideo.embedUrl}
            title={careVideo.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p className="care-video-caption">
          <Icon name="play" size={16} strokeWidth={2.2} /> Watch our quick guide to caring for your pet.
        </p>
      </section>

      <section className="container">
        <div className="section-title">
          <h2>Everyday care.</h2>
          <p>Choose your pet to see the tips that matter most.</p>
        </div>

        <div className="care-tabs" role="tablist" aria-label="Pet type">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={petType === tab.key}
              className={petType === tab.key ? 'care-tab active' : 'care-tab'}
              onClick={() => setPetType(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* key={petType} replays the fade-in animation when the tab changes */}
        <div className="feature-grid care-grid" key={petType}>
          {tips.map((tip, i) => (
            <div className="feature care-card" key={tip.title} style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="feature-icon"><Icon name={tip.icon} size={26} /></div>
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="container care-cta">
          <h2>Ready to welcome a new friend?</h2>
          <p>All our pets are vet-checked and waiting for a loving family.</p>
          <Link to="/adopt" className="btn">Meet our pets</Link>
        </div>
      </section>
    </>
  );
};

export default CareTips;
