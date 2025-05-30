import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Plato from '../entidades/Plato';
import { getArticuloManufacturadoXIdFecth } from "../servicios/FuncionesApi";
// import Ingrediente from '../entidades/Ingrediente';
import MenuOpciones from "./MenuOpciones";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";

function DetalleArticulo() {
  const { idarticulo } = useParams();
  const [articulo, setArticulo] = useState<ArticuloManufacturado>();
  const getArticuloManufacturado = async () => {
    const articuloSelect: ArticuloManufacturado =
      await getArticuloManufacturadoXIdFecth(Number(idarticulo));
    setArticulo(articuloSelect);
  };
  useEffect(() => {
    getArticuloManufacturado();
  }, []);

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
            {articulo?.ingredientes?.map((ing: Ingrediente) => (
              <li key={ing.id}>
                {ing.nombre} {ing.cantidad} {ing.unidadMedida}
              </li>
            ))}
          </p>
          <a href="#" className="btn btn-primary">
            Comprar
          </a>
        </div>
        <div className="card-footer text-body-secondary">
          <a href="/menu">
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
