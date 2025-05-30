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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Domicilio_1 = require("./Domicilio");
const Pedidoventa_1 = require("./Pedidoventa");
let Cliente = class Cliente {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Cliente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "apellido", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Cliente.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "telefono", nullable: true, length: 20 }),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "usuario_id", nullable: true }),
    __metadata("design:type", Number)
], Cliente.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "domicilio_id", nullable: true }),
    __metadata("design:type", Number)
], Cliente.prototype, "domicilioId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.clientes, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "usuario_id", referencedColumnName: "id" }]),
    __metadata("design:type", Usuario_1.Usuario)
], Cliente.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Domicilio_1.Domicilio, (domicilio) => domicilio.clientes, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "domicilio_id", referencedColumnName: "id" }]),
    __metadata("design:type", Domicilio_1.Domicilio)
], Cliente.prototype, "domicilio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Pedidoventa_1.Pedidoventa, (pedidoventa) => pedidoventa.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "pedidoventas", void 0);
Cliente = __decorate([
    (0, typeorm_1.Index)("usuario_id", ["usuarioId"], {}),
    (0, typeorm_1.Index)("domicilio_id", ["domicilioId"], {}),
    (0, typeorm_1.Entity)("cliente", { schema: "el_buen_sabor" })
], Cliente);
exports.Cliente = Cliente;
