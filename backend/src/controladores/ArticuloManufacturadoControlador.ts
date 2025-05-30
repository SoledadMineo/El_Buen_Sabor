import { Request, Response } from 'express';
import { unlinkSync } from 'fs';
import { AppDataSource } from '../data-source';
import { Articulomanufacturado } from '../entidades/Articulomanufacturado';
import { Categoriaarticulomanufacturado } from '../entidades/Categoriaarticulomanufacturado';
import { Articuloinsumo } from '../entidades/Articuloinsumo';
import { Articulomanufacturadodetalle } from '../entidades/Articulomanufacturadodetalle';
import { Imagenmanufacturado } from '../entidades/Imagenmanufacturado';

export class ArticuloManufacturadoControlador {
  static async crear(req: Request, res: Response) {
    try {
      const {
        denominacion,
        descripcion,
        precioVenta,
        precioCosto,
        tiempoEstimado,
        categoria_id,
        detalles
      } = req.body;

      const parsedDetalles = JSON.parse(detalles); // Asegurarse que es un array

      const repoArticulo = AppDataSource.getRepository(Articulomanufacturado);
      const repoCategoria = AppDataSource.getRepository(Categoriaarticulomanufacturado);
      const repoInsumo = AppDataSource.getRepository(Articuloinsumo);

      const categoria = await repoCategoria.findOneBy({ id: Number(categoria_id) });
      if (!categoria) return res.status(400).json({ mensaje: 'Categoría no encontrada' });

      const nuevoArticulo = new Articulomanufacturado();
      nuevoArticulo.denominacion = denominacion;
      nuevoArticulo.descripcion = descripcion;
      nuevoArticulo.precioVenta = precioVenta;
      nuevoArticulo.precioCosto = precioCosto;
      nuevoArticulo.tiempoEstimado = tiempoEstimado;
      nuevoArticulo.categoria = categoria;

      // Guardar primero para tener ID
      await repoArticulo.save(nuevoArticulo);

      // Crear detalles
      for (const d of parsedDetalles) {
        const insumo = await repoInsumo.findOneBy({ id: d.articuloInsumo_id });
        if (!insumo) throw new Error(`Insumo con ID ${d.articuloInsumo_id} no encontrado`);

        const detalle = new Articulomanufacturadodetalle();
        detalle.cantidad = d.cantidad;
        detalle.articuloManufacturado = nuevoArticulo;
        detalle.articuloInsumo = insumo;

        await AppDataSource.getRepository(Articulomanufacturadodetalle).save(detalle);
      }

      // Subir imágenes
      const archivos = req.files as Express.Multer.File[];
      for (const file of archivos) {
        const imagen = new Imagenmanufacturado();
        imagen.denominacion = `uploads/articulos/${file.filename}`;
        imagen.articuloManufacturado = nuevoArticulo;

        await AppDataSource.getRepository(Imagenmanufacturado).save(imagen);
      }

      return res.status(201).json({ mensaje: 'Artículo creado con éxito', id: nuevoArticulo.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: error.message || 'Error al crear artículo' });
    }
  }

  static async obtenerTodos(_req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Articulomanufacturado);

      const articulos = await repo.find({
        relations: [
          'categoria',
          'articulomanufacturadodetalles',
          'articulomanufacturadodetalles.articuloInsumo',
          'imagenmanufacturados'
        ],
      });

