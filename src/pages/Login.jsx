import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validateRequired } from '../utils/validation';
import './Auth.css';

const Login = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(''); // wrong email/password message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setLoginError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = Object.fromEntries(
      Object.entries({
        email: validateEmail(form.email),
        password: validateRequired(form.password, 'Please enter your password.'),
      }).filter(([, msg]) => msg)
    );
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const error = login(form.email, form.password);
    if (error) {
      setLoginError(error);
      return;
    }
    navigate('/'); // logged in: go to the home page
  };

  // Already logged in? Show a small message instead of the form
  if (user) {
    return (
      <section className="auth-page">
        <div className="auth-card auth-single">
          <h1>You're logged in</h1>
          <p>Welcome back, <strong>{user.name}</strong>.</p>
          <div className="auth-actions">
            <Link to="/adopt" className="btn">Browse pets</Link>
            <button className="btn btn-outline" onClick={logout}>Log out</button>
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
          <h2>Welcome back.</h2>
          <p>Log in to adopt faster and follow the pets you love.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h1>Member login</h1>

          {loginError && <div className="auth-error" role="alert">{loginError}</div>}

          <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="name@example.com" required />
          <PasswordField label="Password" name="password" value={form.password} onChange={handleChange} error={errors.password} autoComplete="current-password" />

          <button type="submit" className="btn auth-submit">Log in</button>

          <p className="auth-hint">
            <Icon name="user" size={16} /> Demo account: <strong>youngkeon@gmail.com</strong> / <strong>pet12345</strong>
          </p>
          <p className="auth-switch">New to Pet Heaven? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </section>
  );
};

export default Login;
