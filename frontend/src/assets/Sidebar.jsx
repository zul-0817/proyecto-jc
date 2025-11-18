function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">🎮</div>
      <nav>
        <button className="sidebar-btn">🏠 Inicio</button>
        <button className="sidebar-btn">📚 Biblioteca</button>
        <button className="sidebar-btn">⭐ Favoritos</button>
        <button className="sidebar-btn">📊 Estadísticas</button>
        <button className="sidebar-btn">➕ Agregar</button>
        <button className="sidebar-btn">⚙️ Config</button>
      </nav>
    </div>
  )
}

export default Sidebar