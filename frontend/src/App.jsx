import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import './App.css'

function App() {
  const [vistaActual, setVistaActual] = useState('inicio')

  return (
    <div className="app">
      <Sidebar 
        vistaActual={vistaActual} 
        cambiarVista={setVistaActual} 
      />
      
      <div className="contenido-principal">
        <h1>🎮 GameTracker</h1>
        <p>La aplicación está funcionando</p>
      </div>
    </div>
  )
}

export default App