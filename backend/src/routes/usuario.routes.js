import { Router } from 'express';
import { getUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario } from '../controllers/usuario.controllers.js';
import { loginUsuario } from '../controllers/usuario.controllers.js';

const router = Router();

router.get('/usuario', getUsuarios);
router.get('/usuario/:id', getUsuario);
router.post('/usuario', createUsuario);
router.delete('/usuario/:id', deleteUsuario);
router.put('/usuario/:id', updateUsuario);
router.post('/login', loginUsuario);

export default router;
