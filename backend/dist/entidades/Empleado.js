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
exports.Empleado = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Sucursalempresa_1 = require("./Sucursalempresa");
let Empleado = class Empleado {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Empleado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Empleado.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "apellido", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Empleado.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "telefono", nullable: true, length: 20 }),
    __metadata("design:type", String)
], Empleado.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Empleado.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "perfilRol",
        nullable: true,
        enum: ["admin", "empleado", "cliente"],
    }),
    __metadata("design:type", String)
], Empleado.prototype, "perfilRol", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "usuario_id", nullable: true }),
    __metadata("design:type", Number)
], Empleado.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "sucursal_id", nullable: true }),
    __metadata("design:type", Number)
], Empleado.prototype, "sucursalId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.empleados, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "usuario_id", referencedColumnName: "id" }]),
    __metadata("design:type", Usuario_1.Usuario)
], Empleado.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sucursalempresa_1.Sucursalempresa, (sucursalempresa) => sucursalempresa.empleados, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "sucursal_id", referencedColumnName: "id" }]),
    __metadata("design:type", Sucursalempresa_1.Sucursalempresa)
], Empleado.prototype, "sucursal", void 0);
Empleado = __decorate([
    (0, typeorm_1.Index)("usuario_id", ["usuarioId"], {}),
    (0, typeorm_1.Index)("sucursal_id", ["sucursalId"], {}),
    (0, typeorm_1.Entity)("empleado", { schema: "el_buen_sabor" })
], Empleado);
exports.Empleado = Empleado;
