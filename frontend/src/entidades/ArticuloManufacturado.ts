import ImagenManufacturado from "./ImagenManufacturado";
import ArticuloManufacturadoDetalle from "./ArticuloManufacturadoDetalle";
import CategoriaArticuloManufacturado from "./CategoriaArticuloManufacturado";


export default class ArticuloManufacturado{

        id:number = 0;
        denominacion: string = "";
        descripcion:string = "";
        precioVenta:number = 0;
        precioCosto:number = 0;
        tiempoEstimado:number = 0;

        imagenes?: ImagenManufacturado[];  // 1:n
        detalles?: ArticuloManufacturadoDetalle[];  // 1:n
        categoria?: CategoriaArticuloManufacturado; // n:1
}