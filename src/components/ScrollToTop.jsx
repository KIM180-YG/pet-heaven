import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Jumps back to the top of the page whenever the page changes.
// Links with a #section (e.g. /#contact) are left alone so they can scroll to that section.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
