import { Router } from 'express'
import { getInscripciones, getInscripcion, createInscripcion, deleteInscripcion, updateInscripcion } from '../controllers/inscripcion.controllers.js'

const router = Router()

router.get('/inscripcion', getInscripciones)
router.get('/inscripcion/:id', getInscripcion)
router.post('/inscripcion', createInscripcion)
router.delete('/inscripcion/:id', deleteInscripcion)
router.put('/inscripcion/:id', updateInscripcion)

export default router
