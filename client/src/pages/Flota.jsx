// Importa los hooks "useEffect" y "useState" de React
import { useEffect, useState } from "react"

// Importa los estilos y el componente de enlace ("Link") de react-router-dom
import "../styles/StyleFlota.css"
import { Link } from "react-router-dom"

// Importa la función getAutos y el componente TarjetaAuto
import { getAutos } from "../api/flota.api"
import TarjetaAuto from "../components/TarjetaAuto"

// Función principal del componente "Flota"
function Flota() {
  // Utiliza el estado para almacenar la lista de autos
  const [autos, setAutos] = useState([])

  // useEffect se ejecuta después de que el componente se monta
  useEffect(() => {
    // Llama a la función getAutos para obtener la lista de autos y actualiza el estado
    getAutos(setAutos)

    // Muestra la lista de autos en la consola (puede mostrar un estado anterior debido a la asincronía)
    console.log(autos)
  }, []) // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  // Renderiza la interfaz del componente
  return (
    <div className="app-container">
      <h2>NUESTRA FLOTA</h2>
      
      {/* Mapea la lista de autos y renderiza el componente TarjetaAuto para cada auto */}
      <section className="car-list">
        {autos.map(auto => (
          <TarjetaAuto auto={auto} key={auto.id_auto}/>
        ))}
      </section>
      
      {/* Agrega un enlace para redirigir a la página de "AñadirAuto" */}
      <Link to={"/AñadirAuto"} className="add-car-button">Agregar Auto</Link>
    </div>
  )
}

// Exporta el componente "Flota" para su uso en otras partes de la aplicación
export default Flota
