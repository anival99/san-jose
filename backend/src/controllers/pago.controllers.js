// controllers/pago.controllers.js
import { pool } from '../db.js'

// Obtener todos los pagos
export const getPagos = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM pago')
    res.json(rows)
}

// Obtener un pago por su id
export const getPago = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM pago WHERE id = ?', [id])
    if (rows.length <= 0) return res.status(404).json({ message: 'Pago no encontrado' })
    res.json(rows[0])
}

// Crear un nuevo pago
export const createPago = async (req, res) => {
    const { monto, fecha_pago, metodo_pago, id_estudiante } = req.body
    const [rows] = await pool.query('INSERT INTO pago (monto, fecha_pago, metodo_pago, id_estudiante) VALUES (?, ?, ?, ?)', 
    [monto, fecha_pago, metodo_pago, id_estudiante])
    res.send({ id: rows.insertId, monto, fecha_pago, metodo_pago, id_estudiante })
}

// Eliminar un pago
export const deletePago = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM pago WHERE id = ?', [id])
    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Pago no encontrado' })
    res.sendStatus(204)
}

// Actualizar un pago
export const updatePago = async (req, res) => {
    const { id } = req.params
    const { monto, fecha_pago, metodo_pago, id_estudiante } = req.body
    const [result] = await pool.query('UPDATE pago SET monto = ?, fecha_pago = ?, metodo_pago = ?, id_estudiante = ? WHERE id = ?', 
    [monto, fecha_pago, metodo_pago, id_estudiante, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Pago no encontrado' })
    res.json('Pago actualizado correctamente')
}
