import React from 'react';
import Icon from './Icon';
import reviews from '../data/reviews';
import './ReviewsSection.css';

// Row of 5 stars, e.g. <Stars rating={4} />
const Stars = ({ rating, size = 16 }) => (
  <span className="stars" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Icon key={n} name="star" size={size} filled={n <= rating} strokeWidth={1.6} />
    ))}
  </span>
);

// "Rachel Tan" -> "RT" for the round avatar
const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' });

// Home page section: what our members say about Pet Heaven
const ReviewsSection = () => {
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="container" id="reviews">
      <div className="section-title">
        <h2>Loved by our members.</h2>
        <p className="reviews-average">
          <Stars rating={Math.round(average)} size={18} />
          <strong>{average.toFixed(1)}</strong> from {reviews.length} reviews
        </p>
      </div>

      <div className="review-grid">
        {reviews.map((r, i) => (
          <article className="review-card" key={r.id} style={{ animationDelay: `${i * 0.08}s` }}>
            <Stars rating={r.rating} />
            <p className="review-text">“{r.text}”</p>
            <div className="review-author">
              <span className="review-avatar">{initials(r.name)}</span>
              <div>
                <strong>{r.name}</strong>
                <span>{r.pet} · {formatDate(r.date)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
