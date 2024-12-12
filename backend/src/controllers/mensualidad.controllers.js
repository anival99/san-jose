// controllers/mensualidad.controllers.js
import { pool } from '../db.js'

// Obtener todas las mensualidades
export const getMensualidades = async (req, res) => {
    try {
        const [rows] = await pool.query(`
          SELECT 
            mensualidad.id,
            mensualidad.fecha,
            mensualidad.precio,
            gestion.nombre AS gestion
          FROM 
            mensualidad
          JOIN gestion ON mensualidad.id_gestion = gestion.id
        `);
        res.json(rows);
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener mensualidades' });
      }
}

// Obtener una mensualidad por su id
export const getMensualidad = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM mensualidad WHERE id = ?', [id])
    if (rows.length <= 0) return res.status(404).json({ message: 'Mensualidad no encontrada' })
    res.json(rows[0])
}

// Crear una nueva mensualidad
export const createMensualidad = async (req, res) => {
    const { fecha, precio, id_gestion } = req.body
    const [rows] = await pool.query('INSERT INTO mensualidad (fecha, precio, id_gestion) VALUES (?, ?, ?)', [fecha, precio, id_gestion])
    res.send({ id: rows.insertId, fecha, precio, id_gestion })
}

// Eliminar una mensualidad
export const deleteMensualidad = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM mensualidad WHERE id = ?', [id])
    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Mensualidad no encontrada' })
    res.sendStatus(204)
}

// Actualizar una mensualidad
export const updateMensualidad = async (req, res) => {
    const { id } = req.params
    const { fecha, precio, id_gestion } = req.body
    const [result] = await pool.query('UPDATE mensualidad SET fecha = ?, precio = ?, id_gestion = ? WHERE id = ?', 
    [fecha, precio, id_gestion, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Mensualidad no encontrada' })
    res.json('Mensualidad actualizada correctamente')
}
