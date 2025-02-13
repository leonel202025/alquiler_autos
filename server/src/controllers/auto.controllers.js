/*Este código define controladores para manipular operaciones CRUD (Create, Read, Update, Delete) en una base de datos de autos. */
import { pool } from "../../db.js";

/*Metodo GET.(Obtiene todos los autos de la base de datos).
Ejecuta una consulta SQL para seleccionar todos los registros de la tabla autos.
Responde con los resultados en formato JSON. */
export const getAutos = async (req, res) => {
  const [rows] = await pool.query("select * from autos");
  res.json(rows);
};

/*Metodo POST: Crea un nuevo auto en la base de datos.
Extrae los datos del cuerpo de la solicitud (modelo, cantPersonas, cantMaletas).
Ejecuta una consulta SQL de inserción para agregar un nuevo registro a la tabla autos.
Responde con la respuesta de la base de datos en formato JSON. */
export const postAuto = async (req, res) => {
  const { modelo, cantPersonas, cantMaletas, color } = req.body;
  const [nombreRepetido]= await pool.query (
    "SELECT * FROM Autos WHERE modelo = ?",
    [modelo]
  );
  const [colorRepetido]= await pool.query(
    "SELECT * FROM Autos WHERE color=?",
    [color]
  )
  if (nombreRepetido.length > 0){
    return res.json({ error: "El nombre de este auto ya esta en uso" });
  }
  if (colorRepetido.length > 0){
    return res.json({error:"El color ingresado ya se encuentra registrado."})
  }
  const [rows] = await pool.query(
    "INSERT INTO Autos (modelo, cant_personas, cant_maletas, color) VALUES (?,?,?,?)",
    [modelo, cantPersonas, cantMaletas, color]
  );
  res.json(rows);
};
/*Método: PATCH
Actualiza un auto existente en la base de datos.
Extrae los datos del cuerpo de la solicitud (modelo, cantPersonas, cantMaletas, disponible).
Utiliza una consulta SQL de actualización para modificar el registro en la tabla autos con el ID correspondiente.
Responde con un mensaje JSON indicando que la operación se realizó correctamente. */
export const updateAuto = async (req, res) => {
  try {
    const id = req.params.autoId;
    const { modelo, cantPersonas, cantMaletas, disponible, color } = req.body;
    const [rows] = await pool.query(
      "UPDATE autos SET modelo = IFNULL(?, modelo), cant_personas = IFNULL(?, cant_personas), cant_maletas = IFNULL(?, cant_maletas), disponible= IFNULL(?, disponible), color= IFNULL(?, color) WHERE id_autos = ?",
      [modelo, cantPersonas, cantMaletas, disponible, color, id]
    );
    res.json({message: "listo"})
  } catch (error) {
    return res
      .status(500)
      .json({ message: `something went wrong: ${error.message} ` });
  }
};

/*DELETE
 Elimina un auto existente en la base de datos.
Utiliza una consulta SQL de eliminación para borrar el registro de la tabla autos con el ID correspondiente.
Responde con un mensaje JSON indicando que la operación se realizó correctamente. */
export const deleteAuto = async (req, res) => {
    try {
      const id = req.params.autoId;
      const [rows] = await pool.query(
        "delete from autos where id_autos = ?",
        [id]
      );
      res.json({message: "listo"})
    } catch (error) {
      return res
        .status(500)
        .json({ message: `something went wrong: ${error.message} ` });
    }
  };

  /*Estos controladores están destinados a ser utilizados en conjunto con un servidor de Node.js y
   una base de datos SQL (posiblemente MySQL). Asegúrate de que la conexión a la base de datos (pool)
   esté configurada correctamente en el archivo db.js. Además, ten en cuenta que estos controladores asumen 
   ciertos campos y estructuras en tu base de datos, 
  por lo que debes ajustarlos según tus necesidades específicas. */