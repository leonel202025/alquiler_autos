// Importa la conexión a la base de datos desde db.js
import { pool } from "../../db.js";

// Obtiene todas las reservas con información detallada de autos y clientes y las devuelve como respuesta JSON
export const getReservas = async (req, res) => {
  const [rows] = await pool.query("SELECT reservas.*, autos.id_autos, autos.modelo, clientes.id_cliente, clientes.nombre FROM reservas INNER JOIN autos ON reservas.id_auto = autos.id_autos INNER JOIN clientes ON reservas.id_cliente = clientes.id_cliente;");
  res.json(rows);
};

// Crea una nueva reserva utilizando los datos proporcionados en el cuerpo de la solicitud
export const postReservas = async (req, res) => {
  const {
    ciudadDesde,
    ciudadHasta,
    fechaDesde,
    fechaHasta,
    horaDesde,
    horaHasta,
    idAuto,
    idCliente
  } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO reservas (ciudad_desde, ciudad_hasta, fecha_desde, fecha_hasta, hora_desde, hora_hasta, id_auto, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
    [ciudadDesde, ciudadHasta, fechaDesde, fechaHasta, horaDesde, horaHasta, idAuto, idCliente]
  );
  res.json(rows);
};

// Actualiza una reserva existente con los datos proporcionados en el cuerpo de la solicitud
export const updateReserva = async (req, res) => {
  try {
    const idReserva = req.params.reservaId;
    const { ciudadDesde, ciudadHasta, fechaDesde, fechaHasta, horaDesde, horaHasta, idAuto, idCliente } = req.body;
    const [rows] = await pool.query(
    "UPDATE Reservas SET ciudad_desde = IFNULL(?, ciudad_desde), ciudad_hasta = IFNULL(?, ciudad_hasta), fecha_desde = IFNULL(?, fecha_desde), fecha_hasta= IFNULL(?, fecha_hasta), hora_desde= IFNULL(?, hora_desde), hora_hasta= IFNULL(?, hora_hasta), id_auto= IFNULL(?, id_auto), id_cliente= IFNULL(?, id_cliente) WHERE id_reserva = ?",
      [ciudadDesde, ciudadHasta, fechaDesde, fechaHasta, horaDesde, horaHasta, idAuto, idCliente, idReserva]
    );
    res.json({ message: "listo" });
  } catch (error) {
    // Maneja errores y devuelve un mensaje de error en caso de fallo
    return res
      .status(500)
      .json({ message: `something went wrong: ${error.message} ` });
  }
};

// Elimina una reserva de la base de datos utilizando el ID proporcionado en la solicitud
export const deleteReserva = async (req, res) => {
    try {
      const id = req.params.reservaId;
      const [rows] = await pool.query(
        "delete from Reservas where id_Reserva = ?",
        [id]
      );
      res.json({message: "listo"})
    } catch (error) {
      // Maneja errores y devuelve un mensaje de error en caso de fallo
      return res
        .status(500)
        .json({ message: `something went wrong: ${error.message} ` });
    }
  };
