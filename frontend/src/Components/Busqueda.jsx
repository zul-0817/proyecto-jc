import { useState } from 'react'
import './Busqueda.css'

function Busqueda() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const [filtroPlataforma, setFiltroPlataforma] = useState('todas')
  const [filtroGenero, setFiltroGenero] = useState('todos')

  const plataformas = ['todas', 'PlayStation', 'Xbox', 'PC', 'Switch']
  const generos = ['todos', 'Acción', 'RPG', 'Aventura', 'Deportes', 'Estrategia']

  return (
    <div className="busqueda-container">
      {/* Barra de búsqueda principal */}
      <div className="busqueda-principal">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          className="input-busqueda-grande"
          placeholder="Buscar juegos por título, género, plataforma..."
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

      {/* Filtros */}
      <div className="filtros-busqueda">
        {/* Filtro por plataforma */}
        <div className="filtro-grupo">
          <label className="filtro-label">Plataforma:</label>
          <div className="filtro-opciones">
            {plataformas.map(plataforma => (
              <button
                key={plataforma}
                className={`btn-filtro-busqueda ${filtroPlataforma === plataforma ? 'activo' : ''}`}
                onClick={() => setFiltroPlataforma(plataforma)}
              >
                {plataforma === 'todas' ? '🎮 Todas' : plataforma}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por género */}
        <div className="filtro-grupo">
          <label className="filtro-label">Género:</label>
          <div className="filtro-opciones">
            {generos.map(genero => (
              <button
                key={genero}
                className={`btn-filtro-busqueda ${filtroGenero === genero ? 'activo' : ''}`}
                onClick={() => setFiltroGenero(genero)}
              >
                {genero === 'todos' ? '🎯 Todos' : genero}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="resultados-info">
        <p className="resultados-texto">
          {terminoBusqueda 
            ? `Buscando: "${terminoBusqueda}"` 
            : 'Usa la barra de búsqueda o los filtros para encontrar juegos'}
        </p>
      </div>
    </div>
  )
}

export default Busqueda