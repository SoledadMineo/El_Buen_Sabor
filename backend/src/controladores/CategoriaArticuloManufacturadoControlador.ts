import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Categoriaarticulomanufacturado } from '../entidades/Categoriaarticulomanufacturado';

export class CategoriaArticuloManufacturadoControlador {
  static async crear(req: Request, res: Response) {
    try {
      const { denominacion } = req.body;

      if (!denominacion) {
        return res.status(400).json({ mensaje: 'El campo "denominacion" es requerido' });
      }

      const repo = AppDataSource.getRepository(Categoriaarticulomanufacturado);

      const existente = await repo.findOneBy({ denominacion });
      if (existente) {
        return res.status(409).json({ mensaje: 'Ya existe una categoría con esa denominación' });
      }

      const nueva = repo.create({ denominacion });
      await repo.save(nueva);

      return res.status(201).json(nueva);
    } catch (error) {
      console.error('Error al crear categoría:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async obtenerTodas(_: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Categoriaarticulomanufacturado);
      const categorias = await repo.find();
      return res.status(200).json(categorias);
    } catch (error) {
      console.error('Error al obtener categorias:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
}
