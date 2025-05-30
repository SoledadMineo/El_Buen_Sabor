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
exports.Sucursalinsumo = void 0;
const typeorm_1 = require("typeorm");
const Sucursalempresa_1 = require("./Sucursalempresa");
const Articuloinsumo_1 = require("./Articuloinsumo");
let Sucursalinsumo = class Sucursalinsumo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Sucursalinsumo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "stockActual", nullable: true }),
    __metadata("design:type", Number)
], Sucursalinsumo.prototype, "stockActual", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "stockMinimo", nullable: true }),
    __metadata("design:type", Number)
], Sucursalinsumo.prototype, "stockMinimo", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "stockMaximo", nullable: true }),
    __metadata("design:type", Number)
], Sucursalinsumo.prototype, "stockMaximo", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "sucursal_id", nullable: true }),
    __metadata("design:type", Number)
], Sucursalinsumo.prototype, "sucursalId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "articuloInsumo_id", nullable: true }),
    __metadata("design:type", Number)
], Sucursalinsumo.prototype, "articuloInsumoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sucursalempresa_1.Sucursalempresa, (sucursalempresa) => sucursalempresa.sucursalinsumos, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "sucursal_id", referencedColumnName: "id" }]),
    __metadata("design:type", Sucursalempresa_1.Sucursalempresa)
], Sucursalinsumo.prototype, "sucursal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Articuloinsumo_1.Articuloinsumo, (articuloinsumo) => articuloinsumo.sucursalinsumos, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "articuloInsumo_id", referencedColumnName: "id" }]),
    __metadata("design:type", Articuloinsumo_1.Articuloinsumo)
], Sucursalinsumo.prototype, "articuloInsumo", void 0);
Sucursalinsumo = __decorate([
    (0, typeorm_1.Index)("sucursal_id", ["sucursalId"], {}),
    (0, typeorm_1.Index)("articuloInsumo_id", ["articuloInsumoId"], {}),
    (0, typeorm_1.Entity)("sucursalinsumo", { schema: "el_buen_sabor" })
], Sucursalinsumo);
exports.Sucursalinsumo = Sucursalinsumo;
