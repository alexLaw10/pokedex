
import { pokemonAPI } from '../features/pokemon/services/pokemonAPI';

export const testAPI = async (): Promise<void> => {
  console.log('🔍 Iniciando testes da API...');

  try {
    
    console.log('📋 Teste 1: Buscando lista de Pokémon...');
    const pokemonList = await pokemonAPI.getPokemonList(0, 5);
    console.log('✅ Lista de Pokémon:', pokemonList);

    console.log('🔎 Teste 2: Buscando detalhes do Pikachu...');
    const pikachu = await pokemonAPI.getPokemonDetails('pikachu');
    console.log('✅ Detalhes do Pikachu:', pikachu);

    console.log('🧬 Teste 3: Buscando espécie do Pikachu...');
    const pikachuSpecies = await pokemonAPI.getPokemonSpecies(25);
    console.log('✅ Espécie do Pikachu:', pikachuSpecies);

    if (pikachuSpecies.evolution_chain?.url) {
      const evolutionChainId = pikachuSpecies.evolution_chain.url.split('/').slice(-2, -1)[0];
      console.log('🔗 Teste 4: Buscando cadeia de evolução...');
      const evolutionChain = await pokemonAPI.getPokemonEvolutionChain(Number(evolutionChainId));
      console.log('✅ Cadeia de evolução:', evolutionChain);
    }

    console.log('🎉 Todos os testes da API passaram!');
  } catch (error) {
    console.error('❌ Erro nos testes da API:', error);
    
    if (error instanceof Error) {
      console.error('📋 Detalhes do erro:');
      console.error('- Mensagem:', error.message);
      console.error('- Stack:', error.stack);
    }
  }
};

if (typeof window !== 'undefined') {
  (window as any).testAPI = testAPI;
  console.log('🛠️ Função testAPI() disponível no console');
}
