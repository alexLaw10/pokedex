import { useState, useCallback } from 'react';
import PokemonSearch from '@/components/PokemonSearch';
import PokemonElegant from '@/components/PokemonElegant';
import PokemonList from '@/components/PokemonList';
import PokemonEvolutionSidebar from '@/components/PokemonEvolutionSidebar';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import '@/styles/main.scss';

/**
 * Componente principal da aplicação Pokédex
 * Gerencia navegação entre busca e visualização de Pokémon
 */
function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<'search' | 'pokemon'>('search');
  const { 
    pokemon, 
    loading, 
    error, 
    searchPokemon, 
    clearSearch 
  } = usePokemonSearch();

  /**
   * Manipula busca de Pokémon
   */
  const handleSearch = useCallback((searchTerm: string): void => {
    searchPokemon(searchTerm);
    setCurrentView('pokemon');
  }, [searchPokemon]);

  /**
   * Manipula limpeza da busca
   */
  const handleClearSearch = useCallback((): void => {
    clearSearch();
    setCurrentView('search');
  }, [clearSearch]);

  /**
   * Manipula retorno à busca
   */
  const handleBackToSearch = useCallback((): void => {
    setCurrentView('search');
  }, []);

  /**
   * Manipula seleção de Pokémon da lista
   */
  const handlePokemonSelect = useCallback((pokemonName: string): void => {
    searchPokemon(pokemonName);
    setCurrentView('pokemon');
  }, [searchPokemon]);

  return (
    <div className="pokedex-container">
      <div className="pokedex-with-list">
        {/* Lista lateral de Pokémon */}
        <div className="pokemon-list-container">
          <PokemonList 
            onPokemonSelect={handlePokemonSelect}
            selectedPokemonId={pokemon?.id}
          />
        </div>

        {/* Pokédex principal */}
        <div className="pokedex-main">
          <div className="pokedex-device">
            {/* Header */}
            <div className="pokedex-header">
              <h1>Pokédex</h1>
              <p>Busque informações sobre qualquer Pokémon</p>
            </div>

            {/* Conteúdo */}
            <div className="pokedex-content">
              {currentView === 'search' && (
                <div className="search-section">
                  <div className="search-title">
                    <h2>Buscar Pokémon</h2>
                    <p>Digite o ID ou nome do Pokémon</p>
                  </div>
                  
                  <PokemonSearch 
                    onSearch={handleSearch}
                    loading={loading}
                  />
                </div>
              )}
              
              {currentView === 'pokemon' && (
                <div className="pokemon-section">
                  <div className="pokemon-controls">
                    <button 
                      type="button"
                      onClick={handleBackToSearch}
                      className="btn btn-secondary"
                      aria-label="Voltar para busca"
                    >
                      ← Voltar
                    </button>
                    <button 
                      type="button"
                      onClick={handleClearSearch}
                      className="btn btn-danger"
                      aria-label="Limpar busca"
                    >
                      ✕ Limpar
                    </button>
                  </div>
                  
                  <div className="pokemon-details-container">
                    <div className="pokemon-main-info">
                      <PokemonElegant
                        pokemon={pokemon}
                        error={error}
                        loading={loading}
                      />
                    </div>
                    
                    <div className="pokemon-evolution-sidebar">
                      <PokemonEvolutionSidebar pokemon={pokemon} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
