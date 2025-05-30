import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Empleado } from "./Empleado";
import { Pedidoventa } from "./Pedidoventa";
import { Empresa } from "./Empresa";
import { Domicilio } from "./Domicilio";
import { Sucursalinsumo } from "./Sucursalinsumo";

@Index("empresa_id", ["empresaId"], {})
@Index("domicilio_id", ["domicilioId"], {})
@Entity("sucursalempresa", { schema: "el_buen_sabor" })
export class Sucursalempresa {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("time", { name: "horarioApertura", nullable: true })
  horarioApertura: string | null;

  @Column("time", { name: "horarioCierre", nullable: true })
  horarioCierre: string | null;

  @Column("int", { name: "empresa_id", nullable: true })
  empresaId: number | null;

  @Column("int", { name: "domicilio_id", nullable: true })
  domicilioId: number | null;

  @OneToMany(() => Empleado, (empleado) => empleado.sucursal)
  empleados: Empleado[];

  @OneToMany(() => Pedidoventa, (pedidoventa) => pedidoventa.sucursal)
  pedidoventas: Pedidoventa[];

  @ManyToOne(() => Empresa, (empresa) => empresa.sucursalempresas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "empresa_id", referencedColumnName: "id" }])
  empresa: Empresa;

  @ManyToOne(() => Domicilio, (domicilio) => domicilio.sucursalempresas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "domicilio_id", referencedColumnName: "id" }])
  domicilio: Domicilio;

  @OneToMany(() => Sucursalinsumo, (sucursalinsumo) => sucursalinsumo.sucursal)
  sucursalinsumos: Sucursalinsumo[];
}
