import { useState, useCallback } from 'react';
import { pokemonAPI } from '../services/pokemonAPI';
import type { UsePokemonSearchReturn, Pokemon } from '../types';

export const usePokemonSearch = (): UsePokemonSearchReturn => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

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

      const pokemonData = await pokemonAPI.getPokemonDetails(searchTerm.trim());

      const speciesData = await pokemonAPI.getPokemonSpecies(pokemonData.id);

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
