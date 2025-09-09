import { useState, useCallback, useMemo } from 'react';
import { getMegaEvolutions, hasMegaEvolution } from '@/data/megaEvolutions';
import type { Pokemon, MegaEvolution } from '@/types/pokemon';

/**
 * Hook para gerenciar Mega Evoluções de Pokémon
 */
export const usePokemonMegaEvolution = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega Mega Evoluções de um Pokémon
   */
  const loadMegaEvolutions = useCallback(async (pokemon: Pokemon | null): Promise<MegaEvolution[]> => {
    if (!pokemon) {
      setError(null);
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      // Verificar se o Pokémon tem Mega Evolução
      if (!hasMegaEvolution(pokemon.id)) {
        return [];
      }

      // Buscar Mega Evoluções
      const megaEvolutions = getMegaEvolutions(pokemon.id);
      
      return megaEvolutions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Error loading mega evolutions:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Verifica se um Pokémon tem Mega Evolução
   */
  const checkHasMegaEvolution = useCallback((pokemon: Pokemon | null): boolean => {
    if (!pokemon) return false;
    return hasMegaEvolution(pokemon.id);
  }, []);

  /**
   * Obtém estatísticas comparativas entre forma normal e mega
   */
  const getStatComparison = useCallback((pokemon: Pokemon, mega: MegaEvolution) => {
    const normalStats = pokemon.stats.reduce((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    }, {} as Record<string, number>);

    const megaStats = {
      hp: mega.stats.hp,
      attack: mega.stats.attack,
      defense: mega.stats.defense,
      'special-attack': mega.stats.spAttack,
      'special-defense': mega.stats.spDefense,
      speed: mega.stats.speed
    };

    const comparison = Object.keys(megaStats).map(statName => {
      const normalValue = normalStats[statName] || 0;
      const megaValue = megaStats[statName as keyof typeof megaStats];
      const difference = megaValue - normalValue;
      const percentage = normalValue > 0 ? ((difference / normalValue) * 100) : 0;

      return {
        stat: statName,
        normal: normalValue,
        mega: megaValue,
        difference,
        percentage: Math.round(percentage)
      };
    });

    return comparison;
  }, []);

  /**
   * Obtém o total de stats de uma Mega Evolução
   */
  const getTotalStats = useCallback((mega: MegaEvolution): number => {
    return mega.stats.hp + mega.stats.attack + mega.stats.defense + 
           mega.stats.spAttack + mega.stats.spDefense + mega.stats.speed;
  }, []);

  /**
   * Obtém a Mega Evolução com maior total de stats
   */
  const getBestMegaEvolution = useCallback((megaEvolutions: MegaEvolution[]): MegaEvolution | null => {
    if (megaEvolutions.length === 0) return null;

    return megaEvolutions.reduce((best, current) => {
      const bestTotal = getTotalStats(best);
      const currentTotal = getTotalStats(current);
      return currentTotal > bestTotal ? current : best;
    });
  }, [getTotalStats]);

  /**
   * Limpa dados de Mega Evolução
   */
  const clearMegaEvolutions = useCallback((): void => {
    setError(null);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    loadMegaEvolutions,
    checkHasMegaEvolution,
    getStatComparison,
    getTotalStats,
    getBestMegaEvolution,
    clearMegaEvolutions
  };
};
