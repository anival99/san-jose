import { Router } from 'express';
import { getPadresTutores, getPadreTutor, createPadreTutor, deletePadreTutor, updatePadreTutor } from '../controllers/padreTutor.controllers.js';

const router = Router();

router.get('/padretutor', getPadresTutores);
router.get('/padretutor/:id', getPadreTutor);
router.post('/padretutor', createPadreTutor);
router.put('/padretutor/:id', updatePadreTutor);
router.delete('/padretutor/:id', deletePadreTutor);

export default router;
