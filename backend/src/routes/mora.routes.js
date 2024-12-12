import { Router } from 'express';
import { getMoras, getMora, createMora, deleteMora, updateMora } from '../controllers/mora.controllers.js';

const router = Router();

router.get('/mora', getMoras);
router.get('/mora/:id', getMora);
router.post('/mora', createMora);
router.put('/mora/:id', updateMora);
router.delete('/mora/:id', deleteMora);

export default router;
