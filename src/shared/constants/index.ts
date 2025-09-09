export * from './pokemonRegions';

export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const POKEMON_CONFIG = {
  MAX_POKEMON_ID: 1010,
  MIN_POKEMON_ID: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 200,
  LOADING_TIMEOUT: 5000,
} as const;

export const EVOLUTION_TYPES = {
  LEVEL_UP: 'level_up',
  TRADE: 'trade',
  ITEM: 'item',
  FRIENDSHIP: 'friendship',
  GIGANTAMAX: 'gigantamax',
} as const;

export const POKEMON_TYPES = {
  NORMAL: 'normal',
  FIRE: 'fire',
  WATER: 'water',
  ELECTRIC: 'electric',
  GRASS: 'grass',
  ICE: 'ice',
  FIGHTING: 'fighting',
  POISON: 'poison',
  GROUND: 'ground',
  FLYING: 'flying',
  PSYCHIC: 'psychic',
  BUG: 'bug',
  ROCK: 'rock',
  GHOST: 'ghost',
  DRAGON: 'dragon',
  DARK: 'dark',
  STEEL: 'steel',
  FAIRY: 'fairy',
} as const;

export const REGIONS = {
  KANTO: 'kanto',
  JOHTO: 'johto',
  HOENN: 'hoenn',
  SINNOH: 'sinnoh',
  UNOVA: 'unova',
  KALOS: 'kalos',
  ALOLA: 'alola',
  GALAR: 'galar',
  HISUI: 'hisui',
  PALDEA: 'paldea',
} as const;