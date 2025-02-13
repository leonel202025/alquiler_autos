// Importa los estilos CSS necesarios
import "../styles/styleReserva.css"
// Importa los hooks de estado y efecto de React
import { useState, useEffect } from "react"
// Importa la función de la API para obtener reservas
import { getReserva } from "../api/reserva.api"
// Importa el componente de enlace de React Router
import { Link } from "react-router-dom"
// Importa el componente de TarjetaReserva
import TarjetaReserva from "../components/TarjetaReserva"

// Definición del componente Reservas
function Reservas() {
  // Estado para almacenar la lista de reservas
  const [reservas, setReservas] = useState([])

  // Efecto para obtener las reservas al cargar el componente
  useEffect(() => {
    // Llama a la función de la API para obtener reservas y actualiza el estado
    getReserva(setReservas)
    // Imprime las reservas actuales en la consola (para fines de depuración)
    console.log(reservas)
  }, [])

  // Renderiza la interfaz del componente
  return (
    <div className="reserva-container">
      <h2>RESERVAS</h2>
      {/* Mapea las reservas y renderiza una TarjetaReserva para cada una */}
      <section className="reserva-list">
        {reservas.map(reserva => (
          <TarjetaReserva reserva={reserva} key={reserva.id_reserva}/>
        ))}
      </section>
      {/* Enlace para agregar una nueva reserva */}
      <Link to={"/AñadirReserva"} className="add-reserva-button">Agregar Reserva</Link>
    </div>
  )
}

// Exporta el componente Reservas para su uso en otras partes de la aplicación
export default Reservas
