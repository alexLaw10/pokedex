import { useState, useCallback, useMemo } from 'react';
import { pokemonAPI } from '@pokemon/services';
import type { 
  UsePokemonEvolutionReturn, 
  EvolutionChain, 
  EvolutionData 
} from '../types';
import type { PokemonSpecies, EvolutionDetail } from '@pokemon/types';

export const usePokemonEvolution = (): UsePokemonEvolutionReturn => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvolutionChain = useCallback(async (species: PokemonSpecies): Promise<void> => {
    if (!species.evolution_chain?.url) {
      setEvolutionChain(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const chainId = parseInt(species.evolution_chain.url.split('/').slice(-2, -1)[0]);
      if (isNaN(chainId)) {
        throw new Error('ID da cadeia de evolução inválido');
      }
      
      const chain = await pokemonAPI.getPokemonEvolutionChain(chainId);
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

  const processedEvolutionData = useMemo((): EvolutionData[] => {
    if (!evolutionChain) return [];

    const evolutionData: EvolutionData[] = [];

    const processEvolutionLink = (link: any, isEvolved = false, parentMethod = ''): void => {
      if (!link || !link.species) return;

      const speciesName = link.species.name;
      const speciesId = parseInt(link.species.url.split('/').slice(-2, -1)[0]);

      let evolutionMethod = isEvolved ? parentMethod : 'Base';
      let evolutionLevel: number | undefined;
      let evolutionItem: string | undefined;
      let evolutionCondition: string | undefined;
      let isRegionalForm = false;
      let region: string | undefined;

      if (link.evolution_details && link.evolution_details.length > 0) {
        const detail: EvolutionDetail = link.evolution_details[0];

        if (detail.min_level) {
          evolutionMethod = `Nível ${detail.min_level}`;
          evolutionLevel = detail.min_level;
        } else if (detail.item) {
          evolutionMethod = `Pedra ${detail.item.name}`;
          evolutionItem = detail.item.name;
        } else if (detail.trigger.name === 'trade') {
          evolutionMethod = 'Troca';
        } else if (detail.min_happiness) {
          evolutionMethod = `Felicidade ${detail.min_happiness}`;
        } else if (detail.known_move_type) {
          evolutionMethod = `Movimento ${detail.known_move_type.name}`;
        } else if (detail.time_of_day) {
          evolutionMethod = `Horário ${detail.time_of_day}`;
        } else if (detail.min_affection) {
          evolutionMethod = `Carinho ${detail.min_affection}`;
        } else if (detail.min_beauty) {
          evolutionMethod = `Beleza ${detail.min_beauty}`;
        } else if (detail.relative_physical_stats) {
          evolutionMethod = 'Estatísticas físicas';
        } else if (detail.known_move) {
          evolutionMethod = `Movimento ${detail.known_move.name}`;
        } else if (detail.location) {
          evolutionMethod = `Local ${detail.location.name}`;
        } else if (detail.held_item) {
          evolutionMethod = `Item ${detail.held_item.name}`;
        } else if (detail.gender) {
          evolutionMethod = `Gênero ${detail.gender === 1 ? 'Fêmea' : 'Macho'}`;
        } else if (detail.needs_overworld_rain) {
          evolutionMethod = 'Chuva no mundo';
        } else if (detail.turn_upside_down) {
          evolutionMethod = 'De cabeça para baixo';
        } else if (detail.trade_species) {
          evolutionMethod = `Troca com ${detail.trade_species.name}`;
        } else if (detail.party_species) {
          evolutionMethod = `Com ${detail.party_species.name} no time`;
        } else if (detail.party_type) {
          evolutionMethod = `Tipo ${detail.party_type.name} no time`;
        }

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

        if (detail.time_of_day) {
          evolutionCondition = `Horário: ${detail.time_of_day}`;
        }
        if (detail.location) {
          evolutionCondition = `Local: ${detail.location.name}`;
        }
        if (detail.known_move) {
          evolutionCondition = `Movimento: ${detail.known_move.name}`;
        }
        if (detail.held_item) {
          evolutionCondition = `Item: ${detail.held_item.name}`;
        }
        if (detail.gender) {
          evolutionCondition = `Gênero: ${detail.gender === 1 ? 'Fêmea' : 'Macho'}`;
        }
        if (detail.needs_overworld_rain) {
          evolutionCondition = 'Chuva no mundo';
        }
        if (detail.turn_upside_down) {
          evolutionCondition = 'De cabeça para baixo';
        }
        if (detail.trade_species) {
          evolutionCondition = `Troca com ${detail.trade_species.name}`;
        }
        if (detail.party_species) {
          evolutionCondition = `Com ${detail.party_species.name} no time`;
        }
        if (detail.party_type) {
          evolutionCondition = `Tipo ${detail.party_type.name} no time`;
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

      if (link.evolves_to && Array.isArray(link.evolves_to) && link.evolves_to.length > 0) {
        link.evolves_to.forEach((nextLink: any) => {
          if (nextLink && nextLink.species) {
            processEvolutionLink(nextLink, true, evolutionMethod);
          }
        });
      }
    };

    processEvolutionLink(evolutionChain.chain);
    return evolutionData;
  }, [evolutionChain]);

  return {
    processedEvolutionData,
    loading,
    error,
    loadEvolutionChain
  };
};
