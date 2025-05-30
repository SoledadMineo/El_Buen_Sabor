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
exports.Facturaventa = void 0;
const typeorm_1 = require("typeorm");
const Pedidoventa_1 = require("./Pedidoventa");
const Facturaventadetalle_1 = require("./Facturaventadetalle");
let Facturaventa = class Facturaventa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Facturaventa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "fechaFacturacion", nullable: true }),
    __metadata("design:type", String)
], Facturaventa.prototype, "fechaFacturacion", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "numeroComprobante", nullable: true, length: 50 }),
    __metadata("design:type", String)
], Facturaventa.prototype, "numeroComprobante", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "formaPago",
        nullable: true,
        enum: ["efectivo", "MercadoPago"],
    }),
    __metadata("design:type", String)
], Facturaventa.prototype, "formaPago", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "subtotal",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", String)
], Facturaventa.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "descuento",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", String)
], Facturaventa.prototype, "descuento", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "gastosEnvio",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", String)
], Facturaventa.prototype, "gastosEnvio", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "totalVenta",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", String)
], Facturaventa.prototype, "totalVenta", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "pedidoVenta_id", nullable: true }),
    __metadata("design:type", Number)
], Facturaventa.prototype, "pedidoVentaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pedidoventa_1.Pedidoventa, (pedidoventa) => pedidoventa.facturaventas, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "pedidoVenta_id", referencedColumnName: "id" }]),
    __metadata("design:type", Pedidoventa_1.Pedidoventa)
], Facturaventa.prototype, "pedidoVenta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Facturaventadetalle_1.Facturaventadetalle, (facturaventadetalle) => facturaventadetalle.facturaVenta),
    __metadata("design:type", Array)
], Facturaventa.prototype, "facturaventadetalles", void 0);
Facturaventa = __decorate([
    (0, typeorm_1.Index)("pedidoVenta_id", ["pedidoVentaId"], {}),
    (0, typeorm_1.Entity)("facturaventa", { schema: "el_buen_sabor" })
], Facturaventa);
exports.Facturaventa = Facturaventa;
