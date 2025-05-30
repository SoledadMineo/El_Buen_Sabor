import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Provincia } from "./Provincia";

@Entity("pais", { schema: "el_buen_sabor" })
export class Pais {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @OneToMany(() => Provincia, (provincia) => provincia.pais)
  provincias: Provincia[];
}
