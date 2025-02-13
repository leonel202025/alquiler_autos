import axios from "axios";

export const createReserva = async (AñadirReserva) => {
  return await axios.post("http://localhost:3005/api/reservas", AñadirReserva);
}; //Igual a las anteriores pero con reserva

export const getReserva = async (setReservas) => {
  const response = await axios.get("http://localhost:3005/api/reservas");
  console.log(response.data);
  setReservas(response.data);
}; //Igual a las anteriores pero con reserva

export const deleteReserva = async (id) => {
  return await axios.delete(`http://localhost:3005/api/reservas/${id}`)
} //Igual a las anteriores pero con reserva

export const updateReserva = async (id, ModificarReserva) => {
  try{
    console.log("este es el id", JSON.stringify(ModificarReserva, null, 2))
    return await axios.patch(`http://localhost:3005/api/reservas/${id}`, ModificarReserva)
  }catch(error){
    console.log(error)
  }
  
}
/*Esta función realiza una solicitud HTTP PATCH para actualizar la información de una reserva específica.
 Toma dos parámetros: id (identificador de la reserva a actualizar) y 
 ModificarReserva (objeto que contiene la información actualizada de la reserva).
  La función utiliza axios.patch para enviar la solicitud al servidor en la URL correspondiente. 
  Además, incluye un bloque try-catch para manejar posibles errores y los imprime en la consola. */