"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticuloManufacturadoControlador_1 = require("../controladores/ArticuloManufacturadoControlador");
const upload_1 = require("../middleware/upload");
const uploadArticuloDir = (0, upload_1.uploadTo)('articulos');
const router = (0, express_1.Router)();
router.post('/', uploadArticuloDir.array('imagenes', 5), ArticuloManufacturadoControlador_1.ArticuloManufacturadoControlador.crear);
router.get('/', ArticuloManufacturadoControlador_1.ArticuloManufacturadoControlador.obtenerTodos);
router.put('/:id', uploadArticuloDir.array('imagenes', 5), ArticuloManufacturadoControlador_1.ArticuloManufacturadoControlador.editar);
router.delete('/:id', ArticuloManufacturadoControlador_1.ArticuloManufacturadoControlador.eliminar);
exports.default = router;
