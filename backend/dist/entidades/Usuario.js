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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const Cliente_1 = require("./Cliente");
const Empleado_1 = require("./Empleado");
let Usuario = class Usuario {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "auth0Id", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "auth0Id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "username", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cliente_1.Cliente, (cliente) => cliente.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "clientes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Empleado_1.Empleado, (empleado) => empleado.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "empleados", void 0);
Usuario = __decorate([
    (0, typeorm_1.Entity)("usuario", { schema: "el_buen_sabor" })
], Usuario);
exports.Usuario = Usuario;
