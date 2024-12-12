import { Router } from 'express';
import { getCobranzas, getCobranza, createCobranza, deleteCobranza, updateCobranza } from '../controllers/cobranza.controllers.js';

const router = Router();

router.get('/cobranza', getCobranzas);
router.get('/cobranza/:id', getCobranza);
router.post('/cobranza', createCobranza);
router.put('/cobranza/:id', updateCobranza);
router.delete('/cobranza/:id', deleteCobranza);

export default router;
