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
exports.Datosmercadopago = void 0;
const typeorm_1 = require("typeorm");
const Pedidoventa_1 = require("./Pedidoventa");
let Datosmercadopago = class Datosmercadopago {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Datosmercadopago.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "date_created", nullable: true }),
    __metadata("design:type", Date)
], Datosmercadopago.prototype, "dateCreated", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "date_approved", nullable: true }),
    __metadata("design:type", Date)
], Datosmercadopago.prototype, "dateApproved", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "date_last_updated", nullable: true }),
    __metadata("design:type", Date)
], Datosmercadopago.prototype, "dateLastUpdated", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "payment_type_id", nullable: true, length: 50 }),
    __metadata("design:type", String)
], Datosmercadopago.prototype, "paymentTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "payment_method_id", nullable: true, length: 50 }),
    __metadata("design:type", String)
], Datosmercadopago.prototype, "paymentMethodId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "status", nullable: true, length: 50 }),
    __metadata("design:type", String)
], Datosmercadopago.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "status_detail", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Datosmercadopago.prototype, "statusDetail", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "pedidoVenta_id", nullable: true }),
    __metadata("design:type", Number)
], Datosmercadopago.prototype, "pedidoVentaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pedidoventa_1.Pedidoventa, (pedidoventa) => pedidoventa.datosmercadopagos, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "pedidoVenta_id", referencedColumnName: "id" }]),
    __metadata("design:type", Pedidoventa_1.Pedidoventa)
], Datosmercadopago.prototype, "pedidoVenta", void 0);
Datosmercadopago = __decorate([
    (0, typeorm_1.Index)("pedidoVenta_id", ["pedidoVentaId"], {}),
    (0, typeorm_1.Entity)("datosmercadopago", { schema: "el_buen_sabor" })
], Datosmercadopago);
exports.Datosmercadopago = Datosmercadopago;
