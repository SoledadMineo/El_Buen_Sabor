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
exports.UnidadMedidaControlador = void 0;
const data_source_1 = require("../data-source");
const Unidadmedida_1 = require("../entidades/Unidadmedida");
class UnidadMedidaControlador {
    static crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { denominacion } = req.body;
                if (!denominacion)
                    return res.status(400).json({ mensaje: 'Denominación requerida' });
                const repo = data_source_1.AppDataSource.getRepository(Unidadmedida_1.Unidadmedida);
                const existe = yield repo.findOneBy({ denominacion });
                if (existe)
                    return res.status(409).json({ mensaje: 'Ya existe una unidad con esa denominación' });
                const nueva = repo.create({ denominacion });
                yield repo.save(nueva);
                return res.status(201).json(nueva);
            }
            catch (error) {
                console.error('Error al crear unidad:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    static obtenerTodas(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Unidadmedida_1.Unidadmedida);
                const unidades = yield repo.find();
                return res.status(200).json(unidades);
            }
            catch (error) {
                console.error('Error al obtener unidades:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
}
exports.UnidadMedidaControlador = UnidadMedidaControlador;
