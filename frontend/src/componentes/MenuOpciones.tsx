import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext"; // ajustá la ruta según tu proyecto
import { useNavigate } from "react-router-dom";

function MenuOpciones() {

  const { carrito } = useContext(CarritoContext);

  const navigate = useNavigate();
  // Calcular la cantidad total de productos
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);


  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link" aria-current="true" onClick={() => navigate("/menu")}>
                Menu
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" aria-current="true" onClick={() => navigate("/grilla")}>
                Grilla
              </a>
            </li> */}
            <div>
              <a className="btn btn-outline-dark position-relative" onClick={() => navigate("/carrito")}>
                🛒 Carrito
                {cantidadTotal > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cantidadTotal}
                  </span>
                )}
              </a>
            </div>
            {/* <li className="nav-item">
              <a className="nav-link" href="/app">
                App
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
export default MenuOpciones;
