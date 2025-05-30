import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuOpciones from "./MenuOpciones";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import { getArticuloManufacturadoXIdFecth } from "../servicios/FuncionesApi";

function DetalleArticulo() {
  const { idArticulo } = useParams();
  const [articulo, setArticulo] = useState<ArticuloManufacturado>();
  const getArticuloManufacturado = async () => {
    const articuloSelect: ArticuloManufacturado =
      await getArticuloManufacturadoXIdFecth(Number(idArticulo));
    setArticulo(articuloSelect);
  };
  useEffect(() => {
    getArticuloManufacturado();
  }, []);

  console.log(articulo)

  return (
    <>
      <MenuOpciones></MenuOpciones>
      <div className="card text-center">
        <div className="card-header">{articulo?.rubro}</div>
        <div>
          <img
            src={"/images/" + articulo?.imagenPath}
            className="card-img-top img-altura"
            alt={articulo?.imagenPath}
          ></img>
        </div>
        <div className="card-body">
          <h5 className="card-title">{articulo?.nombre}</h5>
          <h4 className="card-title">${articulo?.precio}</h4>
          <p className="card-text">{articulo?.descripcion}</p>
          <p className="align-izquierda">
            Ingredientes:<br></br>
            {articulo?.articulomanufacturadodetalles?.map((ing: Ingrediente) => (
              <li key={ing.id}>
                {ing.articuloInsumo.denominacion} {ing.cantidad} {ing.articuloInsumo.unidadMedida.denominacion}
              </li>
            ))}
          </p>
          {/* <a href="#" className="btn btn-primary">
            Comprar
          </a> */}
        </div>
        <div className="card-footer text-body-secondary">
          <a href="/grilla">
            <button type="button" className="btn btn-success">
              Volver
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default DetalleArticulo;
