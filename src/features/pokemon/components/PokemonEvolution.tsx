import { memo, useCallback } from 'react';
import type { EvolutionData } from '@pokemon/types';

interface PokemonEvolutionProps {
  evolutionData: EvolutionData[];
  loading: boolean;
  error: string | null;
}

const PokemonEvolution = memo<PokemonEvolutionProps>(({ evolutionData, loading, error }) => {
  
  const formatPokemonName = useCallback((name: string): string => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }, []);

  const formatItemName = useCallback((itemName: string): string => {
    const itemNames: Record<string, string> = {
      'fire-stone': 'Pedra do Fogo',
      'water-stone': 'Pedra da Água',
      'thunder-stone': 'Pedra do Trovão',
      'leaf-stone': 'Pedra da Folha',
      'moon-stone': 'Pedra da Lua',
      'sun-stone': 'Pedra do Sol',
      'shiny-stone': 'Pedra Brilhante',
      'dawn-stone': 'Pedra do Amanhecer',
      'dusk-stone': 'Pedra do Crepúsculo',
      'ice-stone': 'Pedra do Gelo',
      'kings-rock': 'Pedra do Rei',
      'metal-coat': 'Capa de Metal',
      'dragon-scale': 'Escama de Dragão',
      'up-grade': 'Up-Grade',
      'prism-scale': 'Escama de Prisma',
      'deep-sea-tooth': 'Dente do Mar Profundo',
      'deep-sea-scale': 'Escama do Mar Profundo',
      'dubious-disc': 'Disco Duvidoso',
      'electirizer': 'Eletrizador',
      'magmarizer': 'Magmarizador',
      'protector': 'Protetor',
      'reaper-cloth': 'Pano do Ceifador',
      'sachet': 'Sachê',
      'whipped-dream': 'Sonho Batido',
      'tart-apple': 'Maçã Azeda',
      'sweet-apple': 'Maçã Doce',
      'cracked-pot': 'Pote Rachado',
      'chipped-pot': 'Pote Lasado'
    };

    return itemNames[itemName] || itemName.charAt(0).toUpperCase() + itemName.slice(1);
  }, []);

  const getEvolutionColor = useCallback((method: string): string => {
    if (method.includes('Pedra')) return '#ff6b6b';
    if (method.includes('Nível')) return '#4ecdc4';
    if (method.includes('Troca')) return '#45b7d1';
    if (method.includes('Felicidade')) return '#96ceb4';
    if (method.includes('Local')) return '#feca57';
    if (method.includes('Especial')) return '#ff9ff3';
    return '#6c757d';
  }, []);

  if (loading) {
    return (
      <div className="pokemon-evolution" role="status" aria-label="Carregando linha evolutiva">
        <div className="evolution-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <p>Carregando linha evolutiva...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-evolution" role="alert" aria-live="polite">
        <div className="evolution-error">
          <div className="error-icon">⚠️</div>
          <p>Erro ao carregar evolução</p>
          <p className="error-details">{error}</p>
        </div>
      </div>
    );
  }

  if (!evolutionData || evolutionData.length === 0) {
    return (
      <div className="pokemon-evolution">
        <div className="evolution-empty">
          <div className="empty-icon">🔗</div>
          <p>Este Pokémon não evolui</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-evolution" role="region" aria-label="Linha evolutiva">
      <h3>Linha Evolutiva</h3>
      
      <div className="evolution-chain">
        {evolutionData.map((pokemon, index) => {
          if (!pokemon || !pokemon.id) return null;
          
          return (
            <div key={`${pokemon.id}-${index}`} className="evolution-stage">
            <div className="pokemon-evolution-card">
              <div className="pokemon-evolution-image">
                <img
                  src={pokemon.image}
                  alt={`${formatPokemonName(pokemon.name)} - Pokémon #${pokemon.id}`}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                  }}
                />
                {pokemon.isRegionalForm && (
                  <div className="regional-badge" title={`Forma regional de ${pokemon.region}`}>
                    {pokemon.region}
                  </div>
                )}
              </div>
              
              <div className="pokemon-evolution-info">
                <h4 className="pokemon-evolution-name">
                  {formatPokemonName(pokemon.name)}
                </h4>
                <p className="pokemon-evolution-id">#{String(pokemon.id).padStart(3, '0')}</p>
                
                {pokemon.evolutionMethod && pokemon.evolutionMethod !== 'N/A' && (
                  <div className="evolution-method">
                    <span 
                      className="method-badge"
                      style={{ backgroundColor: getEvolutionColor(pokemon.evolutionMethod) }}
                    >
                      {pokemon.evolutionMethod}
                    </span>
                    {pokemon.evolutionItem && (
                      <span className="evolution-item">
                        {formatItemName(pokemon.evolutionItem)}
                      </span>
                    )}
                    {pokemon.evolutionCondition && (
                      <span className="evolution-condition">
                        {pokemon.evolutionCondition}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {index < evolutionData.length - 1 && (
              <div className="evolution-arrow">
                <div className="arrow-line"></div>
                <div className="arrow-head">→</div>
              </div>
            )}
          </div>
          );
        })}
      </div>
      
      {evolutionData.some(p => p.isRegionalForm) && (
        <div className="evolution-note">
          <p>
            <span className="note-icon">ℹ️</span>
            Pokémon com formas regionais mostram tanto a versão original quanto a regional
          </p>
        </div>
      )}
    </div>
  );
});

PokemonEvolution.displayName = 'PokemonEvolution';

export default PokemonEvolution;
