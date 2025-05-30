// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./componentes/Menu";
import DetalleArticulo from "./componentes/DetalleArticulo";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/detalle">
          <Route path=":idArticulo" element={<DetalleArticulo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
