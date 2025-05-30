// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./componentes/Menu";
import DetalleArticulo from "./componentes/DetalleArticulo";
import GrillaArticulo from "./componentes/GrillaArticulo";
import Formulario from "./componentes/Formulario";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/grilla" element={<GrillaArticulo />} />
        <Route path="/detalle">
          <Route path=":idArticulo" element={<DetalleArticulo />} />
        </Route>
        <Route path="/formulario">
          <Route path=":idArticulo" element={<Formulario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
