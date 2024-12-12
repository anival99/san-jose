import { Router } from 'express'
import { getEstudiantes, getEstudiante, createEstudiante, deleteEstudiante, updateEstudiante } from '../controllers/estudiante.controllers.js'

const router = Router()

router.get('/estudiante', getEstudiantes)
router.get('/estudiante/:id', getEstudiante)
router.post('/estudiante', createEstudiante)
router.delete('/estudiante/:id', deleteEstudiante)
router.put('/estudiante/:id', updateEstudiante)

export default router
