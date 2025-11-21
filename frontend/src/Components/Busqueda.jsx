import { useState } from 'react'
import './Busqueda.css'

function Busqueda() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('')

  return (
    <div className="busqueda-container">
      {/* Barra de búsqueda principal */}
      <div className="busqueda-principal">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          className="input-busqueda-grande"
          placeholder="Buscar juegos por nombre..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
        {terminoBusqueda && (
          <button 
            className="btn-limpiar"
            onClick={() => setTerminoBusqueda('')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Resultados */}
      <div className="resultados-info">
        <p className="resultados-texto">
          {terminoBusqueda 
            ? `Buscando: "${terminoBusqueda}"` 
            : 'Usa la barra de búsqueda para encontrar juegos'}
        </p>
      </div>
    </div>
  )
}

export default Busqueda
