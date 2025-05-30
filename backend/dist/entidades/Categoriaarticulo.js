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
var Categoriaarticulo_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoriaarticulo = void 0;
const typeorm_1 = require("typeorm");
const Articuloinsumo_1 = require("./Articuloinsumo");
let Categoriaarticulo = Categoriaarticulo_1 = class Categoriaarticulo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Categoriaarticulo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "denominacion", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Categoriaarticulo.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "subcategoria_id", nullable: true }),
    __metadata("design:type", Number)
], Categoriaarticulo.prototype, "subcategoriaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Articuloinsumo_1.Articuloinsumo, (articuloinsumo) => articuloinsumo.categoria),
    __metadata("design:type", Array)
], Categoriaarticulo.prototype, "articuloinsumos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Categoriaarticulo_1, (categoriaarticulo) => categoriaarticulo.categoriaarticulos, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "subcategoria_id", referencedColumnName: "id" }]),
    __metadata("design:type", Categoriaarticulo)
], Categoriaarticulo.prototype, "subcategoria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Categoriaarticulo_1, (categoriaarticulo) => categoriaarticulo.subcategoria),
    __metadata("design:type", Array)
], Categoriaarticulo.prototype, "categoriaarticulos", void 0);
Categoriaarticulo = Categoriaarticulo_1 = __decorate([
    (0, typeorm_1.Index)("fk_categoria_subcategoria", ["subcategoriaId"], {}),
    (0, typeorm_1.Entity)("categoriaarticulo", { schema: "el_buen_sabor" })
], Categoriaarticulo);
exports.Categoriaarticulo = Categoriaarticulo;
