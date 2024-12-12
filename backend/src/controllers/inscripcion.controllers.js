import { pool } from '../db.js'

// Obtener todas las inscripciones
export const getInscripciones = async (req, res) => {
    try {
        const [rows] = await pool.query(`
          SELECT 
            inscripcion.id, 
            inscripcion.fecha_inscripcion, 
            CONCAT(usuario.nombre, ' ', usuario.paterno, ' ', usuario.materno) AS estudiante
          FROM inscripcion
          JOIN usuario ON inscripcion.id_usuario = usuario.id
        `);
        res.json(rows);
      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        res.status(500).json({ message: "Error al obtener inscripciones" });
      }
}

// Obtener una inscripción por su id
export const getInscripcion = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM inscripcion WHERE id = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({ message: 'Inscripción no encontrada' })
    res.json(rows[0])
}

// Crear una nueva inscripción
export const createInscripcion = async (req, res) => {
    const { fecha_inscripcion, id_usuario } = req.body
    const [rows] = await pool.query(
        'INSERT INTO inscripcion (fecha_inscripcion, id_usuario) VALUES (?, ?)',
        [fecha_inscripcion, id_usuario]
    )
    res.send({ id: rows.insertId, fecha_inscripcion, id_usuario })
}

// Eliminar una inscripción
export const deleteInscripcion = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM inscripcion WHERE id = ?', [id])

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Inscripción no encontrada' })
    res.sendStatus(204)
}

// Actualizar una inscripción
export const updateInscripcion = async (req, res) => {
    const { id } = req.params
    const { fecha_inscripcion, id_usuario } = req.body
    const [result] = await pool.query(
        'UPDATE inscripcion SET fecha_inscripcion = ?, id_usuario = ? WHERE id = ?',
        [fecha_inscripcion, id_usuario, id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Inscripción no encontrada' })
    res.json('Inscripción actualizada correctamente')
}
