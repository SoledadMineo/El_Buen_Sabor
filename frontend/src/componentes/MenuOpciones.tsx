import React from "react";

function MenuOpciones() {
  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link" aria-current="true" href="/menu">
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="true" href="/grilla">
                Grilla
              </a>
            </li>
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
