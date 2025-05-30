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
exports.CategoriaArticuloControlador = void 0;
const data_source_1 = require("../data-source");
const Categoriaarticulo_1 = require("../entidades/Categoriaarticulo");
class CategoriaArticuloControlador {
    static crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { denominacion, subcategoria_id } = req.body;
                const repo = data_source_1.AppDataSource.getRepository(Categoriaarticulo_1.Categoriaarticulo);
                const nueva = new Categoriaarticulo_1.Categoriaarticulo();
                nueva.denominacion = denominacion;
                if (subcategoria_id) {
                    const subcategoria = yield repo.findOneBy({ id: subcategoria_id });
                    if (!subcategoria)
                        return res.status(400).json({ mensaje: 'Subcategoría no encontrada' });
                    nueva.subcategoria = subcategoria;
                }
                yield repo.save(nueva);
                return res.status(201).json(nueva);
            }
            catch (error) {
                console.error('Error al crear categoría:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    static obtenerTodas(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Categoriaarticulo_1.Categoriaarticulo);
                const categorias = yield repo.find({
                    relations: ['subcategoria']
                });
                return res.status(200).json(categorias);
            }
            catch (error) {
                console.error('Error al obtener categorías:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    static editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { denominacion, subcategoria_id } = req.body;
                const repo = data_source_1.AppDataSource.getRepository(Categoriaarticulo_1.Categoriaarticulo);
                const categoria = yield repo.findOne({
                    where: { id: Number(id) },
                    relations: ['subcategoria']
                });
                if (!categoria)
                    return res.status(404).json({ mensaje: 'Categoría no encontrada' });
                categoria.denominacion = denominacion !== null && denominacion !== void 0 ? denominacion : categoria.denominacion;
                if (subcategoria_id !== undefined) {
                    const subcategoria = yield repo.findOneBy({ id: subcategoria_id });
                    if (!subcategoria)
                        return res.status(400).json({ mensaje: 'Subcategoría no encontrada' });
                    categoria.subcategoria = subcategoria;
                }
                yield repo.save(categoria);
                return res.status(200).json(categoria);
            }
            catch (error) {
                console.error('Error al editar categoría:', error);
                return res.status(500).json({ mensaje: error.message || 'Error interno del servidor' });
            }
        });
    }
    static eliminar(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const repo = data_source_1.AppDataSource.getRepository(Categoriaarticulo_1.Categoriaarticulo);
                const categoria = yield repo.findOne({
                    where: { id: Number(id) },
                    relations: ['categoriaarticulos', 'articuloinsumos']
                });
                if (!categoria)
                    return res.status(404).json({ mensaje: 'Categoría no encontrada' });
                // Verificar que no tenga subcategorías o insumos asociados
                if (((_b = (_a = categoria.categoriaarticulos) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
                    return res.status(400).json({ mensaje: 'No se puede eliminar una categoría que tiene subcategorías.' });
                }
                if (((_d = (_c = categoria.articuloinsumos) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0) {
                    return res.status(400).json({ mensaje: 'No se puede eliminar una categoría que tiene insumos asociados.' });
                }
                yield repo.remove(categoria);
                return res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
            }
            catch (error) {
                console.error('Error al eliminar categoría:', error);
                return res.status(500).json({ mensaje: error.message || 'Error interno del servidor' });
            }
        });
    }
}
exports.CategoriaArticuloControlador = CategoriaArticuloControlador;
