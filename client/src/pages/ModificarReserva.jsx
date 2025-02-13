// Importa los hooks de efecto y estado de React
import { useEffect, useState } from "react";

// Importa el hook useLocation de react-router-dom para obtener la ubicación actual
import { useLocation } from "react-router-dom";

// Importa la función de actualización de reservas y la utilidad de confirmación de alerta
import { updateReserva } from "../api/reserva.api.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Importa los estilos del componente
import "../styles/modificarReserva.css";

// Importa la librería moment para manejar fechas y horas
import moment from "moment";

// Importa las funciones para obtener autos y clientes desde la API
import { getAutos } from "../api/flota.api.js";
import { getClientes } from "../api/cliente.api.js";

// Función principal del componente "ModificarReserva"
function ModificarReserva() {
  // Obtiene los datos iniciales del estado de ubicación
  const location = useLocation();
  const datosIniciales = location.state;

  // Utiliza el estado para gestionar los datos de la reserva
  const [datosReserva, setDatosReserva] = useState({
    ciudadDesde: datosIniciales.ciudad_desde || "",
    ciudadHasta: datosIniciales.ciudad_hasta || "",
    fechaDesde: moment(datosIniciales.fecha_desde).format("YYYY-MM-DD"),
    fechaHasta: moment(datosIniciales.fecha_hasta).format("YYYY-MM-DD"),
    horaDesde: datosIniciales.hora_desde || "",
    horaHasta: datosIniciales.hora_hasta || "",
    idAuto: datosIniciales.id_auto,
    idCliente: datosIniciales.id_cliente,
  });

  // Utiliza el estado para gestionar la lista de autos disponibles
  const [autos, setAutos] = useState([]);
  useEffect(() => {
    getAutos(setAutos);
  }, []);

  // Utiliza el estado para gestionar la lista de clientes disponibles
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    getClientes(setClientes);
  }, []);

  // Utiliza el estado para gestionar los errores de validación
  const [errores, setErrores] = useState({});
  // Utiliza el estado para mostrar un mensaje de éxito
  const [mostrarExito, setMostrarExito] = useState(false);

  // Efecto para limpiar el mensaje de éxito después de 3 segundos
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMostrarExito(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [mostrarExito]);

  // Maneja los cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosReserva({
      ...datosReserva,
      [name]: value,
    });
  };

  // Maneja la confirmación final para modificar la reserva
  const handleConfirm = () => {
    console.log("Datos de la reserva modificados:", datosReserva);
    updateReserva(datosIniciales.id_reserva, datosReserva);
    // Limpia los datos de la reserva, los errores y muestra el mensaje de éxito
    setDatosReserva({
      ciudadDesde: "",
      ciudadHasta: "",
      fechaDesde: "",
      fechaHasta: "",
      horaDesde: "",
      horaHasta: "",
      idAuto: 0,
      idCliente: 0,
    });
    setErrores({});
    setMostrarExito(true);
  };

  // Maneja la presentación del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    const errores = {};
    if (!datosReserva.ciudadDesde.trim()) {
      errores.ciudadDesde = "El campo Ciudad Desde es obligatorio";
    }
    if (!datosReserva.ciudadHasta.trim()) {
      errores.ciudadHasta = "El campo Ciudad Hasta es obligatorio";
    }
    if (!datosReserva.fechaDesde) {
      errores.fechaDesde = "El campo Fecha Desde es obligatorio";
    }
    if (!datosReserva.fechaHasta) {
      errores.fechaHasta = "El campo Fecha Hasta es obligatorio";
    }
    if (!datosReserva.horaDesde.trim()) {
      errores.horaDesde = "El campo Hora Desde es obligatorio";
    }
    if (!datosReserva.horaHasta.trim()) {
      errores.horaHasta = "El campo Hora Hasta es obligatorio";
    }
    if (!datosReserva.idAuto) {
      errores.idAuto = "Debes seleccionar un Auto";
    }
    if (!datosReserva.idCliente) {
      errores.idCliente = "Debes seleccionar un Cliente";
    }

    // Si hay errores, los establece en el estado y no procede
    if (Object.keys(errores).length > 0) {
      setErrores(errores);
      setMostrarExito(false);
      return;
    }

    // Muestra una alerta de confirmación antes de modificar la reserva
    confirmAlert({
      title: "Confirmar",
      message: "¿Estás seguro de modificar esta reserva?",
      buttons: [
        {
          label: "Sí",
          onClick: () => handleConfirm(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  // Renderiza la interfaz del componente
  return (
    <div className="modReserva">
      <h1>Modificar Reserva</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos de entrada para modificar la reserva */}
        <label>
          Ciudad Desde:
          <input
            type="text"
            name="ciudadDesde"
            value={datosReserva.ciudadDesde}
            onChange={handleChange}
          />
          {errores.ciudadDesde && (
            <p className="error">{errores.ciudadDesde}</p>
          )}
        </label>
        <label>
          Ciudad Hasta:
          <input
            type="text"
            name="ciudadHasta"
            value={datosReserva.ciudadHasta}
            onChange={handleChange}
          />
          {errores.ciudadHasta && (
            <p className="error">{errores.ciudadHasta}</p>
          )}
        </label>
        <label>
          Fecha Desde:
          <input
            type="date"
            name="fechaDesde"
            value={datosReserva.fechaDesde}
            onChange={handleChange}
          />
          {errores.fechaDesde && <p className="error">{errores.fechaDesde}</p>}
        </label>
        <label>
          Fecha Hasta:
          <input
            type="date"
            name="fechaHasta"
            value={datosReserva.fechaHasta}
            onChange={handleChange}
          />
          {errores.fechaHasta && <p className="error">{errores.fechaHasta}</p>}
        </label>
        <label>
          Hora Desde:
          <input
            type="time"
            name="horaDesde"
            value={datosReserva.horaDesde}
            onChange={handleChange}
          />
          {errores.horaDesde && <p className="error">{errores.horaDesde}</p>}
        </label>
        <label>
          Hora Hasta:
          <input
            type="time"
            name="horaHasta"
            value={datosReserva.horaHasta}
            onChange={handleChange}
          />
          {errores.horaHasta && <p className="error">{errores.horaHasta}</p>}
        </label>
        <label>
          Auto a Alquilar:
          {/* Dropdown para seleccionar un auto */}
          <select
            name="idAuto"
            onChange={handleChange}
            value={datosReserva.idAuto}
          >
            {autos.map((auto) => (
              <option value={auto.id_autos} key={auto.id_autos}>
                {auto.modelo}
              </option>
            ))}
          </select>
          {errores.idAuto && <p className="error">{errores.idAuto}</p>}
        </label>
        <label>
          Cliente:
          {/* Dropdown para seleccionar un cliente */}
          <select
            name="idCliente"
            onChange={handleChange}
            value={datosReserva.idCliente}
          >
            {clientes.map((cliente) => (
              <option value={cliente.id_cliente} key={cliente.id_cliente}>
                {cliente.nombre}
              </option>
            ))}
          </select>
          {errores.idCliente && <p className="error">{errores.idCliente}</p>}
        </label>
        {/* Botón para enviar el formulario */}
        <button type="submit">Modificar Reserva</button>
      </form>
      {/* Confirmación de éxito */}
      {mostrarExito &&
        confirmAlert({
          title: "Éxito",
          message: "Los datos de la Reserva han sido modificados con éxito",
          buttons: [
            {
              label: "OK",
              onClick: () => {
                setMostrarExito(false);
                window.location.href = "/reservas";
              },
            },
          ],
        })}
    </div>
  );
}

// Exporta el componente "ModificarReserva" para su uso en otras partes de la aplicación
export default ModificarReserva;
