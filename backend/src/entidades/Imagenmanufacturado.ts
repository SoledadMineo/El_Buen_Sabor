import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Articulomanufacturado } from "./Articulomanufacturado";

@Index("fk_imagen_articulo", ["articuloManufacturadoId"], {})
@Entity("imagenmanufacturado", { schema: "el_buen_sabor" })
export class Imagenmanufacturado {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "denominacion", nullable: true, length: 100 })
  denominacion: string | null;

  @Column("int", { name: "articuloManufacturado_id", nullable: true })
  articuloManufacturadoId: number | null;

  @ManyToOne(
    () => Articulomanufacturado,
    (articulomanufacturado) => articulomanufacturado.imagenmanufacturados,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "articuloManufacturado_id", referencedColumnName: "id" },
  ])
  articuloManufacturado: Articulomanufacturado;
}
