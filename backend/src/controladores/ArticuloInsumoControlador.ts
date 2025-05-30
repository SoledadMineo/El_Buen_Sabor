import { Request, Response } from 'express';
import { unlinkSync } from 'fs';
import { AppDataSource } from '../data-source';
import { Articuloinsumo } from '../entidades/Articuloinsumo';
import { Unidadmedida } from '../entidades/Unidadmedida';
import { Categoriaarticulo } from '../entidades/Categoriaarticulo';
import { Imageninsumo } from '../entidades/Imageninsumo';

export class ArticuloInsumoControlador {
  static async crear(req: Request, res: Response) {
    try {
      const {
        denominacion,
        precioCompra,
        precioVenta,
        esParaElaborar,
        unidad_medida_id,
        categoria_id,
        imagen_id
      } = req.body;

      const repo = AppDataSource.getRepository(Articuloinsumo);
      const repoUnidad = AppDataSource.getRepository(Unidadmedida);
      const repoCategoria = AppDataSource.getRepository(Categoriaarticulo);
      const repoImagen = AppDataSource.getRepository(Imageninsumo);

      const insumo = new Articuloinsumo();
      insumo.denominacion = denominacion;
      insumo.precioCompra = precioCompra;
      insumo.precioVenta = precioVenta;
      insumo.esParaElaborar = esParaElaborar;

      // Relaciones opcionales
      if (unidad_medida_id) {
        const unidad = await repoUnidad.findOneBy({ id: unidad_medida_id });
        if (!unidad) return res.status(400).json({ mensaje: 'Unidad de medida no encontrada' });
        insumo.unidadMedida = unidad;
      }

      if (categoria_id) {
        const categoria = await repoCategoria.findOneBy({ id: categoria_id });
        if (!categoria) return res.status(400).json({ mensaje: 'Categoría no encontrada' });
        insumo.categoria = categoria;
      }

      // Procesar imagen subida
      const archivo = req.file;
      if (archivo) {
        const nuevaImagen = new Imageninsumo();
        nuevaImagen.denominacion = `uploads/insumos/${archivo.filename}`;
        await repoImagen.save(nuevaImagen);
        insumo.imagen = nuevaImagen;
      }


      await repo.save(insumo);
      return res.status(201).json(insumo);
    } catch (error) {
      console.error('Error al crear insumo:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async obtenerTodos(_req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Articuloinsumo);

      const insumos = await repo.find({
        relations: ['unidadMedida', 'categoria', 'imagen'], // opcional: incluir relaciones
      });

      return res.status(200).json(insumos);
    } catch (error) {
      console.error('Error al obtener insumos:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async editar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const {
        denominacion,
        precioCompra,
        precioVenta,
        esParaElaborar,
        unidad_medida_id,
        categoria_id,
        imagen_id
      } = req.body;

      const repo = AppDataSource.getRepository(Articuloinsumo);
      const insumo = await repo.findOne({
        where: { id: Number(id) },
        relations: ['unidadMedida', 'categoria', 'imagen']
      });

      if (!insumo) {
        return res.status(404).json({ mensaje: 'Insumo no encontrado' });
      }

      // Actualizar campos, si no se envian desde el front, mantener el valor actual
      insumo.denominacion = denominacion ?? insumo.denominacion;
      insumo.precioCompra = precioCompra ?? insumo.precioCompra;
      insumo.precioVenta = precioVenta ?? insumo.precioVenta;
      insumo.esParaElaborar = esParaElaborar ?? insumo.esParaElaborar;

      const repoUnidad = AppDataSource.getRepository(Unidadmedida);
      const repoCategoria = AppDataSource.getRepository(Categoriaarticulo);
      const repoImagen = AppDataSource.getRepository(Imageninsumo);

      if (unidad_medida_id !== undefined) {
        const unidad = await repoUnidad.findOneBy({ id: unidad_medida_id });
        if (!unidad) return res.status(400).json({ mensaje: 'Unidad de medida no encontrada' });
        insumo.unidadMedida = unidad;
      }

      if (categoria_id !== undefined) {
        const categoria = await repoCategoria.findOneBy({ id: categoria_id });
        if (!categoria) return res.status(400).json({ mensaje: 'Categoría no encontrada' });
        insumo.categoria = categoria;
      }

      const archivo = req.file;
      if (archivo) {
        // Eliminar imagen previa si existe
        if (insumo.imagen?.denominacion) {
          try {
            unlinkSync(insumo.imagen.denominacion);
          } catch (_) {
            console.warn('No se pudo eliminar imagen anterior');
          }
        }

        const nuevaImagen = new Imageninsumo();
        nuevaImagen.denominacion = `uploads/insumos/${archivo.filename}`;
        await repoImagen.save(nuevaImagen);

        insumo.imagen = nuevaImagen;
      }

      await repo.save(insumo);
      return res.status(200).json(insumo);
    } catch (error) {
      console.error('Error al editar insumo:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
}
