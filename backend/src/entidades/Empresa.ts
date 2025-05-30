import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sucursalempresa } from "./Sucursalempresa";

@Entity("empresa", { schema: "el_buen_sabor" })
export class Empresa {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("varchar", { name: "razonSocial", nullable: true, length: 100 })
  razonSocial: string | null;

  @Column("int", { name: "cuil", nullable: true })
  cuil: number | null;

  @OneToMany(
    () => Sucursalempresa,
    (sucursalempresa) => sucursalempresa.empresa
  )
  sucursalempresas: Sucursalempresa[];
}
