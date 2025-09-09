import { useState, useCallback, useRef } from 'react';
import { pokemonAPI } from '../services/pokemonAPI';
import type { UsePokemonListReturn, PokemonListItem } from '../types';

export const usePokemonList = (): UsePokemonListReturn => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(async (): Promise<void> => {
    if (isLoadingRef.current || !hasMore) return;

    try {
      isLoadingRef.current = true;
      setLoading(true);
      setError(null);

      const response = await pokemonAPI.getPokemonList(offset, 20);
      
      setPokemonList(prev => [...prev, ...response.results]);
      setOffset(prev => prev + 20);
      setHasMore(!!response.next);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar Pokémon: ${errorMessage}`);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [offset, hasMore]);

  const refresh = useCallback(async (): Promise<void> => {
    setPokemonList([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
    await loadMore();
  }, [loadMore]);

  return {
    pokemonList,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  };
};
