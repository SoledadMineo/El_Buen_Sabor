import { Router } from 'express';
import { CategoriaArticuloControlador } from '../controladores/CategoriaArticuloControlador';

const router = Router();

router.post('/', CategoriaArticuloControlador.crear);
router.get('/', CategoriaArticuloControlador.obtenerTodas);
router.put('/:id', CategoriaArticuloControlador.editar);
router.delete('/:id', CategoriaArticuloControlador.eliminar);

export default router;
