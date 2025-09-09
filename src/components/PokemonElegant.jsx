import { useState, useEffect } from 'react';

const PokemonElegant = ({ pokemon, loading, error }) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (pokemon) {
      setAnimationPhase(0);
      setTimeout(() => setAnimationPhase(1), 100);
    }
  }, [pokemon]);

  const getTypeClass = (typeName) => {
    return `type-badge type-${typeName}`;
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <h3 className="title">Carregando...</h3>
        <p className="description">Buscando dados do Pokémon</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="icon">⚠️</div>
        <h3 className="title">Erro</h3>
        <p className="description">Não foi possível carregar o Pokémon</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="empty-state">
        <div className="icon">🔍</div>
        <h3 className="title">Pokédex</h3>
        <p className="description">Digite um ID ou nome para buscar</p>
      </div>
    );
  }

  const { id, name, sprites, types, height, weight, base_experience, abilities, stats } = pokemon;
  const imageUrl = sprites?.other?.['official-artwork']?.front_default || 
                   sprites?.front_default || 
                   'https://via.placeholder.com/200x200?text=No+Image';

  return (
    <div className="pokemon-container" data-phase={animationPhase}>
      <div className="pokemon-card">
        {/* Header do Pokémon */}
        <div className="pokemon-header">
          <img 
            src={imageUrl} 
            alt={name}
            className="pokemon-image"
          />
          <div className="pokemon-info">
            <h1 className="pokemon-name">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h1>
            <p className="pokemon-id">#{id.toString().padStart(3, '0')}</p>
            <div className="pokemon-types">
              {types.map((type, index) => (
                <span 
                  key={index} 
                  className={getTypeClass(type.type.name)}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detalhes do Pokémon */}
        <div className="pokemon-details">
          <div className="detail-item">
            <div className="detail-label">Altura</div>
            <div className="detail-value">{(height / 10).toFixed(1)}m</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Peso</div>
            <div className="detail-value">{(weight / 10).toFixed(1)}kg</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Experiência Base</div>
            <div className="detail-value">{base_experience}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Habilidades</div>
            <div className="detail-value">{abilities.length}</div>
          </div>
        </div>

        {/* Habilidades e Estatísticas */}
        <div className="pokemon-bottom">
          {/* Habilidades */}
          {abilities.length > 0 && (
            <div className="pokemon-abilities">
              <h3 className="abilities-title">Habilidades</h3>
              <div className="abilities-list">
                {abilities.slice(0, 3).map((ability, index) => (
                  <div key={index} className="ability-item">
                    <span className="ability-name">
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                    {ability.is_hidden && (
                      <span className="hidden-badge">(Oculta)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Estatísticas */}
          {stats && stats.length > 0 && (
            <div className="pokemon-stats">
              <h3 className="stats-title">Estatísticas</h3>
              <div className="stats-list">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-header">
                      <span className="stat-name">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="stat-value">{stat.base_stat}</span>
                    </div>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill"
                        style={{ 
                          width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonElegant;
