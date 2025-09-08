import { useState, useEffect } from 'react';
import { pokemonAPI } from '../services/pokemonAPI';

const PokemonCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extrair ID do Pokémon da URL
  const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const details = await pokemonAPI.getPokemonDetails(pokemonId);
        setPokemonDetails(details);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar detalhes do Pokémon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  if (loading) {
    return (
      <div>
        <h3>Carregando...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3>Erro ao carregar Pokémon</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!pokemonDetails) {
    return (
      <div>
        <h3>Pokémon não encontrado</h3>
      </div>
    );
  }

  const { name, sprites, types, id } = pokemonDetails;
  const imageUrl = sprites?.other?.['official-artwork']?.front_default || 
                   sprites?.front_default || 
                   'https://via.placeholder.com/200x200?text=No+Image';

  return (
    <div>
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <p>ID: #{id}</p>
      <img 
        src={imageUrl} 
        alt={name}
        width="200"
        height="200"
      />
      <div>
        <h4>Tipos:</h4>
        <ul>
          {types.map((type, index) => (
            <li key={index}>
              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
