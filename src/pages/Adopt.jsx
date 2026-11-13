import React, { useState } from 'react';
import pets from '../data/pets';
import PetCard from '../components/PetCard';
import PetModal from '../components/PetModal';
import './Adopt.css';

const Adopt = () => {
  // One piece of state per filter
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('All');
  const [gender, setGender] = useState('All');
  const [age, setAge] = useState('All');
  // The pet shown in the pop-up (null = pop-up closed)
  const [selectedPet, setSelectedPet] = useState(null);

  // Work out which pets match every filter
  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase());
    const matchesSpecies = species === 'All' || pet.species === species;
    const matchesGender = gender === 'All' || pet.gender === gender;
    const matchesAge =
      age === 'All' ||
      (age === 'Young' && pet.age <= 2) ||
      (age === 'Adult' && pet.age >= 3 && pet.age <= 6) ||
      (age === 'Senior' && pet.age >= 7);
    return matchesSearch && matchesSpecies && matchesGender && matchesAge;
  });

  const resetFilters = () => {
    setSearch('');
    setSpecies('All');
    setGender('All');
    setAge('All');
  };

  return (
    <section className="container">
      <h1>Adopt a Pet</h1>
      <p>Meet the cats and dogs waiting for a loving home. Click a pet to learn more.</p>

      <div className="filters">
        <input
          type="search"
          placeholder="Search by name or breed..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search pets"
        />
        <select value={species} onChange={(e) => setSpecies(e.target.value)} aria-label="Species">
          <option value="All">All species</option>
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
        </select>
        <select value={gender} onChange={(e) => setGender(e.target.value)} aria-label="Gender">
          <option value="All">All genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select value={age} onChange={(e) => setAge(e.target.value)} aria-label="Age">
          <option value="All">All ages</option>
          <option value="Young">Young (0-2)</option>
          <option value="Adult">Adult (3-6)</option>
          <option value="Senior">Senior (7+)</option>
        </select>
      </div>

      <p className="results-count">
        Showing {filteredPets.length} of {pets.length} pets
      </p>

      {filteredPets.length > 0 ? (
        <div className="pet-grid">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onSelect={setSelectedPet} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No pets match your filters.</p>
          <button className="btn btn-outline" onClick={resetFilters}>Clear filters</button>
        </div>
      )}

      {selectedPet && (
        <PetModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
    </section>
  );
};

export default Adopt;
