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
exports.Facturaventadetalle = void 0;
const typeorm_1 = require("typeorm");
const Facturaventa_1 = require("./Facturaventa");
let Facturaventadetalle = class Facturaventadetalle {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Facturaventadetalle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "cantidad", nullable: true }),
    __metadata("design:type", Number)
], Facturaventadetalle.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "subTotal",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", String)
], Facturaventadetalle.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "facturaVenta_id", nullable: true }),
    __metadata("design:type", Number)
], Facturaventadetalle.prototype, "facturaVentaId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_promocion", nullable: true }),
    __metadata("design:type", Number)
], Facturaventadetalle.prototype, "idPromocion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Facturaventa_1.Facturaventa, (facturaventa) => facturaventa.facturaventadetalles, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "facturaVenta_id", referencedColumnName: "id" }]),
    __metadata("design:type", Facturaventa_1.Facturaventa)
], Facturaventadetalle.prototype, "facturaVenta", void 0);
Facturaventadetalle = __decorate([
    (0, typeorm_1.Index)("facturaVenta_id", ["facturaVentaId"], {}),
    (0, typeorm_1.Entity)("facturaventadetalle", { schema: "el_buen_sabor" })
], Facturaventadetalle);
exports.Facturaventadetalle = Facturaventadetalle;
