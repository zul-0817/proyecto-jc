import './ModalConfirmacion.css';

function ModalConfirmacion({ titulo, mensaje, onConfirmar, onCancelar, tipo = 'eliminar' }) {
  const iconos = {
    eliminar: '🗑️',
    advertencia: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className="modal-confirmacion-overlay" onClick={onCancelar}>
      <div className="modal-confirmacion-content" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-confirmacion-icono ${tipo}`}>
          {iconos[tipo]}
        </div>
        
        <h3 className="modal-confirmacion-titulo">{titulo}</h3>
        <p className="modal-confirmacion-mensaje">{mensaje}</p>

        <div className="modal-confirmacion-acciones">
          <button className="btn-modal-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
          <button className={`btn-modal-confirmar ${tipo}`} onClick={onConfirmar}>
            {tipo === 'eliminar' ? 'Eliminar' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;
