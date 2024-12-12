// routes/gestion.routes.js
import { Router } from 'express'
import { getGestiones, getGestion, createGestion, deleteGestion, updateGestion } from '../controllers/gestion.controllers.js'

const router = Router()

router.get('/gestion', getGestiones)
router.get('/gestion/:id', getGestion)
router.post('/gestion', createGestion)
router.put('/gestion/:id', updateGestion)
router.delete('/gestion/:id', deleteGestion)

export default router
