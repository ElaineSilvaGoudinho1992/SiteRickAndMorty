import React from 'react';

const CharacterCard = ({ character, onClick }) => {
  

  const getStatusClass = (status) => {
    switch (status) {
      case 'Alive':
        return 'status-alive';
      case 'Dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  };
    
  return (
    <div className="character-card" onClick={onClick}>
      <img src={character.image} alt={character.name} />
      <div className="info">
        <h3>{character.name}</h3>
        <p className="status-line">
          <span className={`status-dot ${getStatusClass(character.status)}`}></span>
          {character.status} - {character.species}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;