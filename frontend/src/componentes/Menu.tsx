import { useEffect, useState } from "react";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import ArticuloInsumo from "../entidades/ArticuloInsumo";
import ItemMenu from "./ItemMenu";
import { getArticulosManufacturados } from "../servicios/FuncionesApi";
import { getArticuloInsumos } from "../servicios/FuncionesApi";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [articulos, setArticulos] = useState<ArticuloManufacturado[]>([]);
  const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);

  const navigate = useNavigate();

  const getArticuloManufacturado = async () => {
    const response = await getArticulosManufacturados();
    console.log("Respuesta de getArticulosManufacturados:", response);
    setArticulos(response.data); // ✅ .data es el array que querés mapear
  };

  const getArticuloInsumo = async () => {
    const response = await getArticuloInsumos(false);
    console.log("Respuesta de getArticulosInsumos:", response);
    setInsumos(response); // ✅ .data es el array que querés mapear
  };

  useEffect(() => {
    getArticuloManufacturado();
    getArticuloInsumo()
  }, []);

  const confirmarPedido = () => {
    navigate("/carrito");
  }
  console.log("Contenido de articulo:", articulos);
  return (
    <>
      <div className="row">
        {articulos.map((articulo: ArticuloManufacturado) => (
          <ItemMenu
            key={articulo.id}
            tipoArticulo="manufacturado"
            id={articulo.id || 0}
            denominacion={articulo.denominacion}
            descripcion={articulo.descripcion || ""}
            precioVenta={articulo.precioVenta}
            imagenes={articulo.imagenmanufacturados || []}
            categoria={articulo.categoriaId || { id: 0, denominacion: "" }}
          ></ItemMenu>
        ))}
        {insumos.map((insumo: ArticuloInsumo) => (
          <ItemMenu
            key={insumo.id}
            tipoArticulo="insumo"
            id={insumo.id || 0}
            denominacion={insumo.denominacion}            
            precioVenta={insumo.precioVenta}
            imagenes={insumo.imagenmanufacturados || []}
            categoria={insumo.categoriaId || { id: 0, denominacion: "" }}
          ></ItemMenu>
        ))}
      </div>

      <button className="btn btn-primary mt-2" onClick={confirmarPedido}>Confirmar Pedido</button>
    </>
  );
}

export default Menu;
