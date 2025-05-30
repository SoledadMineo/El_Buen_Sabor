"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articulomanufacturado = void 0;
const typeorm_1 = require("typeorm");
const Categoriaarticulomanufacturado_1 = require("./Categoriaarticulomanufacturado");
const Articulomanufacturadodetalle_1 = require("./Articulomanufacturadodetalle");
const Imagenmanufacturado_1 = require("./Imagenmanufacturado");
const Pedidoventadetalle_1 = require("./Pedidoventadetalle");
const Promociondetalle_1 = require("./Promociondetalle");
let Articulomanufacturado = class Articulomanufacturado {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Articulomanufacturado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "denominacion", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Articulomanufacturado.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "descripcion", nullable: true }),
    __metadata("design:type", String)
], Articulomanufacturado.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "precioVenta", nullable: true }),
    __metadata("design:type", Number)
], Articulomanufacturado.prototype, "precioVenta", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "precioCosto", nullable: true }),
    __metadata("design:type", Number)
], Articulomanufacturado.prototype, "precioCosto", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "tiempoEstimado", nullable: true }),
    __metadata("design:type", Number)
], Articulomanufacturado.prototype, "tiempoEstimado", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "categoria_id", nullable: true }),
    __metadata("design:type", Number)
], Articulomanufacturado.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Categoriaarticulomanufacturado_1.Categoriaarticulomanufacturado, (categoriaarticulomanufacturado) => categoriaarticulomanufacturado.articulomanufacturados, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "categoria_id", referencedColumnName: "id" }]),
    __metadata("design:type", Categoriaarticulomanufacturado_1.Categoriaarticulomanufacturado)
], Articulomanufacturado.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Articulomanufacturadodetalle_1.Articulomanufacturadodetalle, (articulomanufacturadodetalle) => articulomanufacturadodetalle.articuloManufacturado),
    __metadata("design:type", Array)
], Articulomanufacturado.prototype, "articulomanufacturadodetalles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Imagenmanufacturado_1.Imagenmanufacturado, (imagenmanufacturado) => imagenmanufacturado.articuloManufacturado),
    __metadata("design:type", Array)
], Articulomanufacturado.prototype, "imagenmanufacturados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Pedidoventadetalle_1.Pedidoventadetalle, (pedidoventadetalle) => pedidoventadetalle.articuloManufacturado),
    __metadata("design:type", Array)
], Articulomanufacturado.prototype, "pedidoventadetalles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Promociondetalle_1.Promociondetalle, (promociondetalle) => promociondetalle.articuloManufacturado),
    __metadata("design:type", Array)
], Articulomanufacturado.prototype, "promociondetalles", void 0);
Articulomanufacturado = __decorate([
    (0, typeorm_1.Index)("categoria_id", ["categoriaId"], {}),
    (0, typeorm_1.Entity)("articulomanufacturado", { schema: "el_buen_sabor" })
], Articulomanufacturado);
exports.Articulomanufacturado = Articulomanufacturado;
