import { useState, useCallback, useMemo } from 'react';
import { pokemonAPI } from '@/services/pokemonAPI';
import type { EvolutionChain, EvolutionData, PokemonSpecies } from '@/types/pokemon';

/**
 * Hook para gerenciar dados de evolução de Pokémon
 */
export const usePokemonEvolution = () => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega cadeia de evolução de um Pokémon
   */
  const loadEvolutionChain = useCallback(async (species: PokemonSpecies): Promise<void> => {
    if (!species.evolution_chain?.url) {
      setEvolutionChain(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Extrair ID da cadeia de evolução da URL
      const chainId = parseInt(species.evolution_chain.url.split('/').slice(-2, -1)[0]);
      
      if (isNaN(chainId)) {
        throw new Error('ID da cadeia de evolução inválido');
      }
      
      const chain = await pokemonAPI.getEvolutionChain(chainId);
      
      setEvolutionChain(chain);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Error loading evolution chain:', err);
      setEvolutionChain(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Processa dados de evolução para exibição
   */
  const processedEvolutionData = useMemo((): EvolutionData[] => {
    if (!evolutionChain) return [];

    const evolutionData: EvolutionData[] = [];

    /**
     * Processa um link da cadeia de evolução recursivamente
     */
    const processEvolutionLink = (link: any, isEvolved = false, parentMethod = ''): void => {
      if (!link || !link.species) return;
      
      const speciesName = link.species.name;
      const speciesId = parseInt(link.species.url.split('/').slice(-2, -1)[0]);
      
      // Determinar método de evolução
      let evolutionMethod = isEvolved ? parentMethod : 'Base';
      let evolutionLevel: number | undefined;
      let evolutionItem: string | undefined;
      let evolutionCondition: string | undefined;
      let isRegionalForm = false;
      let region: string | undefined;

      if (link.evolution_details && link.evolution_details.length > 0) {
        const detail = link.evolution_details[0];
        
        // Verificar se é forma regional (Alola, Galar, etc.)
        if (speciesName.includes('-alola')) {
          isRegionalForm = true;
          region = 'Alola';
        } else if (speciesName.includes('-galar')) {
          isRegionalForm = true;
          region = 'Galar';
        } else if (speciesName.includes('-hisui')) {
          isRegionalForm = true;
          region = 'Hisui';
        } else if (speciesName.includes('-paldea')) {
          isRegionalForm = true;
          region = 'Paldea';
        }

        // Determinar método de evolução
        switch (detail.trigger.name) {
          case 'level-up':
            if (detail.min_level) {
              evolutionMethod = `Nível ${detail.min_level}`;
              evolutionLevel = detail.min_level;
            } else if (detail.min_happiness) {
              evolutionMethod = `Felicidade ${detail.min_happiness}`;
            } else if (detail.known_move) {
              evolutionMethod = `Aprender ${detail.known_move.name}`;
            } else if (detail.known_move_type) {
              evolutionMethod = `Aprender movimento ${detail.known_move_type.name}`;
            } else if (detail.location) {
              evolutionMethod = `Local: ${detail.location.name}`;
            } else if (detail.time_of_day) {
              evolutionMethod = `Durante ${detail.time_of_day}`;
            } else {
              evolutionMethod = 'Nível';
            }
            break;
          
          case 'use-item':
            if (detail.item) {
              evolutionMethod = `Usar ${detail.item.name}`;
              evolutionItem = detail.item.name;
            } else {
              evolutionMethod = 'Usar item';
            }
            break;
          
          case 'trade':
            if (detail.held_item) {
              evolutionMethod = `Trocar com ${detail.held_item.name}`;
            } else if (detail.trade_species) {
              evolutionMethod = `Trocar com ${detail.trade_species.name}`;
            } else {
              evolutionMethod = 'Troca';
            }
            break;
          
          case 'other':
            if (detail.item) {
              evolutionMethod = `Usar ${detail.item.name}`;
              evolutionItem = detail.item.name;
            } else {
              evolutionMethod = 'Especial';
            }
            break;
          
          default:
            evolutionMethod = detail.trigger.name;
        }

        // Adicionar condições especiais
        if (detail.min_beauty) {
          evolutionCondition = `Beleza: ${detail.min_beauty}`;
        }
        if (detail.min_affection) {
          evolutionCondition = `Afeição: ${detail.min_affection}`;
        }
        if (detail.needs_overworld_rain) {
          evolutionCondition = 'Chuva no mundo';
        }
        if (detail.turn_upside_down) {
          evolutionCondition = 'Virar de cabeça para baixo';
        }
        if (detail.relative_physical_stats) {
          const stat = detail.relative_physical_stats;
          if (stat === 1) evolutionCondition = 'Ataque > Defesa';
          if (stat === -1) evolutionCondition = 'Defesa > Ataque';
          if (stat === 0) evolutionCondition = 'Ataque = Defesa';
        }
      }

      evolutionData.push({
        name: speciesName,
        id: speciesId,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`,
        isEvolved,
        evolutionMethod,
        evolutionLevel,
        evolutionItem,
        evolutionCondition,
        isRegionalForm,
        region
      });

      // Processar evoluções seguintes
      if (link.evolves_to && Array.isArray(link.evolves_to) && link.evolves_to.length > 0) {
        link.evolves_to.forEach((nextLink: any) => {
          if (nextLink && nextLink.species) {
            processEvolutionLink(nextLink, true, evolutionMethod);
          }
        });
      }
    };

    // Processar cadeia de evolução
    processEvolutionLink(evolutionChain.chain);

    return evolutionData;
  }, [evolutionChain]);

  /**
   * Limpa dados de evolução
   */
  const clearEvolution = useCallback((): void => {
    setEvolutionChain(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    evolutionChain,
    processedEvolutionData,
    loading,
    error,
    loadEvolutionChain,
    clearEvolution
  };
};
