import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Facturaventa } from "./Facturaventa";

@Index("facturaVenta_id", ["facturaVentaId"], {})
@Entity("facturaventadetalle", { schema: "el_buen_sabor" })
export class Facturaventadetalle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "cantidad", nullable: true })
  cantidad: number | null;

  @Column("decimal", {
    name: "subTotal",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  subTotal: string | null;

  @Column("int", { name: "facturaVenta_id", nullable: true })
  facturaVentaId: number | null;

  @Column("int", { name: "id_promocion", nullable: true })
  idPromocion: number | null;

  @ManyToOne(
    () => Facturaventa,
    (facturaventa) => facturaventa.facturaventadetalles,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "facturaVenta_id", referencedColumnName: "id" }])
  facturaVenta: Facturaventa;
}
