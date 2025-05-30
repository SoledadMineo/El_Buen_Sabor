import articuloManufacturadoRoutes from './articuloManufacturado.routes';
import categoriaArticuloManufacturadoRoutes from './categoriaArticuloManufacturado.routes';
import categoriaArticuloRoutes from './categoriaArticulo.routes';
import articuloInsumoRoutes from './articuloInsumo.routes';
import unidadMedidaRoutes from './unidadMedida.routes';

export const routes = [
    { path: '/api/articulos-manufacturados', router: articuloManufacturadoRoutes },
    { path: '/api/categorias-manufacturados', router: categoriaArticuloManufacturadoRoutes },
    { path: '/api/categorias-articulos', router: categoriaArticuloRoutes },
    { path: '/api/insumos', router: articuloInsumoRoutes },    
    { path: '/api/unidades-medida', router: unidadMedidaRoutes }

];
