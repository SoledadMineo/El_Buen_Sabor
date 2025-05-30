import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Localidad } from "./Localidad";
import { Pais } from "./Pais";

@Index("pais_id", ["paisId"], {})
@Entity("provincia", { schema: "el_buen_sabor" })
export class Provincia {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("int", { name: "pais_id", nullable: true })
  paisId: number | null;

  @OneToMany(() => Localidad, (localidad) => localidad.provincia)
  localidads: Localidad[];

  @ManyToOne(() => Pais, (pais) => pais.provincias, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "pais_id", referencedColumnName: "id" }])
  pais: Pais;
}
