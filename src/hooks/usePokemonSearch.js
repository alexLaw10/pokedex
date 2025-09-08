import { useState, useCallback } from 'react';
import { pokemonAPI } from '../services/pokemonAPI';

export const usePokemonSearch = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const searchPokemon = useCallback(async (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      setError('Por favor, digite um ID ou nome do Pokémon');
      setPokemon(null);
      setNotFound(false);
      return;
    }

    setLoading(true);
    setError(null);
    setNotFound(false);
    setPokemon(null);

    try {
      // Limpar o termo de busca
      const cleanSearchTerm = searchTerm.trim().toLowerCase();
      
      // Buscar detalhes do Pokémon
      const pokemonData = await pokemonAPI.getPokemonDetails(cleanSearchTerm);
      
      // Buscar informações da espécie para obter descrições
      const speciesData = await pokemonAPI.getPokemonSpecies(cleanSearchTerm);
      
      // Combinar dados do Pokémon com dados da espécie
      const combinedData = {
        ...pokemonData,
        species: speciesData
      };
      
      setPokemon(combinedData);
      setNotFound(false);
    } catch (err) {
      console.error('Erro ao buscar Pokémon:', err);
      
      if (err.message.includes('404') || err.message.includes('Not Found')) {
        setNotFound(true);
        setError(null);
      } else {
        setError(`Erro ao buscar Pokémon: ${err.message}`);
        setNotFound(false);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
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
