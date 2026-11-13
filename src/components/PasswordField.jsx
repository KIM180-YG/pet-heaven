import React, { useState } from 'react';
import Icon from './Icon';
import './FormField.css';

// Password input with a show/hide eye button. Reused on Login and Sign Up.
const PasswordField = ({ label, name, value, onChange, error, placeholder, autoComplete }) => {
  const [visible, setVisible] = useState(false);
  const id = `field-${name}`;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label} <span className="required">*</span></label>
      <div className="password-wrap">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={error ? 'has-error' : ''}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          <Icon name={visible ? 'eyeOff' : 'eye'} size={18} />
        </button>
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
};

export default PasswordField;
