import { Router } from 'express';
import { ArticuloManufacturadoControlador } from '../controladores/ArticuloManufacturadoControlador';
import { uploadTo } from '../middleware/upload';

const uploadArticuloDir = uploadTo('articulos');

const router = Router();

router.post('/', uploadArticuloDir.array('imagenes', 5), ArticuloManufacturadoControlador.crear);
router.get('/', ArticuloManufacturadoControlador.obtenerTodos);
router.get('/:id', ArticuloManufacturadoControlador.obtenerXId);
router.put('/:id', uploadArticuloDir.array('imagenes', 5), ArticuloManufacturadoControlador.editar);
router.delete('/:id', ArticuloManufacturadoControlador.eliminar);

export default router;
