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
exports.Pedidoventadetalle = void 0;
const typeorm_1 = require("typeorm");
const Promocion_1 = require("./Promocion");
const Pedidoventa_1 = require("./Pedidoventa");
const Articulomanufacturado_1 = require("./Articulomanufacturado");
const Articuloinsumo_1 = require("./Articuloinsumo");
let Pedidoventadetalle = class Pedidoventadetalle {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Pedidoventadetalle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "cantidad", nullable: true }),
    __metadata("design:type", Number)
], Pedidoventadetalle.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "subTotal", nullable: true }),
    __metadata("design:type", Number)
], Pedidoventadetalle.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "pedidoVenta_id", nullable: true }),
    __metadata("design:type", Number)
], Pedidoventadetalle.prototype, "pedidoVentaId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "articuloManufacturado_id", nullable: true }),
    __metadata("design:type", Number)
], Pedidoventadetalle.prototype, "articuloManufacturadoId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "articuloInsumo_id", nullable: true }),
    __metadata("design:type", Number)
], Pedidoventadetalle.prototype, "articuloInsumoId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "promocion_id" }),
    __metadata("design:type", Number)
], Pedidoventadetalle.prototype, "promocionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Promocion_1.Promocion, (promocion) => promocion.pedidoventadetalles, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "promocion_id", referencedColumnName: "id" }]),
    __metadata("design:type", Promocion_1.Promocion)
], Pedidoventadetalle.prototype, "promocion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pedidoventa_1.Pedidoventa, (pedidoventa) => pedidoventa.pedidoventadetalles, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "pedidoVenta_id", referencedColumnName: "id" }]),
    __metadata("design:type", Pedidoventa_1.Pedidoventa)
], Pedidoventadetalle.prototype, "pedidoVenta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Articulomanufacturado_1.Articulomanufacturado, (articulomanufacturado) => articulomanufacturado.pedidoventadetalles, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([
        { name: "articuloManufacturado_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", Articulomanufacturado_1.Articulomanufacturado)
], Pedidoventadetalle.prototype, "articuloManufacturado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Articuloinsumo_1.Articuloinsumo, (articuloinsumo) => articuloinsumo.pedidoventadetalles, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "articuloInsumo_id", referencedColumnName: "id" }]),
    __metadata("design:type", Articuloinsumo_1.Articuloinsumo)
], Pedidoventadetalle.prototype, "articuloInsumo", void 0);
Pedidoventadetalle = __decorate([
    (0, typeorm_1.Index)("pedidoVenta_id", ["pedidoVentaId"], {}),
    (0, typeorm_1.Index)("articuloManufacturado_id", ["articuloManufacturadoId"], {}),
    (0, typeorm_1.Index)("articuloInsumo_id", ["articuloInsumoId"], {}),
    (0, typeorm_1.Index)("promoción_id", ["promocionId"], {}),
    (0, typeorm_1.Entity)("pedidoventadetalle", { schema: "el_buen_sabor" })
], Pedidoventadetalle);
exports.Pedidoventadetalle = Pedidoventadetalle;
