// Importa la conexión a la base de datos desde db.js
import { pool } from "../../db.js";

// Obtiene todos los clientes de la base de datos y los devuelve como respuesta JSON
export const getClientes = async (req, res) => {
  const [rows] = await pool.query("select * from clientes");
  res.json(rows);
};

// Crea un nuevo cliente utilizando los datos proporcionados en el cuerpo de la solicitud
export const postCliente = async (req, res) => {
  const { Nombre, Apellido, Correo, Telefono, Domicilio } = req.body;
  const [existingEmail] = await pool.query(
    "SELECT * FROM Clientes WHERE correo = ?",
    [Correo]
  );

  if (existingEmail.length > 0) {
    return res.json({ error: "El correo electrónico ya esta en uso" });
  }
  const [rows] = await pool.query(
    "INSERT INTO Clientes (nombre, apellido, correo, telefono, domicilio) VALUES (?, ?, ?, ?, ?)",
    [Nombre, Apellido, Correo, Telefono, Domicilio]
  );
  res.json(rows);
};

// Actualiza un cliente existente con los datos proporcionados en el cuerpo de la solicitud
export const updateCliente = async (req, res) => {
  try {
    const idCliente = req.params.clienteId;
    const { Nombre, Apellido, Correo, Telefono, Domicilio } = req.body;
    const [rows] = await pool.query(
      "UPDATE Clientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), correo = IFNULL(?, correo), telefono= IFNULL(?, telefono), domicilio= IFNULL(?, domicilio) WHERE id_cliente = ?",
      [Nombre, Apellido, Correo, Telefono, Domicilio, idCliente]
    );
    res.json({ message: "listo" });
  } catch (error) {
    // Maneja errores y devuelve un mensaje de error en caso de fallo
    return res
      .status(500)
      .json({ message: `something went wrong: ${error.message} ` });
  }
};

// Elimina un cliente de la base de datos utilizando el ID proporcionado en la solicitud
export const deleteCliente = async (req, res) => {
  try {
    const id = req.params.clienteId;
    const [rows] = await pool.query(
      "delete from Clientes where id_cliente = ?",
      [id]
    );
    res.json({ message: "listo" });
  } catch (error) {
    // Maneja errores y devuelve un mensaje de error en caso de fallo
    return res
      .status(500)
      .json({ message: `something went wrong: ${error.message} ` });
  }
};
