import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

// The main menu links (kept in an array so they are easy to change)
const links = [
  { to: '/', label: 'Home' },
  { to: '/adopt', label: 'Our Pets' },
  { to: '/release', label: 'Release' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

// Floating "capsule" navbar: logo on the left, links in the middle, account on the right.
const Navbar = () => {
  // Get the logged-in member from AuthContext (no props needed)
  const { user, logout } = useAuth();
  const isLoggedIn = Boolean(user);
  // Opens/closes the menu on small (phone) screens
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav-wrap">
      <div className="nav-capsule">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src="/logo.png" alt="" className="nav-logo-img" />
          Pet Heaven
        </Link>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main menu">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
          {/* Only shown inside the phone menu */}
          {!isLoggedIn && (
            <Link to="/signup" className="nav-join-mobile" onClick={closeMenu}>Join us</Link>
          )}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <span className="nav-greeting">Hi, {user.name.split(' ')[0]}</span>
              <button className="nav-icon-btn" aria-label="Log out" title="Log out" onClick={() => { logout(); closeMenu(); }}>
                <Icon name="logOut" size={20} />
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-icon-btn" aria-label="Member login" title="Member login" onClick={closeMenu}>
                <Icon name="user" size={20} />
              </NavLink>
              <Link to="/signup" className="nav-join" onClick={closeMenu}>Join us</Link>
            </>
          )}
          <button
            className="nav-icon-btn menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
