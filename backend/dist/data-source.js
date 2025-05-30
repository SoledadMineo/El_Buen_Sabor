"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata"); // necesario para TypeORM
const typeorm_1 = require("typeorm"); // importamos DataSource
const path_1 = require("path"); // importamos join para las rutas
const isCompiled = __dirname.includes('dist');
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'el_buen_sabor',
    synchronize: true,
    logging: false,
    entities: [(0, path_1.join)(__dirname, isCompiled ? './entidades/*.js' : './entidades/*.ts')],
    migrations: [(0, path_1.join)(__dirname, isCompiled ? './migrations/*.js' : '../migrations/*.ts')],
    subscribers: [],
});
