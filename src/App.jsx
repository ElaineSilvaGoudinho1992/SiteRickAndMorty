import React, { useState, useEffect, useCallback } from 'react';
import CharacterList from './components/CharacterList.jsx';
import CharacterDetails from './components/CharacterDetails.jsx';
import SearchBar from './components/SearchBar.jsx';
import Filter from './components/Filter.jsx';
import './App.css';

const API_BASE_URL = "https://rickandmortyapi.com/api/character";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = useCallback(async (name = '', status = '') => {
    setIsLoading(true);
    setError(null);
    setSelectedCharacter(null); 
    let url = `${API_BASE_URL}/?name=${name}&status=${status}`;

    try {
      const response = await fetch(url);
      
      if (response.status === 404) {
        setCharacters([]);
        setIsLoading(false);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Erro de HTTP! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setCharacters(data.results);
      
    } catch (e) {
      setError("Erro ao buscar personagens. Verifique sua conexão ou tente novamente.");
      setCharacters([]);
      console.error(e);
      
    } finally {
      setIsLoading(false);
    }
  }, []); 

  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCharacters(searchTerm, filterStatus);
    }, 400); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filterStatus, fetchCharacters]);

  
  const fetchCharacterDetails = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
     
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar detalhes! Status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedCharacter(data); 
    } catch (e) {
      setError("Erro ao buscar detalhes do personagem.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCharacterClick = (characterId) => {
    fetchCharacterDetails(characterId);
  };

  return (
    <div className="App">
      <header>
        <h1>Rick and Morty App</h1>
        <div className="controls">
         
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={(e) => setSearchTerm(e.target.value)} 
          />
         
          <Filter 
            filterStatus={filterStatus} 
            onFilterChange={(e) => setFilterStatus(e.target.value)} 
          />
        </div>
      </header>

      
      {selectedCharacter && (
        <CharacterDetails 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      )}
      
      <main>
        {isLoading && <p className="loading">Carregando personagens...</p>}
        {error && <p className="error">{error}</p>}
        
       
        {!isLoading && !error && characters.length === 0 && (searchTerm || filterStatus) && (
          <p className="no-results">Nenhum personagem encontrado com a pesquisa/filtro atual.</p>
        )}
        
     
        {!isLoading && !error && characters.length > 0 && (
          <CharacterList 
            characters={characters} 
            onCharacterClick={handleCharacterClick}
          />
        )}
      </main>
    </div>
  );
}

export default App;