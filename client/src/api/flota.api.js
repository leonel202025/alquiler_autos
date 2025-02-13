import axios from "axios";

export const createAuto = async (AñadirAuto) => {
  try {
    const response = await axios.post("http://localhost:3005/api/autos", AñadirAuto);
    return response
  } catch (error) {
    console.log(error)
  }
  
};
/* Esta función realiza una solicitud HTTP POST para crear un nuevo auto. Toma un parámetro AñadirAuto,
 que probablemente sea un objeto que contiene la información del auto a agregar. La función utiliza axios.post para enviar la información 
 al servidor en la URL "http://localhost:3005/api/autos". */

export const getAutos = async (setAutos) => {
  const response = await axios.get("http://localhost:3005/api/autos");
  console.log(response.data);
  setAutos(response.data);
};
/*  Esta función realiza una solicitud HTTP GET para obtener la lista de autos. 
Toma un parámetro setAutos, que probablemente es una función para actualizar el estado de los autos en la aplicación. 
Después de recibir la respuesta del servidor, imprime los datos en la consola y actualiza el estado de
 los autos mediante la función proporcionada.*/

export const deleteAuto = async (id) => {
  return await axios.delete(`http://localhost:3005/api/autos/${id}`);
};/* realiza una solicitud HTTP DELETE para eliminar un auto específico.
 Toma un parámetro id, que probablemente sea el identificador del auto que se va a eliminar.
 La función utiliza axios.delete para enviar la solicitud al servidor en la URL correspondiente.*/

export const updateAuto = async (id, ModificarAuto) => {
  return await axios.patch(`http://localhost:3005/api/autos/${id}`, ModificarAuto);
}
/*  realiza una solicitud HTTP PATCH para actualizar la información de un auto específico. 
Toma dos parámetros: id (identificador del auto a actualizar) y 
ModificarAuto (objeto que contiene la información actualizada del auto).
 La función utiliza axios.patch para enviar la solicitud al servidor en la URL correspondiente.*/

/*estas funciones están diseñadas para interactuar con una API que gestiona información sobre autos,
 permitiendo la creación, lectura, actualización y eliminación de registros. */