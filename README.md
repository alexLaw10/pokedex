# 🎮 Pokédex React

Uma aplicação web moderna e interativa para explorar o mundo dos Pokémon, construída com React 18, TypeScript e SCSS.

## 📋 Sobre o Projeto

O Pokédex React é uma aplicação web que permite aos usuários:
- **Buscar Pokémon** por nome ou ID
- **Visualizar detalhes completos** de cada Pokémon
- **Explorar linhas evolutivas** com métodos de evolução
- **Filtrar por região** (Kanto, Johto, Hoenn, Sinnoh, etc.)
- **Navegar por listas** de Pokémon com paginação
- **Interface responsiva** e acessível

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal para interface
- **TypeScript** - Tipagem estática para maior robustez
- **SCSS** - Pré-processador CSS para estilos avançados
- **Vite** - Build tool moderno e rápido

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatador de código
- **Sass** - Compilador SCSS

### APIs
- **PokeAPI** - API oficial para dados dos Pokémon

## 📁 Estrutura do Projeto

```
src/
├── features/                    # Módulos de funcionalidades
│   └── pokemon/                # Feature principal - Pokémon
│       ├── components/         # Componentes específicos
│       │   ├── PokemonSearch.tsx
│       │   ├── PokemonElegant.tsx
│       │   ├── PokemonList.tsx
│       │   ├── PokemonEvolution.tsx
│       │   ├── PokemonEvolutionSidebar.tsx
│       │   └── RegionFilter.tsx
│       ├── hooks/              # Hooks customizados
│       │   ├── usePokemonSearch.ts
│       │   ├── usePokemonList.ts
│       │   └── usePokemonEvolution.ts
│       ├── services/           # Serviços de API
│       │   └── pokemonAPI.ts
│       └── types/              # Tipos TypeScript
│           ├── index.ts
│           └── evolution.ts
├── shared/                     # Módulos compartilhados
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Button/
│   │   ├── Loading/
│   │   └── Error/
│   ├── hooks/                  # Hooks compartilhados
│   │   ├── useAsync.ts
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── services/               # Serviços genéricos
│   │   └── api.ts
│   ├── constants/              # Constantes da aplicação
│   │   ├── index.ts
│   │   └── pokemonRegions.ts
│   └── types/                  # Tipos compartilhados
│       └── index.ts
├── styles/                     # Estilos SCSS
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _pokemon-types.scss
│   ├── _simple-pokedex.scss
│   ├── _pokemon-list.scss
│   ├── _pokemon-evolution.scss
│   ├── _search-improvements.scss
│   ├── _layout-improvements.scss
│   └── main.scss
├── App.tsx                     # Componente principal
└── main.tsx                    # Ponto de entrada
```

## 🎯 Funcionalidades

### 🔍 Busca de Pokémon
- Busca por nome ou ID
- Debounce para otimizar requisições
- Validação de entrada
- Feedback visual durante carregamento

### 📊 Detalhes Completos
- Informações básicas (nome, ID, tipos)
- Estatísticas de combate
- Habilidades e movimentos
- Imagens oficiais em alta qualidade

### 🌟 Linha Evolutiva
- Visualização completa da cadeia evolutiva
- Métodos de evolução (nível, item, troca, etc.)
- Formas regionais (Alola, Galar, etc.)
- Interface lateral dedicada

### 🗺️ Filtros por Região
- Filtro por região de origem
- Lista lateral com Pokémon da região
- Navegação intuitiva

### 📱 Design Responsivo
- Layout adaptável para mobile e desktop
- Interface moderna e limpa
- Animações suaves
- Acessibilidade (ARIA, skip links)

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd pokedex

# Instale as dependências
npm install
```

### Execução
```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Scripts Disponíveis
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview da build
npm run lint         # Executa linter
npm run lint:fix     # Corrige problemas do linter
npm run format       # Formata código com Prettier
npm run type-check   # Verifica tipos TypeScript
npm run clean        # Limpa cache e builds
```

## 🎨 Design System

### Cores
- **Primária**: Verde neon (#00FF00)
- **Secundária**: Preto (#000000)
- **Acentos**: Tons de cinza e branco
- **Tipos Pokémon**: Cores específicas por tipo

### Componentes
- **Botões**: Estilo retro com hover effects
- **Cards**: Bordas neon e transparências
- **Inputs**: Design minimalista com foco visual
- **Loading**: Spinners e skeletons

## 🔧 Configuração

### Aliases de Importação
```typescript
// Configurado no vite.config.ts e tsconfig.json
@shared/*     -> src/shared/*
@features/*   -> src/features/*
@pokemon/*    -> src/features/pokemon/*
```

### Variáveis de Ambiente
```bash
# .env.local (opcional)
VITE_API_BASE_URL=https://pokeapi.co/api/v2
VITE_APP_TITLE=Pokédex React
```

## 📚 Padrões e Boas Práticas

### Estrutura de Pastas
- **Feature-based**: Organização por funcionalidades
- **Separation of Concerns**: Separação clara de responsabilidades
- **Reusabilidade**: Componentes e hooks compartilhados

### TypeScript
- Tipagem forte em toda aplicação
- Interfaces bem definidas
- Generics para reutilização

### React
- Hooks customizados para lógica
- Componentes funcionais
- Memoização para performance
- Error boundaries

### SCSS
- Variáveis centralizadas
- Mixins reutilizáveis
- Arquitetura modular
- Responsive design

## 🚀 Performance

### Otimizações Implementadas
- **Lazy Loading**: Carregamento sob demanda
- **Debounce**: Redução de requisições
- **Memoização**: Evita re-renders desnecessários
- **Code Splitting**: Divisão do bundle
- **Image Optimization**: Imagens otimizadas

### Métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm run test
npm run test:coverage
```

## 📦 Build e Deploy

### Build de Produção
```bash
npm run build
```

### Deploy
O projeto pode ser deployado em qualquer plataforma que suporte aplicações React:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando React, TypeScript e PokeAPI.

---

**Pokédex React** - Explore o mundo dos Pokémon de forma moderna e interativa! 🎮✨