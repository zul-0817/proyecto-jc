import { useState, useEffect } from 'react';
import { obtenerJuegos, crearResena, actualizarResena } from '../services/Api';
import './FormularioReseña.css';

function FormularioReseña({ reseñaEditar, onClose, onSuccess }) {
  const [juegos, setJuegos] = useState([]);
  const [formData, setFormData] = useState({
    juegoId: '',
    puntuacion: 5,
    textoReseña: '',
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar lista de juegos
  useEffect(() => {
    cargarJuegos();
  }, []);

  // Si hay una reseña para editar, cargar sus datos
  useEffect(() => {
    if (reseñaEditar) {
      setFormData({
        juegoId: reseñaEditar.juegoId?._id || reseñaEditar.juegoId || '',
        puntuacion: reseñaEditar.puntuacion || 5,
        textoReseña: reseñaEditar.textoReseña || '',
        horasJugadas: reseñaEditar.horasJugadas || 0,
        dificultad: reseñaEditar.dificultad || 'Normal',
        recomendaria: reseñaEditar.recomendaria ?? true
      });
    }
  }, [reseñaEditar]);

  const cargarJuegos = async () => {
    try {
      const data = await obtenerJuegos();
      setJuegos(data);
    } catch (err) {
      console.error('Error al cargar juegos:', err);
    }
  };

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
      // Validaciones
      if (!formData.juegoId) {
        throw new Error('Debes seleccionar un juego');
      }
      if (!formData.textoReseña.trim() || formData.textoReseña.length < 10) {
        throw new Error('La reseña debe tener al menos 10 caracteres');
      }
      if (formData.puntuacion < 1 || formData.puntuacion > 5) {
        throw new Error('La puntuación debe ser entre 1 y 5');
      }

      const dataToSend = {
        ...formData,
        puntuacion: parseInt(formData.puntuacion),
        horasJugadas: parseInt(formData.horasJugadas) || 0
      };

      if (reseñaEditar) {
        await actualizarResena(reseñaEditar._id, dataToSend);
      } else {
        await crearResena(dataToSend);
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
      
      alert(`✅ Reseña ${reseñaEditar ? 'actualizada' : 'creada'} correctamente`);
    } catch (err) {
      console.error('Error al guardar reseña:', err);
      setError(err.message || 'Error al guardar la reseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-titulo">
            {reseñaEditar ? '✏️ Editar Reseña' : '⭐ Nueva Reseña'}
          </h2>
          <button className="btn-cerrar" onClick={onClose}>✕</button>
        </div>

        <form className="formulario-resena" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">⚠️ {error}</div>
          )}

          {/* Seleccionar Juego */}
          <div className="form-group">
            <label htmlFor="juegoId">
              <span className="label-icon">🎮</span>
              Selecciona el Juego *
            </label>
            <select
              id="juegoId"
              name="juegoId"
              value={formData.juegoId}
              onChange={handleChange}
              required
              disabled={reseñaEditar} // No permitir cambiar juego al editar
            >
              <option value="">-- Selecciona un juego --</option>
              {juegos.map(juego => (
                <option key={juego._id} value={juego._id}>
                  {juego.titulo}
                </option>
              ))}
            </select>
          </div>

          {/* Puntuación */}
          <div className="form-group">
            <label htmlFor="puntuacion">
              <span className="label-icon">⭐</span>
              Puntuación: {formData.puntuacion} / 5
            </label>
            <div className="estrellas-container">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  type="button"
                  className={`estrella ${num <= formData.puntuacion ? 'activa' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, puntuacion: num }))}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Texto de la Reseña */}
          <div className="form-group">
            <label htmlFor="textoReseña">
              <span className="label-icon">📝</span>
              Tu Reseña * (mínimo 10 caracteres)
            </label>
            <textarea
              id="textoReseña"
              name="textoReseña"
              value={formData.textoReseña}
              onChange={handleChange}
              placeholder="Escribe tu opinión sobre el juego..."
              rows="6"
              required
              minLength={10}
              maxLength={2000}
            />
            <div className="contador-caracteres">
              {formData.textoReseña.length} / 2000 caracteres
            </div>
          </div>

          {/* Horas Jugadas y Dificultad */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="horasJugadas">
                <span className="label-icon">⏱️</span>
                Horas Jugadas
              </label>
              <input
                type="number"
                id="horasJugadas"
                name="horasJugadas"
                value={formData.horasJugadas}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dificultad">
                <span className="label-icon">🎯</span>
                Dificultad
              </label>
              <select
                id="dificultad"
                name="dificultad"
                value={formData.dificultad}
                onChange={handleChange}
              >
                <option value="Fácil">Fácil</option>
                <option value="Normal">Normal</option>
                <option value="Difícil">Difícil</option>
                <option value="Muy Difícil">Muy Difícil</option>
              </select>
            </div>
          </div>

          {/* ¿Recomendarías? */}
          <div className="form-group checkbox-group">
            <label htmlFor="recomendaria" className="checkbox-label">
              <input
                type="checkbox"
                id="recomendaria"
                name="recomendaria"
                checked={formData.recomendaria}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="checkbox-text">
                👍 ¿Recomendarías este juego?
              </span>
            </label>
          </div>

          {/* Botones */}
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
              {loading ? '⏳ Guardando...' : reseñaEditar ? '💾 Actualizar' : '⭐ Publicar Reseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioReseña;
