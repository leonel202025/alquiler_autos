import { useState } from "react";
import "../styles/addClienteStyle.css";
import { createCliente } from "../api/cliente.api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

/*Se utiliza el hook useState para crear un estado local llamado formCliente. Este estado almacena la información del formulario,
 que incluye el nombre, apellido, correo, teléfono y domicilio del cliente. La función setFormCliente se utiliza para actualizar
  el estado cuando se realizan cambios en los campos del formulario. */
const AñadirCliente = () => {
  const [formCliente, setFormCliente] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Telefono: "",
    Domicilio: "",
  });

  const [mostrarExito, setMostrarExito] = useState(false);

  /*La función handleInputChange se utiliza para manejar los cambios en los campos del formulario. 
  Se extraen el nombre y el valor del evento y se actualiza el estado utilizando la función setFormCliente. */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormCliente((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
    
    const handleConfirm = async() => {
      const response = await createCliente(formCliente);
      if (response.data.error){
        confirmAlert({
          title: "Error",
          message: "Ya existe un cliente con el mismo Email",
          buttons: [
            {
              label: "OK",
              onClick: () => {},
            },
          ],
        });
        return;
      }
      setFormCliente({
        Nombre: "",
        Apellido: "",
        Correo: "",
        Telefono: "",
        Domicilio: "",
      });
      setMostrarExito(true)
    };

    /* 1- Maneja el evento submit del formulario. Previene el comportamiento por defecto del navegadorutilizando e.preventDefault() 
   y llama a la funcion createAuto del api.
   2- Imprime en la consola los datos del formulario y llama a la función createClient (presumiblemente importada desde cliente.api.js)
    para enviar la solicitud de creación del auto al servidor.
    3-Después de enviar la solicitud, reinicia el estado del formulario para limpiar los campos del formulario.*/ 
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validaciones para campos vacíos
      if (!formCliente.Nombre.trim() || !formCliente.Apellido.trim() || !formCliente.Correo.trim() || !formCliente.Telefono.trim() || !formCliente.Domicilio.trim()) {
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
        message: "¿Estás seguro de añadir este cliente?",
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
    <div className="form-cliente">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="Nombre"
            value={formCliente.Nombre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="Apellido"
            value={formCliente.Apellido}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            name="Correo"
            value={formCliente.Correo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Teléfono:
          <input
            type="number"
            name="Telefono"
            value={formCliente.Telefono}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Domicilio:
          <input
            type="text"
            name="Domicilio"
            value={formCliente.Domicilio}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {/* Confirmación de éxito */}
      {mostrarExito &&
        confirmAlert({
          title: "Éxito",
          message: "Cliente añadido con éxito",
          buttons: [
            {
              label: "OK",
              onClick: () => {
                setMostrarExito(false);
                window.location.href = "/clientes";
              },
            },
          ],
        })}
    </div>
  );
};

export default AñadirCliente;

 /*este componente React proporciona un formulario para añadir información de clientes y 
 utiliza funciones para manejar los cambios en el formulario, enviar solicitudes al servidor y actualizar el estado del formulario.}
 Además, utiliza estilos CSS de acuerdo con la clase "form-cliente" definida en el archivo "addClienteStyle.css". */