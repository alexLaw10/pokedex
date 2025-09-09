import { useState, useEffect } from 'react';
import { pokemonAPI } from '../services/pokemonAPI';

const PokemonList = ({ onPokemonSelect, selectedPokemonId }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadPokemonList = async (newOffset = 0) => {
    try {
      setLoading(true);
      const response = await pokemonAPI.getPokemonList(newOffset, 20);
      
      if (newOffset === 0) {
        setPokemonList(response.results);
      } else {
        setPokemonList(prev => [...prev, ...response.results]);
      }
      
      setOffset(newOffset + 20);
      setHasMore(response.next !== null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemonList();
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadPokemonList(offset);
    }
  };

  const handlePokemonClick = (pokemon) => {
    onPokemonSelect(pokemon.name);
  };

  if (error) {
    return (
      <div className="pokemon-list-error">
        <div className="error-icon">⚠️</div>
        <p>Erro ao carregar lista</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      <div className="pokemon-list-header">
        <h3>Lista de Pokémon</h3>
        <span className="pokemon-count">{pokemonList.length}</span>
      </div>
      
      <div className="pokemon-list-content">
        {pokemonList.map((pokemon, index) => {
          const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
          const isSelected = selectedPokemonId === parseInt(pokemonId);
          
          return (
            <div
              key={pokemon.name}
              className={`pokemon-list-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(pokemon)}
            >
              <div className="pokemon-number">#{pokemonId}</div>
              <div className="pokemon-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </div>
            </div>
          );
        })}
        
        {loading && (
          <div className="pokemon-list-loading">
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
            <span>Carregando...</span>
          </div>
        )}
        
        {hasMore && !loading && (
          <button 
            className="load-more-btn"
            onClick={handleLoadMore}
          >
            Carregar Mais
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
