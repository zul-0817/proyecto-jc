import { useEffect } from 'react';
import './Notificacion.css';

function Notificacion({ tipo = 'exito', mensaje, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const iconos = {
    exito: '✅',
    error: '❌',
    advertencia: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`notificacion notificacion-${tipo}`}>
      <div className="notificacion-contenido">
        <span className="notificacion-icono">{iconos[tipo]}</span>
        <span className="notificacion-mensaje">{mensaje}</span>
        <button className="notificacion-cerrar" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="notificacion-barra"></div>
    </div>
  );
}

export default Notificacion;
