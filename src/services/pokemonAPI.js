const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonAPI = {
  // Buscar lista de Pokémon com paginação
  getPokemonList: async (offset = 0, limit = 20) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar lista de Pokémon:', error);
      throw error;
    }
  },

  // Buscar detalhes de um Pokémon específico
  getPokemonDetails: async (pokemonId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do Pokémon:', error);
      throw error;
    }
  },

  // Buscar informações de uma espécie de Pokémon
  getPokemonSpecies: async (pokemonId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon-species/${pokemonId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar espécie do Pokémon:', error);
      throw error;
    }
  }
};
