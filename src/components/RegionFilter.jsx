import { useState } from 'react';
import { getAllRegions } from '../data/pokemonRegions';

const RegionFilter = ({ selectedRegion, onRegionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const regions = getAllRegions();

  const handleRegionSelect = (regionKey) => {
    onRegionChange(regionKey);
    setIsOpen(false);
  };

  const selectedRegionData = regions.find(r => r.key === selectedRegion);

  return (
    <div className="region-filter">
      <div className="region-filter-header">
        <h4>Filtrar por Região</h4>
        <button 
          className="region-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '▲' : '▼'}
        </button>
      </div>
      
      {isOpen && (
        <div className="region-dropdown">
          <div 
            className={`region-option ${selectedRegion === 'all' ? 'selected' : ''}`}
            onClick={() => handleRegionSelect('all')}
          >
            <div className="region-color" style={{ background: '#6c757d' }}></div>
            <div className="region-info">
              <div className="region-name">Todas as Regiões</div>
              <div className="region-desc">Mostrar todos os Pokémon</div>
            </div>
          </div>
          
          {regions.map(region => (
            <div 
              key={region.key}
              className={`region-option ${selectedRegion === region.key ? 'selected' : ''}`}
              onClick={() => handleRegionSelect(region.key)}
            >
              <div 
                className="region-color" 
                style={{ background: region.color }}
              ></div>
              <div className="region-info">
                <div className="region-name">{region.name}</div>
                <div className="region-desc">
                  Gen {region.generation} • #{region.startId}-{region.endId}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedRegionData && selectedRegion !== 'all' && (
        <div className="selected-region-info">
          <div 
            className="region-indicator"
            style={{ background: selectedRegionData.color }}
          ></div>
          <span>{selectedRegionData.name}</span>
        </div>
      )}
    </div>
  );
};

export default RegionFilter;
