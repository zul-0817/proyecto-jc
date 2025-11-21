import { useState, useEffect } from 'react';
import { obtenerJuegos, eliminarJuego } from '../services/Api';
import Tarjetajuego from './Tarjetajuego';
import FormularioJuego from './formulariojuego';
import ModalConfirmacion from './ModalConfirmacion';
import Notificacion from './Notificacion';
import { useNotificacion } from '../hooks/useNotificacion';
import './Coleccion.css';

function Coleccion() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [juegoEditar, setJuegoEditar] = useState(null);
  const [filtroGenero, setFiltroGenero] = useState('todos');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [juegoAEliminar, setJuegoAEliminar] = useState(null);
  const { notificacion, mostrarNotificacion, cerrarNotificacion } = useNotificacion();

  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerJuegos();
      setJuegos(data);
    } catch (err) {
      console.error('Error al cargar juegos:', err);
      setError('No se pudieron cargar los juegos');
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarJuego = () => {
    setJuegoEditar(null);
    setMostrarFormulario(true);
  };

  const handleEditarJuego = (juego) => {
    setJuegoEditar(juego);
    setMostrarFormulario(true);
  };

  const handleEliminarJuego = (id) => {
    const juego = juegos.find(j => j._id === id);
    setJuegoAEliminar(juego);
    setMostrarConfirmacion(true);
  };

  const confirmarEliminacion = async () => {
    if (!juegoAEliminar) return;

    try {
      await eliminarJuego(juegoAEliminar._id);
      await cargarJuegos();
      mostrarNotificacion('Juego eliminado correctamente', 'exito');
    } catch (err) {
      console.error('Error al eliminar juego:', err);
      mostrarNotificacion('No se pudo eliminar el juego', 'error');
    } finally {
      setMostrarConfirmacion(false);
      setJuegoAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setMostrarConfirmacion(false);
    setJuegoAEliminar(null);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setJuegoEditar(null);
  };

  const handleSuccessFormulario = () => {
    cargarJuegos();
  };

  const juegosFiltrados = filtroGenero === 'todos'
    ? juegos
    : juegos.filter(juego => juego.genero === filtroGenero);

  const generos = ['todos', ...new Set(juegos.map(j => j.genero))];

  if (loading) {
    return (
      <div className="coleccion-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando colección...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="coleccion-container">
        <div className="error-container">
          <p className="emoji-grande">⚠️</p>
          <h3>Error al cargar</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={cargarJuegos}>
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {notificacion && (
        <Notificacion
          tipo={notificacion.tipo}
          mensaje={notificacion.mensaje}
          onClose={cerrarNotificacion}
        />
      )}

      {mostrarConfirmacion && juegoAEliminar && (
        <ModalConfirmacion
          titulo="¿Eliminar juego?"
          mensaje={`¿Estás seguro de eliminar "${juegoAEliminar.titulo}"? Esta acción no se puede deshacer.`}
          onConfirmar={confirmarEliminacion}
          onCancelar={cancelarEliminacion}
          tipo="eliminar"
        />
      )}

      <div className="coleccion-container">
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

        {mostrarFormulario && (
          <FormularioJuego
            juegoEditar={juegoEditar}
            onClose={handleCerrarFormulario}
            onSuccess={handleSuccessFormulario}
          />
        )}
      </div>
    </>
  );
}

export default Coleccion;
