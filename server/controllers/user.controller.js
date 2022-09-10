import { pool } from "../database/db.js";
import bcryptjs from "bcryptjs";

//Obtener todos los users
export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM user Where deleted = 0 ORDER BY created_at ASC"
    );

    res.json({ result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener un user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT * FROM user WHERE id = ${id} ORDER BY created_at ASC`
    );
    if (result.length === 0)
      return res.status(404).json({ Error: "Usuario no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Crear un User
export const addUser = async (req, res) => {
  try {
    const { name, email, password, url_img } = req.body;

    //Encriptar contraseña
    const salt = await bcryptjs.genSalt(10);
    let passwordEncrypted = await bcryptjs.hash(password, salt);

    const [result] = await pool.query(
      "INSERT INTO user(name, email, password, url_img) VALUES (?,?,?,?)",
      [name, email, passwordEncrypted, url_img]
    );
    console.log(result);
    res.json({ id: result.insertId, name, email, passwordEncrypted, url_img });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualizar un user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("UPDATE user SET ? WHERE id = ?", [
      req.body,
      id,
    ]);

    res.status(200).json({ ok: "Se ha Actualizado el usuario", id, result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina un user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "UPDATE user SET deleted = ? WHERE id = ?",
      [1, id]
    );

    console.log(res, "helou");
    if (result.affectedRows === 0) {
      res.status(404).json({ Error: "Usuario no encontrado" });
    }
    res.status(200).json({ ok: "Se ha eliminado el usuario", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//liberar un user
export const releaseUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE user SET deleted = ? WHERE id = ?",
      [0, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ Error: "Usuario no encontrado" });
    }
    res.status(200).json({ ok: "Se ha liberado el usuario", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
