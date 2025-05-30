import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Promocion } from "./Promocion";
import { Articulomanufacturado } from "./Articulomanufacturado";

@Index("promocion_id", ["promocionId"], {})
@Index("articuloManufacturado_id", ["articuloManufacturadoId"], {})
@Entity("promociondetalle", { schema: "el_buen_sabor" })
export class Promociondetalle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "cantidad", nullable: true })
  cantidad: number | null;

  @Column("int", { name: "promocion_id", nullable: true })
  promocionId: number | null;

  @Column("int", { name: "articuloManufacturado_id", nullable: true })
  articuloManufacturadoId: number | null;

  @ManyToOne(() => Promocion, (promocion) => promocion.promociondetalles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "promocion_id", referencedColumnName: "id" }])
  promocion: Promocion;

  @ManyToOne(
    () => Articulomanufacturado,
    (articulomanufacturado) => articulomanufacturado.promociondetalles,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "articuloManufacturado_id", referencedColumnName: "id" },
  ])
  articuloManufacturado: Articulomanufacturado;
}
