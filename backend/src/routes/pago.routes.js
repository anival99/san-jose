// routes/pago.routes.js
import { Router } from 'express'
import { getPagos, getPago, createPago, deletePago, updatePago } from '../controllers/pago.controllers.js'

const router = Router()

router.get('/pago', getPagos)
router.get('/pago/:id', getPago)
router.post('/pago', createPago)
router.put('/pago/:id', updatePago)
router.delete('/pago/:id', deletePago)

export default router
