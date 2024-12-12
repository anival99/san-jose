import { pool } from '../db.js'

// Obtener todos los estudiantes
export const getEstudiantes = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM estudiante')
    res.json(rows)
}

// Obtener un estudiante por su id
export const getEstudiante = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM estudiante WHERE id = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({ message: 'Estudiante no encontrado' })
    res.json(rows[0])
}

// Crear un nuevo estudiante
export const createEstudiante = async (req, res) => {
    const { nombre, paterno, materno, fecha_nacimiento, direccion } = req.body
    const [rows] = await pool.query(
        'INSERT INTO estudiante (nombre, paterno, materno, fecha_nacimiento, direccion) VALUES (?, ?, ?, ?, ?)',
        [nombre, paterno, materno, fecha_nacimiento, direccion]
    )
    res.send({ id: rows.insertId, nombre, paterno, materno, fecha_nacimiento, direccion })
}

// Eliminar un estudiante
export const deleteEstudiante = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM estudiante WHERE id = ?', [id])

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Estudiante no encontrado' })
    res.sendStatus(204)
}

// Actualizar un estudiante
export const updateEstudiante = async (req, res) => {
    const { id } = req.params
    const { nombre, paterno, materno, fecha_nacimiento, direccion } = req.body
    const [result] = await pool.query(
        'UPDATE estudiante SET nombre = ?, paterno = ?, materno = ?, fecha_nacimiento = ?, direccion = ? WHERE id = ?',
        [nombre, paterno, materno, fecha_nacimiento, direccion, id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Estudiante no encontrado' })
    res.json('Estudiante actualizado correctamente')
}
