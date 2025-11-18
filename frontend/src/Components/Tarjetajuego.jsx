import './Tarjetajuego.css'

function Tarjetajuego({ juego, onClick }) {
  return (
    <div className="tarjeta-juego" onClick={() => onClick && onClick(juego)}>
      {/* Imagen del juego */}
      <div className="tarjeta-imagen">
        <img 
          src={juego.imagen || '/placeholder-game.jpg'} 
          alt={juego.titulo}
        />
        
        {/* Badge de completado */}
        {juego.completado && (
          <div className="badge-completado">
            <span>✓ COMPLETADO</span>
          </div>
        )}

        {/* Overlay con botones */}
        <div className="tarjeta-overlay">
          <button className="btn-overlay">
            <span>▶</span> Jugar
          </button>
          <button className="btn-overlay">
            <span>ℹ</span> Detalles
          </button>
        </div>
      </div>

      {/* Información del juego */}
      <div className="tarjeta-info">
        <h3 className="tarjeta-titulo">{juego.titulo}</h3>
        
        <div className="tarjeta-detalles">
          <span className="badge-genero">{juego.genero}</span>
          <span className="badge-plataforma">{juego.plataforma}</span>
        </div>

        {/* Barra de progreso */}
        <div className="progreso-container">
          <div className="progreso-info">
            <span>Progreso</span>
            <span className="progreso-porcentaje">{juego.progreso || 0}%</span>
          </div>
          <div className="barra-progreso">
            <div 
              className="barra-progreso-fill"
              style={{ width: `${juego.progreso || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tarjetajuego