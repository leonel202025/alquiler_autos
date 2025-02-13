import "../styles/styleTarjetaAuto.css";
import { Button } from "react-bootstrap";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { deleteAuto } from "../api/flota.api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

/*El componente recibe un prop llamado auto que contiene información sobre el automóvil.
El componente renderiza la información del automóvil en un formato visualmente agradable. */

/*Se utiliza el ícono BsTrash de react-icons para representar un ícono de basura.
Al hacer clic en el botón de eliminación (eliminarAuto), se llama a la función deleteAuto de la API (flota.api.js)
 para eliminar el automóvil correspondiente. Después de la eliminación, la página se recarga para reflejar los cambios. */

 /*Se utiliza el ícono BsPencilSquare de react-icons para representar un ícono de lápiz cuadrado.
Se utiliza un enlace (Link de react-router-dom) para redirigir a la página de modificación (/modificarAuto)
 y se pasa el estado del automóvil como información de estado al componente de modificación. */

 /*Después de eliminar un automóvil, la página se recarga utilizando window.location.reload().
  Esto asegura que la lista de autos se actualice después de eliminar un auto. */
function TarjetaAuto({ auto }) {
  const handleEliminarClick = () => {
    confirmAlert({
      title: "Confirmar",
      message: "¿Estás seguro de eliminar este auto?",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            // Eliminar el auto
            deleteAuto(auto.id_autos)
              .then(() => {
                // Recargar la página después de eliminar el auto
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error al eliminar el Auto", error);
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
    <div className="car-card">
      <h3>{auto.modelo}</h3>
      <p>Pasajeros: {auto.cant_personas}</p>
      <p>Maletas: {auto.cant_maletas}</p>
      <p>Color: {auto.color}</p>
      <Button
        variant="danger"
        className="eliminarAuto"
        size="sm"
        onClick={handleEliminarClick}
      >
        <BsTrash />
      </Button>
      <Link to='/modificarAuto'  state={auto} className="editarAuto" size="sm">
          <BsPencilSquare />
        </Link>
    </div>
  );
}

export default TarjetaAuto;

/* este componente TarjetaAuto proporciona una representación visual de la información del automóvil con opciones para eliminar
 y editar el automóvil. La funcionalidad de eliminación utiliza la función deleteAuto de la API, y la funcionalidad de edición 
 utiliza un enlace para redirigir a la página de modificación con el estado del automóvil. */