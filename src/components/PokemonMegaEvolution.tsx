import { memo, useCallback } from 'react';
import type { MegaEvolution } from '@/types/pokemon';

interface PokemonMegaEvolutionProps {
  megaEvolutions: MegaEvolution[];
  loading: boolean;
  error: string | null;
}

/**
 * Componente para exibir Mega Evoluções de um Pokémon
 * Mostra as diferentes formas mega disponíveis
 */
const PokemonMegaEvolution = memo<PokemonMegaEvolutionProps>(({ megaEvolutions, loading, error }) => {
  /**
   * Formata nome do Pokémon
   */
  const formatPokemonName = useCallback((name: string): string => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }, []);

  /**
   * Obtém cor baseada no tipo de mega evolução
   */
  const getMegaTypeColor = useCallback((type: string): string => {
    switch (type) {
      case 'mega-x': return '#ff6b6b';
      case 'mega-y': return '#4ecdc4';
      case 'mega': return '#45b7d1';
      default: return '#6c757d';
    }
  }, []);

  /**
   * Obtém ícone baseado no tipo de mega evolução
   */
  const getMegaTypeIcon = useCallback((type: string): string => {
    switch (type) {
      case 'mega-x': return '⚔️';
      case 'mega-y': return '✨';
      case 'mega': return '💎';
      default: return '⭐';
    }
  }, []);

  if (loading) {
    return (
      <div className="mega-evolution" role="status" aria-label="Carregando mega evoluções">
        <div className="mega-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <p>Carregando Mega Evoluções...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mega-evolution" role="alert" aria-live="polite">
        <div className="mega-error">
          <div className="error-icon">⚠️</div>
          <p>Erro ao carregar Mega Evoluções</p>
          <p className="error-details">{error}</p>
        </div>
      </div>
    );
  }

  if (!megaEvolutions || megaEvolutions.length === 0) {
    return (
      <div className="mega-evolution">
        <div className="mega-empty">
          <div className="empty-icon">💎</div>
          <p>Este Pokémon não possui Mega Evolução</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mega-evolution" role="region" aria-label="Mega Evoluções">
      <h3>Mega Evoluções</h3>
      
      <div className="mega-list">
        {megaEvolutions.map((mega) => (
          <div key={mega.id} className="mega-card">
            <div className="mega-header">
              <div className="mega-image-container">
                <img
                  src={mega.image}
                  alt={`${formatPokemonName(mega.name)} - Mega Evolução`}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mega.id}.png`;
                  }}
                />
                <div 
                  className="mega-type-badge"
                  style={{ backgroundColor: getMegaTypeColor(mega.type) }}
                  title={`Tipo: ${mega.type.toUpperCase()}`}
                >
                  {getMegaTypeIcon(mega.type)}
                </div>
              </div>
              
              <div className="mega-info">
                <h4 className="mega-name">
                  {formatPokemonName(mega.name)}
                </h4>
                <p className="mega-stone">
                  <span className="stone-icon">💎</span>
                  {mega.megaStone}
                </p>
                <p className="mega-description">{mega.description}</p>
              </div>
            </div>
            
            <div className="mega-stats">
              <h5>Estatísticas</h5>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">HP</span>
                  <span className="stat-value">{mega.stats.hp}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Ataque</span>
                  <span className="stat-value">{mega.stats.attack}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Defesa</span>
                  <span className="stat-value">{mega.stats.defense}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Sp. Ataque</span>
                  <span className="stat-value">{mega.stats.spAttack}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Sp. Defesa</span>
                  <span className="stat-value">{mega.stats.spDefense}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Velocidade</span>
                  <span className="stat-value">{mega.stats.speed}</span>
                </div>
              </div>
            </div>
            
            <div className="mega-abilities">
              <h5>Habilidades</h5>
              <div className="abilities-list">
                {mega.abilities.map((ability, index) => (
                  <span key={index} className="ability-tag">
                    {ability}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mega-physical">
              <div className="physical-item">
                <span className="physical-label">Altura</span>
                <span className="physical-value">{mega.height}m</span>
              </div>
              <div className="physical-item">
                <span className="physical-label">Peso</span>
                <span className="physical-value">{mega.weight}kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mega-note">
        <p>
          <span className="note-icon">ℹ️</span>
          Mega Evolução é uma transformação temporária que ocorre durante a batalha usando a pedra correspondente.
        </p>
      </div>
    </div>
  );
});

PokemonMegaEvolution.displayName = 'PokemonMegaEvolution';

export default PokemonMegaEvolution;
