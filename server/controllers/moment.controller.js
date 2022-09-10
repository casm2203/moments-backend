import { pool } from "../database/db.js";

//Obtener todos los moments
export const getMoments = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM moment ORDER BY created_at ASC"
    );

    res.json({ result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener un moment
export const getMoment = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT * FROM moment WHERE id = ${id} ORDER BY created_at ASC`
    );
    if (result.length === 0)
      return res.status(404).json({ Error: "Moment no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Crear un moment
export const addMoment = async (req, res) => {
  try {
    const { title, body, url_img } = req.body;
    const [result] = await pool.query(
      "INSERT INTO moment(title, body, url_img) VALUES (?,?,?)",
      [title, body, url_img]
    );
    console.log(result);
    res.json({ id: result.insertId, title, body, url_img, likes, created_at });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualizar un moment
export const updateMoment = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("UPDATE moment SET ? WHERE id = ?", [
      req.body,
      id,
    ]);

    res.status(200).json({ ok: "Se ha Actualizado el Moment", id, result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina un moment
export const deleteMoment = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE moment SET deleted = ? WHERE id = ?",
      [1, id]
    );

    if (result.affectedRows === 0)
      res.status(404).json({ Error: "Moment no encontrada" });
    res.status(200).json({ ok: "Se ha eliminado el Moment", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//liberar un moment
export const releaseMoment = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "UPDATE moment SET deleted = ? WHERE id = ?",
      [0, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ Error: "Moment no encontrada" });
    }
    res.status(200).json({ ok: "Se ha liberado el Moment", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
