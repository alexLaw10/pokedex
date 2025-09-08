import { usePokemonList } from '../hooks/usePokemonList';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const { 
    pokemonList, 
    loading, 
    error, 
    hasMore, 
    loadMore, 
    refresh 
  } = usePokemonList(0, 20);

  if (error) {
    return (
      <div>
        <h2>Erro ao carregar lista de Pokémon</h2>
        <p>{error}</p>
        <button onClick={refresh}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      
      <div>
        <button onClick={refresh} disabled={loading}>
          {loading ? 'Carregando...' : 'Atualizar Lista'}
        </button>
      </div>

      <div>
        {pokemonList.length === 0 && loading ? (
          <p>Carregando lista de Pokémon...</p>
        ) : (
          <div>
            {pokemonList.map((pokemon, index) => (
              <div key={`${pokemon.name}-${index}`}>
                <PokemonCard pokemon={pokemon} />
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>

      {hasMore && (
        <div>
          <button 
            onClick={loadMore} 
            disabled={loading}
          >
            {loading ? 'Carregando mais...' : 'Carregar Mais Pokémon'}
          </button>
        </div>
      )}

      {!hasMore && pokemonList.length > 0 && (
        <p>Você viu todos os Pokémon disponíveis!</p>
      )}
    </div>
  );
};

export default PokemonList;
