import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Carrusel from "./components/Carrusel";
import './App.css'

function App() {
  return (
    <div className="app">
      <Sidebar />
      
      <div className="contenido-principal">
        <Header />
        <Carrusel />
      </div>
    </div>
  )
}

export default App