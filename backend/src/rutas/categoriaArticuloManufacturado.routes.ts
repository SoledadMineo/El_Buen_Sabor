import { Router } from 'express';
import { CategoriaArticuloManufacturadoControlador } from '../controladores/CategoriaArticuloManufacturadoControlador';

const router = Router();

router.post('/', CategoriaArticuloManufacturadoControlador.crear);
router.get('/', CategoriaArticuloManufacturadoControlador.obtenerTodas);

export default router;
