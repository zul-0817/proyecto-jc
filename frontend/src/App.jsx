import { useState, useEffect } from 'react'
import { obtenerJuegos } from './services/Api.js'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Busqueda from './components/Busqueda'
import Carrusel from './components/Carrusel'
import Coleccion from './Components/Coleccion'
import Reseñas from './Components/Reseñas.jsx'
import Estadisticas from './components/Estadisticas'
import './App.css'
function App() {
  const [vistaActual, setVistaActual] = useState('inicio')
  const [JEjemplo, setJEjemplo] = useState([])

  // ⭐ Cargar juegos desde el backend al iniciar
  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const juegos = await obtenerJuegos()
        console.log('Juegos cargados:', juegos)
        setJEjemplo(juegos)
      } catch (error) {
        console.error('Error:', error)
        // Si falla, usar datos de ejemplo
        setJEjemplo([
          {
            id: 1,
            titulo: 'GTA V',
            imagen: '/juegos/gta5.jpg',
            progreso: 50,
            genero: 'Acción',
            plataforma: 'PlayStation'
          }
        ])
      }
    }
    
    cargarJuegos()
  }, [])

  // Datos de ejemplo para los juegos
  const juegosEjemplo = [
    {
      id: 1,
      titulo: 'GTA V',
      imagen: '/juegos/gta5.jpg',
      progreso: 50,
      genero: 'Acción',
      plataforma: 'PlayStation'
    },
    {
      id: 2,
      titulo: 'Hollow Knight: Silksong',
      imagen: '/juegos/silksong.jpg',
      progreso: 30,
      genero: 'Acción',
      plataforma: 'Switch'
    },
    {
      id: 3,
      titulo: 'Mortal Kombat',
      imagen: '/juegos/mk.jpg',
      progreso: 100,
      genero: 'Pelea',
      plataforma: 'PlayStation'
    },
    {
      id: 4,
      titulo: 'Injustice',
      imagen: '/juegos/injustice.jpg',
      progreso: 75,
      genero: 'Pelea',
      plataforma: 'Xbox'
    }
  ]

  // Función para renderizar el contenido según la vista
  const renderContenido = () => {
    switch(vistaActual) {
      case 'inicio':
        return (
          <>
            <Carrusel />
            <Coleccion juegos={juegosEjemplo} />
            <Reseñas />
          </>
        )
      
      case 'biblioteca':
        return (
          <>
            <Busqueda />
            <Coleccion juegos={juegosEjemplo} />
          </>
        )
      
      case 'estadisticas':
        return <Estadisticas />
      
      case 'reseñas':
        return <Reseñas />
      
      default:
        return (
          <>
            <Carrusel />
            <Coleccion juegos={juegosEjemplo} />
          </>
        )
    }
  }

  return (
    <div className="app">
      {/* Sidebar - Menú lateral fijo */}
      <Sidebar 
        vistaActual={vistaActual} 
        cambiarVista={setVistaActual} 
      />
      
      {/* Contenido principal */}
      <div className="contenido-principal">
        {/* Header con saludo y búsqueda */}
        <Header />
        
        {/* Contenido dinámico según la vista seleccionada */}
        <main className="contenido">
          {renderContenido()}
        </main>
      </div>
    </div>
  )
}

export default App