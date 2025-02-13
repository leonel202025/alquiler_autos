// Importa los hooks de estado y efecto de React
import { useState, useEffect } from 'react';

// Importa el hook useLocation de react-router-dom para obtener la ubicación actual
import { useLocation } from 'react-router-dom';

// Importa la función de actualización de cliente y la utilidad de confirmación de alerta
import { updateCliente } from '../api/cliente.api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Importa los estilos del componente
import "../styles/modificarCliente.css";

// Función principal del componente "ModificarCliente"
function ModificarCliente() {
  // Obtiene los datos iniciales del estado de ubicación
  const location = useLocation();
  const datosIniciales = location.state;

  // Utiliza el estado para gestionar los datos del cliente
  const [datosCliente, setDatosCliente] = useState({
    Nombre: datosIniciales.nombre || '',
    Apellido: datosIniciales.apellido || '',
    Correo: datosIniciales.correo || '',
    Telefono: datosIniciales.telefono || '',
    Domicilio: datosIniciales.domicilio || '',
  });

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
    setDatosCliente({
      ...datosCliente,
      [name]: value,
    });
  };

  // Maneja la presentación del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    const errores = {};
    if (!datosCliente.Nombre.trim()) {
      errores.Nombre = "El campo Nombre es obligatorio";
    }
    if (!datosCliente.Apellido.trim()) {
      errores.Apellido = "El campo Apellido es obligatorio";
    }
    if (!datosCliente.Telefono.trim()) {
      errores.Telefono = "El campo Telefono es obligatorio";
    }
    if (!datosCliente.Correo.trim()) {
      errores.Correo = "El campo Correo es obligatorio";
    }
    if (!datosCliente.Domicilio.trim()) {
      errores.Domicilio = "El campo Domicilio es obligatorio";
    }

    // Si hay errores, los establece en el estado y no procede
    if (Object.keys(errores).length > 0) {
      setErrores(errores);
      setMostrarExito(false);
      return;
    }

    // Muestra una alerta de confirmación antes de modificar el cliente
    confirmAlert({
      title: 'Confirmar',
      message: '¿Estás seguro de modificar este cliente?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => handleConfirm(),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  // Maneja la confirmación final para modificar el cliente
  const handleConfirm = () => {
    console.log('Datos del cliente modificado:', datosCliente);
    updateCliente(datosIniciales.id_cliente, datosCliente);
    // Limpia los datos del cliente, los errores y muestra el mensaje de éxito
    setDatosCliente({
      Nombre: "",
      Apellido: "", 
      Correo: "", 
      Telefono: "",
      Domicilio: "",
    });
    setErrores({});
    setMostrarExito(true);
  };

  // Renderiza la interfaz del componente
  return (
    <div className='modCliente'>
      <h1>Modificar Cliente</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="Nombre"
            value={datosCliente.Nombre}
            onChange={handleChange}
          />
          {errores.Nombre && <p className="error">{errores.Nombre}</p>}
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="Apellido"
            value={datosCliente.Apellido}
            onChange={handleChange}
          />
          {errores.Apellido && <p className="error">{errores.Apellido}</p>}
        </label>
        <label>
          Telefono:
          <input
            type="number"
            name="Telefono"
            value={datosCliente.Telefono}
            onChange={handleChange}
          />
          {errores.Telefono && <p className="error">{errores.Telefono}</p>}
        </label>
        <label>
          Correo:
          <input
            type="email"
            name="Correo"
            value={datosCliente.Correo}
            onChange={handleChange}
          />
          {errores.Correo && <p className="error">{errores.Correo}</p>}
        </label>
        <label>
          Domicilio:
          <input
            type="text"
            name="Domicilio"
            value={datosCliente.Domicilio}
            onChange={handleChange}
          />
          {errores.Domicilio && <p className="error">{errores.Domicilio}</p>}
        </label>

        <button type="submit">Modificar Cliente</button>
      </form>
      
      {/* Confirmación de éxito */}
      {mostrarExito && (
        confirmAlert({
          title: 'Éxito',
          message: 'Datos del Cliente modificados con éxito',
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                window.location.href = '/clientes';
              },
            },
          ],
        })
      )}
    </div>
  );
}

// Exporta el componente "ModificarCliente" para su uso en otras partes de la aplicación
export default ModificarCliente;
