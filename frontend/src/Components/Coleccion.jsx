import { useState, useEffect } from 'react'
import { obtenerJuegos, eliminarJuego } from '../services/api'
import Tarjetajuego from './Tarjetajuego'
import './Coleccion.css'

function Coleccion() {
  const [juegos, setJuegos] = useState([])
  const [filtroGenero, setFiltroGenero] = useState('todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar juegos al montar el componente
  useEffect(() => {
    cargarJuegos()
  }, [])

  const cargarJuegos = async () => {
    try {
      setLoading(true)
      const data = await obtenerJuegos()
      setJuegos(data)
      setError(null)
    } catch (err) {
      console.error('Error al cargar juegos:', err)
      setError('No se pudieron cargar los juegos. Verifica que el backend esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

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

  const handleEliminarJuego = async (id) => {
    if (window.confirm('¿Estás segura de eliminar este juego?')) {
      try {
        await eliminarJuego(id)
        // Recargar juegos después de eliminar
        cargarJuegos()
      } catch (err) {
        console.error('Error al eliminar juego:', err)
        alert('No se pudo eliminar el juego')
      }
    }
  }

  // Mostrar loader mientras carga
  if (loading) {
    return (
      <div className="coleccion-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando juegos...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si hay
  if (error) {
    return (
      <div className="coleccion-container">
        <div className="error-container">
          <p className="emoji-grande">⚠️</p>
          <h3>Error al cargar</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={cargarJuegos}>
            Reintentar
          </button>
        </div>
      </div>
    )
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
              key={juego._id} 
              juego={juego}
              onClick={handleJuegoClick}
              onDelete={handleEliminarJuego}
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