// controllers/curso.controllers.js
import { pool } from '../db.js'

// Obtener todos los cursos
export const getCursos = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM curso')
    res.json(rows)
}

// Obtener un curso por su id
export const getCurso = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM curso WHERE id = ?', [id])
    if (rows.length <= 0) return res.status(404).json({ message: 'Curso no encontrado' })
    res.json(rows[0])
}

// Crear un nuevo curso
export const createCurso = async (req, res) => {
    const { nombre, descripcion } = req.body
    const [rows] = await pool.query('INSERT INTO curso (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion])
    res.send({ id: rows.insertId, nombre, descripcion })
}

// Eliminar un curso
export const deleteCurso = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM curso WHERE id = ?', [id])
    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Curso no encontrado' })
    res.sendStatus(204)
}

// Actualizar un curso
export const updateCurso = async (req, res) => {
    const { id } = req.params
    const { nombre, descripcion } = req.body
    const [result] = await pool.query('UPDATE curso SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Curso no encontrado' })
    res.json('Curso actualizado correctamente')
}
