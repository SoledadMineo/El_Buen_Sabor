import ArticuloInsumo from "./ArticuloInsumo";
import type ArticuloManufacturado from "./ArticuloManufacturado";

export default class PedidoVentaDetalle {
    id?: number = 0;
    cantidad: number = 0;
    subTotal: number = 0;
    articuloManufacturadoId?: ArticuloManufacturado;
    articuloInsumoId?: ArticuloInsumo;
    tipoArticulo: "manufacturado" | "insumo" = "manufacturado";
}
