import { useState } from 'react'
import PokemonList from './components/PokemonList'
import PokemonSearch from './components/PokemonSearch'
import PokemonDetails from './components/PokemonDetails'
import { usePokemonSearch } from './hooks/usePokemonSearch'

function App() {
  const [currentView, setCurrentView] = useState('list') // 'list' ou 'search'
  const { 
    pokemon, 
    loading, 
    error, 
    notFound, 
    searchPokemon, 
    clearSearch 
  } = usePokemonSearch()

  const handleSearch = (searchTerm) => {
    searchPokemon(searchTerm)
    setCurrentView('search')
  }

  const handleClearSearch = () => {
    clearSearch()
    setCurrentView('list')
  }

  return (
    <div>
      <header>
        <h1>Pokédex</h1>
        <p>Explore o mundo dos Pokémon!</p>
        
        <nav>
          <button 
            onClick={() => setCurrentView('list')}
            disabled={currentView === 'list'}
          >
            Lista de Pokémon
          </button>
          <button 
            onClick={() => setCurrentView('search')}
            disabled={currentView === 'search'}
          >
            Buscar Pokémon
          </button>
        </nav>
      </header>
      
      <main>
        {currentView === 'list' && <PokemonList />}
        
        {currentView === 'search' && (
          <div>
            <PokemonSearch 
              onSearch={handleSearch}
              loading={loading}
            />
            
            <PokemonDetails
              pokemon={pokemon}
              error={error}
              notFound={notFound}
              onClear={handleClearSearch}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default App

