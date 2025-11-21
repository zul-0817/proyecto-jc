import './Tarjetajuego.css';

function Tarjetajuego({ juego, onClick, onDelete }) {
  // Imagen por defecto LOCAL
  const imagenPorDefecto = '/juegos/default.png';

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(juego._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(juego);
    }
  };

  return (
    <div className="tarjeta-juego">
      <div className="tarjeta-imagen" onClick={handleEdit}>
        <img
          src={juego.imagenPortada || juego.imagen || imagenPorDefecto}
          alt={juego.titulo}
          onError={(e) => {
            e.target.src = imagenPorDefecto; // Imagen fallback
          }}
        />

        {juego.completado && (
          <div className="badge-completado">
            <span>✓ COMPLETADO</span>
          </div>
        )}

        <button
          className="btn-eliminar-tarjeta"
          onClick={handleDelete}
          title="Eliminar juego"
        >
          🗑️
        </button>

        <div className="tarjeta-overlay">
          <button className="btn-overlay" onClick={handleEdit}>
            <span>✏️</span> Editar
          </button>
          <button
            className="btn-overlay btn-overlay-eliminar"
            onClick={handleDelete}
          >
            <span>🗑️</span> Eliminar
          </button>
        </div>
      </div>

      <div className="tarjeta-info">
        <h3 className="tarjeta-titulo">{juego.titulo}</h3>

        <div className="tarjeta-detalles">
          <span className="badge-genero">{juego.genero}</span>
          <span className="badge-plataforma">{juego.plataforma}</span>
        </div>

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
  );
}

export default Tarjetajuego;

