import { useEffect, useState } from "react";
import "./Estadisticas.css";
import { obtenerEstadisticas } from "../services/Api.js";

function Estadisticas() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  // Colores para los gráficos
  const coloresBarras = ["#00d9ff", "#ff6b35", "#ffd60a", "#e91e8c", "#6d28d9"];
  const coloresGeneros = ["#e91e8c", "#6d28d9", "#00d9ff", "#ffd60a", "#ff6b35"];

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerEstadisticas();
        console.log("Estadísticas recibidas:", data); // Para debug
        setEstadisticas(data);
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const porcentajeCompletados = () => {
    if (!estadisticas || estadisticas.totalJuegos === 0) return 0;
    return Math.round(
      (estadisticas.juegosCompletados / estadisticas.totalJuegos) * 100
    );
  };

  if (loading) return <p>Cargando estadísticas...</p>;
  if (!estadisticas) return <p>Error al cargar estadísticas.</p>;

  // Datos dinámicos del Top 5
  const juegosMasJugados = estadisticas.top5Juegos || [];
  const maxHoras = juegosMasJugados[0]?.horas || 1;

  // Datos dinámicos de géneros
  const generosFavoritos = estadisticas.generosFavoritos || [];

  return (
    <div className="estadisticas-container">

      {/* --- ENCABEZADO --- */}
      <div className="estadisticas-header">
        <h2 className="estadisticas-titulo">MIS ESTADÍSTICAS</h2>
        <p className="estadisticas-subtitulo">Resumen de tu actividad gaming</p>
      </div>

      {/* --- TARJETAS PRINCIPALES --- */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">🎮</div>
          <div className="stat-info">
            <h3 className="stat-numero">{estadisticas.totalJuegos || 0}</h3>
            <p className="stat-label">Total de Juegos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3 className="stat-numero">
              {estadisticas.juegosCompletados || 0}
            </h3>
            <p className="stat-label">Completados</p>
            <span className="stat-badge">{porcentajeCompletados()}%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <h3 className="stat-numero">
              {estadisticas.horasTotales || 0}h
            </h3>
            <p className="stat-label">Horas Jugadas</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3 className="stat-numero">
              {Number(estadisticas.puntuacionPromedio || 0).toFixed(1)}
            </h3>
            <p className="stat-label">Puntuación Promedio</p>
          </div>
        </div>

      </div>

      {/* --- GRÁFICOS --- */}
      <div className="graficos-grid">

        {/* TOP 5 JUEGOS MÁS JUGADOS */}
        <div className="grafico-card">
          <h3 className="grafico-titulo">🔥 Top 5 Juegos Más Jugados</h3>
          <div className="barras-container">
            {juegosMasJugados.length > 0 ? (
              juegosMasJugados.map((juego, i) => (
                <div key={i} className="barra-item">
                  <div className="barra-info">
                    <span className="barra-label">{juego.titulo}</span>
                    <span className="barra-valor">{juego.horas}h</span>
                  </div>
                  <div className="barra-progreso-horizontal">
                    <div
                      className="barra-fill"
                      style={{
                        width: `${(juego.horas / maxHoras) * 100}%`,
                        background: coloresBarras[i % coloresBarras.length],
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
                No hay datos de juegos jugados
              </p>
            )}
          </div>
        </div>

        {/* GÉNEROS FAVORITOS */}
        <div className="grafico-card">
          <h3 className="grafico-titulo">🎯 Géneros Favoritos</h3>
          <div className="circular-stats">
            {generosFavoritos.length > 0 ? (
              generosFavoritos.map((item, i) => (
                <div key={i} className="circular-item">
                  <div
                    className="circular-progreso"
                    style={{
                      background: `conic-gradient(${
                        coloresGeneros[i % coloresGeneros.length]
                      } ${item.porcentaje * 3.6}deg, rgba(61, 37, 99, 0.3) 0deg)`,
                    }}
                  >
                    <div className="circular-inner">
                      <span className="circular-porcentaje">
                        {item.porcentaje}%
                      </span>
                    </div>
                  </div>
                  <p className="circular-label">{item.genero}</p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#888', padding: '20px', gridColumn: '1 / -1' }}>
                No hay datos de géneros
              </p>
            )}
          </div>
        </div>

      </div>

      {/* --- PROGRESO GENERAL --- */}
      <div className="progreso-general-card">
        <h3 className="progreso-titulo">📈 Progreso General</h3>

        <div className="progreso-detalles">

          <div className="progreso-item">
            <span className="progreso-label">En Progreso</span>
            <div className="progreso-barra">
              <div
                className="progreso-fill"
                style={{
                  width: `${
                    estadisticas.totalJuegos > 0
                      ? (estadisticas.juegosEnProgreso /
                          estadisticas.totalJuegos) *
                        100
                      : 0
                  }%`,
                  background: "#ffd60a",
                }}
              ></div>
            </div>
            <span className="progreso-numero">
              {estadisticas.juegosEnProgreso || 0}
            </span>
          </div>

          <div className="progreso-item">
            <span className="progreso-label">Pendientes</span>
            <div className="progreso-barra">
              <div
                className="progreso-fill"
                style={{
                  width: `${
                    estadisticas.totalJuegos > 0
                      ? (estadisticas.juegosPendientes /
                          estadisticas.totalJuegos) *
                        100
                      : 0
                  }%`,
                  background: "#ff6b35",
                }}
              ></div>
            </div>
            <span className="progreso-numero">
              {estadisticas.juegosPendientes || 0}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Estadisticas;
