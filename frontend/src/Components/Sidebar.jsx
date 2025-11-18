import { useState } from 'react';
import './Sidebar.css';
import './src/assets'
import HomeIcon from './assets/'

const Sidebar = ({ vistaActual, cambiarVista }) => {
  const [open, setOpen] = useState(false);

  // Menú de navegación
  const menuItems = [
    { id: 'inicio', icon: 'Homeicon', texto: 'Inicio' },
    { id: 'biblioteca', icon: '📚', texto: 'Biblioteca' },
    { id: 'favoritos', icon: '⭐', texto: 'Favoritos' },
    { id: 'estadisticas', icon: '📊', texto: 'Estadísticas' },
    { id: 'agregar', icon: '➕', texto: 'Agregar' },
    { id: 'configuracion', icon: '⚙️', texto: 'Configuración' }
  ];

  const handleClick = (id) => {
    cambiarVista(id);
  };

  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <img 
          className="sidebar-logo" 
          src="/logo.png" 
          alt="GameTracker Logo" 
        />
        <button 
          className="toggle-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            className={`sidebar-button ${vistaActual === item.id ? 'active' : ''}`}
            onClick={() => handleClick(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.texto}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;