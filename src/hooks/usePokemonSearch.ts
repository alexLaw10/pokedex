import { useState, useCallback } from 'react';
import { pokemonAPI } from '@/services/pokemonAPI';
import type { UsePokemonSearchReturn, Pokemon } from '@/types/pokemon';

/**
 * Hook personalizado para busca de Pokémon
 * Gerencia estado de loading, erro e dados do Pokémon
 */
export const usePokemonSearch = (): UsePokemonSearchReturn => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  /**
   * Busca um Pokémon por ID ou nome
   * @param searchTerm - ID ou nome do Pokémon
   */
  const searchPokemon = useCallback(async (searchTerm: string): Promise<void> => {
    if (!searchTerm.trim()) {
      setError('Por favor, digite um ID ou nome válido');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setNotFound(false);
      setPokemon(null);

      // Buscar detalhes do Pokémon
      const pokemonData = await pokemonAPI.getPokemonDetails(searchTerm.trim());
      
      // Buscar informações da espécie
      const speciesData = await pokemonAPI.getPokemonSpecies(pokemonData.id);
      
      // Combinar dados do Pokémon com informações da espécie
      const combinedData: Pokemon = {
        ...pokemonData,
        species: {
          ...pokemonData.species,
          ...speciesData
        }
      };

      setPokemon(combinedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      
      if (errorMessage.includes('not found') || errorMessage.includes('404')) {
        setNotFound(true);
        setError(`Pokémon "${searchTerm}" não encontrado`);
      } else {
        setError(`Erro ao buscar Pokémon: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Limpa a busca atual
   */
  const clearSearch = useCallback((): void => {
    setPokemon(null);
    setError(null);
    setNotFound(false);
    setLoading(false);
  }, []);

  return {
    pokemon,
    loading,
    error,
    notFound,
    searchPokemon,
    clearSearch
  };
};
