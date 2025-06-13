import ImagenManufacturado from "./ImagenManufacturado";
import ArticuloManufacturadoDetalle from "./ArticuloManufacturadoDetalle";
import CategoriaArticuloManufacturado from "./CategoriaArticuloManufacturado";


export default class ArticuloManufacturado{

        id?:number = 0;
        denominacion: string = "";
        tipoArticulo: string = "manufacturado";
        descripcion:string = "";
        precioVenta:number = 0;
        precioCosto:number = 0;
        tiempoEstimado:number = 0;

        imagenmanufacturados?: ImagenManufacturado[];  // 1:n
        articulomanufacturadodetalles?: ArticuloManufacturadoDetalle[];  // 1:n
        categoriaId?: CategoriaArticuloManufacturado; // n:1
        //pedidoventadetalles?= 
        //promociondetalles?=
}