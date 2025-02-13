// Importación de los componentes y funciones necesarios de react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importación de páginas y componentes necesarios
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Flota from './pages/Flota';
import Reservas from "./pages/Reservas"
import AñadirAuto from './components/AñadirAuto';
import AñadirReserva from './components/AñadirReserva';
import AñadirCliente from './components/AñadirCliente';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ModificarAuto from './pages/ModificarAuto';
import ModificarCliente from './pages/ModificarCliente';
import ModificarReserva from './pages/ModificarReserva';

// Definición del componente principal "App"
function App() {
  // Renderizado de la aplicación utilizando react-router-dom para la navegación
  return (
    <Router>
      {/* Componente de barra de navegación */}
      <Navbar/>

      {/* Configuración de rutas y sus componentes asociados */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/flota" element={<Flota/>}/>
        <Route path="/clientes" element={<Clientes/>}/>
        <Route path="/reservas" element={<Reservas/>}/>
        <Route path="/AñadirAuto" element={<AñadirAuto/>}/>
        <Route path="/AñadirReserva" element={<AñadirReserva/>}/>
        <Route path="/AñadirCliente" element={<AñadirCliente/>}/>
        <Route path="/modificarAuto" element={<ModificarAuto/>}/>
        <Route path="/modificarCliente" element={<ModificarCliente/>}/>
        <Route path="/modificarReserva" element={<ModificarReserva/>}/>
      </Routes>

      {/* Componente de pie de página */}
      <Footer/>
    </Router>
  );
}

// Exportación del componente principal "App"
export default App;


/*este código utiliza React con react-router-dom para crear una aplicación con varias rutas.
 Define un componente principal llamado App que utiliza un enrutador (Router) para manejar la 
 navegación entre diferentes páginas y componentes. Cada ruta está asociada a un componente específico
  que se renderiza cuando la ruta correspondiente se accede. La aplicación también incluye una 
  barra de navegación (Navbar) y un pie de página (Footer). */