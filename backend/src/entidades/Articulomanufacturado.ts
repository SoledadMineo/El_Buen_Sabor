import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categoriaarticulomanufacturado } from "./Categoriaarticulomanufacturado";
import { Articulomanufacturadodetalle } from "./Articulomanufacturadodetalle";
import { Imagenmanufacturado } from "./Imagenmanufacturado";
import { Pedidoventadetalle } from "./Pedidoventadetalle";
import { Promociondetalle } from "./Promociondetalle";

@Index("categoria_id", ["categoriaId"], {})
@Entity("articulomanufacturado", { schema: "el_buen_sabor" })
export class Articulomanufacturado {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "denominacion", nullable: true, length: 100 })
  denominacion: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("double", { name: "precioVenta", nullable: true })
  precioVenta: number | null;

  @Column("double", { name: "precioCosto", nullable: true })
  precioCosto: number | null;

  @Column("int", { name: "tiempoEstimado", nullable: true })
  tiempoEstimado: number | null;

  @Column("int", { name: "categoria_id", nullable: true })
  categoriaId: number | null;

  @ManyToOne(
    () => Categoriaarticulomanufacturado,
    (categoriaarticulomanufacturado) =>
      categoriaarticulomanufacturado.articulomanufacturados,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "categoria_id", referencedColumnName: "id" }])
  categoria: Categoriaarticulomanufacturado;

  @OneToMany(
    () => Articulomanufacturadodetalle,
    (articulomanufacturadodetalle) =>
      articulomanufacturadodetalle.articuloManufacturado
  )
  articulomanufacturadodetalles: Articulomanufacturadodetalle[];

  @OneToMany(
    () => Imagenmanufacturado,
    (imagenmanufacturado) => imagenmanufacturado.articuloManufacturado
  )
  imagenmanufacturados: Imagenmanufacturado[];

  @OneToMany(
    () => Pedidoventadetalle,
    (pedidoventadetalle) => pedidoventadetalle.articuloManufacturado
  )
  pedidoventadetalles: Pedidoventadetalle[];

  @OneToMany(
    () => Promociondetalle,
    (promociondetalle) => promociondetalle.articuloManufacturado
  )
  promociondetalles: Promociondetalle[];
}
