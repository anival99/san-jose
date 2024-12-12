// routes/materiaGestion.routes.js
import { Router } from 'express'
import { getMateriasGestion, getMateriaGestion, createMateriaGestion, deleteMateriaGestion, updateMateriaGestion } from '../controllers/materiaGestion.controllers.js'

const router = Router()

router.get('/materiaGestion', getMateriasGestion)
router.get('/materiaGestion/:id', getMateriaGestion)
router.post('/materiaGestion', createMateriaGestion)
router.put('/materiaGestion/:id', updateMateriaGestion)
router.delete('/materiaGestion/:id', deleteMateriaGestion)

export default router
