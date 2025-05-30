"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const data_source_1 = require("./data-source");
const rutas_1 = require("./rutas");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Conexión a la base de datos establecida');
    // directorio para subir las imagenes
    app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
    // Acá van tus rutas    
    rutas_1.routes.forEach(({ path, router }) => app.use(path, router));
    app.listen(3000, () => {
        console.log('Servidor corriendo en el puerto 3000');
    });
    app.get('/', (req, res) => {
        res.send('Backend funcionando correctamente');
    });
})
    .catch((error) => console.error('Error al conectar la base de datos:', error));
