type ArticuloParams = {
  id: number;
  denominacion: string;
  descripcion: string;
  precioVenta: number;
  precioCosto: number;
  tiempoEstimado: number;
  imagenes: [];
  detalles: [];
  categoria: number;
};

function ItemArticulo(args: ArticuloParams) {
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
            <a href={`detalle/${args.id}`}>
              <button type="button" className="btn btn-warning">
                Detalle
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemArticulo;
