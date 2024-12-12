import { pool } from '../db.js';

// Obtener todas las cobranzas
export const getCobranzas = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM cobranza');
    res.json(rows);
};

// Obtener una cobranza por su id
export const getCobranza = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM cobranza WHERE id = ?', [id]);

    if (rows.length <= 0) return res.status(404).json({ message: 'Cobranza no encontrada' });

    res.json(rows[0]);
};

// Crear una nueva cobranza
export const createCobranza = async (req, res) => {
    const { total, fecha, descripcion } = req.body;
    const [rows] = await pool.query('INSERT INTO cobranza (total, fecha, descripcion) VALUES (?, ?, ?)', [total, fecha, descripcion]);

    res.send({ id: rows.insertId, total, fecha, descripcion });
};

// Eliminar una cobranza
export const deleteCobranza = async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM cobranza WHERE id = ?', [id]);

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Cobranza no encontrada' });

    res.sendStatus(204);
};

// Actualizar una cobranza
export const updateCobranza = async (req, res) => {
    const { id } = req.params;
    const { total, fecha, descripcion } = req.body;

    const [result] = await pool.query('UPDATE cobranza SET total = ?, fecha = ?, descripcion = ? WHERE id = ?', [total, fecha, descripcion, id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Cobranza no encontrada' });

    res.json('Cobranza actualizada correctamente');
};
