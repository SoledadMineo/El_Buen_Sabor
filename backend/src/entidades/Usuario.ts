import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";

@Entity("usuario", { schema: "el_buen_sabor" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "auth0Id", nullable: true, length: 100 })
  auth0Id: string | null;

  @Column("varchar", { name: "username", nullable: true, length: 100 })
  username: string | null;

  @OneToMany(() => Cliente, (cliente) => cliente.usuario)
  clientes: Cliente[];

  @OneToMany(() => Empleado, (empleado) => empleado.usuario)
  empleados: Empleado[];
}
