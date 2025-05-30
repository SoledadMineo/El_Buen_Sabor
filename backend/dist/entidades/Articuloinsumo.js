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
exports.Articuloinsumo = void 0;
const typeorm_1 = require("typeorm");
const Unidadmedida_1 = require("./Unidadmedida");
const Categoriaarticulo_1 = require("./Categoriaarticulo");
const Imageninsumo_1 = require("./Imageninsumo");
const Articulomanufacturadodetalle_1 = require("./Articulomanufacturadodetalle");
const Pedidoventadetalle_1 = require("./Pedidoventadetalle");
const Sucursalinsumo_1 = require("./Sucursalinsumo");
let Articuloinsumo = class Articuloinsumo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Articuloinsumo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "denominacion", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Articuloinsumo.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "precioCompra", nullable: true }),
    __metadata("design:type", Number)
], Articuloinsumo.prototype, "precioCompra", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "precioVenta", nullable: true }),
    __metadata("design:type", Number)
], Articuloinsumo.prototype, "precioVenta", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "esParaElaborar", nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], Articuloinsumo.prototype, "esParaElaborar", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "unidad_medida_id", nullable: true }),
    __metadata("design:type", Number)
], Articuloinsumo.prototype, "unidadMedidaId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "categoria_id", nullable: true }),
    __metadata("design:type", Number)
], Articuloinsumo.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "imagen_id", nullable: true }),
    __metadata("design:type", Number)
], Articuloinsumo.prototype, "imagenId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Unidadmedida_1.Unidadmedida, (unidadmedida) => unidadmedida.articuloinsumos, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "unidad_medida_id", referencedColumnName: "id" }]),
    __metadata("design:type", Unidadmedida_1.Unidadmedida)
], Articuloinsumo.prototype, "unidadMedida", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Categoriaarticulo_1.Categoriaarticulo, (categoriaarticulo) => categoriaarticulo.articuloinsumos, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "categoria_id", referencedColumnName: "id" }]),
    __metadata("design:type", Categoriaarticulo_1.Categoriaarticulo)
], Articuloinsumo.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Imageninsumo_1.Imageninsumo, (imageninsumo) => imageninsumo.articuloinsumos, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "imagen_id", referencedColumnName: "id" }]),
    __metadata("design:type", Imageninsumo_1.Imageninsumo)
], Articuloinsumo.prototype, "imagen", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Articulomanufacturadodetalle_1.Articulomanufacturadodetalle, (articulomanufacturadodetalle) => articulomanufacturadodetalle.articuloInsumo),
    __metadata("design:type", Array)
], Articuloinsumo.prototype, "articulomanufacturadodetalles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Pedidoventadetalle_1.Pedidoventadetalle, (pedidoventadetalle) => pedidoventadetalle.articuloInsumo),
    __metadata("design:type", Array)
], Articuloinsumo.prototype, "pedidoventadetalles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sucursalinsumo_1.Sucursalinsumo, (sucursalinsumo) => sucursalinsumo.articuloInsumo),
    __metadata("design:type", Array)
], Articuloinsumo.prototype, "sucursalinsumos", void 0);
Articuloinsumo = __decorate([
    (0, typeorm_1.Index)("unidad_medida_id", ["unidadMedidaId"], {}),
    (0, typeorm_1.Index)("categoria_id", ["categoriaId"], {}),
    (0, typeorm_1.Index)("imagen_id", ["imagenId"], {}),
    (0, typeorm_1.Entity)("articuloinsumo", { schema: "el_buen_sabor" })
], Articuloinsumo);
exports.Articuloinsumo = Articuloinsumo;
