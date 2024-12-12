import axios from 'axios';

const API_URL = 'http://localhost:3000/api/usuario';
//3000

export const login = async (nombre, contrasena) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { nombre, contrasena });
        console.log('Respuesta del backend:', response.data); // Log para depuración
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Guarda el token en localStorage
        }
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error en la autenticación');
    }
};

export const logout = () => {
    localStorage.removeItem('token'); // Elimina el token
};
