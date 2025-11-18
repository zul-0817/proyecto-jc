import { useState } from 'react'
import './Reseñas.css'

function Reseñas() {
  // Datos de ejemplo
  const [reseñas] = useState([
    {
      id: 1,
      juego: 'GTA-V',
      imagen: '/juegos/gta5.jpg',
      titulo: 'Grand Theft Auto V',
      puntuacion: 5,
      texto: 'Francamente es uno de los mejores juegos que he visto',
      horasJugadas: 150,
      recomendaria: true,
      fecha: '2024-10-15'
    },
    {
      id: 2,
      juego: 'Injustice',
      imagen: '/juegos/injustice.jpg',
      titulo: 'Injustice 2',
      puntuacion: 4,
      texto: 'Un gran juego de peleas con una historia increíble',
      horasJugadas: 80,
      recomendaria: true,
      fecha: '2024-09-20'
    },
    {
      id: 3,
      juego: 'Silksong',
      imagen: '/juegos/silksong.jpg',
      titulo: 'Hollow Knight: Silksong',
      puntuacion: 5,
      texto: '¡La espera verdad sí es un JUEGASO!',
      horasJugadas: 120,
      recomendaria: true,
      fecha: '2024-11-01'
    },
    {
      id: 4,
      juego: 'Mortal Kombat',
      imagen: '/juegos/mk.jpg',
      titulo: 'Mortal Kombat 11',
      puntuacion: 4,
      texto: 'Uno de los juegos de pelea más genial, sin embargo hay algunos errores que no me gustaron antes',
      horasJugadas: 95,
      recomendaria: true,
      fecha: '2024-08-10'
    }
  ])

  const renderEstrellas = (puntuacion) => {
    return (
      <div className="estrellas">
        {[...Array(5)].map((_, index) => (
          <span 
            key={index} 
            className={index < puntuacion ? 'estrella llena' : 'estrella vacia'}
          >
            ⭐
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="reseñas-container">
      {/* Header */}
      <div className="reseñas-header">
        <div>
          <h2 className="reseñas-titulo">MIS RESEÑAS</h2>
          <p className="reseñas-subtitulo">{reseñas.length} reseñas escritas</p>
        </div>
        
        <button className="btn-agregar-reseña">
          ➕ AGREGAR RESEÑA
        </button>
      </div>

      {/* Lista de reseñas */}
      <div className="reseñas-lista">
        {reseñas.map((reseña) => (
          <div key={reseña.id} className="reseña-card">
            {/* Imagen del juego */}
            <div className="reseña-imagen">
              <img src={reseña.imagen} alt={reseña.titulo} />
            </div>

            {/* Contenido de la reseña */}
            <div className="reseña-contenido">
              <div className="reseña-header-card">
                <h3 className="reseña-juego">{reseña.titulo}</h3>
                {renderEstrellas(reseña.puntuacion)}
              </div>

              <p className="reseña-texto">{reseña.texto}</p>

              <div className="reseña-footer">
                <div className="reseña-meta">
                  <span className="meta-item">
                    ⏱️ {reseña.horasJugadas}h jugadas
                  </span>
                  {reseña.recomendaria && (
                    <span className="meta-item recomendado">
                      👍 Recomendado
                    </span>
                  )}
                </div>

                <div className="reseña-acciones">
                  <button className="btn-accion editar">✏️</button>
                  <button className="btn-accion eliminar">🗑️</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reseñas