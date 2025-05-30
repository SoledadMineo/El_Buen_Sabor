import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Domicilio } from "./Domicilio";
import { Provincia } from "./Provincia";

@Index("provincia_id", ["provinciaId"], {})
@Entity("localidad", { schema: "el_buen_sabor" })
export class Localidad {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("int", { name: "provincia_id", nullable: true })
  provinciaId: number | null;

  @OneToMany(() => Domicilio, (domicilio) => domicilio.localidad)
  domicilios: Domicilio[];

  @ManyToOne(() => Provincia, (provincia) => provincia.localidads, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "provincia_id", referencedColumnName: "id" }])
  provincia: Provincia;
}
