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
exports.Sucursalempresa = void 0;
const typeorm_1 = require("typeorm");
const Empleado_1 = require("./Empleado");
const Pedidoventa_1 = require("./Pedidoventa");
const Empresa_1 = require("./Empresa");
const Domicilio_1 = require("./Domicilio");
const Sucursalinsumo_1 = require("./Sucursalinsumo");
let Sucursalempresa = class Sucursalempresa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Sucursalempresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Sucursalempresa.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)("time", { name: "horarioApertura", nullable: true }),
    __metadata("design:type", String)
], Sucursalempresa.prototype, "horarioApertura", void 0);
__decorate([
    (0, typeorm_1.Column)("time", { name: "horarioCierre", nullable: true }),
    __metadata("design:type", String)
], Sucursalempresa.prototype, "horarioCierre", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "empresa_id", nullable: true }),
    __metadata("design:type", Number)
], Sucursalempresa.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "domicilio_id", nullable: true }),
    __metadata("design:type", Number)
], Sucursalempresa.prototype, "domicilioId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Empleado_1.Empleado, (empleado) => empleado.sucursal),
    __metadata("design:type", Array)
], Sucursalempresa.prototype, "empleados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Pedidoventa_1.Pedidoventa, (pedidoventa) => pedidoventa.sucursal),
    __metadata("design:type", Array)
], Sucursalempresa.prototype, "pedidoventas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Empresa_1.Empresa, (empresa) => empresa.sucursalempresas, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "empresa_id", referencedColumnName: "id" }]),
    __metadata("design:type", Empresa_1.Empresa)
], Sucursalempresa.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Domicilio_1.Domicilio, (domicilio) => domicilio.sucursalempresas, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "domicilio_id", referencedColumnName: "id" }]),
    __metadata("design:type", Domicilio_1.Domicilio)
], Sucursalempresa.prototype, "domicilio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sucursalinsumo_1.Sucursalinsumo, (sucursalinsumo) => sucursalinsumo.sucursal),
    __metadata("design:type", Array)
], Sucursalempresa.prototype, "sucursalinsumos", void 0);
Sucursalempresa = __decorate([
    (0, typeorm_1.Index)("empresa_id", ["empresaId"], {}),
    (0, typeorm_1.Index)("domicilio_id", ["domicilioId"], {}),
    (0, typeorm_1.Entity)("sucursalempresa", { schema: "el_buen_sabor" })
], Sucursalempresa);
exports.Sucursalempresa = Sucursalempresa;
