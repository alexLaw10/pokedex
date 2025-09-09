import { memo, useMemo, useCallback } from 'react';
import type { PokemonElegantProps } from '@pokemon/types';

const PokemonElegant = memo<PokemonElegantProps>(({ pokemon, error, loading }) => {
  
  const getTypeColor = useCallback((typeName: string): string => {
    const typeColors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    
    return typeColors[typeName] || '#A8A878';
  }, []);

  const formatPokemonName = useCallback((name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  const formatAbilityName = useCallback((name: string): string => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }, []);

  const formatStatName = useCallback((name: string): string => {
    const statNames: Record<string, string> = {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defesa',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defesa Especial',
      speed: 'Velocidade'
    };
    
    return statNames[name] || name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  const getStatBarWidth = useCallback((stat: number): number => {
    return Math.min((stat / 255) * 100, 100);
  }, []);

  const pokemonData = useMemo(() => {
    if (!pokemon) return null;

    return {
      name: formatPokemonName(pokemon.name),
      id: pokemon.id,
      image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || '',
      types: pokemon.types.map(type => ({
        name: type.type.name,
        color: getTypeColor(type.type.name)
      })),
      abilities: pokemon.abilities.map(ability => ({
        name: formatAbilityName(ability.ability.name),
        isHidden: ability.is_hidden
      })),
      stats: pokemon.stats.map(stat => ({
        name: formatStatName(stat.stat.name),
        value: stat.base_stat,
        barWidth: getStatBarWidth(stat.base_stat)
      })),
      height: pokemon.height / 10, 
      weight: pokemon.weight / 10, 
      baseExperience: pokemon.base_experience
    };
  }, [pokemon, formatPokemonName, getTypeColor, formatAbilityName, formatStatName, getStatBarWidth]);

  if (loading) {
    return (
      <div className="pokemon-loading" role="status" aria-label="Carregando Pokémon">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p>Carregando informações do Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-error" role="alert" aria-live="polite">
        <div className="error-icon">⚠️</div>
        <h3>Erro ao carregar Pokémon</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div className="pokemon-empty">
        <div className="empty-icon">🔍</div>
        <h3>Nenhum Pokémon selecionado</h3>
        <p>Use a busca para encontrar um Pokémon</p>
      </div>
    );
  }

  return (
    <div className="pokemon-display" role="region" aria-label={`Informações do ${pokemonData.name}`}>
      {}
      <div className="pokemon-header">
        <div className="pokemon-image-container">
          <img
            src={pokemonData.image}
            alt={`${pokemonData.name} - Pokémon #${pokemonData.id}`}
            className="pokemon-image"
            loading="lazy"
          />
        </div>
        <div className="pokemon-info">
          <h2 className="pokemon-name">{pokemonData.name}</h2>
          <p className="pokemon-id">#{String(pokemonData.id).padStart(3, '0')}</p>
          <div className="pokemon-types">
            {pokemonData.types.map((type, index) => (
              <span
                key={index}
                className="pokemon-type"
                style={{ backgroundColor: type.color }}
                aria-label={`Tipo ${type.name}`}
              >
                {type.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="pokemon-physical">
        <div className="physical-item">
          <span className="physical-label">Altura</span>
          <span className="physical-value">{pokemonData.height}m</span>
        </div>
        <div className="physical-item">
          <span className="physical-label">Peso</span>
          <span className="physical-value">{pokemonData.weight}kg</span>
        </div>
        <div className="physical-item">
          <span className="physical-label">Experiência Base</span>
          <span className="physical-value">{pokemonData.baseExperience}</span>
        </div>
      </div>

      {}
      <div className="pokemon-abilities">
        <h3>Habilidades</h3>
        <div className="abilities-list">
          {pokemonData.abilities.map((ability, index) => (
            <div
              key={index}
              className={`ability-item ${ability.isHidden ? 'hidden' : ''}`}
            >
              <span className="ability-name">{ability.name}</span>
              {ability.isHidden && (
                <span className="ability-hidden" aria-label="Habilidade oculta">
                  (Oculta)
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="pokemon-stats">
        <h3>Estatísticas</h3>
        <div className="stats-list">
          {pokemonData.stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-header">
                <span className="stat-name">{stat.name}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${stat.barWidth}%` }}
                  aria-label={`${stat.name}: ${stat.value}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
});

PokemonElegant.displayName = 'PokemonElegant';

export default PokemonElegant;
