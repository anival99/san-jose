import { Router } from 'express'
import { getDetalleMensualidad, getDetalleMensualidadById, createDetalleMensualidad, deleteDetalleMensualidad, updateDetalleMensualidad } from '../controllers/detalleMensualidad.controller.js'

const router = Router()

router.get('/detallemensualidad', getDetalleMensualidad)
router.get('/detallemensualidad/:id', getDetalleMensualidadById)
router.post('/detallemensualidad', createDetalleMensualidad)
router.put('/detallemensualidad/:id', updateDetalleMensualidad)
router.delete('/detallemensualidad/:id', deleteDetalleMensualidad)

export default router
