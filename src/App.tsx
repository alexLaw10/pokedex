import { useState, useCallback } from 'react';
import { 
  PokemonSearch, 
  PokemonElegant, 
  PokemonList, 
  PokemonEvolutionSidebar 
} from '@pokemon/components';
import { usePokemonSearch } from '@pokemon/hooks';
import './styles/main.scss';

function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<'search' | 'pokemon'>('search');
  const { 
    pokemon, 
    loading, 
    error, 
    searchPokemon, 
    clearSearch 
  } = usePokemonSearch();

  const handleSearch = useCallback((searchTerm: string): void => {
    searchPokemon(searchTerm);
    setCurrentView('pokemon');
  }, [searchPokemon]);

  const handleClearSearch = useCallback((): void => {
    clearSearch();
    setCurrentView('search');
  }, [clearSearch]);

  const handleBackToSearch = useCallback((): void => {
    setCurrentView('search');
  }, []);

  const handlePokemonSelect = useCallback((pokemonName: string): void => {
    searchPokemon(pokemonName);
    setCurrentView('pokemon');
  }, [searchPokemon]);

  return (
    <div className="pokedex-container" role="main" aria-label="Aplicação Pokédex">
      <div className="pokedex-with-list">
        <aside className="pokemon-list-container" role="complementary" aria-label="Lista de Pokémon">
          <PokemonList 
            onPokemonSelect={handlePokemonSelect}
            selectedPokemonId={pokemon?.id}
          />
        </aside>

        <main id="main-content" className="pokedex-main" role="main">
          <div className="pokedex-device">
            <header className="pokedex-header">
              <h1>Pokédex</h1>
              <p>Busque informações sobre qualquer Pokémon</p>
            </header>

            <div className="pokedex-content">
              {currentView === 'search' && (
                <section className="search-section" aria-labelledby="search-title">
                  <div className="search-title">
                    <h2 id="search-title">Buscar Pokémon</h2>
                    <p>Digite o ID ou nome do Pokémon</p>
                  </div>
                  
                  <PokemonSearch 
                    onSearch={handleSearch}
                    loading={loading}
                  />
                </section>
              )}
              
              {currentView === 'pokemon' && (
                <section className="pokemon-section" aria-labelledby="pokemon-details">
                  <div className="pokemon-controls" role="toolbar" aria-label="Controles do Pokémon">
                    <button 
                      type="button"
                      onClick={handleBackToSearch}
                      className="btn btn-secondary"
                      aria-label="Voltar para busca"
                      title="Voltar para a tela de busca"
                    >
                      ← Voltar
                    </button>
                    <button 
                      type="button"
                      onClick={handleClearSearch}
                      className="btn btn-danger"
                      aria-label="Limpar busca"
                      title="Limpar busca atual"
                    >
                      ✕ Limpar
                    </button>
                  </div>
                  
                  <div className="pokemon-details-container">
                    <div className="pokemon-main-info" role="region" aria-label="Informações principais do Pokémon">
                      <PokemonElegant
                        pokemon={pokemon}
                        error={error}
                        loading={loading}
                      />
                    </div>
                    
                    <aside className="pokemon-evolution-sidebar" role="complementary" aria-label="Informações de evolução">
                      <PokemonEvolutionSidebar pokemon={pokemon} />
                    </aside>
                  </div>
                </section>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
