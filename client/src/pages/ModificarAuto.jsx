// Importa los hooks de estado y efecto de React
import { useState, useEffect } from 'react';

// Importa el hook useLocation de react-router-dom para obtener la ubicación actual
import { useLocation } from 'react-router-dom';

// Importa la función de actualización de autos y la utilidad de confirmación de alerta
import { updateAuto } from '../api/flota.api.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Importa los estilos del componente
import "../styles/modificarAuto.css";

// Función principal del componente "ModificarAuto"
function ModificarAuto() {
  // Obtiene los datos iniciales del estado de ubicación
  const location = useLocation();
  const datosIniciales = location.state;

  // Utiliza el estado para gestionar los datos del auto
  const [datosAuto, setDatosAuto] = useState({
    modelo: datosIniciales.modelo || '',
    cantPersonas: datosIniciales.cant_personas || '',
    cantMaletas: datosIniciales.cant_maletas || '',
    color: datosIniciales.color || '',
  });

  // Maneja los cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosAuto({
      ...datosAuto,
      [name]: value,
    });
  };
  
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

  // Maneja la presentación del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos VACIOS
    const errores = {};
    if (!datosAuto.modelo.trim()) {
      errores.modelo = "El campo Modelo es obligatorio";
    }
    if (datosAuto.cantPersonas <= 0) {
      errores.cantPersonas = "La cantidad de pasajeros debe ser mayor a 0";
    }
    if (datosAuto.cantMaletas <= 0) {
      errores.cantMaletas = "La cantidad de maletas debe ser mayor a 0";
    }
    if (!datosAuto.color.trim()) {
      errores.color = "El campo color no puede estar vacio";
    }

    // Si hay errores, los establece en el estado y no procede
    if (Object.keys(errores).length > 0) {
      setErrores(errores);
      setMostrarExito(false);
      return;
    }

    // Muestra una alerta de confirmación antes de modificar el auto
    confirmAlert({
      title: 'Confirmar',
      message: '¿Estás seguro de modificar los datos de este auto?',
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

  // Maneja la confirmación final para modificar el auto
  const handleConfirm = () => {
    // Verifica si algún campo está vacío antes de modificar el auto
    if (!datosAuto.modelo.trim() || datosAuto.cantPersonas === "" || datosAuto.cantMaletas === ""|| datosAuto.color === "") {
      confirmAlert({
        title: 'Error',
        message: 'Todos los campos son obligatorios. Debes completarlos antes de añadir el auto.',
        buttons: [
          {
            label: 'OK',
            onClick: () => {},
          },
        ],
      });
      return;
    }

    // Llama a la función de actualización de auto y muestra un mensaje de éxito
    updateAuto(datosAuto);

    // Limpia los datos del auto, los errores y muestra el mensaje de éxito
    setDatosAuto({
      modelo: "",
      cantPersonas: "",
      cantMaletas: "",
      color: "",
    });
    setErrores({});
    setMostrarExito(true);
  };

  // Renderiza la interfaz del componente
  return (
    <div className='modAuto'>
      <h1>Modificar Auto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={datosAuto.modelo}
            onChange={handleChange}
          />
          {errores.modelo && <p className="error">{errores.modelo}</p>}
        </label>
        <label>
          Cantidad de Personas:
          <input
            type="number"
            name="cantPersonas"
            value={datosAuto.cantPersonas}
            onChange={handleChange}
          />
          {errores.cantPersonas && <p className="error">{errores.cantPersonas}</p>}
        </label>
        <label>
          Cantidad de Maletas:
          <input
            type="number"
            name="cantMaletas"
            value={datosAuto.cantMaletas}
            onChange={handleChange}
          />
          {errores.cantMaletas && <p className="error">{errores.cantMaletas}</p>}
        </label>
        <label>
          Color:
          <input
            type="texto"
            name="color"
            value={datosAuto.color}
            onChange={handleChange}
          />
          {errores.color && <p className="error">{errores.color}</p>}
        </label>
        <button type="submit">Modificar Auto</button>
      </form>
      
      {/* Confirmación de éxito */}
      {mostrarExito && (
        confirmAlert({
          title: 'Éxito',
          message: 'Datos del Auto modificados con éxito',
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                window.location.href = '/flota';
              },
            },
          ],
        })
      )}
    </div>
  );
}

// Exporta el componente "ModificarAuto" para su uso en otras partes de la aplicación
export default ModificarAuto;
