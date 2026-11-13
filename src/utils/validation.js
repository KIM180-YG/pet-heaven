// Small reusable validation helpers used by the forms.
// Each one returns an error message, or '' if the value is fine.

export const isEmpty = (value) => String(value).trim() === '';

export const validateName = (value) => {
  if (isEmpty(value)) return 'Please enter your full name.';
  if (value.trim().length < 2) return 'Name must be at least 2 characters.';
  if (!/^[A-Za-z\s'-]+$/.test(value)) return 'Name can only contain letters, spaces, - and \'.';
  return '';
};

export const validateEmail = (value) => {
  if (isEmpty(value)) return 'Please enter your email.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email, e.g. name@example.com.';
  return '';
};

// Singapore phone numbers: 8 digits starting with 6, 8 or 9 (an optional +65 is allowed)
export const validatePhone = (value) => {
  if (isEmpty(value)) return 'Please enter your phone number.';
  const digits = value.replace(/\s/g, '').replace(/^\+65/, '');
  if (!/^[689]\d{7}$/.test(digits)) return 'Please enter a valid 8-digit Singapore number.';
  return '';
};

export const validateRequired = (value, message = 'This field is required.') =>
  isEmpty(value) ? message : '';

export const validateMinLength = (value, min, label = 'This field') => {
  if (isEmpty(value)) return `${label} is required.`;
  if (value.trim().length < min) return `${label} must be at least ${min} characters (${value.trim().length}/${min}).`;
  return '';
};

// Age in years: must be a number between 0 and 30 (decimals allowed, e.g. 0.5)
export const validateAge = (value) => {
  if (isEmpty(value)) return 'Please enter the pet\'s age.';
  const age = Number(value);
  if (Number.isNaN(age) || age < 0 || age > 30) return 'Age must be a number between 0 and 30.';
  return '';
};

// Optional photo: must be an image and smaller than 5 MB
export const validatePhoto = (file) => {
  if (!file) return '';
  if (!file.type.startsWith('image/')) return 'Please choose an image file (JPG or PNG).';
  if (file.size > 5 * 1024 * 1024) return 'Photo must be smaller than 5 MB.';
  return '';
};

// Password: at least 8 characters with at least one letter and one number
export const validatePassword = (value) => {
  if (isEmpty(value)) return 'Please enter a password.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Password must include a letter and a number.';
  return '';
};

// Makes a short reference number such as "PH-AD-48213"
export const makeReference = (prefix) =>
  `PH-${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;
