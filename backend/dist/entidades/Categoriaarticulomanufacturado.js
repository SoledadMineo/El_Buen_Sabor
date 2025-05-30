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
exports.Categoriaarticulomanufacturado = void 0;
const typeorm_1 = require("typeorm");
const Articulomanufacturado_1 = require("./Articulomanufacturado");
let Categoriaarticulomanufacturado = class Categoriaarticulomanufacturado {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Categoriaarticulomanufacturado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "denominacion", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Categoriaarticulomanufacturado.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Articulomanufacturado_1.Articulomanufacturado, (articulomanufacturado) => articulomanufacturado.categoria),
    __metadata("design:type", Array)
], Categoriaarticulomanufacturado.prototype, "articulomanufacturados", void 0);
Categoriaarticulomanufacturado = __decorate([
    (0, typeorm_1.Entity)("categoriaarticulomanufacturado", { schema: "el_buen_sabor" })
], Categoriaarticulomanufacturado);
exports.Categoriaarticulomanufacturado = Categoriaarticulomanufacturado;
