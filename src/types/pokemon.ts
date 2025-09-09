// Tipos para Pokémon
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
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
  growth_rate: {
    name: string;
    url: string;
  };
  pokedex_numbers: Array<{
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }>;
  egg_groups: Array<{
    name: string;
    url: string;
  }>;
  color: {
    name: string;
    url: string;
  };
  shape: {
    name: string;
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  } | null;
  evolution_chain: {
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  } | null;
  generation: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// Tipos para regiões
export interface PokemonRegion {
  name: string;
  generation: number;
  startId: number;
  endId: number;
  description: string;
  color: string;
}

export interface RegionOption extends PokemonRegion {
  key: string;
}

// Tipos para hooks
export interface UsePokemonSearchReturn {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
  searchPokemon: (searchTerm: string) => Promise<void>;
  clearSearch: () => void;
}

// Tipos para componentes
export interface PokemonSearchProps {
  onSearch: (searchTerm: string) => void;
  loading: boolean;
}

export interface PokemonElegantProps {
  pokemon: Pokemon | null;
  error: string | null;
  loading: boolean;
}

export interface PokemonListProps {
  onPokemonSelect: (pokemonName: string) => void;
  selectedPokemonId: number | undefined;
}

export interface RegionFilterProps {
  selectedRegion: string;
  onRegionChange: (regionKey: string) => void;
}

// Tipos para evolução
export interface EvolutionChain {
  id: number;
  baby_trigger_item: any;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionDetail {
  item: {
    name: string;
    url: string;
  } | null;
  trigger: {
    name: string;
    url: string;
  };
  gender: number | null;
  held_item: {
    name: string;
    url: string;
  } | null;
  known_move: {
    name: string;
    url: string;
  } | null;
  known_move_type: {
    name: string;
    url: string;
  } | null;
  location: {
    name: string;
    url: string;
  } | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: {
    name: string;
    url: string;
  } | null;
  party_type: {
    name: string;
    url: string;
  } | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: {
    name: string;
    url: string;
  } | null;
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
  isMegaEvolution?: boolean;
  megaType?: 'mega-x' | 'mega-y' | 'mega';
  megaStone?: string;
}

// Tipos para Mega Evolução
export interface MegaEvolution {
  id: number;
  name: string;
  basePokemonId: number;
  basePokemonName: string;
  megaStone: string;
  type: 'mega-x' | 'mega-y' | 'mega';
  image: string;
  description: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  };
  abilities: string[];
  height: number;
  weight: number;
}

// Tipos para API
export interface PokemonAPI {
  getPokemonList: (offset?: number, limit?: number) => Promise<PokemonListResponse>;
  getPokemonDetails: (pokemonId: number | string) => Promise<Pokemon>;
  getPokemonSpecies: (pokemonId: number | string) => Promise<PokemonSpecies>;
  getEvolutionChain: (chainId: number) => Promise<EvolutionChain>;
}
