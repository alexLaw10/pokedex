import { useState, useEffect, useCallback, memo } from 'react';
import { pokemonAPI } from '@/services/pokemonAPI';
import { getPokemonByRegion } from '@/data/pokemonRegions';
import RegionFilter from './RegionFilter';
import type { PokemonListProps, Pokemon, PokemonListItem } from '@/types/pokemon';

/**
 * Componente de lista de Pokémon com filtro por região
 * Exibe lista paginada de Pokémon com opção de filtrar por região
 */
const PokemonList = memo<PokemonListProps>(({ onPokemonSelect, selectedPokemonId }) => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [regionPokemon, setRegionPokemon] = useState<Pokemon[]>([]);

  /**
   * Carrega lista de Pokémon com paginação
   */
  const loadPokemonList = useCallback(async (newOffset = 0): Promise<void> => {
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
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Carrega Pokémon de uma região específica
   */
  const loadRegionPokemon = useCallback(async (regionKey: string): Promise<void> => {
    try {
      setLoading(true);
      const regionPokemonIds = getPokemonByRegion(regionKey);
      
      // Carregar detalhes dos Pokémon da região em lotes
      const batchSize = 20;
      const pokemonDetails: Pokemon[] = [];
      
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
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Efeito para carregar dados baseado na região selecionada
   */
  useEffect(() => {
    if (selectedRegion === 'all') {
      loadPokemonList();
    } else {
      loadRegionPokemon(selectedRegion);
    }
  }, [selectedRegion, loadPokemonList, loadRegionPokemon]);

  /**
   * Manipula mudança de região
   */
  const handleRegionChange = useCallback((regionKey: string) => {
    setSelectedRegion(regionKey);
    setOffset(0);
    setError(null);
  }, []);

  /**
   * Manipula carregamento de mais Pokémon
   */
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore && selectedRegion === 'all') {
      loadPokemonList(offset);
    }
  }, [loading, hasMore, selectedRegion, offset, loadPokemonList]);

  /**
   * Manipula clique em um Pokémon
   */
  const handlePokemonClick = useCallback((pokemon: { name: string }) => {
    onPokemonSelect(pokemon.name);
  }, [onPokemonSelect]);

  /**
   * Formata nome do Pokémon
   */
  const formatPokemonName = useCallback((name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  // Estados de loading e erro
  if (loading && pokemonList.length === 0 && regionPokemon.length === 0) {
    return (
      <div className="pokemon-list" role="status" aria-label="Carregando lista de Pokémon">
        <div className="pokemon-list-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <span>Carregando Pokémon...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-list" role="alert" aria-live="polite">
        <div className="pokemon-list-error">
          <div className="error-icon">⚠️</div>
          <p>Erro ao carregar lista</p>
          <p className="error-details">{error}</p>
        </div>
      </div>
    );
  }

  const currentPokemonList = selectedRegion === 'all' ? pokemonList : regionPokemon;
  const displayCount = selectedRegion === 'all' ? pokemonList.length : regionPokemon.length;

  return (
    <div className="pokemon-list">
      <div className="pokemon-list-header">
        <h3>Lista de Pokémon</h3>
        <span className="pokemon-count" aria-label={`${displayCount} Pokémon carregados`}>
          {displayCount}
        </span>
      </div>
      
      <div className="pokemon-list-filters">
        <RegionFilter 
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
        />
      </div>
      
      <div className="pokemon-list-content" role="list" aria-label="Lista de Pokémon">
        {currentPokemonList.map((pokemon) => {
          const pokemonId = selectedRegion === 'all' 
            ? (pokemon as PokemonListItem).url.split('/').slice(-2, -1)[0]
            : (pokemon as Pokemon).id;
          const pokemonName = selectedRegion === 'all' 
            ? (pokemon as PokemonListItem).name
            : (pokemon as Pokemon).name;
          const isSelected = selectedPokemonId === parseInt(String(pokemonId));
          
          return (
            <div
              key={pokemonName}
              className={`pokemon-list-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handlePokemonClick({ name: pokemonName })}
              role="listitem"
              tabIndex={0}
              aria-label={`Pokémon ${formatPokemonName(pokemonName)} - ID ${pokemonId}`}
              aria-selected={isSelected}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePokemonClick({ name: pokemonName });
                }
              }}
            >
              <div className="pokemon-number">#{pokemonId}</div>
              <div className="pokemon-name">
                {formatPokemonName(pokemonName)}
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
            type="button"
            className="load-more-btn"
            onClick={handleLoadMore}
            aria-label="Carregar mais Pokémon"
          >
            Carregar Mais
          </button>
        )}
      </div>
    </div>
  );
});

PokemonList.displayName = 'PokemonList';

export default PokemonList;