      return res.status(200).json(articulos);
    } catch (error) {
      console.error('Error al obtener artículos:', error instanceof Error ? error.message : error);
      return res.status(500).json({ mensaje: 'Error interno del servidor', detalle: error instanceof Error ? error.message : error });
    }
  }

  static async editar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        denominacion,
        descripcion,
        precioVenta,
        precioCosto,
        tiempoEstimado,
        categoria_id,
        imagenes: imagenesDesdeFrontend
      } = req.body;

      const repoArticulo = AppDataSource.getRepository(Articulomanufacturado);
      const repoImagen = AppDataSource.getRepository(Imagenmanufacturado);
      const articulo = await repoArticulo.findOne({
        where: { id: Number(id) },
        relations: ['categoria', 'imagenmanufacturados'],
      });

      if (!articulo) return res.status(404).json({ mensaje: 'Artículo no encontrado' });

      if (categoria_id) {
        const repoCategoria = AppDataSource.getRepository(Categoriaarticulomanufacturado);
        const categoria = await repoCategoria.findOneBy({ id: Number(categoria_id) });
        if (!categoria) return res.status(400).json({ mensaje: 'Categoría no encontrada' });
        articulo.categoria = categoria;
      }

      articulo.denominacion = denominacion ?? articulo.denominacion;
      articulo.descripcion = descripcion ?? articulo.descripcion;
      articulo.precioVenta = precioVenta ?? articulo.precioVenta;
      articulo.precioCosto = precioCosto ?? articulo.precioCosto;
      articulo.tiempoEstimado = tiempoEstimado ?? articulo.tiempoEstimado;

      // mantener imágenes existentes si se enviaron como string
      let nuevasImagenesDesdeFrontend: string[] = [];
      try {
        nuevasImagenesDesdeFrontend = JSON.parse(imagenesDesdeFrontend);
      } catch (_) {
        nuevasImagenesDesdeFrontend = Array.isArray(imagenesDesdeFrontend)
          ? imagenesDesdeFrontend
          : [];
      }

      const imagenesActuales = articulo.imagenmanufacturados ?? [];

      // Eliminar imágenes que ya no están
      for (const img of imagenesActuales) {
        if (!nuevasImagenesDesdeFrontend.includes(img.denominacion)) {
          try {
            // Borrar del disco
            const fs = await import('fs');
            fs.unlinkSync(img.denominacion);
          } catch (e) {
            console.warn('No se pudo eliminar del disco:', img.denominacion);
          }
          await repoImagen.remove(img); // Borrar de la DB
        }
      }

      // agregar archivos nuevos
      const archivos = req.files as Express.Multer.File[];
      if (archivos && archivos.length > 0) {
        for (const archivo of archivos) {
          const nuevaImagen = new Imagenmanufacturado();
          nuevaImagen.denominacion = `uploads/articulos/${archivo.filename}`;
          nuevaImagen.articuloManufacturado = articulo;
          await repoImagen.save(nuevaImagen);
        }
      }

      // revisar detalles
      if (req.body.detalles) {
        const parsedDetalles = JSON.parse(req.body.detalles);
        const repoDetalle = AppDataSource.getRepository(Articulomanufacturadodetalle);
        const repoInsumo = AppDataSource.getRepository(Articuloinsumo);

        // Traer los detalles actuales del artículo
        const detallesExistentes = await repoDetalle.find({
          where: { articuloManufacturado: { id: articulo.id } },
          relations: ['articuloInsumo']
        });

        // const detallesActualizadosIds = parsedDetalles.map((d: any) => d.articuloInsumo_id);

        // Eliminar los que ya no están
        for (const detallePrevio of detallesExistentes) {
          const existeEnNuevo = parsedDetalles.find(
            (det: any) => det.articuloInsumo_id === detallePrevio.articuloInsumo.id
          );
          if (!existeEnNuevo) {
            await repoDetalle.remove(detallePrevio);
          }
        }

        // Agregar nuevos o actualizar cantidades si cambian
        for (const nuevoDetalle of parsedDetalles) {
          const detalleExistente = detallesExistentes.find(
            (det) => det.articuloInsumo.id === nuevoDetalle.articuloInsumo_id
          );

          if (detalleExistente) {
            // Actualizar cantidad si es distinta
            if (detalleExistente.cantidad !== nuevoDetalle.cantidad) {
              detalleExistente.cantidad = nuevoDetalle.cantidad;
              await repoDetalle.save(detalleExistente);
            }
          } else {
            // Agregar nuevo detalle
            const insumo = await repoInsumo.findOneBy({ id: nuevoDetalle.articuloInsumo_id });
            if (!insumo) throw new Error(`Insumo con ID ${nuevoDetalle.articuloInsumo_id} no encontrado`);

            const nuevo = new Articulomanufacturadodetalle();
            nuevo.articuloInsumo = insumo;
            nuevo.articuloManufacturado = articulo;
            nuevo.cantidad = nuevoDetalle.cantidad;

            await repoDetalle.save(nuevo);
          }
        }
      }

      await repoArticulo.save(articulo);
      return res.status(200).json({ mensaje: 'Artículo actualizado correctamente' });
    } catch (error) {
      console.error('Error al editar artículo:', error);
      return res.status(500).json({ mensaje: error.message || 'Error interno del servidor' });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const repo = AppDataSource.getRepository(Articulomanufacturado);
      const articulo = await repo.findOne({
        where: { id: Number(id) },
        relations: ['imagenmanufacturados'],
      });

      if (!articulo) return res.status(404).json({ mensaje: 'Artículo no encontrado' });

      // Opcional: eliminar imágenes del disco
      for (const imagen of articulo.imagenmanufacturados || []) {
        try {
          const fs = await import('fs');
          fs.unlinkSync(imagen.denominacion);
        } catch (_) {
          console.warn('No se pudo borrar una imagen');
        }
      }

      await repo.remove(articulo);
      return res.status(200).json({ mensaje: 'Artículo eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar artículo:', error);
      return res.status(500).json({ mensaje: error.message || 'Error interno' });
    }
  }
}
