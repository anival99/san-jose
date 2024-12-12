import { pool } from '../db.js';

// Obtener todas las moras con el nombre completo del estudiante
export const getMoras = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                mora.id,
                mora.monto_pendiente AS monto,
                mora.fecha_vencimiento,
                mora.descripcion,
                CONCAT(estudiante.nombre, ' ', estudiante.paterno, ' ', estudiante.materno) AS estudiante_nombre
            FROM 
                mora
            JOIN cobranza ON mora.id_cobranza = cobranza.id
            JOIN pago ON pago.id = cobranza.id -- Relacionar con "pago"
            JOIN estudiante ON estudiante.id = pago.id_estudiante -- Relacionar con "estudiante"
        `);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener moras:", error);
        res.status(500).json({ 
            message: 'Error al obtener moras',
            error 
        });
    }
};

// Obtener una mora por su id
export const getMora = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                mora.id,
                mora.monto_pendiente AS monto,
                mora.fecha_vencimiento,
                mora.descripcion,
                CONCAT(estudiante.nombre, ' ', estudiante.paterno, ' ', estudiante.materno) AS estudiante_nombre
            FROM 
                mora
            JOIN cobranza ON mora.id_cobranza = cobranza.id
            JOIN pago ON pago.id = cobranza.id
            JOIN estudiante ON estudiante.id = pago.id_estudiante
            WHERE mora.id = ?
        `, [id]);
        if (rows.length <= 0) return res.status(404).json({ message: 'Mora no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la mora', error });
    }
};

// Crear una nueva mora
export const createMora = async (req, res) => {
    const { monto_pendiente, fecha_vencimiento, descripcion, id_cobranza } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO mora (monto_pendiente, fecha_vencimiento, descripcion, id_cobranza) VALUES (?, ?, ?, ?)', 
            [monto_pendiente, fecha_vencimiento, descripcion, id_cobranza]
        );
        res.send({ id: rows.insertId, monto_pendiente, fecha_vencimiento, descripcion, id_cobranza });
    } catch (error) {
        console.error("Error al crear la mora:", error);
        res.status(500).json({ message: 'Error al crear la mora', error });
    }
};

// Eliminar una mora
export const deleteMora = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM mora WHERE id = ?', [id]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Mora no encontrada' });
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al eliminar la mora:", error);
        res.status(500).json({ message: 'Error al eliminar la mora', error });
    }
};

// Actualizar una mora
export const updateMora = async (req, res) => {
    const { id } = req.params;
    const { monto_pendiente, fecha_vencimiento, descripcion, id_cobranza } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE mora SET monto_pendiente = ?, fecha_vencimiento = ?, descripcion = ?, id_cobranza = ? WHERE id = ?', 
            [monto_pendiente, fecha_vencimiento, descripcion, id_cobranza, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Mora no encontrada' });
        res.json('Mora actualizada correctamente');
    } catch (error) {
        console.error("Error al actualizar la mora:", error);
        res.status(500).json({ message: 'Error al actualizar la mora', error });
    }
};
