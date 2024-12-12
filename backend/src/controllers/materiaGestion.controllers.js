// controllers/materiaGestion.controllers.js
import { pool } from '../db.js'

// Obtener todas las materias en gestión
export const getMateriasGestion = async (req, res) => {
    try {
        const [rows] = await pool.query(`
          SELECT 
            materia_gestion.id,
            materia.nombre AS materia,
            gestion.nombre AS gestion
          FROM 
            materia_gestion
          JOIN materia ON materia_gestion.id_materia = materia.id
          JOIN gestion ON materia_gestion.id_gestion = gestion.id
        `);
        res.json(rows);
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener materias por gestión' });
      }
}

// Obtener una materia en gestión por su id
export const getMateriaGestion = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM materia_gestion WHERE id = ?', [id])
    if (rows.length <= 0) return res.status(404).json({ message: 'Materia en gestión no encontrada' })
    res.json(rows[0])
}

// Crear una nueva materia en gestión
export const createMateriaGestion = async (req, res) => {
    const { bimestre, id_materia, id_gestion } = req.body
    const [rows] = await pool.query('INSERT INTO materia_gestion (bimestre, id_materia, id_gestion) VALUES (?, ?, ?)', 
    [bimestre, id_materia, id_gestion])
    res.send({ id: rows.insertId, bimestre, id_materia, id_gestion })
}

// Eliminar una materia en gestión
export const deleteMateriaGestion = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM materia_gestion WHERE id = ?', [id])
    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Materia en gestión no encontrada' })
    res.sendStatus(204)
}

// Actualizar una materia en gestión
export const updateMateriaGestion = async (req, res) => {
    const { id } = req.params
    const { bimestre, id_materia, id_gestion } = req.body
    const [result] = await pool.query('UPDATE materia_gestion SET bimestre = ?, id_materia = ?, id_gestion = ? WHERE id = ?', 
    [bimestre, id_materia, id_gestion, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Materia en gestión no encontrada' })
    res.json('Materia en gestión actualizada correctamente')
}
