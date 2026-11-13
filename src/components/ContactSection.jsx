import React, { useState } from 'react';
import FormField from './FormField';
import Icon from './Icon';
import contact from '../data/contact';
import { validateName, validateEmail, validateRequired, validateMinLength, makeReference } from '../utils/validation';
import '../pages/Forms.css';
import './ContactSection.css';

const emptyForm = { name: '', email: '', topic: '', message: '' };

const topics = ['General enquiry', 'Adoption question', 'Releasing a pet', 'Volunteering', 'Donations', 'Other'];

// Contact details shown as small cards (icon + label + value)
const details = [
  { icon: 'mapPin', label: 'Visit us', value: contact.address },
  { icon: 'phone', label: 'Call us', value: contact.phone },
  { icon: 'mail', label: 'Email us', value: contact.email },
  { icon: 'clock', label: 'Opening hours', value: contact.hours },
];

// Reusable "Contact us" section: shown at the bottom of the Home page
// (and also on its own at /contact so the navbar link works).
const ContactSection = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sentRef, setSentRef] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = Object.fromEntries(
      Object.entries({
        name: validateName(form.name),
        email: validateEmail(form.email),
        topic: validateRequired(form.topic, 'Please choose a topic.'),
        message: validateMinLength(form.message, 10, 'Your message'),
      }).filter(([, msg]) => msg)
    );
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // No backend: simulate sending the enquiry
    const reference = makeReference('EN');
    console.log('Enquiry sent to', contact.email, { reference, ...form });
    setSentRef(reference);
    setForm(emptyForm);
  };

  return (
    <section className="container" id="contact">
      <div className="section-title">
        <h2>Get in touch.</h2>
        <p>Have a question about adopting, releasing a pet, or helping out? We'd love to hear from you.</p>
      </div>

      <div className="contact-details">
        {details.map((d) => (
          <div className="contact-card" key={d.label}>
            <span className="contact-icon"><Icon name={d.icon} size={22} /></span>
            <div>
              <h3>{d.label}</h3>
              <p>{d.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-layout">
        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <h2 className="form-section-title">Send us a message</h2>

          {sentRef && (
            <div className="sent-banner" role="status">
              <Icon name="checkCircle" size={22} />
              Thanks! Your message was sent (ref {sentRef}). We will reply within 2 working days.
            </div>
          )}

          <div className="form-row">
            <FormField label="Your name" name="name" value={form.name} onChange={handleChange} error={errors.name} required />
            <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="name@example.com" required />
          </div>
          <FormField label="Topic" name="topic" type="select" options={topics} value={form.topic} onChange={handleChange} error={errors.topic} required />
          <FormField label="Message" name="message" type="textarea" value={form.message} onChange={handleChange} error={errors.message} placeholder="How can we help?" required />
          <button type="submit" className="btn">Send message</button>
        </form>

        <div className="map-card">
          {/* Google Map of our office in Queenstown, Singapore */}
          <iframe
            title="Map of Pet Heaven in Queenstown, Singapore"
            src={contact.mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-caption">
            <div>
              <strong>Pet Heaven Shelter</strong>
              <p>{contact.address}</p>
            </div>
            <a href={contact.mapLink} target="_blank" rel="noreferrer" className="btn btn-outline">
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
