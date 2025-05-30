import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Articulomanufacturado } from "./Articulomanufacturado";
import { Articuloinsumo } from "./Articuloinsumo";

@Index("articuloManufacturado_id", ["articuloManufacturadoId"], {})
@Index("articuloInsumo_id", ["articuloInsumoId"], {})
@Entity("articulomanufacturadodetalle", { schema: "el_buen_sabor" })
export class Articulomanufacturadodetalle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("double", { name: "cantidad", nullable: true })
  cantidad: number | null;

  @Column("int", { name: "articuloManufacturado_id", nullable: true })
  articuloManufacturadoId: number | null;

  @Column("int", { name: "articuloInsumo_id", nullable: true })
  articuloInsumoId: number | null;

  @ManyToOne(
    () => Articulomanufacturado,
    (articulomanufacturado) =>
      articulomanufacturado.articulomanufacturadodetalles,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "articuloManufacturado_id", referencedColumnName: "id" },
  ])
  articuloManufacturado: Articulomanufacturado;

  @ManyToOne(
    () => Articuloinsumo,
    (articuloinsumo) => articuloinsumo.articulomanufacturadodetalles,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "articuloInsumo_id", referencedColumnName: "id" }])
  articuloInsumo: Articuloinsumo;
}
