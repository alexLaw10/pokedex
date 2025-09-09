import { useState } from 'react';

const PokemonSearch = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite ID ou nome do Pokémon..."
          disabled={loading}
          className="search-input"
          autoFocus
        />
        
        <div className="button-row">
          <button 
            type="submit" 
            disabled={loading || !searchTerm.trim()}
            className="search-button"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
          
          <button 
            type="button" 
            onClick={handleClear}
            disabled={loading}
            className="clear-button"
          >
            Limpar
          </button>
        </div>
      </form>
      
      <div className="search-help">
        <div className="instructions">
          <h4>Como usar:</h4>
          <ul className="instruction-list">
            <li>Digite o número do Pokémon (ex: 25)</li>
            <li>Digite o nome do Pokémon (ex: pikachu)</li>
            <li>Pressione ENTER ou clique em Buscar</li>
          </ul>
        </div>

        <div className="examples">
          <h4>Exemplos:</h4>
          <div className="example-tags">
            <span className="example-tag" onClick={() => setSearchTerm('25')}>25</span>
            <span className="example-tag" onClick={() => setSearchTerm('pikachu')}>pikachu</span>
            <span className="example-tag" onClick={() => setSearchTerm('150')}>150</span>
            <span className="example-tag" onClick={() => setSearchTerm('mewtwo')}>mewtwo</span>
            <span className="example-tag" onClick={() => setSearchTerm('charizard')}>charizard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
