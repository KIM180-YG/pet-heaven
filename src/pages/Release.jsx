import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField';
import Icon from '../components/Icon';
import {
  validateName, validateEmail, validatePhone, validateRequired, validateMinLength,
  validateAge, validatePhoto, makeReference,
} from '../utils/validation';
import './Forms.css';

const ADMIN_EMAIL = 'admin@petheaven.org.sg';

const emptyForm = {
  ownerName: '',
  email: '',
  phone: '',
  petName: '',
  species: '',
  breed: '',
  age: '',
  gender: '',
  vaccinated: '',
  healthNotes: '',
  reason: '',
  details: '',
  agree: false,
};

const reasons = [
  'Moving house / overseas',
  'Allergies in the family',
  'Financial difficulties',
  'Not enough time to care for the pet',
  'Health reasons',
  'Other',
];

// Checks every field and returns only the ones with an error
const validate = (form, photo) => {
  const errors = {
    ownerName: validateName(form.ownerName),
    email: validateEmail(form.email),
    phone: validatePhone(form.phone),
    petName: validateRequired(form.petName, "Please enter your pet's name."),
    species: validateRequired(form.species, 'Please choose cat or dog.'),
    breed: validateRequired(form.breed, 'Please enter the breed (or "Mixed" if unsure).'),
    age: validateAge(form.age),
    gender: validateRequired(form.gender, 'Please choose a gender.'),
    vaccinated: validateRequired(form.vaccinated, 'Please tell us the vaccination status.'),
    reason: validateRequired(form.reason, 'Please choose a reason.'),
    details: validateMinLength(form.details, 20, 'Your explanation'),
    photo: validatePhoto(photo),
    agree: form.agree ? '' : 'Please confirm that you are the owner of this pet.',
  };
  return Object.fromEntries(Object.entries(errors).filter(([, msg]) => msg));
};

const Release = () => {
  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState(null);           // the chosen File
  const [photoPreview, setPhotoPreview] = useState(''); // temporary URL to show it
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  // Free the preview URL when the photo changes or the page closes
  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const error = validatePhoto(file);
    setErrors({ ...errors, photo: error });
    if (error || !file) {
      setPhoto(null);
      setPhotoPreview('');
      return;
    }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(form, photo);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // Scroll to the first field with a problem
      // (setTimeout waits until React has shown the red error fields)
      setTimeout(() => {
        const first = document.querySelector('[aria-invalid="true"]');
        if (first) {
          first.scrollIntoView({ behavior: 'smooth', block: 'center' });
          first.focus({ preventScroll: true });
        }
      }, 0);
      return;
    }

    // No backend: we simulate "mailing" the request to the administrator.
    const request = {
      reference: makeReference('RL'),
      type: 'Release',
      ...form,
      photo: photo ? photo.name : 'No photo',
      sentTo: ADMIN_EMAIL,
      date: new Date().toLocaleString(),
    };
    console.log('Release request mailed to admin:', request);
    setSubmitted(request);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <section className="container form-page">
        <div className="form-success">
          <div className="success-icon"><Icon name="checkCircle" size={64} strokeWidth={1.5} /></div>
          <h1>Request received</h1>
          <p>
            Thank you, <strong>{submitted.ownerName}</strong>. Your request to release{' '}
            <strong>{submitted.petName}</strong> has been sent to our administrator at {ADMIN_EMAIL}.
          </p>
          <p>Your reference number is <strong>{submitted.reference}</strong>.</p>
          <p>Our staff will call you at {submitted.phone} within 2 working days to arrange a visit.</p>
          <Link to="/" className="btn">Back to home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container form-page">
      <h1>Release a Pet</h1>
      <p>
        If you can no longer care for your pet, we are here to help. Tell us about your pet
        and our staff will contact you to find them a safe, loving new home.
      </p>

      <div className="form-layout">
        <aside className="info-panel">
          <h3>What happens next</h3>
          <ol>
            <li><strong>We review</strong> your request within 1 working day.</li>
            <li><strong>We call you</strong> to learn more about your pet.</li>
            <li><strong>We visit</strong> and welcome your pet to Pet Heaven.</li>
            <li><strong>We find</strong> them a caring new family.</li>
          </ol>
          <p className="info-note">There is no fee to release a pet to us.</p>
        </aside>

        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <h2 className="form-section-title">1. About you</h2>
          <FormField label="Full name" name="ownerName" value={form.ownerName} onChange={handleChange} error={errors.ownerName} required />
          <div className="form-row">
            <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="name@example.com" required />
            <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="9123 4567" required />
          </div>

          <h2 className="form-section-title">2. About your pet</h2>
          <div className="form-row">
            <FormField label="Pet's name" name="petName" value={form.petName} onChange={handleChange} error={errors.petName} required />
            <FormField label="Cat or dog?" name="species" type="select" options={['Dog', 'Cat']} value={form.species} onChange={handleChange} error={errors.species} required />
          </div>
          <div className="form-row">
            <FormField label="Breed" name="breed" value={form.breed} onChange={handleChange} error={errors.breed} placeholder="e.g. Poodle, or Mixed" required />
            <FormField label="Age (years)" name="age" type="number" value={form.age} onChange={handleChange} error={errors.age} placeholder="e.g. 3 or 0.5" required />
          </div>
          <div className="form-row">
            <FormField label="Gender" name="gender" type="select" options={['Male', 'Female']} value={form.gender} onChange={handleChange} error={errors.gender} required />
            <FormField label="Vaccinated?" name="vaccinated" type="select" options={['Yes', 'No', 'Not sure']} value={form.vaccinated} onChange={handleChange} error={errors.vaccinated} required />
          </div>
          <FormField label="Health issues or special needs (optional)" name="healthNotes" type="textarea" value={form.healthNotes} onChange={handleChange} placeholder="Allergies, medication, behaviour notes..." />

          {/* Optional photo upload with a preview */}
          <div className="form-field">
            <span className="upload-label">Photo of your pet (optional)</span>
            {photoPreview ? (
              <div className="photo-preview">
                <img src={photoPreview} alt="Preview of your pet" />
                <button type="button" className="btn btn-outline" onClick={removePhoto}>Remove photo</button>
              </div>
            ) : (
              <label className="upload-box">
                <Icon name="camera" size={28} />
                <span>Click to choose a photo (JPG or PNG, max 5 MB)</span>
                <input type="file" accept="image/*" onChange={handlePhoto} />
              </label>
            )}
            {errors.photo && <p className="field-error">{errors.photo}</p>}
          </div>

          <h2 className="form-section-title">3. Reason for release</h2>
          <FormField label="Main reason" name="reason" type="select" options={reasons} value={form.reason} onChange={handleChange} error={errors.reason} required />
          <FormField label="Please tell us a bit more" name="details" type="textarea" value={form.details} onChange={handleChange} error={errors.details} placeholder="This helps us find the best new home (at least 20 characters)" required />

          <label className="checkbox">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            I confirm that I am the owner of this pet and agree to be contacted by Pet Heaven staff.
          </label>
          {errors.agree && <p className="field-error">{errors.agree}</p>}

          <button type="submit" className="btn">Submit release request</button>
        </form>
      </div>
    </section>
  );
};

export default Release;
