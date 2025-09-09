import { memo, useEffect } from 'react';
import { usePokemonEvolution } from '@pokemon/hooks';
import PokemonEvolution from './PokemonEvolution';
import type { Pokemon } from '@pokemon/types';

interface PokemonEvolutionSidebarProps {
  pokemon: Pokemon | null;
}

const PokemonEvolutionSidebar = memo<PokemonEvolutionSidebarProps>(({ pokemon }) => {
  const { 
    processedEvolutionData, 
    loading, 
    error, 
    loadEvolutionChain 
  } = usePokemonEvolution();

  useEffect(() => {
    if (pokemon?.species && typeof pokemon.species === 'object' && 'evolution_chain' in pokemon.species) {
      try {
        loadEvolutionChain(pokemon.species as any);
      } catch (error) {
        console.error('Erro ao carregar evolução:', error);
      }
    }
  }, [pokemon, loadEvolutionChain]);

  if (!pokemon) {
    return (
      <div className="evolution-sidebar-empty">
        <div className="empty-icon">🔗</div>
        <p>Selecione um Pokémon para ver sua evolução</p>
      </div>
    );
  }

  return (
    <div className="evolution-sidebar">
      <h3>Evoluções</h3>
      
      {}
      <PokemonEvolution
        evolutionData={processedEvolutionData}
        loading={loading}
        error={error}
      />
    </div>
  );
});

PokemonEvolutionSidebar.displayName = 'PokemonEvolutionSidebar';

export default PokemonEvolutionSidebar;
