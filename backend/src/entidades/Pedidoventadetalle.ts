import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Promocion } from "./Promocion";
import { Pedidoventa } from "./Pedidoventa";
import { Articulomanufacturado } from "./Articulomanufacturado";
import { Articuloinsumo } from "./Articuloinsumo";

@Index("pedidoVenta_id", ["pedidoVentaId"], {})
@Index("articuloManufacturado_id", ["articuloManufacturadoId"], {})
@Index("articuloInsumo_id", ["articuloInsumoId"], {})
@Index("promoción_id", ["promocionId"], {})
@Entity("pedidoventadetalle", { schema: "el_buen_sabor" })
export class Pedidoventadetalle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("double", { name: "cantidad", nullable: true })
  cantidad: number | null;

  @Column("double", { name: "subTotal", nullable: true })
  subTotal: number | null;

  @Column("int", { name: "pedidoVenta_id", nullable: true })
  pedidoVentaId: number | null;

  @Column("int", { name: "articuloManufacturado_id", nullable: true })
  articuloManufacturadoId: number | null;

  @Column("int", { name: "articuloInsumo_id", nullable: true })
  articuloInsumoId: number | null;

  @Column("int", { name: "promocion_id" })
  promocionId: number;

  @ManyToOne(() => Promocion, (promocion) => promocion.pedidoventadetalles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "promocion_id", referencedColumnName: "id" }])
  promocion: Promocion;

  @ManyToOne(
    () => Pedidoventa,
    (pedidoventa) => pedidoventa.pedidoventadetalles,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "pedidoVenta_id", referencedColumnName: "id" }])
  pedidoVenta: Pedidoventa;

  @ManyToOne(
    () => Articulomanufacturado,
    (articulomanufacturado) => articulomanufacturado.pedidoventadetalles,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "articuloManufacturado_id", referencedColumnName: "id" },
  ])
  articuloManufacturado: Articulomanufacturado;

  @ManyToOne(
    () => Articuloinsumo,
    (articuloinsumo) => articuloinsumo.pedidoventadetalles,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "articuloInsumo_id", referencedColumnName: "id" }])
  articuloInsumo: Articuloinsumo;
}
