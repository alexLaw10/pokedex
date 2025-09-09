import { memo, useEffect, useState } from 'react';
import { usePokemonEvolution } from '@/hooks/usePokemonEvolution';
import { usePokemonMegaEvolution } from '@/hooks/usePokemonMegaEvolution';
import PokemonEvolution from './PokemonEvolution';
import PokemonMegaEvolution from './PokemonMegaEvolution';
import type { Pokemon } from '@/types/pokemon';

interface PokemonEvolutionSidebarProps {
  pokemon: Pokemon | null;
}

/**
 * Componente da barra lateral de evolução
 * Mostra a linha evolutiva completa na lateral
 */
const PokemonEvolutionSidebar = memo<PokemonEvolutionSidebarProps>(({ pokemon }) => {
  const { 
    processedEvolutionData, 
    loading, 
    error, 
    loadEvolutionChain 
  } = usePokemonEvolution();
  
  const {
    loadMegaEvolutions,
    checkHasMegaEvolution,
    loading: megaLoading,
    error: megaError
  } = usePokemonMegaEvolution();
  
  const [megaEvolutions, setMegaEvolutions] = useState<any[]>([]);

  // Carregar evolução e mega evolução quando o Pokémon mudar
  useEffect(() => {
    if (pokemon?.species && typeof pokemon.species === 'object' && 'evolution_chain' in pokemon.species) {
      try {
        loadEvolutionChain(pokemon.species as any);
      } catch (error) {
        console.error('Erro ao carregar evolução:', error);
      }
    }
    
    // Carregar mega evoluções
    if (pokemon) {
      loadMegaEvolutions(pokemon).then(setMegaEvolutions);
    } else {
      setMegaEvolutions([]);
    }
  }, [pokemon, loadEvolutionChain, loadMegaEvolutions]);

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
      
      {/* Linha Evolutiva Normal */}
      <PokemonEvolution
        evolutionData={processedEvolutionData}
        loading={loading}
        error={error}
      />
      
      {/* Mega Evoluções */}
      {checkHasMegaEvolution(pokemon) && (
        <PokemonMegaEvolution
          megaEvolutions={megaEvolutions}
          loading={megaLoading}
          error={megaError}
        />
      )}
    </div>
  );
});

PokemonEvolutionSidebar.displayName = 'PokemonEvolutionSidebar';

export default PokemonEvolutionSidebar;
