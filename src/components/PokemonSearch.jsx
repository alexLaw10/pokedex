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
      <h2>Buscar Pokémon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pokemon-search">
            Digite o ID ou nome do Pokémon:
          </label>
          <input
            id="pokemon-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ex: 25, pikachu, charizard"
            disabled={loading}
          />
        </div>
        
        <div>
          <button type="submit" disabled={loading || !searchTerm.trim()}>
            {loading ? 'Buscando...' : 'Buscar Pokémon'}
          </button>
          
          <button 
            type="button" 
            onClick={handleClear}
            disabled={loading}
          >
            Limpar
          </button>
        </div>
      </form>
      
      <div>
        <p>
          <strong>Dicas:</strong>
        </p>
        <ul>
          <li>Digite o número do Pokémon (ex: 25 para Pikachu)</li>
          <li>Digite o nome do Pokémon (ex: pikachu, charizard)</li>
          <li>Nomes são case-insensitive (pikachu = PIKACHU = Pikachu)</li>
        </ul>
      </div>
    </div>
  );
};

export default PokemonSearch;
