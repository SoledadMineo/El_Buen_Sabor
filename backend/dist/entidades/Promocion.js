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
exports.Promocion = void 0;
const typeorm_1 = require("typeorm");
const Pedidoventadetalle_1 = require("./Pedidoventadetalle");
const Promociondetalle_1 = require("./Promociondetalle");
let Promocion = class Promocion {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Promocion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "denominacion", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Promocion.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "fechaDesde", nullable: true }),
    __metadata("design:type", String)
], Promocion.prototype, "fechaDesde", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "fechaHasta", nullable: true }),
    __metadata("design:type", String)
], Promocion.prototype, "fechaHasta", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "descuento", nullable: true }),
    __metadata("design:type", Number)
], Promocion.prototype, "descuento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Pedidoventadetalle_1.Pedidoventadetalle, (pedidoventadetalle) => pedidoventadetalle.promocion),
    __metadata("design:type", Array)
], Promocion.prototype, "pedidoventadetalles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Promociondetalle_1.Promociondetalle, (promociondetalle) => promociondetalle.promocion),
    __metadata("design:type", Array)
], Promocion.prototype, "promociondetalles", void 0);
Promocion = __decorate([
    (0, typeorm_1.Entity)("promocion", { schema: "el_buen_sabor" })
], Promocion);
exports.Promocion = Promocion;
