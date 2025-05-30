import { Router } from 'express';
import { ArticuloInsumoControlador } from '../controladores/ArticuloInsumoControlador';
import { uploadTo } from '../middleware/upload';

const uploadInsumoDir = uploadTo('insumos');

const router = Router();

router.post('/', uploadInsumoDir.single('imagen'), ArticuloInsumoControlador.crear);
router.get('/', ArticuloInsumoControlador.obtenerTodos);
router.put('/:id', uploadInsumoDir.single('imagen'), ArticuloInsumoControlador.editar);

export default router;