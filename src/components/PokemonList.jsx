import { useState, useEffect } from 'react';
import { pokemonAPI } from '../services/pokemonAPI';
import { getPokemonByRegion } from '../data/pokemonRegions';
import RegionFilter from './RegionFilter';

const PokemonList = ({ onPokemonSelect, selectedPokemonId }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [regionPokemon, setRegionPokemon] = useState([]);

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

  const loadRegionPokemon = async (regionKey) => {
    try {
      setLoading(true);
      const regionPokemonIds = getPokemonByRegion(regionKey);
      
      // Carregar detalhes dos Pokémon da região em lotes
      const batchSize = 20;
      const pokemonDetails = [];
      
      for (let i = 0; i < regionPokemonIds.length; i += batchSize) {
        const batch = regionPokemonIds.slice(i, i + batchSize);
        const promises = batch.map(pokemon => 
          pokemonAPI.getPokemonDetails(pokemon.id)
        );
        
        const batchResults = await Promise.all(promises);
        pokemonDetails.push(...batchResults);
      }
      
      setRegionPokemon(pokemonDetails);
      setHasMore(false); // Não há mais para carregar em modo região
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRegion === 'all') {
      loadPokemonList();
    } else {
      loadRegionPokemon(selectedRegion);
    }
  }, [selectedRegion]);

  const handleRegionChange = (regionKey) => {
    setSelectedRegion(regionKey);
    setOffset(0);
    setError(null);
  };

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

  const currentPokemonList = selectedRegion === 'all' ? pokemonList : regionPokemon;
  const displayCount = selectedRegion === 'all' ? pokemonList.length : regionPokemon.length;

  return (
    <div className="pokemon-list">
      <div className="pokemon-list-header">
        <h3>Lista de Pokémon</h3>
        <span className="pokemon-count">{displayCount}</span>
      </div>
      
      <div className="pokemon-list-filters">
        <RegionFilter 
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
        />
      </div>
      
      <div className="pokemon-list-content">
        {currentPokemonList.map((pokemon, index) => {
          const pokemonId = selectedRegion === 'all' 
            ? pokemon.url.split('/').slice(-2, -1)[0]
            : pokemon.id;
          const pokemonName = selectedRegion === 'all' 
            ? pokemon.name
            : pokemon.name;
          const isSelected = selectedPokemonId === parseInt(pokemonId);
          
          return (
            <div
              key={pokemonName}
              className={`pokemon-list-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handlePokemonClick({ name: pokemonName })}
            >
              <div className="pokemon-number">#{pokemonId}</div>
              <div className="pokemon-name">
                {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
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
        
        {hasMore && !loading && selectedRegion === 'all' && (
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
