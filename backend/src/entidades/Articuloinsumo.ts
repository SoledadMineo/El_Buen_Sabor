import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Unidadmedida } from "./Unidadmedida";
import { Categoriaarticulo } from "./Categoriaarticulo";
import { Imageninsumo } from "./Imageninsumo";
import { Articulomanufacturadodetalle } from "./Articulomanufacturadodetalle";
import { Pedidoventadetalle } from "./Pedidoventadetalle";
import { Sucursalinsumo } from "./Sucursalinsumo";

@Index("unidad_medida_id", ["unidadMedidaId"], {})
@Index("categoria_id", ["categoriaId"], {})
@Index("imagen_id", ["imagenId"], {})
@Entity("articuloinsumo", { schema: "el_buen_sabor" })
export class Articuloinsumo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "denominacion", nullable: true, length: 100 })
  denominacion: string | null;

  @Column("double", { name: "precioCompra", nullable: true })
  precioCompra: number | null;

  @Column("double", { name: "precioVenta", nullable: true })
  precioVenta: number | null;

  @Column("tinyint", { name: "esParaElaborar", nullable: true, width: 1 })
  esParaElaborar: boolean | null;

  @Column("int", { name: "unidad_medida_id", nullable: true })
  unidadMedidaId: number | null;

  @Column("int", { name: "categoria_id", nullable: true })
  categoriaId: number | null;

  @Column("int", { name: "imagen_id", nullable: true })
  imagenId: number | null;

  @ManyToOne(
    () => Unidadmedida,
    (unidadmedida) => unidadmedida.articuloinsumos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "unidad_medida_id", referencedColumnName: "id" }])
  unidadMedida: Unidadmedida;

  @ManyToOne(
    () => Categoriaarticulo,
    (categoriaarticulo) => categoriaarticulo.articuloinsumos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "categoria_id", referencedColumnName: "id" }])
  categoria: Categoriaarticulo;

  @ManyToOne(
    () => Imageninsumo,
    (imageninsumo) => imageninsumo.articuloinsumos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "imagen_id", referencedColumnName: "id" }])
  imagen: Imageninsumo;

  @OneToMany(
    () => Articulomanufacturadodetalle,
    (articulomanufacturadodetalle) =>
      articulomanufacturadodetalle.articuloInsumo
  )
  articulomanufacturadodetalles: Articulomanufacturadodetalle[];

  @OneToMany(
    () => Pedidoventadetalle,
    (pedidoventadetalle) => pedidoventadetalle.articuloInsumo
  )
  pedidoventadetalles: Pedidoventadetalle[];

  @OneToMany(
    () => Sucursalinsumo,
    (sucursalinsumo) => sucursalinsumo.articuloInsumo
  )
  sucursalinsumos: Sucursalinsumo[];
}
