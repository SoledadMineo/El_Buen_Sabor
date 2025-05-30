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
exports.Imagenmanufacturado = void 0;
const typeorm_1 = require("typeorm");
const Articulomanufacturado_1 = require("./Articulomanufacturado");
let Imagenmanufacturado = class Imagenmanufacturado {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Imagenmanufacturado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "denominacion", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Imagenmanufacturado.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "articuloManufacturado_id", nullable: true }),
    __metadata("design:type", Number)
], Imagenmanufacturado.prototype, "articuloManufacturadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Articulomanufacturado_1.Articulomanufacturado, (articulomanufacturado) => articulomanufacturado.imagenmanufacturados, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)([
        { name: "articuloManufacturado_id", referencedColumnName: "id" },
    ]),
    __metadata("design:type", Articulomanufacturado_1.Articulomanufacturado)
], Imagenmanufacturado.prototype, "articuloManufacturado", void 0);
Imagenmanufacturado = __decorate([
    (0, typeorm_1.Index)("fk_imagen_articulo", ["articuloManufacturadoId"], {}),
    (0, typeorm_1.Entity)("imagenmanufacturado", { schema: "el_buen_sabor" })
], Imagenmanufacturado);
exports.Imagenmanufacturado = Imagenmanufacturado;
