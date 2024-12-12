// routes/maestro.routes.js
import { Router } from 'express'
import { getMaestros, getMaestro, createMaestro, deleteMaestro, updateMaestro } from '../controllers/maestro.controllers.js'

const router = Router()

router.get('/maestro', getMaestros)
router.get('/maestro/:id', getMaestro)
router.post('/maestro', createMaestro)
router.put('/maestro/:id', updateMaestro)
router.delete('/maestro/:id', deleteMaestro)

export default router
