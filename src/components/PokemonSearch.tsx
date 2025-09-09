import React, { useState, useCallback, memo } from 'react';
import type { PokemonSearchProps } from '@/types/pokemon';

/**
 * Componente de busca de Pokémon
 * Permite buscar Pokémon por ID ou nome
 */
const PokemonSearch = memo<PokemonSearchProps>(({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Manipula o envio do formulário
   */
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (searchTerm.trim() && !loading) {
      onSearch(searchTerm.trim());
    }
  }, [searchTerm, onSearch, loading]);

  /**
   * Manipula mudanças no input
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  /**
   * Manipula clique nos exemplos
   */
  const handleExampleClick = useCallback((example: string) => {
    setSearchTerm(example);
  }, []);

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Digite o ID ou nome do Pokémon"
            className="search-input"
            disabled={loading}
            aria-label="Buscar Pokémon"
            aria-describedby="search-help"
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || !searchTerm.trim()}
            aria-label="Buscar Pokémon"
          >
            {loading ? (
              <div className="search-spinner" aria-hidden="true">
                <div className="spinner"></div>
              </div>
            ) : (
              '🔍'
            )}
          </button>
        </div>
      </form>

      <div className="search-examples" id="search-help">
        <p>Exemplos:</p>
        <div className="example-buttons">
          <button
            type="button"
            onClick={() => handleExampleClick('1')}
            className="example-btn"
            disabled={loading}
            aria-label="Buscar Pokémon com ID 1"
          >
            #1
          </button>
          <button
            type="button"
            onClick={() => handleExampleClick('pikachu')}
            className="example-btn"
            disabled={loading}
            aria-label="Buscar Pokémon Pikachu"
          >
            Pikachu
          </button>
          <button
            type="button"
            onClick={() => handleExampleClick('charizard')}
            className="example-btn"
            disabled={loading}
            aria-label="Buscar Pokémon Charizard"
          >
            Charizard
          </button>
        </div>
      </div>
    </div>
  );
});

PokemonSearch.displayName = 'PokemonSearch';

export default PokemonSearch;
