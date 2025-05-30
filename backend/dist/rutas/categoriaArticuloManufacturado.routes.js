"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriaArticuloManufacturadoControlador_1 = require("../controladores/CategoriaArticuloManufacturadoControlador");
const router = (0, express_1.Router)();
router.post('/', CategoriaArticuloManufacturadoControlador_1.CategoriaArticuloManufacturadoControlador.crear);
router.get('/', CategoriaArticuloManufacturadoControlador_1.CategoriaArticuloManufacturadoControlador.obtenerTodas);
exports.default = router;
