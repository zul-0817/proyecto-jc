import { useState } from 'react';

export function useNotificacion() {
  const [notificacion, setNotificacion] = useState(null);

  const mostrarNotificacion = (mensaje, tipo = 'exito') => {
    setNotificacion({ mensaje, tipo });
  };

  const cerrarNotificacion = () => {
    setNotificacion(null);
  };

  return {
    notificacion,
    mostrarNotificacion,
    cerrarNotificacion
  };
}
