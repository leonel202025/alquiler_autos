// Importa los estilos del componente Home
import "../styles/styleHome.css"

// Importa el componente de enlace ("Link") de react-router-dom
import { Link } from "react-router-dom"

// Función principal del componente "Home"
function Home() {
  // Renderiza la interfaz del componente
  return (
    <section className="hero">
      <div>
        <h1>Bienvenidos a North Rental Car </h1>
        <p>Descubre la mejor experiencia en alquiler de autos con nosotros.</p>
      </div>
      
      {/* Agrega un enlace para redirigir a la página de "AñadirReserva" */}
      <Link to={"/AñadirReserva"} className="cta-button">Reserva Ahora</Link>
    </section>
  )
}

// Exporta el componente "Home" para su uso en otras partes de la aplicación
export default Home
