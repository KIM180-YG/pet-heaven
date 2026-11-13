import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatAge } from './PetCard';
import Icon from './Icon';
import './PetModal.css';

// Pop-up that shows the full details of one pet.
// It is reusable: give it a pet and an onClose function.
const PetModal = ({ pet, onClose }) => {
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);

  // Close the pop-up when the Esc key is pressed,
  // and stop the page behind it from scrolling while it is open.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    // Clean up when the pop-up closes
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleAdopt = () => {
    onClose();
    navigate(`/adopt/${pet.id}`); // goes to the adoption form for this pet
  };

  return (
    // Clicking the dark background closes the pop-up
    <div className="modal-backdrop" onClick={onClose}>
      {/* stopPropagation stops clicks inside the box from closing it */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pet-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={20} /></button>

        {imageFailed ? (
          <div className="modal-placeholder"><Icon name="paw" size={96} /></div>
        ) : (
          <img src={pet.image} alt={`${pet.name} the ${pet.breed}`} onError={() => setImageFailed(true)} />
        )}

        <div className="modal-body">
          <h2 id="pet-modal-title">{pet.name}</h2>
          <p className="modal-breed">{pet.breed}</p>

          <dl className="modal-facts">
            <div><dt>Species</dt><dd>{pet.species}</dd></div>
            <div><dt>Gender</dt><dd>{pet.gender}</dd></div>
            <div><dt>Age</dt><dd>{formatAge(pet.age)}</dd></div>
            <div><dt>Vaccinated</dt><dd>{pet.vaccinated ? <span className="yes"><Icon name="check" size={16} strokeWidth={2.5} /> Yes</span> : 'Not yet'}</dd></div>
          </dl>

          <p>{pet.description}</p>

          <div className="modal-actions">
            <button className="btn" onClick={handleAdopt}>Adopt {pet.name}</button>
            <button className="btn btn-outline" onClick={onClose}>Back to pets</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetModal;
