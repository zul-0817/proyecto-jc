import { useState, useEffect } from 'react';
import { obtenerJuegos, eliminarJuego } from '../services/Api';
import Tarjetajuego from './Tarjetajuego';
import FormularioJuego from './formulariojuego.jsx';
import './Coleccion.css';

function Coleccion() {
  const [juegos, setJuegos] = useState([]);
  const [filtroGenero, setFiltroGenero] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [juegoEditar, setJuegoEditar] = useState(null);

  // Cargar juegos al montar el componente
  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerJuegos();
      console.log('✅ Juegos cargados desde la base de datos:', data);
      setJuegos(data);
    } catch (err) {
      console.error('❌ Error al cargar juegos:', err);
      setError('No se pudieron cargar los juegos. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar juegos
  const juegosFiltrados = filtroGenero === 'todos' 
    ? juegos 
    : juegos.filter(juego => juego.genero === filtroGenero);

  // Obtener géneros únicos de los juegos
  const generos = ['todos', ...new Set(juegos.map(j => j.genero).filter(Boolean))];

  const handleAgregarJuego = () => {
    setJuegoEditar(null);
    setMostrarFormulario(true);
  };

  const handleEditarJuego = (juego) => {
    setJuegoEditar(juego);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setJuegoEditar(null);
  };

  const handleSuccessFormulario = () => {
    cargarJuegos(); // Recargar juegos después de agregar/editar
  };

  const handleEliminarJuego = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este juego de tu colección?')) {
      try {
        await eliminarJuego(id);
        await cargarJuegos();
        alert('✅ Juego eliminado correctamente');
      } catch (err) {
        console.error('Error al eliminar juego:', err);
        alert('❌ No se pudo eliminar el juego. Intenta de nuevo.');
      }
    }
  };

  // Mostrar loader mientras carga
  if (loading) {
    return (
      <div className="coleccion-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando tu colección desde la base de datos...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si hay
  if (error) {
    return (
      <div className="coleccion-container">
        <div className="error-container">
          <p className="emoji-grande">⚠️</p>
          <h3>Error al cargar</h3>
          <p>{error}</p>
          <button className="btn-agregar-juego" onClick={cargarJuegos}>
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="coleccion-container">
      {/* Header con título y botón */}
      <div className="coleccion-header">
        <div>
          <h2 className="coleccion-titulo">MI COLECCIÓN</h2>
          <p className="coleccion-subtitulo">
            {juegosFiltrados.length} {juegosFiltrados.length === 1 ? 'juego' : 'juegos'}
            {filtroGenero !== 'todos' && ` en ${filtroGenero}`}
          </p>
        </div>
        
        <button className="btn-agregar-juego" onClick={handleAgregarJuego}>
          ➕ AGREGAR JUEGO
        </button>
      </div>

      {/* Filtros - Solo mostrar si hay juegos */}
      {juegos.length > 0 && (
        <div className="filtros-container">
          {generos.map(genero => (
            <button
              key={genero}
              className={`btn-filtro ${filtroGenero === genero ? 'activo' : ''}`}
              onClick={() => setFiltroGenero(genero)}
            >
              {genero === 'todos' ? '🎮 Todos' : genero}
            </button>
          ))}
        </div>
      )}

      {/* Grid de juegos */}
      {juegosFiltrados.length > 0 ? (
        <div className="grid-juegos">
          {juegosFiltrados.map(juego => (
            <Tarjetajuego 
              key={juego._id} 
              juego={juego}
              onClick={() => handleEditarJuego(juego)}
              onDelete={() => handleEliminarJuego(juego._id)}
            />
          ))}
        </div>
      ) : (
        <div className="sin-juegos">
          <p className="emoji-grande">
            {juegos.length === 0 ? '🎮' : '🔍'}
          </p>
          <h3>
            {juegos.length === 0 
              ? 'Tu colección está vacía' 
              : `No hay juegos en ${filtroGenero}`}
          </h3>
          <p>
            {juegos.length === 0 
              ? '¡Empieza agregando tu primer juego!' 
              : 'Intenta con otro filtro o agrega nuevos juegos'}
          </p>
          {juegos.length === 0 && (
            <button className="btn-agregar-juego" onClick={handleAgregarJuego} style={{ marginTop: '20px' }}>
              ➕ AGREGAR PRIMER JUEGO
            </button>
          )}
        </div>
      )}

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <FormularioJuego
          juegoEditar={juegoEditar}
          onClose={handleCerrarFormulario}
          onSuccess={handleSuccessFormulario}
        />
      )}
    </div>
  );
}

export default Coleccion;
