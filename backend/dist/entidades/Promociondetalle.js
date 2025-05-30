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
exports.Promociondetalle = void 0;
const typeorm_1 = require("typeorm");
const Promocion_1 = require("./Promocion");
const Articulomanufacturado_1 = require("./Articulomanufacturado");
let Promociondetalle = class Promociondetalle {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Promociondetalle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "cantidad", nullable: true }),
    __metadata("design:type", Number)
], Promociondetalle.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "promocion_id", nullable: true }),
    __metadata("design:type", Number)
], Promociondetalle.prototype, "promocionId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "articuloManufacturado_id", nullable: true }),
    __metadata("design:type", Number)
], Promociondetalle.prototype, "articuloManufacturadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Promocion_1.Promocion, (promocion) => promocion.promociondetalles, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "promocion_id", referencedColumnName: "id" }]),
    __metadata("design:type", Promocion_1.Promocion)
], Promociondetalle.prototype, "promocion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Articulomanufacturado_1.Articulomanufacturado, (articulomanufacturado) => articulomanufacturado.promociondetalles, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([
        { name: "articuloManufacturado_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", Articulomanufacturado_1.Articulomanufacturado)
], Promociondetalle.prototype, "articuloManufacturado", void 0);
Promociondetalle = __decorate([
    (0, typeorm_1.Index)("promocion_id", ["promocionId"], {}),
    (0, typeorm_1.Index)("articuloManufacturado_id", ["articuloManufacturadoId"], {}),
    (0, typeorm_1.Entity)("promociondetalle", { schema: "el_buen_sabor" })
], Promociondetalle);
exports.Promociondetalle = Promociondetalle;
