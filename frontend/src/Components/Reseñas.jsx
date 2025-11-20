import { useState, useEffect } from 'react';
import { obtenerResenas, eliminarResena } from '../services/Api';
import FormularioReseña from './formularioreseña';
import './Reseñas.css';

function Reseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reseñaEditar, setReseñaEditar] = useState(null);

  useEffect(() => {
    cargarReseñas();
  }, []);

  const cargarReseñas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerResenas();
      console.log('✅ Reseñas cargadas:', data);
      setReseñas(data);
    } catch (err) {
      console.error('❌ Error al cargar reseñas:', err);
      setError('No se pudieron cargar las reseñas');
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarReseña = () => {
    setReseñaEditar(null);
    setMostrarFormulario(true);
  };

  const handleEditarReseña = (reseña) => {
    setReseñaEditar(reseña);
    setMostrarFormulario(true);
  };

  const handleEliminarReseña = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      try {
        await eliminarResena(id);
        await cargarReseñas();
        alert('✅ Reseña eliminada correctamente');
      } catch (err) {
        console.error('Error al eliminar reseña:', err);
        alert('❌ No se pudo eliminar la reseña');
      }
    }
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setReseñaEditar(null);
  };

  const handleSuccessFormulario = () => {
    cargarReseñas();
  };

  // Renderizar estrellas
  const renderEstrellas = (puntuacion) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < puntuacion ? 'estrella-llena' : 'estrella-vacia'}>
        ⭐
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="resenas-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando reseñas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="resenas-container">
        <div className="error-container">
          <p className="emoji-grande">⚠️</p>
          <h3>Error al cargar</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={cargarReseñas}>
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="resenas-container">
      {/* Header */}
      <div className="resenas-header">
        <div>
          <h2 className="resenas-titulo">MIS RESEÑAS</h2>
          <p className="resenas-subtitulo">
            {reseñas.length} {reseñas.length === 1 ? 'reseña' : 'reseñas'}
          </p>
        </div>
        <button className="btn-agregar-resena" onClick={handleAgregarReseña}>
          ⭐ NUEVA RESEÑA
        </button>
      </div>

      {/* Lista de Reseñas */}
      {reseñas.length > 0 ? (
        <div className="grid-resenas">
          {reseñas.map(reseña => (
            <div key={reseña._id} className="tarjeta-resena">
              {/* Header de la tarjeta */}
              <div className="resena-header-card">
                <div className="resena-juego-info">
                  <h3 className="resena-juego-titulo">
                    {reseña.juegoId?.titulo || 'Juego eliminado'}
                  </h3>
                  <div className="resena-estrellas">
                    {renderEstrellas(reseña.puntuacion)}
                  </div>
                </div>
                <div className="resena-acciones">
                  <button
                    className="btn-icono"
                    onClick={() => handleEditarReseña(reseña)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icono btn-eliminar"
                    onClick={() => handleEliminarReseña(reseña._id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Contenido de la reseña */}
              <div className="resena-contenido">
                <p className="resena-texto">{reseña.textoReseña}</p>
              </div>

              {/* Footer con info adicional */}
              <div className="resena-footer">
                <div className="resena-detalle">
                  <span className="resena-icono">⏱️</span>
                  {reseña.horasJugadas} horas
                </div>
                <div className="resena-detalle">
                  <span className="resena-icono">🎯</span>
                  {reseña.dificultad}
                </div>
                {reseña.recomendaria && (
                  <div className="resena-detalle recomendado">
                    <span className="resena-icono">👍</span>
                    Recomendado
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sin-resenas">
          <p className="emoji-grande">⭐</p>
          <h3>Aún no has escrito ninguna reseña</h3>
          <p>¡Comparte tu opinión sobre los juegos que has jugado!</p>
          <button className="btn-agregar-resena" onClick={handleAgregarReseña} style={{ marginTop: '20px' }}>
            ⭐ ESCRIBIR PRIMERA RESEÑA
          </button>
        </div>
      )}

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <FormularioReseña
          reseñaEditar={reseñaEditar}
          onClose={handleCerrarFormulario}
          onSuccess={handleSuccessFormulario}
        />
      )}
    </div>
  );
}

export default Reseñas;
