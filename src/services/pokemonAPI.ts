import type { PokemonAPI, PokemonListResponse, Pokemon, PokemonSpecies, EvolutionChain } from '@/types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Serviço para interação com a PokeAPI
 * Centraliza todas as chamadas para a API do Pokémon
 */
export const pokemonAPI: PokemonAPI = {
  /**
   * Busca lista de Pokémon com paginação
   * @param offset - Número de Pokémon para pular
   * @param limit - Número máximo de Pokémon para retornar
   * @returns Promise com lista de Pokémon
   */
  getPokemonList: async (offset = 0, limit = 20): Promise<PokemonListResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      throw new Error(`Failed to fetch pokemon list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  /**
   * Busca detalhes de um Pokémon específico
   * @param pokemonId - ID ou nome do Pokémon
   * @returns Promise com detalhes do Pokémon
   */
  getPokemonDetails: async (pokemonId: number | string): Promise<Pokemon> => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pokémon not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      throw new Error(`Failed to fetch pokemon details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  /**
   * Busca informações da espécie de um Pokémon
   * @param pokemonId - ID ou nome do Pokémon
   * @returns Promise com informações da espécie
   */
  getPokemonSpecies: async (pokemonId: number | string): Promise<PokemonSpecies> => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon-species/${pokemonId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pokémon species not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching pokemon species:', error);
      throw new Error(`Failed to fetch pokemon species: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  /**
   * Busca cadeia de evolução de um Pokémon
   * @param chainId - ID da cadeia de evolução
   * @returns Promise com dados da cadeia de evolução
   */
  getEvolutionChain: async (chainId: number): Promise<EvolutionChain> => {
    try {
      const response = await fetch(`${API_BASE_URL}/evolution-chain/${chainId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Evolution chain not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching evolution chain:', error);
      throw new Error(`Failed to fetch evolution chain: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
