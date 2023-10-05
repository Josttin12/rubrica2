import { Router } from "express";
import { getVentas, getVentaByCodigo, createVenta, updateVenta, deleteVenta } from "../controller/ventas.controller.js";

const router = Router();

router.get('/ventas', getVentas);
router.get('/ventas/:codigov', getVentaByCodigo);
router.post('/ventas', createVenta);
router.put('/ventas/:codigov', updateVenta);
router.delete('/ventas/:codigov', deleteVenta);

export default router;

