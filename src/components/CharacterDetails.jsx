import React from 'react';

const CharacterDetails = ({ character, onClose }) => {
  
  const { name, status, species, gender, origin, location, image, episode } = character;
  
  const getEpisodeInfo = (url) => {
   
    const id = url.split('/').pop();
   
    return `ID: ${id}`; 
  };
  
  return (
    <div className="character-details-overlay">
      <div className="character-details-modal">
        <button className="close-button" onClick={onClose}>X</button>
        
        <h2>Detalhes do Personagem</h2>
        
        <div className="detail-content">
          <img src={image} alt={name} />
          
          <div className="info-text">
            <p><strong>Nome:</strong> {name}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Espécie:</strong> {species}</p>
            <p><strong>Gênero:</strong> {gender}</p>
            <p><strong>Origem:</strong> {origin.name}</p>
            <p><strong>Última Localização:</strong> {location.name}</p>
          </div>

          <h3>Episódios que Participou ({episode.length}):</h3>
          <ul className="episodes-list">
            {episode.slice(0, 5).map((url, index) => (
              <li key={index}>
                {getEpisodeInfo(url)}
           
              </li>
            ))}
            {episode.length > 5 && <li>... e mais {episode.length - 5} episódios.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;