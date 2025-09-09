// Dados das regiões Pokémon e seus respectivos Pokémon
export const pokemonRegions = {
  kanto: {
    name: 'Kanto',
    generation: 1,
    startId: 1,
    endId: 151,
    description: 'A região original onde tudo começou',
    color: '#ff6b6b'
  },
  johto: {
    name: 'Johto',
    generation: 2,
    startId: 152,
    endId: 251,
    description: 'Terra de tradições e lendas antigas',
    color: '#4ecdc4'
  },
  hoenn: {
    name: 'Hoenn',
    generation: 3,
    startId: 252,
    endId: 386,
    description: 'Região de terra e mar em harmonia',
    color: '#45b7d1'
  },
  sinnoh: {
    name: 'Sinnoh',
    generation: 4,
    startId: 387,
    endId: 493,
    description: 'Terra de mitos e lendas',
    color: '#96ceb4'
  },
  unova: {
    name: 'Unova',
    generation: 5,
    startId: 494,
    endId: 649,
    description: 'Região de contrastes urbanos',
    color: '#feca57'
  },
  kalos: {
    name: 'Kalos',
    generation: 6,
    startId: 650,
    endId: 721,
    description: 'Terra da beleza e elegância',
    color: '#ff9ff3'
  },
  alola: {
    name: 'Alola',
    generation: 7,
    startId: 722,
    endId: 809,
    description: 'Paraíso tropical com formas regionais',
    color: '#54a0ff'
  },
  galar: {
    name: 'Galar',
    generation: 8,
    startId: 810,
    endId: 898,
    description: 'Região de tradições e inovação',
    color: '#5f27cd'
  },
  paldea: {
    name: 'Paldea',
    generation: 9,
    startId: 899,
    endId: 1010,
    description: 'Terra de aventuras e descobertas',
    color: '#00d2d3'
  }
};

// Função para obter Pokémon de uma região específica
export const getPokemonByRegion = (regionKey) => {
  const region = pokemonRegions[regionKey];
  if (!region) return [];
  
  const pokemonList = [];
  for (let id = region.startId; id <= region.endId; id++) {
    pokemonList.push({
      id: id,
      name: `pokemon-${id}`, // Nome será obtido da API
      region: regionKey
    });
  }
  
  return pokemonList;
};

// Função para obter todas as regiões
export const getAllRegions = () => {
  return Object.keys(pokemonRegions).map(key => ({
    key,
    ...pokemonRegions[key]
  }));
};
