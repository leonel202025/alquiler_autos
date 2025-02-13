import { Button } from 'react-bootstrap';
import { BsTrash, BsPencilSquare } from 'react-icons/bs';
import "../styles/styleTarjetaCliente.css"
import { deleteCliente } from '../api/cliente.api';
import { Link } from 'react-router-dom'; 
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

//Idem al componente TarjetaAuto pero con la informacion del cliente
function TarjetaCliente({cliente}) {
  const handleEliminarClick = () => {
    confirmAlert({
      title: "Confirmar",
      message: "¿Estás seguro de eliminar este Cliente?",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            // Eliminar el auto
            deleteCliente(cliente.id_cliente)
              .then(() => {
                // Recargar la página después de eliminar el auto
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error al eliminar el Cliente", error);
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <div className="cliente-card">
      <h5>Nombre: {cliente.nombre}</h5>
      <h5>Apellido: {cliente.apellido}</h5>
      <h5>Correo: {cliente.correo}</h5>
      <h5>Telefono: {cliente.telefono}</h5>
      <h5>Domicilio: {cliente.domicilio}</h5>
      <Button
        variant="danger"
        className="eliminarAuto"
        size="sm"
        onClick={handleEliminarClick}
      >
        <BsTrash />
      </Button>
        <Link to='/modificarCliente'  state={cliente} className="editarCliente" size="sm">
          <BsPencilSquare/>
        </Link>
    </div>
  )
}

export default TarjetaCliente