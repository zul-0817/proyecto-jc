import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ========== JUEGOS ==========

// Obtener todos los juegos
export const obtenerJuegos = async () => {
  try {
    const response = await api.get('/juegos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    throw error;
  }
};

// Obtener un juego por ID
export const obtenerJuegoPorId = async (id) => {
  try {
    const response = await api.get(`/juegos/${id}`); // ✅ CORREGIDO
    return response.data;
  } catch (error) {
    console.error('Error al obtener juego:', error);
    throw error;
  }
};

// Crear nuevo juego
export const crearJuego = async (juegoData) => {
  try {
    const response = await api.post('/juegos', juegoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear juego:', error);
    throw error;
  }
};

// Actualizar juego
export const actualizarJuego = async (id, juegoData) => {
  try {
    const response = await api.put(`/juegos/${id}`, juegoData); // ✅ CORREGIDO
    return response.data;
  } catch (error) {
    console.error('Error al actualizar juego:', error);
    throw error;
  }
};

// Eliminar juego
export const eliminarJuego = async (id) => {
  try {
    const response = await api.delete(`/juegos/${id}`); // ✅ CORREGIDO
    return response.data;
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    throw error;
  }
};

// ========== RESEÑAS ==========

// Obtener todas las reseñas
export const obtenerResenas = async () => {
  try {
    const response = await api.get('/resenas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw error;
  }
};

// Obtener reseñas de un juego específico
export const obtenerResenasPorJuego = async (juegoId) => {
  try {
    const response = await api.get(`/resenas/juego/${juegoId}`); // ✅ CORREGIDO
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas del juego:', error);
    throw error;
  }
};

// Crear nueva reseña
export const crearResena = async (resenaData) => {
  try {
    const response = await api.post('/resenas', resenaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error;
  }
};

// Actualizar reseña
export const actualizarResena = async (id, resenaData) => {
  try {
    const response = await api.put(`/resenas/${id}`, resenaData); // ✅ CORREGIDO
    return response.data;
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    throw error;
  }
};

// Eliminar reseña
export const eliminarResena = async (id) => {
  try {
    const response = await api.delete(`/resenas/${id}`); // ✅ CORREGIDO
    return response.data;
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    throw error;
  }
};

export default api;


// ========== ESTADÍSTICAS ==========

export const obtenerEstadisticas = async () => {
  try {
    const response = await api.get('/stats'); // 👈 Ruta correcta del backend
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};
