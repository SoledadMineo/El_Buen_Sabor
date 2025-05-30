"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UnidadMedidaControlador_1 = require("../controladores/UnidadMedidaControlador");
const router = (0, express_1.Router)();
router.post('/', UnidadMedidaControlador_1.UnidadMedidaControlador.crear);
router.get('/', UnidadMedidaControlador_1.UnidadMedidaControlador.obtenerTodas);
exports.default = router;
