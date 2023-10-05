import { Router } from "express";
import { createProducto, deleteProducto, getProductoByCodigo, getProductos, updateProducto } from "../controller/productos.controller.js";

const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:codigop', getProductoByCodigo);
router.post('/productos', createProducto);
router.put('/productos/:codigop', updateProducto);
router.delete('/productos/:codigop', deleteProducto);

export default router;
