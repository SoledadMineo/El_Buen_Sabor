"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const articuloManufacturado_routes_1 = __importDefault(require("./articuloManufacturado.routes"));
const categoriaArticuloManufacturado_routes_1 = __importDefault(require("./categoriaArticuloManufacturado.routes"));
const categoriaArticulo_routes_1 = __importDefault(require("./categoriaArticulo.routes"));
const articuloInsumo_routes_1 = __importDefault(require("./articuloInsumo.routes"));
const unidadMedida_routes_1 = __importDefault(require("./unidadMedida.routes"));
exports.routes = [
    { path: '/api/articulos-manufacturados', router: articuloManufacturado_routes_1.default },
    { path: '/api/categorias-manufacturados', router: categoriaArticuloManufacturado_routes_1.default },
    { path: '/api/categorias-articulos', router: categoriaArticulo_routes_1.default },
    { path: '/api/insumos', router: articuloInsumo_routes_1.default },
    { path: '/api/unidades-medida', router: unidadMedida_routes_1.default }
];
