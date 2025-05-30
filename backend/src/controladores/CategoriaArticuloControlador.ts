import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Categoriaarticulo } from '../entidades/Categoriaarticulo';

export class CategoriaArticuloControlador {
  static async crear(req: Request, res: Response) {
    try {
      const { denominacion, subcategoria_id } = req.body;

      const repo = AppDataSource.getRepository(Categoriaarticulo);
      const nueva = new Categoriaarticulo();
      nueva.denominacion = denominacion;

      if (subcategoria_id) {
        const subcategoria = await repo.findOneBy({ id: subcategoria_id });
        if (!subcategoria) return res.status(400).json({ mensaje: 'Subcategoría no encontrada' });
        nueva.subcategoria = subcategoria;
      }

      await repo.save(nueva);
      return res.status(201).json(nueva);
    } catch (error) {
      console.error('Error al crear categoría:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async obtenerTodas(_req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Categoriaarticulo);
      const categorias = await repo.find({
        relations: ['subcategoria']
      });

      return res.status(200).json(categorias);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async editar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { denominacion, subcategoria_id } = req.body;

      const repo = AppDataSource.getRepository(Categoriaarticulo);
      const categoria = await repo.findOne({
        where: { id: Number(id) },
        relations: ['subcategoria']
      });

      if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });

      categoria.denominacion = denominacion ?? categoria.denominacion;

      if (subcategoria_id !== undefined) {
        const subcategoria = await repo.findOneBy({ id: subcategoria_id });
        if (!subcategoria) return res.status(400).json({ mensaje: 'Subcategoría no encontrada' });
        categoria.subcategoria = subcategoria;
      }

      await repo.save(categoria);
      return res.status(200).json(categoria);
    } catch (error) {
      console.error('Error al editar categoría:', error);
      return res.status(500).json({ mensaje: error.message || 'Error interno del servidor' });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repo = AppDataSource.getRepository(Categoriaarticulo);
      const categoria = await repo.findOne({
        where: { id: Number(id) },
        relations: ['categoriaarticulos', 'articuloinsumos']
      });

      if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });

      // Verificar que no tenga subcategorías o insumos asociados
      if ((categoria.categoriaarticulos?.length ?? 0) > 0) {
        return res.status(400).json({ mensaje: 'No se puede eliminar una categoría que tiene subcategorías.' });
      }

      if ((categoria.articuloinsumos?.length ?? 0) > 0) {
        return res.status(400).json({ mensaje: 'No se puede eliminar una categoría que tiene insumos asociados.' });
      }

      await repo.remove(categoria);
      return res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      return res.status(500).json({ mensaje: error.message || 'Error interno del servidor' });
    }
  }
}
