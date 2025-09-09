import React, { useState, useCallback, memo } from 'react';
import { getAllRegions } from '@/data/pokemonRegions';
import type { RegionFilterProps } from '@/types/pokemon';

/**
 * Componente de filtro por região
 * Permite selecionar uma região específica para filtrar Pokémon
 */
const RegionFilter = memo<RegionFilterProps>(({ selectedRegion, onRegionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const regions = getAllRegions();

  /**
   * Manipula a seleção de uma região
   */
  const handleRegionSelect = useCallback((regionKey: string) => {
    onRegionChange(regionKey);
    setIsOpen(false);
  }, [onRegionChange]);

  /**
   * Manipula o toggle do dropdown
   */
  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  /**
   * Manipula o clique fora do dropdown
   */
  const handleClickOutside = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  }, []);

  const selectedRegionData = regions.find(r => r.key === selectedRegion);

  return (
    <div className="region-filter">
      <div className="region-filter-header">
        <h4>Filtrar por Região</h4>
        <button 
          type="button"
          className="region-toggle"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls="region-dropdown"
          aria-label={isOpen ? 'Fechar filtro de região' : 'Abrir filtro de região'}
        >
          {isOpen ? '▲' : '▼'}
        </button>
      </div>
      
      {isOpen && (
        <div 
          id="region-dropdown"
          className="region-dropdown"
          onClick={handleClickOutside}
          role="listbox"
          aria-label="Lista de regiões"
        >
          <div 
            className={`region-option ${selectedRegion === 'all' ? 'selected' : ''}`}
            onClick={() => handleRegionSelect('all')}
            role="option"
            aria-selected={selectedRegion === 'all'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRegionSelect('all');
              }
            }}
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
              role="option"
              aria-selected={selectedRegion === region.key}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleRegionSelect(region.key);
                }
              }}
            >
              <div 
                className="region-color" 
                style={{ background: region.color }}
                aria-label={`Cor da região ${region.name}`}
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
        <div className="selected-region-info" aria-label={`Região selecionada: ${selectedRegionData.name}`}>
          <div 
            className="region-indicator"
            style={{ background: selectedRegionData.color }}
          ></div>
          <span>{selectedRegionData.name}</span>
        </div>
      )}
    </div>
  );
});

RegionFilter.displayName = 'RegionFilter';

export default RegionFilter;
