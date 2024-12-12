// routes/mensualidad.routes.js
import { Router } from 'express'
import { getMensualidades, getMensualidad, createMensualidad, deleteMensualidad, updateMensualidad } from '../controllers/mensualidad.controllers.js'

const router = Router()

router.get('/mensualidad', getMensualidades)
router.get('/mensualidad/:id', getMensualidad)
router.post('/mensualidad', createMensualidad)
router.put('/mensualidad/:id', updateMensualidad)
router.delete('/mensualidad/:id', deleteMensualidad)

export default router
