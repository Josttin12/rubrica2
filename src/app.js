import express from "express";
import productosRoutes from './routes/productos.routes.js';
import ventasRoutes from './routes/ventas.routes.js';

const app = express();

app.use(express.json());

app.use(productosRoutes);
app.use(ventasRoutes);  // Agrega las rutas de ventas

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Página no encontrada'
    });
});

app.get('/', (req, res) => {
    res.send("Hola desde Express");
});

export default app;

