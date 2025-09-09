
import type { BaseEntity } from '../../../shared/types';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem extends BaseEntity {
  name: string;
  url: string;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: BaseEntity;
}

export interface PokemonType {
  slot: number;
  type: BaseEntity;
}

export interface PokemonAbility {
  ability: BaseEntity;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: BaseEntity;
  pokedex_numbers: Array<{
    entry_number: number;
    pokedex: BaseEntity;
  }>;
  egg_groups: BaseEntity[];
  color: BaseEntity;
  shape: BaseEntity;
  evolves_from_species: BaseEntity | null;
  evolution_chain: {
    url: string;
  } | null;
  habitat: BaseEntity | null;
  generation: BaseEntity;
  names: Array<{
    language: BaseEntity;
    name: string;
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: BaseEntity;
    version: BaseEntity;
  }>;
  form_descriptions: Array<{
    description: string;
    language: BaseEntity;
  }>;
  genera: Array<{
    genus: string;
    language: BaseEntity;
  }>;
  varieties: Array<{
    is_default: boolean;
    pokemon: BaseEntity;
  }>;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  past_types: any[];
  species: PokemonSpecies | BaseEntity;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
  forms: BaseEntity[];
  game_indices: Array<{
    game_index: number;
    version: BaseEntity;
  }>;
  held_items: Array<{
    item: BaseEntity;
    version_details: Array<{
      rarity: number;
      version: BaseEntity;
    }>;
  }>;
  location_area_encounters: string;
  moves: Array<{
    move: BaseEntity;
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: BaseEntity;
      version_group: BaseEntity;
    }>;
  }>;
}

export interface UsePokemonSearchReturn {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
  searchPokemon: (searchTerm: string) => Promise<void>;
  clearSearch: () => void;
}

export interface UsePokemonListReturn {
  pokemonList: PokemonListItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface PokemonAPI {
  getPokemonList: (offset?: number, limit?: number) => Promise<PokemonListResponse>;
  getPokemonDetails: (pokemonId: number | string) => Promise<Pokemon>;
  getPokemonSpecies: (pokemonId: number | string) => Promise<PokemonSpecies>;
  getPokemonEvolutionChain: (chainId: number) => Promise<EvolutionChain>;
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: BaseEntity | null;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  is_baby: boolean;
  species: BaseEntity;
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionDetail {
  item: BaseEntity | null;
  trigger: BaseEntity;
  gender: number | null;
  held_item: BaseEntity | null;
  known_move: BaseEntity | null;
  known_move_type: BaseEntity | null;
  location: BaseEntity | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: BaseEntity | null;
  party_type: BaseEntity | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: BaseEntity | null;
  turn_upside_down: boolean;
}

export interface EvolutionData {
  name: string;
  id: number;
  image: string;
  isEvolved: boolean;
  evolutionMethod?: string;
  evolutionLevel?: number;
  evolutionItem?: string;
  evolutionCondition?: string;
  isRegionalForm?: boolean;
  region?: string;
}

export interface PokemonElegantProps {
  pokemon: Pokemon | null;
  error: string | null;
  loading: boolean;
}

export interface PokemonSearchProps {
  onSearch: (searchTerm: string) => void;
  loading: boolean;
}

export interface PokemonListProps {
  onPokemonSelect: (pokemonName: string) => void;
  selectedPokemonId?: number;
}

export interface PokemonEvolutionProps {
  evolutionData: EvolutionData[];
  loading: boolean;
  error: string | null;
}

export interface PokemonEvolutionSidebarProps {
  pokemon: Pokemon | null;
}

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
