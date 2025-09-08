const PokemonDetails = ({ pokemon, error, notFound, onClear }) => {
  if (error) {
    return (
      <div>
        <h3>Erro na Busca</h3>
        <p>{error}</p>
        <button onClick={onClear}>Tentar Novamente</button>
      </div>
    );
  }

  if (notFound) {
    return (
      <div>
        <h3>Pokémon Não Encontrado</h3>
        <p>Não foi possível encontrar um Pokémon com esse ID ou nome.</p>
        <p>Verifique se digitou corretamente e tente novamente.</p>
        <button onClick={onClear}>Nova Busca</button>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  const {
    id,
    name,
    height,
    weight,
    base_experience,
    sprites,
    types,
    abilities,
    stats,
    species
  } = pokemon;

  // Obter imagem principal
  const imageUrl = sprites?.other?.['official-artwork']?.front_default || 
                   sprites?.other?.dream_world?.front_default ||
                   sprites?.front_default || 
                   'https://via.placeholder.com/200x200?text=No+Image';

  // Obter descrição em português se disponível
  const getDescription = () => {
    if (species?.flavor_text_entries) {
      const portugueseEntry = species.flavor_text_entries.find(
        entry => entry.language.name === 'pt'
      );
      if (portugueseEntry) {
        return portugueseEntry.flavor_text.replace(/\f/g, ' ');
      }
    }
    return 'Descrição não disponível em português';
  };

  // Obter geração
  const getGeneration = () => {
    if (species?.generation) {
      return species.generation.name.replace('generation-', 'Geração ').toUpperCase();
    }
    return 'N/A';
  };

  return (
    <div>
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)} #{id}</h2>
      
      <div>
        <img 
          src={imageUrl} 
          alt={name}
          width="300"
          height="300"
        />
      </div>

      <div>
        <h3>Informações Básicas</h3>
        <ul>
          <li><strong>ID:</strong> #{id}</li>
          <li><strong>Nome:</strong> {name.charAt(0).toUpperCase() + name.slice(1)}</li>
          <li><strong>Altura:</strong> {height / 10}m</li>
          <li><strong>Peso:</strong> {weight / 10}kg</li>
          <li><strong>Experiência Base:</strong> {base_experience}</li>
          <li><strong>Geração:</strong> {getGeneration()}</li>
        </ul>
      </div>

      <div>
        <h3>Tipos</h3>
        <ul>
          {types.map((type, index) => (
            <li key={index}>
              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
              {type.slot === 1 ? ' (Primário)' : ' (Secundário)'}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Habilidades</h3>
        <ul>
          {abilities.map((ability, index) => (
            <li key={index}>
              {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
              {ability.is_hidden ? ' (Habilidade Oculta)' : ''}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Estatísticas Base</h3>
        <ul>
          {stats.map((stat, index) => (
            <li key={index}>
              <strong>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Descrição</h3>
        <p>{getDescription()}</p>
      </div>

      <div>
        <button onClick={onClear}>Nova Busca</button>
      </div>
    </div>
  );
};

export default PokemonDetails;
