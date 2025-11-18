function Header() {
  return (
    <header className="header">
      <div className="saludo">
        <h1>¡HOLA BIENVENIDA, <span className="nombre">LUZ</span>!</h1>
        <p className="seccion">RECIÉN AGREGADOS</p>
      </div>
      
      <div className="buscador">
        <input 
          type="text" 
          placeholder="🔍 Buscar juegos..." 
          className="input-buscar"
        />
      </div>
    </header>
  )
}

export default Header