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
exports.Localidad = void 0;
const typeorm_1 = require("typeorm");
const Domicilio_1 = require("./Domicilio");
const Provincia_1 = require("./Provincia");
let Localidad = class Localidad {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Localidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre", length: 100 }),
    __metadata("design:type", String)
], Localidad.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "provincia_id", nullable: true }),
    __metadata("design:type", Number)
], Localidad.prototype, "provinciaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Domicilio_1.Domicilio, (domicilio) => domicilio.localidad),
    __metadata("design:type", Array)
], Localidad.prototype, "domicilios", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Provincia_1.Provincia, (provincia) => provincia.localidads, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "provincia_id", referencedColumnName: "id" }]),
    __metadata("design:type", Provincia_1.Provincia)
], Localidad.prototype, "provincia", void 0);
Localidad = __decorate([
    (0, typeorm_1.Index)("provincia_id", ["provinciaId"], {}),
    (0, typeorm_1.Entity)("localidad", { schema: "el_buen_sabor" })
], Localidad);
exports.Localidad = Localidad;
