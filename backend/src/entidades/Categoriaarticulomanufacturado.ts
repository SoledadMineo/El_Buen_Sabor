import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Articulomanufacturado } from "./Articulomanufacturado";

@Entity("categoriaarticulomanufacturado", { schema: "el_buen_sabor" })
export class Categoriaarticulomanufacturado {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "denominacion", nullable: true, length: 100 })
  denominacion: string | null;

  @OneToMany(
    () => Articulomanufacturado,
    (articulomanufacturado) => articulomanufacturado.categoria
  )
  articulomanufacturados: Articulomanufacturado[];
}
