import { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Busqueda from './Components/Busqueda';
import Carrusel from './Components/Carrusel';
import Coleccion from './Components/Coleccion';
import Reseñas from './Components/Reseñas';
import FormularioReseña from './Components/formularioreseña';
import Estadisticas from './Components/Estadisticas';
import './App.css';

function App() {
  const [vistaActual, setVistaActual] = useState('inicio');

  return (
    <div className="app">
      <Sidebar vistaActual={vistaActual} cambiarVista={setVistaActual} />
      
      <div className="contenido-principal">
        <Header />
        
        {/* INICIO - Home */}
        {vistaActual === 'inicio' && (
          <>
            <Carrusel />
            {/* aquí puedes agregar reseñas destacadas, si quieres */}
          </>
        )}
        
        {/* BIBLIOTECA - Aquí sí va la búsqueda */}
        {vistaActual === 'biblioteca' && (
          <>
            <Busqueda />
            <Coleccion />
          </>
        )}
        
        {/* RESEÑAS */}
        {vistaActual === 'resenas' && <Reseñas />}
        
        {/* AGREGAR RESEÑA */}
        {vistaActual === 'agregar-resena' && (
          <div style={{ padding: '20px' }}>
            <FormularioReseña 
              onClose={() => setVistaActual('resenas')}
              onSuccess={() => setVistaActual('resenas')}
            />
          </div>
        )}
        
        {/* ESTADÍSTICAS */}
        {vistaActual === 'estadisticas' && <Estadisticas />}
      </div>
    </div>
  );
}

export default App;

