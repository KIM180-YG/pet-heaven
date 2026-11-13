import React from 'react';
import { Link } from 'react-router-dom';
import contact from '../data/contact';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h3 className="footer-logo"><img src="/logo.png" alt="" className="footer-logo-img" /> Pet Heaven</h3>
        <p>Giving abandoned cats and dogs a second chance at a loving home.</p>
      </div>
      <div className="footer-col">
        <h4>Services</h4>
        <Link to="/adopt">Adopt a Pet</Link>
        <Link to="/release">Release a Pet</Link>
      </div>
      <div className="footer-col">
        <h4>Contact</h4>
        <p>{contact.address}</p>
        <p>{contact.phone}</p>
        <p>{contact.email}</p>
        <Link to="/contact">Send us a message</Link>
      </div>
      <p className="footer-bottom">© {new Date().getFullYear()} Pet Heaven Society · ISIT207 Assignment 3</p>
    </footer>
  );
};

export default Footer;
