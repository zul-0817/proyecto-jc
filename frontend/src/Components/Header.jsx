function Header() {
  return (
    <header className="header">
      <div className="header-content">
        {/* Saludo personalizado */}
        <div className="saludo-section">
          <h1 className="saludo">
            ¡HOLA BIENVENIDA, <span className="nombre-usuario">LUZ</span>!
          </h1>
          <p className="seccion-actual">RECIÉN AGREGADOS</p>
        </div>

        {/* Barra de búsqueda */}
        <div className="busqueda-header">
          <input 
            type="text" 
            placeholder="🔍 Buscar juegos..." 
            className="input-buscar-header"
          />
        </div>
      </div>
    </header>
  )
}

export default Header