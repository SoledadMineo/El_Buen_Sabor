// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./componentes/Menu";
import DetalleArticulo from "./componentes/DetalleArticulo";
import GrillaArticulo from "./componentes/GrillaArticulo";
import Formulario from "./componentes/Formulario";
import { CarritoContextProvider } from "./context/CarritoContext";
import { CarritoPagina } from "./paginas/carritoPagina";
import MenuOpciones from "./componentes/MenuOpciones";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CarritoContextProvider>
      <BrowserRouter>
        <MenuOpciones />
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/grilla" element={<GrillaArticulo />} />
          <Route path="/detalle">
            <Route path=":idArticulo" element={<DetalleArticulo />} />
          </Route>
          <Route path="/formulario">
            <Route path=":idArticulo" element={<Formulario />} />
          </Route>
          <Route path="/carrito" element={<CarritoPagina />}></Route>
        </Routes>
      </BrowserRouter>
    </CarritoContextProvider>
  </React.StrictMode>
);
