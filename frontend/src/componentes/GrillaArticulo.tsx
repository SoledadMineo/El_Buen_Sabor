import { useState, useEffect } from "react";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import { deleteArticuloManufacturado, getArticulosManufacturados } from "../servicios/FuncionesApi";
import { useNavigate } from "react-router-dom";

function GrillaArticulo() {
  const navigate = useNavigate();
  const [articulos, setArticulos] = useState<ArticuloManufacturado[]>([]);
  const getArticuloManufacturado = async () => {
    const datos: ArticuloManufacturado[] = await getArticulosManufacturados();
    console.log("datos", datos)
    setArticulos(datos.data);
  };

  useEffect(() => {
    getArticuloManufacturado();
  }, []);

  const deleteArt = async (idArticulo: number) => {
  try {
    await deleteArticuloManufacturado(idArticulo);
    setArticulos(articulos.filter((a) => a.id !== idArticulo)); // así no recargas la página
  } catch (error) {
    console.error("Error al eliminar el artículo", error);
  }
};

  return (
    <>
      <div className="container text-center">
        <br />
        <button className="btn btn-primary" onClick={() => navigate(`/formulario/0`)}>
          Nuevo
        </button>
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
              <button
                className="btn btn-primary"
                style={{ marginBottom: 10 }}
                onClick={() => navigate(`/detalle/${articulo.id}`)}
              >
                Ver Detalle
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-info"
                style={{ marginBottom: 10 }}
                onClick={() => navigate(`/formulario/${articulo.id}`)}
              >
                Modificar
              </button>
            </div>
            <div className="col">
              <a
                className="btn btn-danger"
                style={{ marginBottom: 10 }}
                onClick={() => deleteArt(articulo.id)}
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
