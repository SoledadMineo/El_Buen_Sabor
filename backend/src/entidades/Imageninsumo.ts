import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Articuloinsumo } from "./Articuloinsumo";

@Entity("imageninsumo", { schema: "el_buen_sabor" })
export class Imageninsumo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "denominacion", nullable: true, length: 100 })
  denominacion: string | null;

  @OneToMany(() => Articuloinsumo, (articuloinsumo) => articuloinsumo.imagen)
  articuloinsumos: Articuloinsumo[];
}
