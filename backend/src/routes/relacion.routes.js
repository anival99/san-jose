import { Router } from 'express';
import { getRelaciones, getRelacion, createRelacion, deleteRelacion, updateRelacion } from '../controllers/relacion.controllers.js';

const router = Router();

router.get('/relacion', getRelaciones);
router.get('/relacion/:id', getRelacion);
router.post('/relacion', createRelacion);
router.put('/relacion/:id', updateRelacion);
router.delete('/relacion/:id', deleteRelacion);

export default router;
