"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ArticuloManufacturadoControlador = void 0;
const data_source_1 = require("../data-source");
const Articulomanufacturado_1 = require("../entidades/Articulomanufacturado");
const Categoriaarticulomanufacturado_1 = require("../entidades/Categoriaarticulomanufacturado");
const Articuloinsumo_1 = require("../entidades/Articuloinsumo");
const Articulomanufacturadodetalle_1 = require("../entidades/Articulomanufacturadodetalle");
const Imagenmanufacturado_1 = require("../entidades/Imagenmanufacturado");
class ArticuloManufacturadoControlador {
    static crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { denominacion, descripcion, precioVenta, precioCosto, tiempoEstimado, categoria_id, detalles } = req.body;
                const parsedDetalles = JSON.parse(detalles); // Asegurarse que es un array
                const repoArticulo = data_source_1.AppDataSource.getRepository(Articulomanufacturado_1.Articulomanufacturado);
                const repoCategoria = data_source_1.AppDataSource.getRepository(Categoriaarticulomanufacturado_1.Categoriaarticulomanufacturado);
                const repoInsumo = data_source_1.AppDataSource.getRepository(Articuloinsumo_1.Articuloinsumo);
                const categoria = yield repoCategoria.findOneBy({ id: Number(categoria_id) });
                if (!categoria)
                    return res.status(400).json({ mensaje: 'Categoría no encontrada' });
                const nuevoArticulo = new Articulomanufacturado_1.Articulomanufacturado();
                nuevoArticulo.denominacion = denominacion;
                nuevoArticulo.descripcion = descripcion;
                nuevoArticulo.precioVenta = precioVenta;
                nuevoArticulo.precioCosto = precioCosto;
                nuevoArticulo.tiempoEstimado = tiempoEstimado;
                nuevoArticulo.categoria = categoria;
                // Guardar primero para tener ID
                yield repoArticulo.save(nuevoArticulo);
                // Crear detalles
                for (const d of parsedDetalles) {
                    const insumo = yield repoInsumo.findOneBy({ id: d.articuloInsumo_id });
                    if (!insumo)
                        throw new Error(`Insumo con ID ${d.articuloInsumo_id} no encontrado`);
                    const detalle = new Articulomanufacturadodetalle_1.Articulomanufacturadodetalle();
                    detalle.cantidad = d.cantidad;
                    detalle.articuloManufacturado = nuevoArticulo;
                    detalle.articuloInsumo = insumo;
                    yield data_source_1.AppDataSource.getRepository(Articulomanufacturadodetalle_1.Articulomanufacturadodetalle).save(detalle);
                }
                // Subir imágenes
                const archivos = req.files;
                for (const file of archivos) {
                    const imagen = new Imagenmanufacturado_1.Imagenmanufacturado();
                    imagen.denominacion = `uploads/articulos/${file.filename}`;
                    imagen.articuloManufacturado = nuevoArticulo;
                    yield data_source_1.AppDataSource.getRepository(Imagenmanufacturado_1.Imagenmanufacturado).save(imagen);
                }
                return res.status(201).json({ mensaje: 'Artículo creado con éxito', id: nuevoArticulo.id });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: error.message || 'Error al crear artículo' });
            }
        });
    }
    static obtenerTodos(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Articulomanufacturado_1.Articulomanufacturado);
                const articulos = yield repo.find({
                    relations: [
                        'categoria',
                        'articulomanufacturadodetalles',
                        'articulomanufacturadodetalles.articuloInsumo',
                        'imagenmanufacturados'
                    ],
                });
                return res.status(200).json(articulos);
            }
            catch (error) {
                console.error('Error al obtener artículos:', error instanceof Error ? error.message : error);
                return res.status(500).json({ mensaje: 'Error interno del servidor', detalle: error instanceof Error ? error.message : error });
            }
        });
    }
    static editar(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { denominacion, descripcion, precioVenta, precioCosto, tiempoEstimado, categoria_id, imagenes: imagenesDesdeFrontend } = req.body;
                const repoArticulo = data_source_1.AppDataSource.getRepository(Articulomanufacturado_1.Articulomanufacturado);
                const repoImagen = data_source_1.AppDataSource.getRepository(Imagenmanufacturado_1.Imagenmanufacturado);
                const articulo = yield repoArticulo.findOne({
                    where: { id: Number(id) },
                    relations: ['categoria', 'imagenmanufacturados'],
                });
                if (!articulo)
                    return res.status(404).json({ mensaje: 'Artículo no encontrado' });
                if (categoria_id) {
                    const repoCategoria = data_source_1.AppDataSource.getRepository(Categoriaarticulomanufacturado_1.Categoriaarticulomanufacturado);
                    const categoria = yield repoCategoria.findOneBy({ id: Number(categoria_id) });
                    if (!categoria)
                        return res.status(400).json({ mensaje: 'Categoría no encontrada' });
                    articulo.categoria = categoria;
                }
                articulo.denominacion = denominacion !== null && denominacion !== void 0 ? denominacion : articulo.denominacion;
                articulo.descripcion = descripcion !== null && descripcion !== void 0 ? descripcion : articulo.descripcion;
                articulo.precioVenta = precioVenta !== null && precioVenta !== void 0 ? precioVenta : articulo.precioVenta;
                articulo.precioCosto = precioCosto !== null && precioCosto !== void 0 ? precioCosto : articulo.precioCosto;
                articulo.tiempoEstimado = tiempoEstimado !== null && tiempoEstimado !== void 0 ? tiempoEstimado : articulo.tiempoEstimado;
                // mantener imágenes existentes si se enviaron como string
                let nuevasImagenesDesdeFrontend = [];
                try {
                    nuevasImagenesDesdeFrontend = JSON.parse(imagenesDesdeFrontend);
                }
                catch (_) {
                    nuevasImagenesDesdeFrontend = Array.isArray(imagenesDesdeFrontend)
                        ? imagenesDesdeFrontend
                        : [];
                }
                const imagenesActuales = (_a = articulo.imagenmanufacturados) !== null && _a !== void 0 ? _a : [];
                // Eliminar imágenes que ya no están
                for (const img of imagenesActuales) {
                    if (!nuevasImagenesDesdeFrontend.includes(img.denominacion)) {
                        try {
                            // Borrar del disco
                            const fs = yield Promise.resolve().then(() => __importStar(require('fs')));
                            fs.unlinkSync(img.denominacion);
                        }
                        catch (e) {
                            console.warn('No se pudo eliminar del disco:', img.denominacion);
                        }
                        yield repoImagen.remove(img); // Borrar de la DB
                    }
                }
                // agregar archivos nuevos
                const archivos = req.files;
                if (archivos && archivos.length > 0) {
                    for (const archivo of archivos) {
                        const nuevaImagen = new Imagenmanufacturado_1.Imagenmanufacturado();
                        nuevaImagen.denominacion = `uploads/articulos/${archivo.filename}`;
                        nuevaImagen.articuloManufacturado = articulo;
                        yield repoImagen.save(nuevaImagen);
                    }
                }
                // revisar detalles
                if (req.body.detalles) {
                    const parsedDetalles = JSON.parse(req.body.detalles);
                    const repoDetalle = data_source_1.AppDataSource.getRepository(Articulomanufacturadodetalle_1.Articulomanufacturadodetalle);
                    const repoInsumo = data_source_1.AppDataSource.getRepository(Articuloinsumo_1.Articuloinsumo);
                    // Traer los detalles actuales del artículo
                    const detallesExistentes = yield repoDetalle.find({
                        where: { articuloManufacturado: { id: articulo.id } },
                        relations: ['articuloInsumo']
                    });
                    // const detallesActualizadosIds = parsedDetalles.map((d: any) => d.articuloInsumo_id);
                    // Eliminar los que ya no están
                    for (const detallePrevio of detallesExistentes) {
                        const existeEnNuevo = parsedDetalles.find((det) => det.articuloInsumo_id === detallePrevio.articuloInsumo.id);
                        if (!existeEnNuevo) {
                            yield repoDetalle.remove(detallePrevio);
                        }
                    }
                    // Agregar nuevos o actualizar cantidades si cambian
                    for (const nuevoDetalle of parsedDetalles) {
                        const detalleExistente = detallesExistentes.find((det) => det.articuloInsumo.id === nuevoDetalle.articuloInsumo_id);
                        if (detalleExistente) {
                            // Actualizar cantidad si es distinta
                            if (detalleExistente.cantidad !== nuevoDetalle.cantidad) {
                                detalleExistente.cantidad = nuevoDetalle.cantidad;
                                yield repoDetalle.save(detalleExistente);
                            }
                        }
                        else {
                            // Agregar nuevo detalle
                            const insumo = yield repoInsumo.findOneBy({ id: nuevoDetalle.articuloInsumo_id });
                            if (!insumo)
                                throw new Error(`Insumo con ID ${nuevoDetalle.articuloInsumo_id} no encontrado`);
                            const nuevo = new Articulomanufacturadodetalle_1.Articulomanufacturadodetalle();
                            nuevo.articuloInsumo = insumo;
                            nuevo.articuloManufacturado = articulo;
                            nuevo.cantidad = nuevoDetalle.cantidad;
                            yield repoDetalle.save(nuevo);
                        }
                    }
                }
                yield repoArticulo.save(articulo);
                return res.status(200).json({ mensaje: 'Artículo actualizado correctamente' });
            }
            catch (error) {
                console.error('Error al editar artículo:', error);
                return res.status(500).json({ mensaje: error.message || 'Error interno del servidor' });
            }
        });
    }
    static eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const repo = data_source_1.AppDataSource.getRepository(Articulomanufacturado_1.Articulomanufacturado);
                const articulo = yield repo.findOne({
                    where: { id: Number(id) },
                    relations: ['imagenmanufacturados'],
                });
                if (!articulo)
                    return res.status(404).json({ mensaje: 'Artículo no encontrado' });
                // Opcional: eliminar imágenes del disco
                for (const imagen of articulo.imagenmanufacturados || []) {
                    try {
                        const fs = yield Promise.resolve().then(() => __importStar(require('fs')));
                        fs.unlinkSync(imagen.denominacion);
                    }
                    catch (_) {
                        console.warn('No se pudo borrar una imagen');
                    }
                }
                yield repo.remove(articulo);
                return res.status(200).json({ mensaje: 'Artículo eliminado con éxito' });
            }
            catch (error) {
                console.error('Error al eliminar artículo:', error);
                return res.status(500).json({ mensaje: error.message || 'Error interno' });
            }
        });
    }
}
exports.ArticuloManufacturadoControlador = ArticuloManufacturadoControlador;
