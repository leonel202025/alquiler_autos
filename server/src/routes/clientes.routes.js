// Importación de la clase Router de Express y de las funciones del controlador de clientes
import { Router } from "express";
import { deleteCliente, getClientes, postCliente, updateCliente } from "../controllers/cliente.controllers.js";

// Creación de una instancia del enrutador de Express
const router = Router();

// Configuración de las rutas y sus respectivas funciones del controlador
router.get('/clientes', getClientes);         // Ruta para obtener la lista de clientes
router.post("/clientes", postCliente);        // Ruta para agregar un nuevo cliente
router.patch("/clientes/:clienteId", updateCliente); // Ruta para actualizar información de un cliente existente
router.delete("/clientes/:clienteId", deleteCliente); // Ruta para eliminar un cliente existente

// Exportación del enrutador configurado
export default router;
