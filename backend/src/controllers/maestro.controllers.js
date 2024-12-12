// controllers/maestro.controllers.js
import { pool } from '../db.js'

// Obtener todos los maestros
export const getMaestros = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM maestro')
    res.json(rows)
}

// Obtener un maestro por su id
export const getMaestro = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM maestro WHERE id = ?', [id])
    if (rows.length <= 0) return res.status(404).json({ message: 'Maestro no encontrado' })
    res.json(rows[0])
}

// Crear un nuevo maestro
export const createMaestro = async (req, res) => {
    const { nombre, paterno, materno, telefono } = req.body
    const [rows] = await pool.query('INSERT INTO maestro (nombre, paterno, materno, telefono) VALUES (?, ?, ?, ?)', 
    [nombre, paterno, materno, telefono])
    res.send({ id: rows.insertId, nombre, paterno, materno, telefono })
}

// Eliminar un maestro
export const deleteMaestro = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM maestro WHERE id = ?', [id])
    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Maestro no encontrado' })
    res.sendStatus(204)
}

// Actualizar un maestro
export const updateMaestro = async (req, res) => {
    const { id } = req.params
    const { nombre, paterno, materno, telefono } = req.body
    const [result] = await pool.query('UPDATE maestro SET nombre = ?, paterno = ?, materno = ?, telefono = ? WHERE id = ?', 
    [nombre, paterno, materno, telefono, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Maestro no encontrado' })
    res.json('Maestro actualizado correctamente')
}
