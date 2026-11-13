import React from 'react';
import { Link } from 'react-router-dom';
import SafeImage from '../components/SafeImage';
import Icon from '../components/Icon';
import './AboutUs.css';

// Photos of happy pets in their new homes (swap these for your own photos any time)
const gallery = [
  { src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=70', alt: 'Two dogs running happily across a garden', caption: 'Zoomies in the garden' },
  { src: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=70', alt: 'A dog cuddling with its new owner at home', caption: 'Cuddles at home' },
  { src: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=70', alt: 'A dog and its owner enjoying the sunset together', caption: 'Best friends' },
  { src: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=70', alt: 'A relaxed cat resting in its new home', caption: 'Settled in' },
  { src: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=70', alt: 'A happy dog playing outdoors', caption: 'Playtime' },
];

// Our charity in numbers
const stats = [
  { value: '1,200+', label: 'pets rehomed since 2015' },
  { value: '300', label: 'active volunteers' },
  { value: '100%', label: 'of donations go to pet care' },
  { value: '$0', label: 'fee to release a pet' },
];

const values = [
  { icon: 'heart', title: 'Compassion', text: 'Every animal is treated with kindness, patience and respect.' },
  { icon: 'homeHeart', title: 'Forever homes', text: 'We carefully match each pet with a family that fits them.' },
  { icon: 'shieldCheck', title: 'Responsible care', text: 'Vet checks, vaccinations and good food for every pet in our shelter.' },
  { icon: 'users', title: 'Community', text: 'Members, volunteers and donors who keep our doors open.' },
];

const AboutUs = () => {
  return (
    <>
      {/* Intro */}
      <section className="about-hero">
        <p className="hero-eyebrow">About Pet Heaven</p>
        <h1>A charity built on love for every pet.</h1>
        <p>
          Pet Heaven is a non-profit charity society in Singapore that cares for abandoned cats
          and dogs, and helps them find warm, loving families.
        </p>
      </section>

      {/* Photo gallery */}
      <section className="container about-gallery-wrap">
        <div className="about-gallery">
          {gallery.map((photo) => (
            <figure key={photo.src} className="gallery-item">
              <SafeImage src={photo.src} alt={photo.alt} />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Charity section */}
      <section className="container">
        <div className="charity-card">
          <div className="charity-text">
            <span className="charity-badge"><Icon name="heart" size={16} strokeWidth={2.2} /> Registered non-profit charity</span>
            <h2>We are a charity, not a pet shop.</h2>
            <p>
              Pet Heaven does not sell animals. We are run by a small team of staff and hundreds of
              volunteers, and we rely entirely on donations, memberships and the kindness of our community.
            </p>
            <p>
              Every dollar donated goes directly towards food, shelter, vet care and finding new homes
              for the pets in our care.
            </p>
            <Link to="/signup" className="btn">Become a supporter</Link>
          </div>
          <div className="charity-stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="band" id="mission">
        <div className="container mission">
          <p className="hero-eyebrow">Our mission</p>
          <h2>To give every abandoned pet a safe place, proper care and a second chance at a loving home.</h2>
          <p>
            Owners who can no longer keep their pets can release them to us safely. Our staff then
            interview every adopter and match each pet with the right family.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container">
        <div className="section-title">
          <h2>What we stand for.</h2>
        </div>
        <div className="feature-grid">
          {values.map((v) => (
            <div className="feature" key={v.title}>
              <div className="feature-icon"><Icon name={v.icon} size={26} /></div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="container">
        <div className="section-title">
          <h2>Our facilities.</h2>
          <p>Our Queenstown shelter is designed to feel like home.</p>
        </div>
        <ul className="facility-list">
          <li><Icon name="check" size={18} strokeWidth={2.4} /> Separate, clean living spaces for cats and dogs</li>
          <li><Icon name="check" size={18} strokeWidth={2.4} /> On-site vet room for check-ups and vaccinations</li>
          <li><Icon name="check" size={18} strokeWidth={2.4} /> Indoor play area and an outdoor garden run</li>
          <li><Icon name="check" size={18} strokeWidth={2.4} /> Quiet meeting rooms for adopters to meet pets</li>
        </ul>
      </section>
    </>
  );
};

export default AboutUs;
