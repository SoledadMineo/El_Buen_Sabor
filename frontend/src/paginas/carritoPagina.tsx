import React, { useState } from "react";
import type PedidoVentaDetalle from "../entidades/PedidoVentaDetalle";
import { useCarrito } from "../hooks/useCarrito";

function CartItem({
  item,
  onAdd,
  onRemove,
}: {
  item: PedidoVentaDetalle;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const articulo = item.articuloInsumoId ?? item.articuloManufacturadoId;
  const cantidad = item.cantidad;
  const nombre = articulo.denominacion;
  const precio = articulo.precioVenta;

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="me-auto">
        <h6 className="mb-1">{nombre}</h6>
        <small className="text-muted">
          ${precio} x {cantidad} = ${(precio * cantidad).toFixed(2)}
        </small>
      </div>
      <div className="btn-group" role="group" aria-label="Controles del item">
        <button className="btn btn-outline-danger btn-sm" onClick={onRemove}>-</button>
        <span className="mx-2">{cantidad}</span>
        <button className="btn btn-outline-success btn-sm" onClick={onAdd}>+</button>
      </div>
    </li>
  );
}

export function CarritoPagina() {
  const { carrito, addCarrito, removeItemCarrito, limpiarCarrito } = useCarrito();
  const [formaPago, setFormaPago] = useState("");
  const [tipoEnvio, setTipoEnvio] = useState("");

  const total = carrito.reduce((acc, item) => {
    const articulo = item.articuloInsumoId ?? item.articuloManufacturadoId;
    return acc + (articulo?.precioVenta ?? 0) * item.cantidad;
  }, 0);

  const comprar = async () => {
    if (!formaPago || !tipoEnvio) {
      alert("Por favor seleccione una forma de pago y un tipo de envío.");
      return;
    }

    const detalles = carrito.map((item) => {      
      const tipo = item.tipoArticulo;
      console.log("tppo", tipo)
      const idArticulo = item.articuloInsumoId?.id ?? item.articuloManufacturadoId?.id;

      return {
        tipoArticulo: tipo,
        articuloId: idArticulo,
        cantidad: item.cantidad,
      };
    });

    const data = {
      clienteId: 1, // cliente de prueba
      sucursalId: 1, // sucursal de prueba
      tipoEnvio,
      formaPago,
      detalles,
    };

    try {
      const response = await fetch("http://localhost:3000/api/pedido-venta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(`Pedido realizado con éxito. ID: ${result.id}`);
      limpiarCarrito();
      setFormaPago("");
      setTipoEnvio("");
    } catch (error) {
      console.error("Error al comprar:", error);
    }
  };

  return (
    <aside className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Carrito de Compras</h4>
        </div>
        <ul className="list-group list-group-flush">
          {carrito.length === 0 && (
            <li className="list-group-item text-center">El carrito está vacío.</li>
          )}
          {carrito.map((item) => {
            const articulo = item.articuloInsumoId ?? item.articuloManufacturadoId;
            return (
              <CartItem
                key={`${articulo?.id}`}
                item={item}
                onAdd={() => addCarrito(articulo)}
                onRemove={() => removeItemCarrito(articulo)}
              />
            );
          })}
        </ul>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Forma de pago</label>
            <select
              className="form-select"
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="efectivo">Efectivo</option>
              <option value="mercadoPago">Mercado Pago</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo de envío</label>
            <select
              className="form-select"
              value={tipoEnvio}
              onChange={(e) => setTipoEnvio(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="delivery">Delivery</option>
              <option value="takeAway">Take Away</option>
            </select>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <strong>Total: ${total.toFixed(2)}</strong>
          <div>
            <button className="btn btn-outline-secondary me-2" onClick={limpiarCarrito}>
              Vaciar
            </button>
            <button className="btn btn-success" onClick={comprar} disabled={carrito.length === 0}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
