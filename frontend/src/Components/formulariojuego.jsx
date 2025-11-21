import { useState, useEffect } from 'react';
import { crearJuego, actualizarJuego } from '../services/Api';
import Notificacion from './Notificacion';
import { useNotificacion } from '../hooks/useNotificacion';
import './formulariojuego.css';

function FormularioJuego({ juegoEditar, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: '',
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false,
    progreso: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { notificacion, mostrarNotificacion, cerrarNotificacion } = useNotificacion();

  const generos = [
    'Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes',
    'Carreras', 'Simulación', 'Puzzle', 'Plataformas',
    'Shooter', 'Multijugador', 'Indie', 'Otros'
  ];

  const plataformas = [
    'PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Otros'
  ];

  useEffect(() => {
    if (juegoEditar) {
      setFormData({
        titulo: juegoEditar.titulo || '',
        genero: juegoEditar.genero || '',
        plataforma: juegoEditar.plataforma || '',
        añoLanzamiento: juegoEditar.añoLanzamiento || '',
        desarrollador: juegoEditar.desarrollador || '',
        imagenPortada: juegoEditar.imagenPortada || juegoEditar.imagen || '',
        descripcion: juegoEditar.descripcion || '',
        completado: juegoEditar.completado || false,
        progreso: juegoEditar.progreso || 0
      });
    }
  }, [juegoEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.titulo.trim()) {
        throw new Error('El título es obligatorio');
      }
      if (!formData.genero) {
        throw new Error('El género es obligatorio');
      }
      if (!formData.plataforma) {
        throw new Error('La plataforma es obligatoria');
      }

      const dataToSend = {
        ...formData,
        añoLanzamiento: formData.añoLanzamiento ? parseInt(formData.añoLanzamiento) : undefined,
        progreso: parseInt(formData.progreso) || 0
      };

      if (juegoEditar) {
        await actualizarJuego(juegoEditar._id, dataToSend);
        mostrarNotificacion('Juego actualizado correctamente', 'exito');
      } else {
        await crearJuego(dataToSend);
        mostrarNotificacion('Juego agregado correctamente', 'exito');
      }

      setTimeout(() => {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }, 1000);

    } catch (err) {
      console.error('Error al guardar juego:', err);
      setError(err.message || 'Error al guardar el juego');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {notificacion && (
        <Notificacion
          tipo={notificacion.tipo}
          mensaje={notificacion.mensaje}
          onClose={cerrarNotificacion}
        />
      )}

      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-titulo">
              {juegoEditar ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}
            </h2>
            <button className="btn-cerrar" onClick={onClose}>✕</button>
          </div>

          <form className="formulario-juego" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">⚠️ {error}</div>
            )}

            <div className="form-group">
              <label htmlFor="titulo">
                <span className="label-icon">🎮</span>
                Título del Juego *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ej: The Legend of Zelda"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="genero">
                  <span className="label-icon">🎯</span>
                  Género *
                </label>
                <select
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un género</option>
                  {generos.map(gen => (
                    <option key={gen} value={gen}>{gen}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="plataforma">
                  <span className="label-icon">🕹️</span>
                  Plataforma *
                </label>
                <select
                  id="plataforma"
                  name="plataforma"
                  value={formData.plataforma}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una plataforma</option>
                  {plataformas.map(plat => (
                    <option key={plat} value={plat}>{plat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="añoLanzamiento">
                  <span className="label-icon">📅</span>
                  Año de Lanzamiento
                </label>
                <input
                  type="number"
                  id="añoLanzamiento"
                  name="añoLanzamiento"
                  value={formData.añoLanzamiento}
                  onChange={handleChange}
                  placeholder="2024"
                  min="1950"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className="form-group">
                <label htmlFor="desarrollador">
                  <span className="label-icon">👨‍💻</span>
                  Desarrollador
                </label>
                <input
                  type="text"
                  id="desarrollador"
                  name="desarrollador"
                  value={formData.desarrollador}
                  onChange={handleChange}
                  placeholder="Ej: Nintendo"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="imagenPortada">
                <span className="label-icon">🖼️</span>
                URL de la Portada
              </label>
              <input
                type="url"
                id="imagenPortada"
                name="imagenPortada"
                value={formData.imagenPortada}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.imagenPortada && (
                <div className="imagen-preview">
                  <img src={formData.imagenPortada} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">
                <span className="label-icon">📝</span>
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Escribe una breve descripción del juego..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="progreso">
                <span className="label-icon">📊</span>
                Progreso: {formData.progreso}%
              </label>
              <input
                type="range"
                id="progreso"
                name="progreso"
                value={formData.progreso}
                onChange={handleChange}
                min="0"
                max="100"
                className="range-slider"
              />
              <div className="range-labels">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="completado" className="checkbox-label">
                <input
                  type="checkbox"
                  id="completado"
                  name="completado"
                  checked={formData.completado}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  ✓ Marcar como completado
                </span>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancelar"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-guardar"
                disabled={loading}
              >
                {loading ? '⏳ Guardando...' : juegoEditar ? '💾 Actualizar' : '➕ Agregar Juego'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormularioJuego;
