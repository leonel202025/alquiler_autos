// Importación de la clase Router de Express y de las funciones del controlador de reservas
import { Router } from "express";
import { deleteReserva, getReservas, postReservas, updateReserva } from "../controllers/reservas.controllers.js";

// Creación de una instancia del enrutador de Express
const router = Router();

// Configuración de las rutas y sus respectivas funciones del controlador
router.get("/reservas", getReservas);          // Ruta para obtener la lista de reservas
router.post("/reservas", postReservas);        // Ruta para agregar una nueva reserva
router.patch("/reservas/:reservaId", updateReserva);  // Ruta para actualizar información de una reserva existente
router.delete("/reservas/:reservaId", deleteReserva); // Ruta para eliminar una reserva existente

// Exportación del enrutador configurado
export default router;
