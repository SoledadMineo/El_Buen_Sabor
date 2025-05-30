import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Domicilio } from "./Domicilio";
import { Pedidoventa } from "./Pedidoventa";

@Index("usuario_id", ["usuarioId"], {})
@Index("domicilio_id", ["domicilioId"], {})
@Entity("cliente", { schema: "el_buen_sabor" })
export class Cliente {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("varchar", { name: "apellido", nullable: true, length: 100 })
  apellido: string | null;

  @Column("varchar", { name: "telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("int", { name: "usuario_id", nullable: true })
  usuarioId: number | null;

  @Column("int", { name: "domicilio_id", nullable: true })
  domicilioId: number | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.clientes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuario;

  @ManyToOne(() => Domicilio, (domicilio) => domicilio.clientes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "domicilio_id", referencedColumnName: "id" }])
  domicilio: Domicilio;

  @OneToMany(() => Pedidoventa, (pedidoventa) => pedidoventa.cliente)
  pedidoventas: Pedidoventa[];
}
