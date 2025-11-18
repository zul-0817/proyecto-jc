function Carrusel() {
  return (
    <div className="carrusel">
      <div className="juego-destacado">
        <img 
          src="https://ejemplo.com/silksong.jpg" 
          alt="Hollow Knight Silksong"
        />
        <h2>HOLLOW KNIGHT: SILKSONG</h2>
        <p>Nintendo Switch 2 Edition</p>
      </div>
      
      <div className="puntos-navegacion">
        <span className="punto activo"></span>
        <span className="punto"></span>
        <span className="punto"></span>
      </div>
    </div>
  )
}

export default Carrusel