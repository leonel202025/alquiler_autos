// Importa el componente "Link" de react-router-dom para la navegación entre páginas
import { Link } from "react-router-dom"

// Importa los estilos y los hooks necesarios de React
import "../styles/styleCliente.css"
import { useState, useEffect } from "react"

// Importa la función getClientes y el componente TarjetaCliente
import { getClientes } from "../api/cliente.api"
import TarjetaCliente from "../components/TarjetaCliente.jsx"

// Función principal del componente "Clientes"
function Clientes() {
  // Utiliza el estado para almacenar la lista de clientes
  const [clientes, setClientes] = useState([])

  // useEffect se ejecuta después de que el componente se monta
  useEffect(() => {
    // Llama a la función getClientes para obtener la lista de clientes y actualiza el estado
    getClientes(setClientes)
    
    // Muestra la lista de clientes en la consola (puede mostrar un estado anterior debido a la asincronía)
    console.log(clientes)
  }, []) // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  // Renderiza la interfaz del componente
  return (
    <div className="clientes-container">
      <h2>Clientes</h2>
      {/* Mapea la lista de clientes y renderiza el componente TarjetaCliente para cada cliente */}
      <section className="clientes-list">
        {clientes.map(cliente => (
          <TarjetaCliente cliente={cliente} key={cliente.id_cliente}/>
        ))}
      </section>
      
      {/* Agrega un enlace para redirigir a la página de "AñadirCliente" */}
      <Link to={"/AñadirCliente"} className="add-cliente-button">Agregar Cliente</Link>
    </div>
  )
}

// Exporta el componente "Clientes" para su uso en otras partes de la aplicación
export default Clientes
