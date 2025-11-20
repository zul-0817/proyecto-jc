import { useState } from 'react'
import './Carrusel.css'

function Carrusel() {
  const [indiceActivo, setIndiceActivo] = useState(0)

  // Juegos destacados
  const juegosDestacados = [
    {
      id: 1,
      titulo: 'HOLLOW KNIGHT',
      subtitulo: 'SILKSONG',
      descripcion: 'Nintendo Switch 2 Edition',
      imagen: '/juegos/silksong.jpg',
      color: '#ff6b35'
    },
    {
      id: 2,
      titulo: 'GTA V',
      subtitulo: 'GRAND THEFT AUTO',
      descripcion: 'Premium Edition',
      imagen: '/juegos/gta5.jpg',
      color: '#00d9ff'
    },
    {
      id: 3,
      titulo: 'MORTAL KOMBAT',
      subtitulo: '11 ULTIMATE',
      descripcion: 'Complete Edition',
      imagen: '/juegos/mk.jpg',
      color: '#ffd60a'
    }
  ]

  const siguiente = () => {
    setIndiceActivo((prev) => (prev + 1) % juegosDestacados.length)
  }

  const anterior = () => {
    setIndiceActivo((prev) => 
      prev === 0 ? juegosDestacados.length - 1 : prev - 1
    )
  }

  return (
    <div className="carrusel-container">
      <div className="carrusel">
        <div className="carrusel-contenido">
          <div 
            className="carrusel-imagen"
            style={{
              backgroundImage: `url(${juegosDestacados[indiceActivo].imagen})`,
              boxShadow: `0 20px 60px ${juegosDestacados[indiceActivo].color}40`
            }}
          >
            <div className="carrusel-overlay">
              <h2 className="carrusel-titulo">
                {juegosDestacados[indiceActivo].titulo}
              </h2>
              <h3 className="carrusel-subtitulo">
                {juegosDestacados[indiceActivo].subtitulo}
              </h3>
              <p className="carrusel-descripcion">
                {juegosDestacados[indiceActivo].descripcion}
              </p>
              
              <div className="carrusel-botones">
                <button className="btn-carrusel btn-primary">
                  ▶ JUGAR AHORA
                </button>
                <button className="btn-carrusel btn-secondary">
                  MÁS INFO
                </button>
              </div>
            </div>
          </div>

          {/* Botones de navegación */}
          <button className="carrusel-nav prev" onClick={anterior}>
            ‹
          </button>
          <button className="carrusel-nav next" onClick={siguiente}>
            ›
          </button>
        </div>

        {/* Puntos eliminados - ya no aparecen */}
      </div>
    </div>
  )
}

export default Carrusel