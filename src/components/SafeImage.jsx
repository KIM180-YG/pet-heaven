import React, { useState } from 'react';
import Icon from './Icon';

// Reusable image: if the photo fails to load, it shows a soft paw placeholder instead
// of a broken-image icon.
const SafeImage = ({ src, alt, className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`safe-image-fallback ${className}`} role="img" aria-label={alt}>
        <Icon name="paw" size={48} />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
};

export default SafeImage;
