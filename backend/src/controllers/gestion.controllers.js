// controllers/gestion.controllers.js
import { pool } from '../db.js'

// Obtener todas las gestiones
export const getGestiones = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM gestion')
    res.json(rows)
}

// Obtener una gestion por su id
export const getGestion = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM gestion WHERE id = ?', [id])
    if (rows.length <= 0) return res.status(404).json({ message: 'Gestión no encontrada' })
    res.json(rows[0])
}

// Crear una nueva gestion
export const createGestion = async (req, res) => {
    const { nombre } = req.body
    const [rows] = await pool.query('INSERT INTO gestion (nombre) VALUES (?)', [nombre])
    res.send({ id: rows.insertId, nombre })
}

// Eliminar una gestion
export const deleteGestion = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM gestion WHERE id = ?', [id])
    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Gestión no encontrada' })
    res.sendStatus(204)
}

// Actualizar una gestion
export const updateGestion = async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    const [result] = await pool.query('UPDATE gestion SET nombre = ? WHERE id = ?', [nombre, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Gestión no encontrada' })
    res.json('Gestión actualizada correctamente')
}
