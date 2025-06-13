import type CategoriaArticuloManufacturado from "./CategoriaArticuloManufacturado";
import type Unidadmedida from "./Unidadmedida";

export default class ArticuloInsumo {
  id?: number = 0;
  tipoArticulo: string = "insumo";
  denominacion: string = "";
  precioCompra: number = 0;
  precioVenta: number = 0;
  esParaElaborar: number= 0;
  unidad_medida_id?: Unidadmedida;
  categoria_id?: CategoriaArticuloManufacturado;
  imagen_id: string= "";
}
