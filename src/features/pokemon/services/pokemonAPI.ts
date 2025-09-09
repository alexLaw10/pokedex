import { apiService } from '../../../shared/services';
import type { 
  PokemonAPI, 
  PokemonListResponse, 
  Pokemon, 
  PokemonSpecies, 
  EvolutionChain 
} from '../types';

class PokemonAPIService implements PokemonAPI {
  
  async getPokemonList(offset = 0, limit = 20): Promise<PokemonListResponse> {
    try {
      const response = await apiService.get<PokemonListResponse>('/pokemon', {
        offset,
        limit
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      throw new Error(`Failed to fetch pokemon list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPokemonDetails(pokemonId: number | string): Promise<Pokemon> {
    try {
      const response = await apiService.get<Pokemon>(`/pokemon/${pokemonId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      throw new Error(`Failed to fetch pokemon details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPokemonSpecies(pokemonId: number | string): Promise<PokemonSpecies> {
    try {
      const response = await apiService.get<PokemonSpecies>(`/pokemon-species/${pokemonId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pokemon species:', error);
      throw new Error(`Failed to fetch pokemon species: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPokemonEvolutionChain(chainId: number): Promise<EvolutionChain> {
    try {
      const response = await apiService.get<EvolutionChain>(`/evolution-chain/${chainId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching evolution chain:', error);
      throw new Error(`Failed to fetch evolution chain: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const pokemonAPI = new PokemonAPIService();
export default pokemonAPI;
