import React, { useState, useCallback, memo } from 'react';
import type { PokemonSearchProps } from '@pokemon/types';

const PokemonSearch = memo<PokemonSearchProps>(({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (searchTerm.trim() && !loading) {
      onSearch(searchTerm.trim());
    }
  }, [searchTerm, onSearch, loading]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleExampleClick = useCallback((example: string) => {
    setSearchTerm(example);
  }, []);

  return (
    <div className="search-container" role="search" aria-label="Busca de Pokémon">
      <form onSubmit={handleSubmit} className="search-form" noValidate>
        <div className="search-input-group">
          <label htmlFor="pokemon-search" className="search-label">
            Buscar Pokémon
          </label>
          <div className="search-input-wrapper">
            <input
              id="pokemon-search"
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Digite o ID ou nome do Pokémon"
              className="search-input"
              disabled={loading}
              aria-label="Buscar Pokémon"
              aria-describedby="search-help search-status"
              aria-required="true"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <button
              type="submit"
              className="search-button"
              disabled={loading || !searchTerm.trim()}
              aria-label={loading ? "Buscando Pokémon..." : "Buscar Pokémon"}
              title={loading ? "Buscando..." : "Clique para buscar"}
            >
              {loading ? (
                <div className="search-spinner" aria-hidden="true">
                  <div className="spinner"></div>
                </div>
              ) : (
                <span aria-hidden="true">🔍</span>
              )}
            </button>
          </div>
        </div>
        <div id="search-status" className="search-status" aria-live="polite">
          {loading ? "Buscando Pokémon..." : "Digite um ID ou nome para buscar"}
        </div>
      </form>

      <div className="search-examples" id="search-help">
        <p className="examples-title">Exemplos de busca:</p>
        <div className="example-buttons" role="group" aria-label="Exemplos de busca">
          <button
            type="button"
            onClick={() => handleExampleClick('1')}
            className="example-btn"
            disabled={loading}
            aria-label="Buscar Pokémon com ID 1 (Bulbasaur)"
            title="Buscar Bulbasaur"
          >
            <span className="example-icon">🌱</span>
            #1 Bulbasaur
          </button>
          <button
            type="button"
            onClick={() => handleExampleClick('pikachu')}
            className="example-btn"
            disabled={loading}
            aria-label="Buscar Pokémon Pikachu"
            title="Buscar Pikachu"
          >
            <span className="example-icon">⚡</span>
            Pikachu
          </button>
          <button
            type="button"
            onClick={() => handleExampleClick('charizard')}
            className="example-btn"
            disabled={loading}
            aria-label="Buscar Pokémon Charizard"
            title="Buscar Charizard"
          >
            <span className="example-icon">🔥</span>
            Charizard
          </button>
        </div>
      </div>
    </div>
  );
});

PokemonSearch.displayName = 'PokemonSearch';

export default PokemonSearch;
