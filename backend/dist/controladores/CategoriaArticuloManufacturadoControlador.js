"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaArticuloManufacturadoControlador = void 0;
const data_source_1 = require("../data-source");
const Categoriaarticulomanufacturado_1 = require("../entidades/Categoriaarticulomanufacturado");
class CategoriaArticuloManufacturadoControlador {
    static crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { denominacion } = req.body;
                if (!denominacion) {
                    return res.status(400).json({ mensaje: 'El campo "denominacion" es requerido' });
                }
                const repo = data_source_1.AppDataSource.getRepository(Categoriaarticulomanufacturado_1.Categoriaarticulomanufacturado);
                const existente = yield repo.findOneBy({ denominacion });
                if (existente) {
                    return res.status(409).json({ mensaje: 'Ya existe una categoría con esa denominación' });
                }
                const nueva = repo.create({ denominacion });
                yield repo.save(nueva);
                return res.status(201).json(nueva);
            }
            catch (error) {
                console.error('Error al crear categoría:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    static obtenerTodas(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Categoriaarticulomanufacturado_1.Categoriaarticulomanufacturado);
                const categorias = yield repo.find();
                return res.status(200).json(categorias);
            }
            catch (error) {
                console.error('Error al obtener categorias:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
}
exports.CategoriaArticuloManufacturadoControlador = CategoriaArticuloManufacturadoControlador;
