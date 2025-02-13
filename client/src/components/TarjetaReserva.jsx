import "../styles/styleTarjetaReserva.css";
import { Button } from 'react-bootstrap';
import { BsTrash, BsPencilSquare } from 'react-icons/bs';
import { deleteReserva } from "../api/reserva.api";
import moment from "moment"; //Se utiliza la biblioteca moment para formatear las fechas en un formato específico.
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function TarjetaReserva({ reserva }) {
  const handleEliminarClick = () => {
    confirmAlert({
      title: "Confirmar",
      message: "¿Estás seguro de eliminar esta Reserva?",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            // Eliminar el auto
            deleteReserva(reserva.id_reserva)
              .then(() => {
                // Recargar la página después de eliminar el auto
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error al eliminar la Reserva", error);
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
      <div className="reserva-card">
        <h5>Ciudad Desde: {reserva.ciudad_desde}</h5>
        <h5>Ciudad Hasta: {reserva.ciudad_hasta}</h5>
        <h5>Fecha Desde: {moment(reserva.fecha_desde).format("DD-MM-YYYY")}</h5>
        <h5>Fecha Hasta: {moment(reserva.fecha_hasta).format("DD-MM-YYYY")}</h5>
        <h5>Hora Desde: {reserva.hora_desde}</h5>
        <h5>Hora Hasta: {reserva.hora_hasta}</h5>
        <h5>Auto Alquilado: {reserva.modelo}</h5>
        <h5>Cliente: {reserva.nombre}</h5>
        <Button
        variant="danger"
        className="eliminarAuto"
        size="sm"
        onClick={handleEliminarClick}
      >
        <BsTrash />
      </Button>
        <Link to='/modificarReserva' state={reserva} className="editar">
          <BsPencilSquare />
        </Link>
      </div>
  );
}

export default TarjetaReserva;


/*En resumen, este componente proporciona una representación visual de la información de una reserva con opciones para eliminar y editar la reserva. 
La funcionalidad de eliminación utiliza la función deleteReserva de la API, y la funcionalidad de edición utiliza un enlace
 para redirigir a la página de modificación con el estado de la reserva.*/