import { useEffect, useState } from "react";
import MenuOpciones from "./MenuOpciones";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import ItemArticulo from "./ItemArticulo";
import { getArticuloManufacturadoJSONFetch } from "../servicios/FuncionesApi";

function Menu() {
  const [articulo, setArticulo] = useState<ArticuloManufacturado[]>([]);

  const getArticuloManufacturado = async () => {
    const datos: ArticuloManufacturado[] =
      await getArticuloManufacturadoJSONFetch();
    setArticulo(datos);
  };

  useEffect(() => {
    getArticuloManufacturado();
  }, []);
  return (
    <>
      <MenuOpciones></MenuOpciones>
      <div className="row">
        {articulo.map((articulo: ArticuloManufacturado) => (
          <ItemArticulo
            key={articulo.id}
            id={articulo.id}
            denominacion={articulo.denominacion}
            descripcion={articulo.descripcion}
            precioVenta={articulo.precioVenta}
            precioCosto={articulo.precioCosto}
            tiempoEstimado={articulo.tiempoEstimado}
            imagen={articulo.imagenes}
            detalle={articulo.detalles}
            categoria={articulo.categoria}
          ></ItemArticulo>
        ))}
      </div>
    </>
  );
}

export default Menu;
