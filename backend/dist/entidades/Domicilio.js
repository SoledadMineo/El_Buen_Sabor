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
exports.Domicilio = void 0;
const typeorm_1 = require("typeorm");
const Cliente_1 = require("./Cliente");
const Localidad_1 = require("./Localidad");
const Sucursalempresa_1 = require("./Sucursalempresa");
let Domicilio = class Domicilio {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Domicilio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "calle", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Domicilio.prototype, "calle", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "numero", nullable: true }),
    __metadata("design:type", Number)
], Domicilio.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "cp", nullable: true }),
    __metadata("design:type", Number)
], Domicilio.prototype, "cp", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "localidad_id", nullable: true }),
    __metadata("design:type", Number)
], Domicilio.prototype, "localidadId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cliente_1.Cliente, (cliente) => cliente.domicilio),
    __metadata("design:type", Array)
], Domicilio.prototype, "clientes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Localidad_1.Localidad, (localidad) => localidad.domicilios, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "localidad_id", referencedColumnName: "id" }]),
    __metadata("design:type", Localidad_1.Localidad)
], Domicilio.prototype, "localidad", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sucursalempresa_1.Sucursalempresa, (sucursalempresa) => sucursalempresa.domicilio),
    __metadata("design:type", Array)
], Domicilio.prototype, "sucursalempresas", void 0);
Domicilio = __decorate([
    (0, typeorm_1.Index)("localidad_id", ["localidadId"], {}),
    (0, typeorm_1.Entity)("domicilio", { schema: "el_buen_sabor" })
], Domicilio);
exports.Domicilio = Domicilio;
