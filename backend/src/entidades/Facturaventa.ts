import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pedidoventa } from "./Pedidoventa";
import { Facturaventadetalle } from "./Facturaventadetalle";

@Index("pedidoVenta_id", ["pedidoVentaId"], {})
@Entity("facturaventa", { schema: "el_buen_sabor" })
export class Facturaventa {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "fechaFacturacion", nullable: true })
  fechaFacturacion: string | null;

  @Column("varchar", { name: "numeroComprobante", nullable: true, length: 50 })
  numeroComprobante: string | null;

  @Column("enum", {
    name: "formaPago",
    nullable: true,
    enum: ["efectivo", "MercadoPago"],
  })
  formaPago: "efectivo" | "MercadoPago" | null;

  @Column("decimal", {
    name: "subtotal",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  subtotal: string | null;

  @Column("decimal", {
    name: "descuento",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  descuento: string | null;

  @Column("decimal", {
    name: "gastosEnvio",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  gastosEnvio: string | null;

  @Column("decimal", {
    name: "totalVenta",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  totalVenta: string | null;

  @Column("int", { name: "pedidoVenta_id", nullable: true })
  pedidoVentaId: number | null;

  @ManyToOne(() => Pedidoventa, (pedidoventa) => pedidoventa.facturaventas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "pedidoVenta_id", referencedColumnName: "id" }])
  pedidoVenta: Pedidoventa;

  @OneToMany(
    () => Facturaventadetalle,
    (facturaventadetalle) => facturaventadetalle.facturaVenta
  )
  facturaventadetalles: Facturaventadetalle[];
}
