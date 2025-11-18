import { useState } from 'react'
import Tarjetajuego from './Tarjetajuego'
import './Coleccion.css'

function Coleccion({ juegos }) {
  const [filtroGenero, setFiltroGenero] = useState('todos')

  // Filtrar juegos
  const juegosFiltrados = filtroGenero === 'todos' 
    ? juegos 
    : juegos.filter(juego => juego.genero === filtroGenero)

  // Obtener géneros únicos
  const generos = ['todos', ...new Set(juegos.map(j => j.genero))]

  const handleJuegoClick = (juego) => {
    console.log('Juego seleccionado:', juego)
    // Aquí puedes agregar navegación o abrir modal
  }

  return (
    <div className="coleccion-container">
      {/* Header con título y botón */}
      <div className="coleccion-header">
        <div>
          <h2 className="coleccion-titulo">MI COLECCIÓN</h2>
          <p className="coleccion-subtitulo">
            {juegosFiltrados.length} {juegosFiltrados.length === 1 ? 'juego' : 'juegos'}
          </p>
        </div>
        
        <button className="btn-agregar-juego">
          ➕ AGREGAR JUEGO
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        {generos.map(genero => (
          <button
            key={genero}
            className={`btn-filtro ${filtroGenero === genero ? 'activo' : ''}`}
            onClick={() => setFiltroGenero(genero)}
          >
            {genero === 'todos' ? 'Todos' : genero}
          </button>
        ))}
      </div>

      {/* Grid de juegos */}
      {juegosFiltrados.length > 0 ? (
        <div className="grid-juegos">
          {juegosFiltrados.map(juego => (
            <Tarjetajuego 
              key={juego.id} 
              juego={juego}
              onClick={handleJuegoClick}
            />
          ))}
        </div>
      ) : (
        <div className="sin-juegos">
          <p className="emoji-grande">🎮</p>
          <h3>No hay juegos en esta categoría</h3>
          <p>Intenta con otro filtro o agrega nuevos juegos</p>
        </div>
      )}
    </div>
  )
}

export default Coleccion