import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Articuloinsumo } from "./Articuloinsumo";

@Index("fk_categoria_subcategoria", ["subcategoriaId"], {})
@Entity("categoriaarticulo", { schema: "el_buen_sabor" })
export class Categoriaarticulo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "denominacion", nullable: true, length: 100 })
  denominacion: string | null;

  @Column("int", { name: "subcategoria_id", nullable: true })
  subcategoriaId: number | null;

  @OneToMany(() => Articuloinsumo, (articuloinsumo) => articuloinsumo.categoria)
  articuloinsumos: Articuloinsumo[];

  @ManyToOne(
    () => Categoriaarticulo,
    (categoriaarticulo) => categoriaarticulo.categoriaarticulos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "subcategoria_id", referencedColumnName: "id" }])
  subcategoria: Categoriaarticulo;

  @OneToMany(
    () => Categoriaarticulo,
    (categoriaarticulo) => categoriaarticulo.subcategoria
  )
  categoriaarticulos: Categoriaarticulo[];
}
