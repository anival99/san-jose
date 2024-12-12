// routes/curso.routes.js
import { Router } from 'express'
import { getCursos, getCurso, createCurso, deleteCurso, updateCurso } from '../controllers/curso.controllers.js'

const router = Router()

router.get('/curso', getCursos)
router.get('/curso/:id', getCurso)
router.post('/curso', createCurso)
router.put('/curso/:id', updateCurso)
router.delete('/curso/:id', deleteCurso)

export default router
