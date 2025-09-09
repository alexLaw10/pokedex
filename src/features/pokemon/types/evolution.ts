
import type { Pokemon, PokemonSpecies, EvolutionData } from '@pokemon/types';

export type { EvolutionChain, EvolutionData } from '@pokemon/types';

export interface UsePokemonEvolutionReturn {
  processedEvolutionData: EvolutionData[];
  loading: boolean;
  error: string | null;
  loadEvolutionChain: (species: PokemonSpecies) => Promise<void>;
}

export interface PokemonEvolutionProps {
  evolutionData: EvolutionData[];
  loading: boolean;
  error: string | null;
}

export interface PokemonEvolutionSidebarProps {
  pokemon: Pokemon | null;
}
