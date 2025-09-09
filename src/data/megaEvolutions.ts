// Dados das Mega Evoluções
export interface MegaEvolution {
  id: number;
  name: string;
  basePokemonId: number;
  basePokemonName: string;
  megaStone: string;
  type: 'mega-x' | 'mega-y' | 'mega';
  image: string;
  description: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  };
  abilities: string[];
  height: number;
  weight: number;
}

// Lista completa de Mega Evoluções
export const megaEvolutions: MegaEvolution[] = [
  // Kanto Starters
  {
    id: 10001,
    name: 'Mega Venusaur',
    basePokemonId: 3,
    basePokemonName: 'venusaur',
    megaStone: 'Venusaurite',
    type: 'mega',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10001.png',
    description: 'A flor nas costas cresceu enormemente, liberando um aroma doce que acalma os oponentes.',
    stats: { hp: 80, attack: 100, defense: 123, spAttack: 122, spDefense: 120, speed: 80 },
    abilities: ['Thick Fat'],
    height: 2.4,
    weight: 155.5
  },
  {
    id: 10002,
    name: 'Mega Charizard X',
    basePokemonId: 6,
    basePokemonName: 'charizard',
    megaStone: 'Charizardite X',
    type: 'mega-x',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10002.png',
    description: 'As chamas se tornaram azuis e mais quentes, e ganhou o tipo Dragão.',
    stats: { hp: 78, attack: 130, defense: 111, spAttack: 130, spDefense: 85, speed: 100 },
    abilities: ['Tough Claws'],
    height: 1.7,
    weight: 110.5
  },
  {
    id: 10003,
    name: 'Mega Charizard Y',
    basePokemonId: 6,
    basePokemonName: 'charizard',
    megaStone: 'Charizardite Y',
    type: 'mega-y',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10003.png',
    description: 'As asas cresceram e as chamas se tornaram ainda mais poderosas.',
    stats: { hp: 78, attack: 104, defense: 78, spAttack: 159, spDefense: 115, speed: 100 },
    abilities: ['Drought'],
    height: 1.7,
    weight: 100.5
  },
  {
    id: 10004,
    name: 'Mega Blastoise',
    basePokemonId: 9,
    basePokemonName: 'blastoise',
    megaStone: 'Blastoisinite',
    type: 'mega',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10004.png',
    description: 'Os canhões nas costas se fundiram em um canhão gigante.',
    stats: { hp: 79, attack: 103, defense: 120, spAttack: 135, spDefense: 115, speed: 78 },
    abilities: ['Mega Launcher'],
    height: 1.6,
    weight: 101.1
  },
  
  // Pikachu Line
  {
    id: 10005,
    name: 'Mega Pikachu',
    basePokemonId: 25,
    basePokemonName: 'pikachu',
    megaStone: 'Pikachunite',
    type: 'mega',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10005.png',
    description: 'A energia elétrica se intensificou, criando um campo elétrico ao redor.',
    stats: { hp: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90 },
    abilities: ['Lightning Rod'],
    height: 0.4,
    weight: 6.0
  },
  
  // Mewtwo
  {
    id: 10006,
    name: 'Mega Mewtwo X',
    basePokemonId: 150,
    basePokemonName: 'mewtwo',
    megaStone: 'Mewtwonite X',
    type: 'mega-x',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10006.png',
    description: 'Ganhou força física massiva e o tipo Lutador.',
    stats: { hp: 106, attack: 190, defense: 100, spAttack: 154, spDefense: 100, speed: 130 },
    abilities: ['Steadfast'],
    height: 1.5,
    weight: 127.0
  },
  {
    id: 10007,
    name: 'Mega Mewtwo Y',
    basePokemonId: 150,
    basePokemonName: 'mewtwo',
    megaStone: 'Mewtwonite Y',
    type: 'mega-y',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10007.png',
    description: 'A forma mais refinada, focada em poderes psíquicos.',
    stats: { hp: 106, attack: 150, defense: 70, spAttack: 194, spDefense: 120, speed: 140 },
    abilities: ['Insomnia'],
    height: 1.5,
    weight: 33.0
  },
  
  // Gengar
  {
    id: 10008,
    name: 'Mega Gengar',
    basePokemonId: 94,
    basePokemonName: 'gengar',
    megaStone: 'Gengarite',
    type: 'mega',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10008.png',
    description: 'Seu corpo se tornou mais sólido e ganhou poder de sombra.',
    stats: { hp: 60, attack: 65, defense: 80, spAttack: 170, spDefense: 95, speed: 130 },
    abilities: ['Shadow Tag'],
    height: 1.4,
    weight: 40.5
  },
  
  // Lucario
  {
    id: 10009,
    name: 'Mega Lucario',
    basePokemonId: 448,
    basePokemonName: 'lucario',
    megaStone: 'Lucarionite',
    type: 'mega',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10009.png',
    description: 'A aura se intensificou, criando espinhos de energia.',
    stats: { hp: 70, attack: 145, defense: 88, spAttack: 140, spDefense: 70, speed: 112 },
    abilities: ['Adaptability'],
    height: 1.3,
    weight: 57.5
  },
  
  // Garchomp
  {
    id: 10010,
    name: 'Mega Garchomp',
    basePokemonId: 445,
    basePokemonName: 'garchomp',
    megaStone: 'Garchompite',
    type: 'mega',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10010.png',
    description: 'As nadadeiras se tornaram lâminas afiadas e ganhou mais poder.',
    stats: { hp: 108, attack: 170, defense: 115, spAttack: 120, spDefense: 95, speed: 92 },
    abilities: ['Sand Force'],
    height: 1.9,
    weight: 95.0
  }
];

// Função para buscar Mega Evoluções de um Pokémon
export const getMegaEvolutions = (pokemonId: number): MegaEvolution[] => {
  return megaEvolutions.filter(mega => mega.basePokemonId === pokemonId);
};

// Função para buscar Mega Evolução por ID
export const getMegaEvolutionById = (megaId: number): MegaEvolution | undefined => {
  return megaEvolutions.find(mega => mega.id === megaId);
};

// Função para verificar se um Pokémon tem Mega Evolução
export const hasMegaEvolution = (pokemonId: number): boolean => {
  return megaEvolutions.some(mega => mega.basePokemonId === pokemonId);
};

// Função para obter todas as pedras mega
export const getAllMegaStones = (): string[] => {
  return [...new Set(megaEvolutions.map(mega => mega.megaStone))];
};
