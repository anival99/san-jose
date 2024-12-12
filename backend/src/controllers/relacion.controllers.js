import { pool } from '../db.js';

// Obtener todas las relaciones
export const getRelaciones = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM relacion');
    res.json(rows);
};

// Obtener una relación por su id
export const getRelacion = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM relacion WHERE id = ?', [id]);

    if (rows.length <= 0) return res.status(404).json({ message: 'Relación no encontrada' });

    res.json(rows[0]);
};

// Crear una nueva relación
export const createRelacion = async (req, res) => {
    const { tipo } = req.body;
    const [rows] = await pool.query('INSERT INTO relacion (tipo) VALUES (?)', [tipo]);

    res.send({ id: rows.insertId, tipo });
};

// Eliminar una relación
export const deleteRelacion = async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM relacion WHERE id = ?', [id]);

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Relación no encontrada' });

    res.sendStatus(204);
};

// Actualizar una relación
export const updateRelacion = async (req, res) => {
    const { id } = req.params;
    const { tipo } = req.body;

    const [result] = await pool.query('UPDATE relacion SET tipo = ? WHERE id = ?', [tipo, id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Relación no encontrada' });

    res.json('Relación actualizada correctamente');
};
