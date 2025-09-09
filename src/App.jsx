import { useState } from 'react'
import PokemonSearch from './components/PokemonSearch'
import PokemonElegant from './components/PokemonElegant'
import { usePokemonSearch } from './hooks/usePokemonSearch'
import './styles/main.scss'

function App() {
  const [currentView, setCurrentView] = useState('search') // 'search' ou 'pokemon'
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
    setCurrentView('pokemon')
  }

  const handleClearSearch = () => {
    clearSearch()
    setCurrentView('search')
  }

  const handleBackToSearch = () => {
    setCurrentView('search')
  }

  return (
    <div className="pokedex-container">
      <div className="pokedex-device">
        
        {/* Header */}
        <div className="pokedex-header">
          <h1>Pokédex</h1>
          <p>Busque informações sobre qualquer Pokémon</p>
        </div>

        {/* Conteúdo */}
        <div className="pokedex-content">
          {currentView === 'search' && (
            <div className="search-section">
              <div className="search-title">
                <h2>Buscar Pokémon</h2>
                <p>Digite o ID ou nome do Pokémon</p>
              </div>
              
              <PokemonSearch 
                onSearch={handleSearch}
                loading={loading}
              />
            </div>
          )}
          
          {currentView === 'pokemon' && (
            <div className="pokemon-section">
              <div className="pokemon-controls">
                <button 
                  onClick={handleBackToSearch}
                  className="btn btn-secondary"
                >
                  ← Voltar
                </button>
                <button 
                  onClick={handleClearSearch}
                  className="btn btn-danger"
                >
                  ✕ Limpar
                </button>
              </div>
              <PokemonElegant
                pokemon={pokemon}
                error={error}
                loading={loading}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App

