import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Unidadmedida } from '../entidades/Unidadmedida';

export class UnidadMedidaControlador {
  static async crear(req: Request, res: Response) {
    try {
      const { denominacion } = req.body;
      if (!denominacion) return res.status(400).json({ mensaje: 'Denominación requerida' });

      const repo = AppDataSource.getRepository(Unidadmedida);

      const existe = await repo.findOneBy({ denominacion });
      if (existe) return res.status(409).json({ mensaje: 'Ya existe una unidad con esa denominación' });

      const nueva = repo.create({ denominacion });
      await repo.save(nueva);
      return res.status(201).json(nueva);
    } catch (error) {
      console.error('Error al crear unidad:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async obtenerTodas(_: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Unidadmedida);
      const unidades = await repo.find();
      return res.status(200).json(unidades);
    } catch (error) {
      console.error('Error al obtener unidades:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
}
