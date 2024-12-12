// controllers/materia.controllers.js
import { pool } from '../db.js'

// Obtener todas las materias
export const getMaterias = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM materia')
    res.json(rows)
}

// Obtener una materia por su id
export const getMateria = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM materia WHERE id = ?', [id])
    if (rows.length <= 0) return res.status(404).json({ message: 'Materia no encontrada' })
    res.json(rows[0])
}

// Crear una nueva materia
export const createMateria = async (req, res) => {
    const { nombre } = req.body
    const [rows] = await pool.query('INSERT INTO materia (nombre) VALUES (?)', [nombre])
    res.send({ id: rows.insertId, nombre })
}

// Eliminar una materia
export const deleteMateria = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM materia WHERE id = ?', [id])
    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Materia no encontrada' })
    res.sendStatus(204)
}

// Actualizar una materia
export const updateMateria = async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    const [result] = await pool.query('UPDATE materia SET nombre = ? WHERE id = ?', [nombre, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Materia no encontrada' })
    res.json('Materia actualizada correctamente')
}
