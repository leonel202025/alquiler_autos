import axios from "axios"; /*   */

export const createCliente = async (AñadirCliente) => {
  try {
    const response = await axios.post("http://localhost:3005/api/clientes", AñadirCliente);
      return response
  } catch (error) {
    console.log(error)
  }
  
}; 
/* Esta función realiza una solicitud HTTP POST para crear un nuevo cliente. Toma un parámetro AñadirCliente,
 que probablemente es un objeto que contiene la información del cliente a agregar.
 La función utiliza axios.post para enviar la información al servidor en la URL "http://localhost:3005/api/clientes". */

 export const getClientes = async (setClientes) => {
  const response = await axios.get("http://localhost:3005/api/clientes");
  console.log(response.data);
  setClientes(response.data);
};
/* Esta función realiza una solicitud HTTP GET para obtener la lista de clientes. Toma un parámetro setClientes,
 que probablemente es una función para actualizar el estado de los clientes en la aplicación. 
Después de recibir la respuesta del servidor, imprime los datos en la consola y actualiza el estado de los clientes mediante la función proporcionada.*/


export const deleteCliente = async (id) => {
  return await axios.delete(`http://localhost:3005/api/clientes/${id}`)
}
/*  Esta función realiza una solicitud HTTP DELETE para eliminar un cliente específico. 
Toma un parámetro id, que probablemente sea el identificador del cliente que se va a eliminar. 
La función utiliza axios.delete para enviar la solicitud al servidor en la URL correspondiente*/

export const updateCliente = async (id, ModificarCliente) => {
  return await axios.patch(`http://localhost:3005/api/clientes/${id}`, ModificarCliente);
}
/*  Esta función realiza una solicitud HTTP PATCH para actualizar la información de un cliente específico.
 Toma dos parámetros: id (identificador del cliente a actualizar) y ModificarCliente 
(objeto que contiene la información actualizada del cliente). La función utiliza axios.patch para enviar la solicitud al servidor en la URL correspondiente.*/

/*estas funciones están diseñadas para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una API que gestiona información sobre clientes.*/