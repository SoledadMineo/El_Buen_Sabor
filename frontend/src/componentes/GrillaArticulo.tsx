import { useState, useEffect } from "react";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import MenuOpciones from "./MenuOpciones";
import { getArticulos } from "../servicios/FuncionesApi";

function GrillaArticulo() {
  const [articulos, setArticulos] = useState<ArticuloManufacturado[]>([]);

  const getArticuloManufacturado = async () => {
    const datos: ArticuloManufacturado[] = await getArticulos();
    console.log("datos", datos)
    setArticulos(datos.data);
  };

  useEffect(() => {
    getArticuloManufacturado();
  }, []);

  const deleteArticulo = async (idArticulo: number) => {
    await deleteArticulo(idArticulo);
    window.location.reload();
  };

  return (
    <>
      <MenuOpciones></MenuOpciones>
      <div className="container text-center">
        <br />
        <a className="btn btn-primary" href={`/formulario/0`}>
          Nuevo
        </a>
        <div className="row">
          <div className="col">
            <b>ID</b>
          </div>
          <div className="col">
            <b>Denominación</b>
          </div>
          <div className="col">
            <b>Descripción</b>
          </div>
          <div className="col">
            <b>Precio Venta</b>
          </div>
          <div className="col">
            <b>Precio Costo</b>
          </div>
          <div className="col">
            <b>Tiempo Estimado</b>
          </div>
          <div className="col">
            <b>Ver Detalle</b>
          </div>
          <div className="col">
            <b>Modificar</b>
          </div>
          <div className="col">
            <b>Eliminar</b>
          </div>
        </div>
        {articulos.map((articulo: ArticuloManufacturado) => (
          <div className="row" key={articulo.id}>
            <div className="col">{articulo.id}</div>
            <div className="col">{articulo.denominacion}</div>
            <div className="col">{articulo.descripcion}</div>
            <div className="col">{articulo.precioVenta}</div>
            <div className="col">{articulo.precioCosto}</div>
            <div className="col">{articulo.tiempoEstimado}</div>
            <div className="col">
              <a
                className="btn btn-primary"
                style={{ marginBottom: 10 }}
                href={`/detalle/` + articulo.id}
              >
                Ver Detalle
              </a>
            </div>
            <div className="col">
              <a
                className="btn btn-info"
                style={{ marginBottom: 10 }}
                href={`/formulario/` + articulo.id}
              >
                Modificar
              </a>
            </div>
            <div className="col">
              <a
                className="btn btn-danger"
                style={{ marginBottom: 10 }}
                onClick={() => deleteArticulo(articulo.id)}
              >
                Eliminar
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GrillaArticulo;
