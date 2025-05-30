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
exports.ArticuloInsumoControlador = void 0;
const fs_1 = require("fs");
const data_source_1 = require("../data-source");
const Articuloinsumo_1 = require("../entidades/Articuloinsumo");
const Unidadmedida_1 = require("../entidades/Unidadmedida");
const Categoriaarticulo_1 = require("../entidades/Categoriaarticulo");
const Imageninsumo_1 = require("../entidades/Imageninsumo");
class ArticuloInsumoControlador {
    static crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { denominacion, precioCompra, precioVenta, esParaElaborar, unidad_medida_id, categoria_id, imagen_id } = req.body;
                const repo = data_source_1.AppDataSource.getRepository(Articuloinsumo_1.Articuloinsumo);
                const repoUnidad = data_source_1.AppDataSource.getRepository(Unidadmedida_1.Unidadmedida);
                const repoCategoria = data_source_1.AppDataSource.getRepository(Categoriaarticulo_1.Categoriaarticulo);
                const repoImagen = data_source_1.AppDataSource.getRepository(Imageninsumo_1.Imageninsumo);
                const insumo = new Articuloinsumo_1.Articuloinsumo();
                insumo.denominacion = denominacion;
                insumo.precioCompra = precioCompra;
                insumo.precioVenta = precioVenta;
                insumo.esParaElaborar = esParaElaborar;
                // Relaciones opcionales
                if (unidad_medida_id) {
                    const unidad = yield repoUnidad.findOneBy({ id: unidad_medida_id });
                    if (!unidad)
                        return res.status(400).json({ mensaje: 'Unidad de medida no encontrada' });
                    insumo.unidadMedida = unidad;
                }
                if (categoria_id) {
                    const categoria = yield repoCategoria.findOneBy({ id: categoria_id });
                    if (!categoria)
                        return res.status(400).json({ mensaje: 'Categoría no encontrada' });
                    insumo.categoria = categoria;
                }
                // Procesar imagen subida
                const archivo = req.file;
                if (archivo) {
                    const nuevaImagen = new Imageninsumo_1.Imageninsumo();
                    nuevaImagen.denominacion = `uploads/insumos/${archivo.filename}`;
                    yield repoImagen.save(nuevaImagen);
                    insumo.imagen = nuevaImagen;
                }
                yield repo.save(insumo);
                return res.status(201).json(insumo);
            }
            catch (error) {
                console.error('Error al crear insumo:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    static obtenerTodos(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Articuloinsumo_1.Articuloinsumo);
                const insumos = yield repo.find({
                    relations: ['unidadMedida', 'categoria', 'imagen'], // opcional: incluir relaciones
                });
                return res.status(200).json(insumos);
            }
            catch (error) {
                console.error('Error al obtener insumos:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    static editar(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { denominacion, precioCompra, precioVenta, esParaElaborar, unidad_medida_id, categoria_id, imagen_id } = req.body;
                const repo = data_source_1.AppDataSource.getRepository(Articuloinsumo_1.Articuloinsumo);
                const insumo = yield repo.findOne({
                    where: { id: Number(id) },
                    relations: ['unidadMedida', 'categoria', 'imagen']
                });
                if (!insumo) {
                    return res.status(404).json({ mensaje: 'Insumo no encontrado' });
                }
                // Actualizar campos, si no se envian desde el front, mantener el valor actual
                insumo.denominacion = denominacion !== null && denominacion !== void 0 ? denominacion : insumo.denominacion;
                insumo.precioCompra = precioCompra !== null && precioCompra !== void 0 ? precioCompra : insumo.precioCompra;
                insumo.precioVenta = precioVenta !== null && precioVenta !== void 0 ? precioVenta : insumo.precioVenta;
                insumo.esParaElaborar = esParaElaborar !== null && esParaElaborar !== void 0 ? esParaElaborar : insumo.esParaElaborar;
                const repoUnidad = data_source_1.AppDataSource.getRepository(Unidadmedida_1.Unidadmedida);
                const repoCategoria = data_source_1.AppDataSource.getRepository(Categoriaarticulo_1.Categoriaarticulo);
                const repoImagen = data_source_1.AppDataSource.getRepository(Imageninsumo_1.Imageninsumo);
                if (unidad_medida_id !== undefined) {
                    const unidad = yield repoUnidad.findOneBy({ id: unidad_medida_id });
                    if (!unidad)
                        return res.status(400).json({ mensaje: 'Unidad de medida no encontrada' });
                    insumo.unidadMedida = unidad;
                }
                if (categoria_id !== undefined) {
                    const categoria = yield repoCategoria.findOneBy({ id: categoria_id });
                    if (!categoria)
                        return res.status(400).json({ mensaje: 'Categoría no encontrada' });
                    insumo.categoria = categoria;
                }
                const archivo = req.file;
                if (archivo) {
                    // Eliminar imagen previa si existe
                    if ((_a = insumo.imagen) === null || _a === void 0 ? void 0 : _a.denominacion) {
                        try {
                            (0, fs_1.unlinkSync)(insumo.imagen.denominacion);
                        }
                        catch (_) {
                            console.warn('No se pudo eliminar imagen anterior');
                        }
                    }
                    const nuevaImagen = new Imageninsumo_1.Imageninsumo();
                    nuevaImagen.denominacion = `uploads/insumos/${archivo.filename}`;
                    yield repoImagen.save(nuevaImagen);
                    insumo.imagen = nuevaImagen;
                }
                yield repo.save(insumo);
                return res.status(200).json(insumo);
            }
            catch (error) {
                console.error('Error al editar insumo:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
}
exports.ArticuloInsumoControlador = ArticuloInsumoControlador;
