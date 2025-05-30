import { Router } from 'express';
import { UnidadMedidaControlador } from '../controladores/UnidadMedidaControlador';

const router = Router();

router.post('/', UnidadMedidaControlador.crear);
router.get('/', UnidadMedidaControlador.obtenerTodas);

export default router;