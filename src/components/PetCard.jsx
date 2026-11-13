import React, { useState } from 'react';
import Icon from './Icon';
import './PetCard.css';

// Shows ages under 1 year in months, e.g. 0.5 -> "6 months"
export const formatAge = (age) => {
  if (age < 1) return `${Math.round(age * 12)} months`;
  return `${age} ${age === 1 ? 'year' : 'years'}`;
};

// Reusable card that shows one pet. Used on the Adopt and Home pages.
const PetCard = ({ pet, onSelect }) => {
  // If the photo fails to load, show a paw placeholder instead
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className="pet-card"
      onClick={() => onSelect && onSelect(pet)}
      // Lets keyboard users open the card with Enter
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && onSelect && onSelect(pet)}
    >
      {imageFailed ? (
        <div className="pet-card-placeholder"><Icon name="paw" size={56} /></div>
      ) : (
        <img src={pet.image} alt={`${pet.name} the ${pet.breed}`} onError={() => setImageFailed(true)} />
      )}
      <div className="pet-card-body">
        <h3>{pet.name}</h3>
        <p>{pet.breed}</p>
        <div className="pet-card-tags">
          <span>{pet.species}</span>
          <span>{pet.gender}</span>
          <span>{formatAge(pet.age)}</span>
        </div>
      </div>
    </article>
  );
};

export default PetCard;
