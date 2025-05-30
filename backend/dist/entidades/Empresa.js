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
exports.Empresa = void 0;
const typeorm_1 = require("typeorm");
const Sucursalempresa_1 = require("./Sucursalempresa");
let Empresa = class Empresa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Empresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Empresa.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "razonSocial", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Empresa.prototype, "razonSocial", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "cuil", nullable: true }),
    __metadata("design:type", Number)
], Empresa.prototype, "cuil", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sucursalempresa_1.Sucursalempresa, (sucursalempresa) => sucursalempresa.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "sucursalempresas", void 0);
Empresa = __decorate([
    (0, typeorm_1.Entity)("empresa", { schema: "el_buen_sabor" })
], Empresa);
exports.Empresa = Empresa;
