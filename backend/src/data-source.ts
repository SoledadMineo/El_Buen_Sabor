import 'reflect-metadata';          // necesario para TypeORM
import { DataSource } from 'typeorm';  // importamos DataSource
import { join } from 'path';           // importamos join para las rutas

const isCompiled = __dirname.includes('dist');

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'el_buen_sabor',
    synchronize: true,
    logging: false,
    entities: [join(__dirname, isCompiled ? './entidades/*.js' : './entidades/*.ts')],
    migrations: [join(__dirname, isCompiled ? './migrations/*.js' : '../migrations/*.ts')],
    subscribers: [],
});
