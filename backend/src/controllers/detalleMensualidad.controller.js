import { pool } from '../db.js'

// Obtener todos los detalles de mensualidad
export const getDetalleMensualidad = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM detalle_mensualidad')
    res.json(rows)
}

// Obtener un detalle de mensualidad por id
export const getDetalleMensualidadById = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM detalle_mensualidad WHERE idDetalleMensualidad = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'Detalle de mensualidad no encontrado'
    })

    res.json(rows[0])
}

// Crear un nuevo detalle de mensualidad
export const createDetalleMensualidad = async (req, res) => {
    const { cantidad, id_mora } = req.body
    const [rows] = await pool.query('INSERT INTO detalle_mensualidad (cantidad, id_mora) VALUES (?, ?)', 
    [cantidad, id_mora])
    
    res.send({
        idDetalleMensualidad: rows.insertId,
        cantidad,
        id_mora
    })
}

// Eliminar un detalle de mensualidad
export const deleteDetalleMensualidad = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM detalle_mensualidad WHERE idDetalleMensualidad = ?', [id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Detalle de mensualidad no encontrado'
    })

    res.sendStatus(204)
}

// Actualizar un detalle de mensualidad
export const updateDetalleMensualidad = async (req, res) => {
    const { id } = req.params
    const { cantidad, id_mora } = req.body

    const [result] = await pool.query('UPDATE detalle_mensualidad SET cantidad = ?, id_mora = ? WHERE idDetalleMensualidad = ?', 
    [cantidad, id_mora, id])

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Detalle de mensualidad no encontrado'
    })

    res.json('Detalle de mensualidad actualizado correctamente')
}
