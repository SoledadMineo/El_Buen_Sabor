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
exports.Pedidoventa = void 0;
const typeorm_1 = require("typeorm");
const Datosmercadopago_1 = require("./Datosmercadopago");
const Facturaventa_1 = require("./Facturaventa");
const Cliente_1 = require("./Cliente");
const Sucursalempresa_1 = require("./Sucursalempresa");
const Pedidoventadetalle_1 = require("./Pedidoventadetalle");
let Pedidoventa = class Pedidoventa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Pedidoventa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("time", { name: "horaEstimadaFinalizacion", nullable: true }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "horaEstimadaFinalizacion", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "subtotal",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "descuento",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "descuento", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "gastosEnvio",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "gastosEnvio", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { name: "total", nullable: true, precision: 10, scale: 2 }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "totalCosto",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "totalCosto", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "estado",
        nullable: true,
        enum: ["preparacion", "pendiente", "cancelado", "rechazado", "entregado"],
    }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "tipoEnvio",
        nullable: true,
        enum: ["delivery", "TakeAway"],
    }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "tipoEnvio", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "formaPago",
        nullable: true,
        enum: ["efectivo", "MercadoPago"],
    }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "formaPago", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "fechaPedido", nullable: true }),
    __metadata("design:type", String)
], Pedidoventa.prototype, "fechaPedido", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "cliente_id", nullable: true }),
    __metadata("design:type", Number)
], Pedidoventa.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "sucursal_id", nullable: true }),
    __metadata("design:type", Number)
], Pedidoventa.prototype, "sucursalId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Datosmercadopago_1.Datosmercadopago, (datosmercadopago) => datosmercadopago.pedidoVenta),
    __metadata("design:type", Array)
], Pedidoventa.prototype, "datosmercadopagos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Facturaventa_1.Facturaventa, (facturaventa) => facturaventa.pedidoVenta),
    __metadata("design:type", Array)
], Pedidoventa.prototype, "facturaventas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cliente_1.Cliente, (cliente) => cliente.pedidoventas, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "cliente_id", referencedColumnName: "id" }]),
    __metadata("design:type", Cliente_1.Cliente)
], Pedidoventa.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sucursalempresa_1.Sucursalempresa, (sucursalempresa) => sucursalempresa.pedidoventas, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "sucursal_id", referencedColumnName: "id" }]),
    __metadata("design:type", Sucursalempresa_1.Sucursalempresa)
], Pedidoventa.prototype, "sucursal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Pedidoventadetalle_1.Pedidoventadetalle, (pedidoventadetalle) => pedidoventadetalle.pedidoVenta),
    __metadata("design:type", Array)
], Pedidoventa.prototype, "pedidoventadetalles", void 0);
Pedidoventa = __decorate([
    (0, typeorm_1.Index)("cliente_id", ["clienteId"], {}),
    (0, typeorm_1.Index)("sucursal_id", ["sucursalId"], {}),
    (0, typeorm_1.Entity)("pedidoventa", { schema: "el_buen_sabor" })
], Pedidoventa);
exports.Pedidoventa = Pedidoventa;
