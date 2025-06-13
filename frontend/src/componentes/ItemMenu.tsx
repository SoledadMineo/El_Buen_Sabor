import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import type CategoriaArticuloManufacturado from "../entidades/CategoriaArticuloManufacturado";
import type ImagenManufacturado from "../entidades/ImagenManufacturado";

type ArticuloParams = {
  id: number;
  tipoArticulo: "manufacturado" | "insumo";
  denominacion: string;
  descripcion: string;
  precioVenta: number;
  precioCosto: number;
  tiempoEstimado: number;
  imagenes: ImagenManufacturado[];
  categoria: CategoriaArticuloManufacturado;
};

function ItemMenu(args: ArticuloParams) {

  const { addCarrito, removeCarrito, removeItemCarrito, carrito } = useContext(CarritoContext);

  const productoEnCarrito = carrito.find(
    (item) => item.tipoArticulo === "manufacturado" ? item.articuloManufacturadoId?.id === args.id : item.articuloInsumoId?.id === args.id
  );

  const cantidad = productoEnCarrito?.cantidad ?? 0;

  return (
    <>
      <div className="col-sm-3 mb-3 mb-sm-0 espacio">
        <div className="card tarjeta">
          <div>
            <img
              src={`./images/${args.imagenes}`}
              className="card-img-top img-altura"
            ></img>
          </div>
          <div className="card-body altura-cuerpo">
            <h5 className="card-title" title={args.denominacion}>
              {args.denominacion}
            </h5>
            <p className="card-text">${args.precioVenta}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

              {/* <a href={`detalle/${args.id}`}>
              <button type="button" >
                Ver
              </button>
            </a> */}
              <button
                style={{
                  marginRight: "15px",
                }}
                className="btn btn-warning"
              // onClick={irAlDetalle}
              >
                Ver
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: "#4e5a6f",
                  color: "white",
                  width: "40px",
                  height: "40px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                onClick={() => removeItemCarrito(args)} // restar 1 unidad
              >
                -
              </button>

              <span>{cantidad}</span>

              <button
                className="btn"
                style={{
                  backgroundColor: "#4e5a6f",
                  color: "white",
                  width: "40px",
                  height: "40px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                onClick={() => addCarrito(args)} // sumar 1 unidad
              >
                +
              </button>
            </div>


            {/* <button type="button" className="btn btn-danger">
              Eliminar
            </button>
            <a href={`detalle/${args.id}`}>
              <button type="button" className="btn btn-primary">
                Modificar
              </button>
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemMenu;
