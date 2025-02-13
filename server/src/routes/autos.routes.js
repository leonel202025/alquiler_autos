//Este archivo define las rutas (endpoints) para las operaciones CRUD (Create, Read, Update, Delete) en relación con los autos
/*El archivo usa el enrutador de Express para definir estas rutas y asocia cada ruta con su respectivo controlador. */
import { Router } from "express";
import { deleteAuto, getAutos, postAuto, updateAuto } from "../controllers/auto.controllers.js";

const router = Router()
//Rutas CRUD para autos
router.get('/autos', getAutos) //obtiene todos los autos de la BD. Controller asociado getAutos
router.post("/autos", postAuto) //Crea un nuevo auto en la Bd. Controller asociado postAuto
router.patch("/autos/:autoId", updateAuto) //actualiza un auto existente en la BD.Controller asociado autoId
router.delete("/autos/:autoId", deleteAuto)// Elimina un auto existente en la BD. Controlador asociado autoId.

export default router

//middleware: es la conección entre la petición del usuario y la respuesta de la base de datos