import { useState, useEffect, useCallback } from 'react';
import { pokemonAPI } from '../services/pokemonAPI';

export const usePokemonList = (initialOffset = 0, limit = 20) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(initialOffset);

  const fetchPokemonList = useCallback(async (currentOffset = offset, reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const data = await pokemonAPI.getPokemonList(currentOffset, limit);
      
      if (reset) {
        setPokemonList(data.results);
      } else {
        setPokemonList(prev => [...prev, ...data.results]);
      }
      
      setHasMore(data.next !== null);
      setOffset(currentOffset + limit);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar lista de Pokémon:', err);
    } finally {
      setLoading(false);
    }
  }, [offset, limit]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchPokemonList(offset, false);
    }
  }, [fetchPokemonList, loading, hasMore, offset]);

  const refresh = useCallback(() => {
    setOffset(initialOffset);
    fetchPokemonList(initialOffset, true);
  }, [fetchPokemonList, initialOffset]);

  useEffect(() => {
    fetchPokemonList(initialOffset, true);
  }, []);

  return {
    pokemonList,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  };
};
