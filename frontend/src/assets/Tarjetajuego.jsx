function TarjetaJuego({ titulo, imagen, progreso }) {
  return (
    <div className="tarjeta">
      <img src={imagen} alt={titulo} />
      <h3>{titulo}</h3>
      <div className="progreso">{progreso}%</div>
    </div>
  )
}
export default TarjetaJuego