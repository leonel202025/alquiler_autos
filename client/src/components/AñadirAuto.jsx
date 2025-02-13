// Importa React y funciones necesarias
import { useState } from "react";
import "../styles/AddAutoStyle.css";
import { createAuto } from "../api/flota.api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Componente funcional para añadir un auto
const AñadirAuto = () => {
  // Estado para el formulario y confirmación de éxito
  const [formAuto, setFormAuto] = useState({
    modelo: "",
    cantPersonas: "",
    cantMaletas: "",
    color: "",
  });
  const [mostrarExito, setMostrarExito] = useState(false);

  // Maneja cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormAuto((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Maneja la confirmación y envío del formulario
  const handleConfirm = async() => {
    const response = await createAuto(formAuto)
    if (response.data.error){
      confirmAlert({
        title: "Error",
        message: "Ya existe un auto con el mismo dato",
        buttons: [
          {
            label: "OK",
            onClick: () => {},
          },
        ],
      });
      return;
    }
    setFormAuto({
      modelo: "",
      cantPersonas: "",
      cantMaletas: "",
      color: "",
    });
    setMostrarExito(true);
  };

  // Maneja la validación y confirmación antes de enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formAuto.modelo.trim() ||
      formAuto.cantPersonas <= 0 ||
      formAuto.cantMaletas <= 0 ||
      !formAuto.color.trim() 
      ) {
      confirmAlert({
        title: "Error",
        message: "Todos los campos son obligatorios. Por favor, completa el formulario.",
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
      message: "¿Estás seguro de añadir este auto?",
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

  // Renderiza el formulario y la confirmación de éxito
  return (
    <div className="form-auto">
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formAuto.modelo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Pasajeros:
          <input
            type="number"
            name="cantPersonas"
            value={formAuto.cantPersonas}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Maletas:
          <input
            type="number"
            name="cantMaletas"
            value={formAuto.cantMaletas}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={formAuto.color}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {/* Confirmación de éxito */}
      {mostrarExito &&
        confirmAlert({
          title: "Éxito",
          message: "Auto añadido con éxito",
          buttons: [
            {
              label: "OK",
              onClick: () => {
                setMostrarExito(false);
                window.location.href = "/flota";
              },
            },
          ],
        })}
    </div>
  );
};

// Exporta el componente para su uso
export default AñadirAuto;
