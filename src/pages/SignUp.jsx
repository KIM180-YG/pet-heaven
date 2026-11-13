import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { validateName, validateEmail, validatePassword } from '../utils/validation';
import './Forms.css';
import './Auth.css';

const emptyForm = { name: '', email: '', password: '', confirm: '', agree: false };

const benefits = [
  'Faster adoption requests (your details are filled in)',
  'News about pets looking for homes',
  'Invitations to adoption days and volunteer events',
];

const SignUp = () => {
  const { user, signup } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState('');
  const [justJoined, setJustJoined] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: '' });
    setSignupError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = Object.fromEntries(
      Object.entries({
        name: validateName(form.name),
        email: validateEmail(form.email),
        password: validatePassword(form.password),
        confirm: form.confirm !== form.password || !form.confirm ? 'Passwords do not match.' : '',
        agree: form.agree ? '' : 'Please agree to become a Pet Heaven supporter.',
      }).filter(([, msg]) => msg)
    );
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const error = signup(form);
    if (error) {
      setSignupError(error);
      return;
    }
    setJustJoined(true);
  };

  // After signing up (or if already logged in), show a welcome message
  if (justJoined || user) {
    return (
      <section className="auth-page">
        <div className="auth-card auth-single">
          <div className="success-icon"><Icon name="checkCircle" size={60} strokeWidth={1.5} /></div>
          <h1>{justJoined ? `Welcome to Pet Heaven, ${user.name.split(' ')[0]}!` : "You're already a member"}</h1>
          <p>Thank you for supporting abandoned pets. You are now logged in as {user.email}.</p>
          <div className="auth-actions">
            <Link to="/adopt" className="btn">Meet our pets</Link>
            <Link to="/" className="btn btn-outline">Back to home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-side">
          <img src="/logo.png" alt="" className="auth-logo" />
          <h2>Become a supporter.</h2>
          <p>Join our community of pet lovers. Membership is free.</p>
          <ul className="auth-benefits">
            {benefits.map((b) => (
              <li key={b}><Icon name="check" size={16} strokeWidth={2.4} /> {b}</li>
            ))}
          </ul>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h1>Create an account</h1>

          {signupError && <div className="auth-error" role="alert">{signupError}</div>}

          <FormField label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} required />
          <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="name@example.com" required />
          <PasswordField label="Password" name="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="At least 8 characters, with a number" autoComplete="new-password" />
          <PasswordField label="Confirm password" name="confirm" value={form.confirm} onChange={handleChange} error={errors.confirm} autoComplete="new-password" />

          <label className="checkbox">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            I would like to become a Pet Heaven supporter and receive updates.
          </label>
          {errors.agree && <p className="field-error">{errors.agree}</p>}

          <button type="submit" className="btn auth-submit">Create account</button>
          <p className="auth-switch">Already a member? <Link to="/login">Log in</Link></p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
