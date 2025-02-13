import { useState, useEffect } from "react";
import "../styles/addReservaStyle.css";
import { createReserva } from "../api/reserva.api";
import { getAutos } from "../api/flota.api";
import { getClientes } from "../api/cliente.api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function AñadirReserva() { //Idem que los otrs componentes 
  const [formData, setFormData] = useState({
    ciudadDesde: "",
    ciudadHasta: "",
    fechaDesde: "",
    fechaHasta: "",
    horaDesde: "",
    horaHasta: "",
    idAuto: "",
    idCliente:"",
  });

  const [mostrarExito, setMostrarExito] = useState(false);

  /*Se utilizan los efectos para llamar a las funciones getAutos y getClientes al montar el componente ([] como dependencia), 
obteniendo así la lista de autos y clientes disponibles.*/
  const [autos, setAutos]=useState([])
  useEffect(()=>{
    getAutos(setAutos)
  },[]);

  const [clientes, setClientes]=useState([])
  useEffect(()=>{
    getClientes(setClientes)
  },[]);

  /*se utiliza para manejar los cambios en los campos del formulario. 
  Se extraen el nombre y el valor del evento y se actualiza el estado utilizando la función setFormData */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    console.log("Datos del formulario:", formData);
    createReserva(formData);
    setFormData({
      ciudadDesde: "",
      ciudadHasta: "",
      fechaDesde: "",
      fechaHasta: "",
      horaDesde: "",
      horaHasta: "",
      idAuto: "",
      idCliente: "",
    });
    setMostrarExito(true);
  };
  
/*Idem que los otros componentes */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.ciudadDesde.trim() ||
      !formData.ciudadHasta.trim() ||
      !formData.fechaDesde ||
      !formData.fechaHasta ||
      !formData.horaDesde ||
      !formData.horaHasta ||
      !formData.idAuto ||
      !formData.idCliente
    ) {
      confirmAlert({
        title: "Error",
        message:
          "Todos los campos son obligatorios. Por favor, completa el formulario.",
        buttons: [
          {
            label: "OK",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    confirmAlert({
      title: "Confirmar",
      message: "¿Estás seguro de añadir esta reserva?",
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

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit}>
        <label>
          Ciudad Desde:
          <input
            type="text"
            name="ciudadDesde"
            value={formData.ciudadDesde}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Ciudad Hasta:
          <input
            type="text"
            name="ciudadHasta"
            value={formData.ciudadHasta}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Fecha Desde:
          <input
            type="date"
            name="fechaDesde"
            value={formData.fechaDesde}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Fecha Hasta:
          <input
            type="date"
            name="fechaHasta"
            value={formData.fechaHasta}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Horario Desde:
          <input
            type="time"
            name="horaDesde"
            value={formData.horaDesde}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Horario Hasta:
          <input
            type="time"
            name="horaHasta"
            value={formData.horaHasta}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Auto a Alquilar:
          <select name="idAuto" id="" onChange={handleInputChange}>
            {autos.map(auto => (
              <option value={auto.id_autos} key={auto.id_autos}>{auto.modelo}</option>
            ))}
          </select>
        </label>
        <label>
          Cliente:
          <select name="idCliente" id="" onChange={handleInputChange}>
            {clientes.map(cliente => (
              <option value={cliente.id_cliente} key={cliente.id_cliente}>{cliente.nombre}</option>
            ))}
          </select>
        </label>
        <button type="submit">Enviar</button>
      </form>
      {/* Confirmación de éxito */}
      {mostrarExito &&
        confirmAlert({
          title: "Éxito",
          message: "Reserva añadida con éxito",
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

export default AñadirReserva;


/* este componente React proporciona un formulario para añadir información de reservas, permite seleccionar 
autos y clientes existentes y utiliza funciones para manejar los cambios en el formulario, enviar solicitudes 
al servidor y actualizar el estado del formulario. Además, utiliza estilos CSS de acuerdo con la clase "app-container" 
definida en el archivo "addReservaStyle.css". */