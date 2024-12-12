import { pool } from '../db.js'
import jwt from 'jsonwebtoken'; // Para generar el token

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario');
    res.json(rows)
}

// Obtener un usuario por su id
export const getUsuario = async (req, res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    
    if (rows.length <= 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(rows[0]);
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    const { nombre, paterno, materno, email, contrasena } = req.body
    const [rows] = await pool.query(
        'INSERT INTO usuario (nombre, paterno, materno, email, contrasena) VALUES (?, ?, ?, ?, ?)',
        [nombre, paterno, materno, email, contrasena]
    );
    res.send({ id: rows.insertId, nombre, paterno, materno, email, contrasena });
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM usuario WHERE id = ?', [id]);

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.sendStatus(204);
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    const { id } = req.params
    const { nombre, paterno, materno, email, contrasena } = req.body
    const [result] = await pool.query(
        'UPDATE usuario SET nombre = ?, paterno = ?, materno = ?, email = ?, contrasena = ? WHERE id = ?',
        [nombre, paterno, materno, email, contrasena, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json('Usuario actualizado correctamente');
};

// Para el login
const SECRET_KEY = 'clave_secreta'; // Cambia esto por una variable de entorno en producción

export const loginUsuario = async (req, res) => {
    const { nombre, contrasena } = req.body;

    try {
        // Busca al usuario en la base de datos
        const [rows] = await pool.query(
            'SELECT * FROM usuario WHERE nombre = ? AND contrasena = ?',
            [nombre, contrasena]
        );

        console.log('Resultado de la consulta:', rows);

        // Si no se encuentra el usuario
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Genera un token JWT
        const user = rows[0];
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre },
            SECRET_KEY,
            { expiresIn: '1h' } // Expiración del token
        );

        // Envía el token al frontend
        res.json({ token, message: 'Autenticación exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
