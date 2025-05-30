import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sucursalempresa } from "./Sucursalempresa";
import { Articuloinsumo } from "./Articuloinsumo";

@Index("sucursal_id", ["sucursalId"], {})
@Index("articuloInsumo_id", ["articuloInsumoId"], {})
@Entity("sucursalinsumo", { schema: "el_buen_sabor" })
export class Sucursalinsumo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("double", { name: "stockActual", nullable: true })
  stockActual: number | null;

  @Column("double", { name: "stockMinimo", nullable: true })
  stockMinimo: number | null;

  @Column("double", { name: "stockMaximo", nullable: true })
  stockMaximo: number | null;

  @Column("int", { name: "sucursal_id", nullable: true })
  sucursalId: number | null;

  @Column("int", { name: "articuloInsumo_id", nullable: true })
  articuloInsumoId: number | null;

  @ManyToOne(
    () => Sucursalempresa,
    (sucursalempresa) => sucursalempresa.sucursalinsumos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sucursal_id", referencedColumnName: "id" }])
  sucursal: Sucursalempresa;

  @ManyToOne(
    () => Articuloinsumo,
    (articuloinsumo) => articuloinsumo.sucursalinsumos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "articuloInsumo_id", referencedColumnName: "id" }])
  articuloInsumo: Articuloinsumo;
}
