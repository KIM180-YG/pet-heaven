import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import FormField from './FormField';
import { useAuth } from '../context/AuthContext';
import sampleReviews from '../data/reviews';
import { validateMinLength } from '../utils/validation';
import './ReviewsSection.css';

const STORAGE_KEY = 'ph-reviews';

// Load the members' saved reviews (or start with none)
const loadReviews = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

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

const emptyForm = { rating: 0, pet: '', text: '' };

const ReviewsSection = () => {
  const { user } = useAuth();
  const [memberReviews, setMemberReviews] = useState(loadReviews);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [thanks, setThanks] = useState(false);

  // Save to the browser whenever the members' reviews change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memberReviews));
    } catch {
      // ignore (e.g. private browsing)
    }
  }, [memberReviews]);

  // Newest reviews first
  const allReviews = [...memberReviews, ...sampleReviews];
  const average = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      rating: form.rating === 0 ? 'Please choose a star rating.' : '',
      text: validateMinLength(form.text, 20, 'Your review'),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    const review = {
      id: `m${Date.now()}`,
      name: user.name,
      email: user.email,
      pet: form.pet.trim() || 'Pet Heaven member',
      rating: form.rating,
      text: form.text.trim(),
      date: new Date().toISOString(),
    };
    setMemberReviews([review, ...memberReviews]);
    setForm(emptyForm);
    setShowForm(false);
    setThanks(true);
  };

  // Members can delete only their own reviews
  const deleteReview = (id) => setMemberReviews(memberReviews.filter((r) => r.id !== id));

  const openForm = () => {
    setShowForm(true);
    setThanks(false);
  };

  return (
    <section className="container" id="reviews">
      <div className="section-title">
        <h2>Loved by our members.</h2>
        <p className="reviews-average">
          <Stars rating={Math.round(average)} size={18} />
          <strong>{average.toFixed(1)}</strong> from {allReviews.length} reviews
        </p>
      </div>

      {/* Write a review: only logged-in members can post */}
      <div className="review-actions">
        {thanks && (
          <p className="review-thanks"><Icon name="checkCircle" size={18} /> Thank you! Your review has been posted.</p>
        )}
        {!user ? (
          <p className="review-login">
            <Link to="/login">Log in</Link> or <Link to="/signup">join us</Link> to share your story.
          </p>
        ) : (
          !showForm && <button className="btn" onClick={openForm}>Write a review</button>
        )}
      </div>

      {user && showForm && (
        <form className="review-form" onSubmit={handleSubmit} noValidate>
          <h3>Share your story, {user.name.split(' ')[0]}</h3>

          <div className="form-field">
            <label id="rating-label">Your rating <span className="required">*</span></label>
            <div className="star-picker" role="radiogroup" aria-labelledby="rating-label" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  role="radio"
                  aria-checked={form.rating === n}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  onMouseEnter={() => setHoverRating(n)}
                  onClick={() => { setForm({ ...form, rating: n }); setErrors({ ...errors, rating: '' }); }}
                >
                  <Icon name="star" size={28} filled={n <= (hoverRating || form.rating)} strokeWidth={1.6} />
                </button>
              ))}
            </div>
            {errors.rating && <p className="field-error">{errors.rating}</p>}
          </div>

          <FormField
            label="Which pet? (optional)"
            name="pet"
            value={form.pet}
            onChange={handleChange}
            placeholder="e.g. Adopted Luna (cat)"
          />
          <FormField
            label="Your review"
            name="text"
            type="textarea"
            value={form.text}
            onChange={handleChange}
            error={errors.text}
            placeholder="Tell other families about your experience (at least 20 characters)"
            required
          />

          <div className="review-form-buttons">
            <button type="submit" className="btn">Post review</button>
            <button type="button" className="btn btn-outline" onClick={() => { setShowForm(false); setErrors({}); }}>Cancel</button>
          </div>
        </form>
      )}

      <div className="review-grid">
        {allReviews.map((r) => (
          <article className="review-card" key={r.id}>
            <Stars rating={r.rating} />
            <p className="review-text">“{r.text}”</p>
            <div className="review-author">
              <span className="review-avatar">{initials(r.name)}</span>
              <div>
                <strong>{r.name}</strong>
                <span>{r.pet} · {formatDate(r.date)}</span>
              </div>
              {user && r.email === user.email && (
                <button className="review-delete" aria-label="Delete my review" title="Delete my review" onClick={() => deleteReview(r.id)}>
                  <Icon name="trash" size={18} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
