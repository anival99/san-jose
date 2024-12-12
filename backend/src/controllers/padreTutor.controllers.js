import { pool } from '../db.js';

// Obtener todos los padres/tutores
export const getPadresTutores = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM padre_tutor');
    res.json(rows);
};

// Obtener un padre/tutor por su id
export const getPadreTutor = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM padre_tutor WHERE id = ?', [id]);

    if (rows.length <= 0) return res.status(404).json({ message: 'Padre/Tutor no encontrado' });

    res.json(rows[0]);
};

// Crear un nuevo padre/tutor
export const createPadreTutor = async (req, res) => {
    const { nombre, apellido } = req.body;
    const [rows] = await pool.query('INSERT INTO padre_tutor (nombre, apellido) VALUES (?, ?)', [nombre, apellido]);

    res.send({ id: rows.insertId, nombre, apellido });
};

// Eliminar un padre/tutor
export const deletePadreTutor = async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM padre_tutor WHERE id = ?', [id]);

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Padre/Tutor no encontrado' });

    res.sendStatus(204);
};

// Actualizar un padre/tutor
export const updatePadreTutor = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido } = req.body;

    const [result] = await pool.query('UPDATE padre_tutor SET nombre = ?, apellido = ? WHERE id = ?', [nombre, apellido, id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Padre/Tutor no encontrado' });

    res.json('Padre/Tutor actualizado correctamente');
};
