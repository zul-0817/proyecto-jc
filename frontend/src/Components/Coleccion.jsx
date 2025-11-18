function Micoleccion({ juegos }) {
  return (
    <div className="micoleccion">
      <h2>Mi Colección</h2>
      <div className="grid-juegos">
        {juegos && juegos.map(juego => (
          <div key={juego.id} className="tarjeta-preview">
            <h3>{juego.titulo}</h3>
            <p>Progreso: {juego.progreso}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Micoleccion