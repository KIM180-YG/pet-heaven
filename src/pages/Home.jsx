import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import pets from '../data/pets';
import PetCard from '../components/PetCard';
import Icon from '../components/Icon';
import ContactSection from '../components/ContactSection';
import SafeImage from '../components/SafeImage';
import CareTipsSection from '../components/CareTipsSection';
import ReviewsSection from '../components/ReviewsSection';

// Happy pets shown under the hero (swap for your own photos any time)
const heroPhotos = [
  { src: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=700&q=70', alt: 'A happy dog cuddling its owner at home' },
  { src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=70', alt: 'Two happy dogs running across a garden' },
  { src: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=700&q=70', alt: 'A content cat relaxing in its new home' },
];

// What Pet Heaven offers (shown as feature cards)
const services = [
  { icon: 'heart', title: 'Adopt a Pet', text: 'Give a rescued cat or dog a forever home with your family.' },
  { icon: 'homeHeart', title: 'Release a Pet', text: 'Can no longer care for your pet? We will find them a safe new home.' },
  { icon: 'shieldCheck', title: 'Health & Care', text: 'Every pet is vet-checked, vaccinated and cared for by our staff.' },
  { icon: 'users', title: 'Become a Member', text: 'Join our community of supporters and help more pets every year.' },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If the address has a #section (e.g. /#contact), scroll down to that section
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);
  // Show the first 4 pets as "featured"
  const featuredPets = pets.slice(0, 4);

  return (
    <>
      <section className="hero">
        <p className="hero-eyebrow">Pet Heaven Society</p>
        <h1>Every pet deserves a place to call home.</h1>
        <p>
          We care for abandoned cats and dogs and help them find warm, loving families.
          Meet your new best friend today.
        </p>
        <div className="hero-actions">
          <Link to="/adopt" className="btn">Meet our pets</Link>
          <Link to="/release" className="btn btn-outline">Release a pet</Link>
        </div>

        {/* Happy pets photo strip: one big photo in the middle, two smaller at the sides */}
        <div className="hero-photos">
          {heroPhotos.map((photo, i) => (
            <div key={photo.src} className={i === 1 ? 'hero-photo hero-photo-main' : 'hero-photo'}>
              <SafeImage src={photo.src} alt={photo.alt} />
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="section-title">
          <h2>Waiting for you.</h2>
          <p>A few of the friends looking for a family right now.</p>
        </div>
        <div className="pet-grid">
          {featuredPets.map((pet) => (
            // Reusing the same PetCard component as the Adopt page
            <PetCard key={pet.id} pet={pet} onSelect={() => navigate('/adopt')} />
          ))}
        </div>
        <div className="section-cta">
          <Link to="/adopt" className="btn btn-outline">See all {pets.length} pets</Link>
        </div>
      </section>

      {/* Release a pet section */}
      <section className="container">
        <div className="release-section">
          <div className="release-text">
            <p className="hero-eyebrow">Release a pet</p>
            <h2>Can't keep your pet? We're here to help.</h2>
            <p>
              Life changes, and sometimes caring for a pet is no longer possible.
              Instead of abandoning them, let us take care of the rest. No judgement, and no fee.
            </p>
            <ul className="check-list">
              <li><Icon name="check" size={18} strokeWidth={2.4} /> A quick, simple online form</li>
              <li><Icon name="check" size={18} strokeWidth={2.4} /> Our staff call you within 2 working days</li>
              <li><Icon name="check" size={18} strokeWidth={2.4} /> Your pet is vet-checked and rehomed with care</li>
            </ul>
            <Link to="/release" className="btn">
              Start a release request <Icon name="arrowRight" size={16} strokeWidth={2.2} />
            </Link>
          </div>
          <div className="release-steps">
            {['Fill in the form', 'We give you a call', 'We welcome your pet', 'They find a new family'].map((step, i) => (
              <div className="release-step" key={step}>
                <span className="step-number">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="section-title">
            <h2>How we help.</h2>
            <p>Everything we do is for the welfare of abandoned pets.</p>
          </div>
          <div className="feature-grid">
            {services.map((s) => (
              <div className="feature" key={s.title}>
                <div className="feature-icon"><Icon name={s.icon} size={26} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care tips with the care video */}
      <CareTipsSection />

      {/* Member reviews */}
      <ReviewsSection />

      {/* Contact us section with the Queenstown map */}
      <ContactSection />
    </>
  );
};

export default Home;
