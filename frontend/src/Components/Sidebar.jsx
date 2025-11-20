import { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ vistaActual, cambiarVista }) => {
  // Menú de navegación actualizado según tus necesidades
  const menuItems = [
    { id: 'inicio', icon: '🏠', texto: 'Inicio', color: '#e91e8c' },
    { id: 'biblioteca', icon: '📚', texto: 'Biblioteca', color: '#a78bca' },
    { id: 'resenas', icon: '⭐', texto: 'Reseñas', color: '#ffd700' },
    { id: 'agregar-resena', icon: '📝', texto: 'Agregar Reseña', color: '#00d4ff' },
    { id: 'estadisticas', icon: '📊', texto: 'Estadísticas', color: '#00ff88' }
  ];

  const handleClick = (id) => {
    cambiarVista(id);
  };

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <button 
            key={item.id}
            className={`sidebar-button ${vistaActual === item.id ? 'active' : ''}`}
            onClick={() => handleClick(item.id)}
            title={item.texto}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              '--icon-color': item.color 
            }}
          >
            <span className="icon">{item.icon}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
