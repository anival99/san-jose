// routes/materia.routes.js
import { Router } from 'express'
import { getMaterias, getMateria, createMateria, deleteMateria, updateMateria } from '../controllers/materia.controllers.js'

const router = Router()

router.get('/materia', getMaterias)
router.get('/materia/:id', getMateria)
router.post('/materia', createMateria)
router.put('/materia/:id', updateMateria)
router.delete('/materia/:id', deleteMateria)

export default router
