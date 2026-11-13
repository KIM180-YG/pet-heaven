import React from 'react';
import './FormField.css';

// Reusable form field: shows a label, the input, and an error message.
// type can be "text", "email", "tel", "number", "select" or "textarea".
// Used by the Adoption, Release, Contact, Login and Sign Up forms.
const FormField = ({ label, name, type = 'text', value, onChange, error, options = [], placeholder, required }) => {
  const id = `field-${name}`;
  const common = {
    id,
    name,
    value,
    onChange,
    placeholder,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
    className: error ? 'has-error' : '',
  };

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} {required && <span className="required">*</span>}
      </label>

      {type === 'select' ? (
        <select {...common}>
          <option value="">-- Please choose --</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea rows={4} {...common} />
      ) : (
        <input type={type} {...common} />
      )}

      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
};

export default FormField;
