import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pedidoventa } from "./Pedidoventa";

@Index("pedidoVenta_id", ["pedidoVentaId"], {})
@Entity("datosmercadopago", { schema: "el_buen_sabor" })
export class Datosmercadopago {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "date_created", nullable: true })
  dateCreated: Date | null;

  @Column("datetime", { name: "date_approved", nullable: true })
  dateApproved: Date | null;

  @Column("datetime", { name: "date_last_updated", nullable: true })
  dateLastUpdated: Date | null;

  @Column("varchar", { name: "payment_type_id", nullable: true, length: 50 })
  paymentTypeId: string | null;

  @Column("varchar", { name: "payment_method_id", nullable: true, length: 50 })
  paymentMethodId: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 50 })
  status: string | null;

  @Column("varchar", { name: "status_detail", nullable: true, length: 100 })
  statusDetail: string | null;

  @Column("int", { name: "pedidoVenta_id", nullable: true })
  pedidoVentaId: number | null;

  @ManyToOne(
    () => Pedidoventa,
    (pedidoventa) => pedidoventa.datosmercadopagos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "pedidoVenta_id", referencedColumnName: "id" }])
  pedidoVenta: Pedidoventa;
}
