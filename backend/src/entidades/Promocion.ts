import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pedidoventadetalle } from "./Pedidoventadetalle";
import { Promociondetalle } from "./Promociondetalle";

@Entity("promocion", { schema: "el_buen_sabor" })
export class Promocion {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "denominacion", nullable: true, length: 100 })
  denominacion: string | null;

  @Column("date", { name: "fechaDesde", nullable: true })
  fechaDesde: string | null;

  @Column("date", { name: "fechaHasta", nullable: true })
  fechaHasta: string | null;

  @Column("double", { name: "descuento", nullable: true })
  descuento: number | null;

  @OneToMany(
    () => Pedidoventadetalle,
    (pedidoventadetalle) => pedidoventadetalle.promocion
  )
  pedidoventadetalles: Pedidoventadetalle[];

  @OneToMany(
    () => Promociondetalle,
    (promociondetalle) => promociondetalle.promocion
  )
  promociondetalles: Promociondetalle[];
}
