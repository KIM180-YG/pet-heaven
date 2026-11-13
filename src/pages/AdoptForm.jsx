import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import pets from '../data/pets';
import FormField from '../components/FormField';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { formatAge } from '../components/PetCard';
import {
  validateName, validateEmail, validatePhone, validateRequired, validateMinLength, makeReference,
} from '../utils/validation';
import './Forms.css';

const ADMIN_EMAIL = 'admin@petheaven.org.sg';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  homeType: '',
  hasOtherPets: '',
  reason: '',
  agree: false,
};

// Checks every field and returns an object of error messages
const validate = (form) => {
  const errors = {
    fullName: validateName(form.fullName),
    email: validateEmail(form.email),
    phone: validatePhone(form.phone),
    homeType: validateRequired(form.homeType, 'Please choose your home type.'),
    hasOtherPets: validateRequired(form.hasOtherPets, 'Please tell us if you have other pets.'),
    reason: validateMinLength(form.reason, 20, 'Your reason'),
    agree: form.agree ? '' : 'You must agree before submitting.',
  };
  // Keep only the fields that actually have an error
  return Object.fromEntries(Object.entries(errors).filter(([, msg]) => msg));
};

const AdoptForm = () => {
  const { petId } = useParams();
  const pet = pets.find((p) => p.id === Number(petId));

  const { user } = useAuth();
  // If a member is logged in, fill in their name and email for them
  const [form, setForm] = useState({
    ...emptyForm,
    fullName: user ? user.name : '',
    email: user ? user.email : '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null); // holds the sent request

  if (!pet) {
    return (
      <section className="container">
        <h1>Pet not found</h1>
        <Link to="/adopt" className="btn">Back to pets</Link>
      </section>
    );
  }

  // One change handler for every field, using the field's "name"
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: newValue });
    // Clear that field's error as soon as the user fixes it
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // stop if anything is wrong

    // No backend: we simulate "mailing" the request to the administrator.
    const request = {
      reference: makeReference('AD'),
      type: 'Adoption',
      pet: `${pet.name} (${pet.breed})`,
      ...form,
      sentTo: ADMIN_EMAIL,
      date: new Date().toLocaleString(),
    };
    console.log('Adoption request mailed to admin:', request);
    setSubmitted(request);
    window.scrollTo(0, 0);
  };

  // After submitting, show a confirmation instead of the form
  if (submitted) {
    return (
      <section className="container form-page">
        <div className="form-success">
          <div className="success-icon"><Icon name="checkCircle" size={64} strokeWidth={1.5} /></div>
          <h1>Request sent!</h1>
          <p>
            Thank you, <strong>{submitted.fullName}</strong>. Your request to adopt{' '}
            <strong>{pet.name}</strong> has been sent to our administrator at {ADMIN_EMAIL}.
          </p>
          <p>Your reference number is <strong>{submitted.reference}</strong>.</p>
          <p>Our staff will contact you at {submitted.email} within 3 working days to arrange an interview.</p>
          <Link to="/adopt" className="btn">Browse more pets</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container form-page">
      <Link to="/adopt" className="back-link"><Icon name="arrowLeft" size={18} /> Back to pets</Link>
      <h1>Adopt {pet.name}</h1>
      <p>Fill in the form below and our staff will follow up with an interview.</p>

      <div className="form-layout">
        {/* Summary of the chosen pet */}
        <aside className="pet-summary">
          <img src={pet.image} alt={pet.name} />
          <h3>{pet.name}</h3>
          <p>{pet.breed} · {pet.gender} · {formatAge(pet.age)}</p>
        </aside>

        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <FormField label="Full name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} required />
          <div className="form-row">
            <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="name@example.com" required />
            <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="9123 4567" required />
          </div>
          <div className="form-row">
            <FormField label="Home type" name="homeType" type="select" options={['HDB flat', 'Condominium', 'Landed property', 'Other']} value={form.homeType} onChange={handleChange} error={errors.homeType} required />
            <FormField label="Do you have other pets?" name="hasOtherPets" type="select" options={['No', 'Yes, dogs', 'Yes, cats', 'Yes, other pets']} value={form.hasOtherPets} onChange={handleChange} error={errors.hasOtherPets} required />
          </div>
          <FormField label={`Why would you like to adopt ${pet.name}?`} name="reason" type="textarea" value={form.reason} onChange={handleChange} error={errors.reason} placeholder="Tell us about yourself and your home (at least 20 characters)" required />

          <label className="checkbox">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            I agree that Pet Heaven staff may contact me and visit my home before the adoption.
          </label>
          {errors.agree && <p className="field-error">{errors.agree}</p>}

          <button type="submit" className="btn">Submit adoption request</button>
        </form>
      </div>
    </section>
  );
};

export default AdoptForm;
