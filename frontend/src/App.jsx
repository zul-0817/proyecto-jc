import Sidebar from './assets'
import Header from './components/Header'
import Carrusel from './components/Carrusel'
import MiColeccion from './components/MiColeccion'

function App() {
  return (
    <div className="app">
      <Sidebar />
      
      <div className="contenido-principal">
        <Header />
        <Carrusel />
        <MiColeccion />
      </div>
    </div>
  )
}

export default App