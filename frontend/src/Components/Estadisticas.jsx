import './Estadisticas.css'

function Estadisticas() {
  // Datos de ejemplo
  const estadisticas = {
    totalJuegos: 45,
    juegosCompletados: 28,
    horasTotales: 1250,
    puntuacionPromedio: 4.3,
    juegosEnProgreso: 12,
    juegoPendientes: 5
  }

  const juegosMasJugados = [
    { titulo: 'GTA V', horas: 350, color: '#00d9ff' },
    { titulo: 'Hollow Knight', horas: 280, color: '#ff6b35' },
    { titulo: 'Mortal Kombat', horas: 220, color: '#ffd60a' },
    { titulo: 'Injustice 2', horas: 180, color: '#e91e8c' },
    { titulo: 'God of War', horas: 150, color: '#6d28d9' }
  ]

  const generosFavoritos = [
    { genero: 'Acción', porcentaje: 35, color: '#e91e8c' },
    { genero: 'RPG', porcentaje: 28, color: '#6d28d9' },
    { genero: 'Aventura', porcentaje: 20, color: '#00d9ff' },
    { genero: 'Deportes', porcentaje: 12, color: '#ffd60a' },
    { genero: 'Estrategia', porcentaje: 5, color: '#ff6b35' }
  ]

  const calcularPorcentaje = () => {
    return Math.round((estadisticas.juegosCompletados / estadisticas.totalJuegos) * 100)
  }

  return (
    <div className="estadisticas-container">
      {/* Header */}
      <div className="estadisticas-header">
        <h2 className="estadisticas-titulo">MIS ESTADÍSTICAS</h2>
        <p className="estadisticas-subtitulo">Resumen de tu actividad gaming</p>
      </div>

      {/* Cards de estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎮</div>
          <div className="stat-info">
            <h3 className="stat-numero">{estadisticas.totalJuegos}</h3>
            <p className="stat-label">Total de Juegos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3 className="stat-numero">{estadisticas.juegosCompletados}</h3>
            <p className="stat-label">Completados</p>
            <span className="stat-badge">{calcularPorcentaje()}%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <h3 className="stat-numero">{estadisticas.horasTotales}h</h3>
            <p className="stat-label">Horas Jugadas</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3 className="stat-numero">{estadisticas.puntuacionPromedio}</h3>
            <p className="stat-label">Puntuación Promedio</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="graficos-grid">
        {/* Juegos más jugados */}
        <div className="grafico-card">
          <h3 className="grafico-titulo">🔥 Top 5 Juegos Más Jugados</h3>
          <div className="barras-container">
            {juegosMasJugados.map((juego, index) => (
              <div key={index} className="barra-item">
                <div className="barra-info">
                  <span className="barra-label">{juego.titulo}</span>
                  <span className="barra-valor">{juego.horas}h</span>
                </div>
                <div className="barra-progreso-horizontal">
                  <div 
                    className="barra-fill"
                    style={{
                      width: `${(juego.horas / juegosMasJugados[0].horas) * 100}%`,
                      background: juego.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Géneros favoritos */}
        <div className="grafico-card">
          <h3 className="grafico-titulo">🎯 Géneros Favoritos</h3>
          <div className="circular-stats">
            {generosFavoritos.map((item, index) => (
              <div key={index} className="circular-item">
                <div 
                  className="circular-progreso"
                  style={{
                    background: `conic-gradient(${item.color} ${item.porcentaje * 3.6}deg, rgba(61, 37, 99, 0.3) 0deg)`
                  }}
                >
                  <div className="circular-inner">
                    <span className="circular-porcentaje">{item.porcentaje}%</span>
                  </div>
                </div>
                <p className="circular-label">{item.genero}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progreso general */}
      <div className="progreso-general-card">
        <h3 className="progreso-titulo">📈 Progreso General</h3>
        <div className="progreso-detalles">
          <div className="progreso-item">
            <span className="progreso-label">En Progreso</span>
            <div className="progreso-barra">
              <div 
                className="progreso-fill"
                style={{ 
                  width: `${(estadisticas.juegosEnProgreso / estadisticas.totalJuegos) * 100}%`,
                  background: '#ffd60a'
                }}
              ></div>
            </div>
            <span className="progreso-numero">{estadisticas.juegosEnProgreso}</span>
          </div>

          <div className="progreso-item">
            <span className="progreso-label">Pendientes</span>
            <div className="progreso-barra">
              <div 
                className="progreso-fill"
                style={{ 
                  width: `${(estadisticas.juegoPendientes / estadisticas.totalJuegos) * 100}%`,
                  background: '#ff6b35'
                }}
              ></div>
            </div>
            <span className="progreso-numero">{estadisticas.juegoPendientes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Estadisticas