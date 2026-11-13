import React, { useEffect, useState } from 'react';
import Icon from './Icon';

// Light/dark mode button (sun/moon) shown in the navbar.
// - The user's choice is saved in localStorage, so it is remembered next visit.
// - If they never chose, the site follows their device setting (prefers-color-scheme).
const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

const getSavedTheme = () => {
  try {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null; // localStorage can be blocked (e.g. private browsing)
  }
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => getSavedTheme() || (systemQuery.matches ? 'dark' : 'light'));

  // Put the theme on <html data-theme="..."> so the CSS variables in index.css switch
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // While the user has not picked a theme, follow changes to the device setting
  useEffect(() => {
    const onSystemChange = (e) => {
      if (!getSavedTheme()) setTheme(e.matches ? 'dark' : 'light');
    };
    systemQuery.addEventListener('change', onSystemChange);
    return () => systemQuery.removeEventListener('change', onSystemChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore: the theme still changes, it just won't be remembered
    }
  };

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button className="nav-icon-btn theme-toggle" aria-label={label} title={label} onClick={toggleTheme}>
      {/* key makes React redraw the icon so the small spin animation plays */}
      <Icon key={theme} name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
    </button>
  );
};

export default ThemeToggle;
