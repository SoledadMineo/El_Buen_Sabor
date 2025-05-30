import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { AppDataSource } from './data-source';
import { routes } from './rutas';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

AppDataSource.initialize()
  .then(() => {
    console.log('Conexión a la base de datos establecida');

    // directorio para subir las imagenes
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // Acá van tus rutas    
    routes.forEach(({ path, router }) => app.use(path, router));

    app.listen(3000, () => {
      console.log('Servidor corriendo en el puerto 3000');
    });

    app.get('/', (req, res) => {
      res.send('Backend funcionando correctamente');
    });

  })
  .catch((error) => console.error('Error al conectar la base de datos:', error));