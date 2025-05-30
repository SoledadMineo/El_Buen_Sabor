import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Sucursalempresa } from "./Sucursalempresa";

@Index("usuario_id", ["usuarioId"], {})
@Index("sucursal_id", ["sucursalId"], {})
@Entity("empleado", { schema: "el_buen_sabor" })
export class Empleado {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("varchar", { name: "apellido", nullable: true, length: 100 })
  apellido: string | null;

  @Column("varchar", { name: "telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("enum", {
    name: "perfilRol",
    nullable: true,
    enum: ["admin", "empleado", "cliente"],
  })
  perfilRol: "admin" | "empleado" | "cliente" | null;

  @Column("int", { name: "usuario_id", nullable: true })
  usuarioId: number | null;

  @Column("int", { name: "sucursal_id", nullable: true })
  sucursalId: number | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.empleados, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuario;

  @ManyToOne(
    () => Sucursalempresa,
    (sucursalempresa) => sucursalempresa.empleados,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sucursal_id", referencedColumnName: "id" }])
  sucursal: Sucursalempresa;
}
