import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Datosmercadopago } from "./Datosmercadopago";
import { Facturaventa } from "./Facturaventa";
import { Cliente } from "./Cliente";
import { Sucursalempresa } from "./Sucursalempresa";
import { Pedidoventadetalle } from "./Pedidoventadetalle";

@Index("cliente_id", ["clienteId"], {})
@Index("sucursal_id", ["sucursalId"], {})
@Entity("pedidoventa", { schema: "el_buen_sabor" })
export class Pedidoventa {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("time", { name: "horaEstimadaFinalizacion", nullable: true })
  horaEstimadaFinalizacion: string | null;

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

  @Column("decimal", { name: "total", nullable: true, precision: 10, scale: 2 })
  total: string | null;

  @Column("decimal", {
    name: "totalCosto",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  totalCosto: string | null;

  @Column("enum", {
    name: "estado",
    nullable: true,
    enum: ["preparacion", "pendiente", "cancelado", "rechazado", "entregado"],
  })
  estado:
    | "preparacion"
    | "pendiente"
    | "cancelado"
    | "rechazado"
    | "entregado"
    | null;

  @Column("enum", {
    name: "tipoEnvio",
    nullable: true,
    enum: ["delivery", "TakeAway"],
  })
  tipoEnvio: "delivery" | "TakeAway" | null;

  @Column("enum", {
    name: "formaPago",
    nullable: true,
    enum: ["efectivo", "MercadoPago"],
  })
  formaPago: "efectivo" | "MercadoPago" | null;

  @Column("date", { name: "fechaPedido", nullable: true })
  fechaPedido: string | null;

  @Column("int", { name: "cliente_id", nullable: true })
  clienteId: number | null;

  @Column("int", { name: "sucursal_id", nullable: true })
  sucursalId: number | null;

  @OneToMany(
    () => Datosmercadopago,
    (datosmercadopago) => datosmercadopago.pedidoVenta
  )
  datosmercadopagos: Datosmercadopago[];

  @OneToMany(() => Facturaventa, (facturaventa) => facturaventa.pedidoVenta)
  facturaventas: Facturaventa[];

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidoventas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "cliente_id", referencedColumnName: "id" }])
  cliente: Cliente;

  @ManyToOne(
    () => Sucursalempresa,
    (sucursalempresa) => sucursalempresa.pedidoventas,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sucursal_id", referencedColumnName: "id" }])
  sucursal: Sucursalempresa;

  @OneToMany(
    () => Pedidoventadetalle,
    (pedidoventadetalle) => pedidoventadetalle.pedidoVenta
  )
  pedidoventadetalles: Pedidoventadetalle[];
}
