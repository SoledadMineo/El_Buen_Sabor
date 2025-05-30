import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cliente } from "./Cliente";
import { Localidad } from "./Localidad";
import { Sucursalempresa } from "./Sucursalempresa";

@Index("localidad_id", ["localidadId"], {})
@Entity("domicilio", { schema: "el_buen_sabor" })
export class Domicilio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "calle", nullable: true, length: 100 })
  calle: string | null;

  @Column("int", { name: "numero", nullable: true })
  numero: number | null;

  @Column("int", { name: "cp", nullable: true })
  cp: number | null;

  @Column("int", { name: "localidad_id", nullable: true })
  localidadId: number | null;

  @OneToMany(() => Cliente, (cliente) => cliente.domicilio)
  clientes: Cliente[];

  @ManyToOne(() => Localidad, (localidad) => localidad.domicilios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "localidad_id", referencedColumnName: "id" }])
  localidad: Localidad;

  @OneToMany(
    () => Sucursalempresa,
    (sucursalempresa) => sucursalempresa.domicilio
  )
  sucursalempresas: Sucursalempresa[];
}
