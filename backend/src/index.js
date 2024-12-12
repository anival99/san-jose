import express from 'express';
import detalleMensualidadRoutes from './routes/detalleMensualidad.routes.js';
import cobranzaRoutes from './routes/cobranza.routes.js';
import moraRoutes from './routes/mora.routes.js';
import relacionRoutes from './routes/relacion.routes.js';
import padreTutorRoutes from './routes/padreTutor.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import inscripcionRoutes from './routes/inscripcion.routes.js';
import estudianteRoutes from './routes/estudiante.routes.js';
import pagoRoutes from './routes/pago.routes.js';
import maestroRoutes from './routes/maestro.routes.js';
import materiaRoutes from './routes/materia.routes.js';
import cursoRoutes from './routes/curso.routes.js';
import materiaGestionRoutes from './routes/materiaGestion.routes.js';
import mensualidadRoutes from './routes/mensualidad.routes.js';
import gestionRoutes from './routes/gestion.routes.js';
import cors from 'cors';

import indexRoutes from './routes/index.routes.js';

const app = express();

// Configuración de CORS (debe ir antes de las rutas)
app.use(cors({
    origin: 'http://localhost:5173', // Permite el dominio del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));

// Middleware para parsear JSON
app.use(express.json());

// Configuración de rutas
app.use('/api', cobranzaRoutes);
app.use('/api', moraRoutes);
app.use('/api', detalleMensualidadRoutes);
app.use('/api', relacionRoutes);
app.use('/api', padreTutorRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', inscripcionRoutes);
app.use('/api', estudianteRoutes);
app.use('/api', pagoRoutes);
app.use('/api', maestroRoutes);
app.use('/api', materiaRoutes);
app.use('/api', cursoRoutes);
app.use('/api', materiaGestionRoutes);
app.use('/api', mensualidadRoutes);
app.use('/api', gestionRoutes);

// Ruta específica para usuario (si la necesitas explícitamente)
app.use('/api/usuario', usuarioRoutes);

// Index routes
app.use(indexRoutes);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found',
    });
});

// Inicio del servidor
app.listen(3000, () => {
    console.log('server running on port 3000');
});
