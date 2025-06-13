import { ReactNode, createContext, useState } from "react";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import ArticuloInsumo from "../entidades/ArticuloInsumo";
import type PedidoVentaDetalle from "../entidades/PedidoVentaDetalle";


// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CarritoContextType {
  carrito: PedidoVentaDetalle[];
  addCarrito: (producto: ArticuloInsumo | ArticuloManufacturado) => void;
  removeCarrito: (producto: ArticuloInsumo | ArticuloManufacturado) => void;
  removeItemCarrito: (producto: ArticuloInsumo | ArticuloManufacturado) => void;
  limpiarCarrito: () => void;
}

const esArticuloInsumo = (
  producto: ArticuloInsumo | ArticuloManufacturado
): producto is ArticuloInsumo => {
  return producto.tipoArticulo === "insumo";
};

//crear contexto
export const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  addCarrito: () => { },
  removeCarrito: () => { },
  removeItemCarrito: () => { },
  limpiarCarrito: () => { },
});

//crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<PedidoVentaDetalle[]>([]);

  console.log("CarritoContextProvider montado");

  const addCarrito = (producto: ArticuloInsumo | ArticuloManufacturado) => {
    let existe: boolean;
    let nuevoCarrito: PedidoVentaDetalle[];

    const precio = producto.precioVenta ?? 0;

    if (esArticuloInsumo(producto)) {
      existe = carrito.some(
        (item) => item.articuloInsumoId?.id === producto.id
      );
      if (existe) {
        nuevoCarrito = carrito.map((item) =>
          item.articuloInsumoId?.id === producto.id
            ? {
              ...item,
              cantidad: item.cantidad + 1,
              subTotal: (item.cantidad + 1) * precio,
            }
            : item
        );
      } else {
        nuevoCarrito = [
          ...carrito,
          {
            tipoArticulo: "insumo",
            articuloInsumoId: producto,
            cantidad: 1,
            subTotal: precio,
          },
        ];
      }
    } else {
      existe = carrito.some(
        (item) => item.articuloManufacturadoId?.id === producto.id
      );
      if (existe) {
        nuevoCarrito = carrito.map((item) =>
          item.articuloManufacturadoId?.id === producto.id
            ? {
              ...item,
              cantidad: item.cantidad + 1,
              subTotal: (item.cantidad + 1) * precio,
            }
            : item
        );
      } else {
        nuevoCarrito = [
          ...carrito,
          {
            tipoArticulo: "manufacturado",
            articuloManufacturadoId: producto,
            cantidad: 1,
            subTotal: precio,
          },
        ];
      }
    }

    setCarrito(nuevoCarrito);
  };

  const removeCarrito = async (producto: ArticuloInsumo | ArticuloManufacturado) => {
    await setCarrito((prevCart) =>
      prevCart.filter((item) => item.id !== producto.id)
    );
  };

  // const removeItemCarrito = async (product: Instrumento) => {
  //   //const objetoBuscado = cart.find((objeto:Plato) => objeto.id === product.id);
  //   //const platoIndice = cart.findIndex((objeto:Plato) => objeto.id === product.id)
  //   //si el producto ya esta en el carrito
  //   let existe: boolean = false;
  //   cart.forEach(async (element: Instrumento) => {
  //     if (element.id === product.id) {
  //       existe = true;
  //     }
  //   });

  //   if (existe) {
  //     console.log("EXISTE");
  //     if (product.cantidad > 1) {
  //       product.cantidad -= 1;
  //       const cartClonado = await structuredClone(
  //         cart.filter((item) => item.id !== product.id)
  //       );
  //       await cartClonado.push(product);
  //       setCart(cartClonado);
  //     } else {
  //       await setCart((prevCart) =>
  //         prevCart.filter((item) => item.id !== product.id)
  //       );
  //     }
  //   }  

  const removeItemCarrito = (producto: ArticuloInsumo | ArticuloManufacturado) => {
    let productoEnCarrito: PedidoVentaDetalle | undefined;

    if (esArticuloInsumo(producto)) {
      productoEnCarrito = carrito.find(
        (item) => item.articuloInsumoId?.id === producto.id
      );
    } else {
      productoEnCarrito = carrito.find(
        (item) => item.articuloManufacturadoId?.id === producto.id
      );
    }

    if (!productoEnCarrito) return;

    const precio = producto.precioVenta ?? 0;

    if (productoEnCarrito.cantidad > 1) {
      const nuevoCarrito = carrito.map((item) => {
        const esElProducto = esArticuloInsumo(producto)
          ? item.articuloInsumoId?.id === producto.id
          : item.articuloManufacturadoId?.id === producto.id;

        return esElProducto
          ? {
            ...item,
            cantidad: item.cantidad - 1,
            subTotal: (item.cantidad - 1) * precio,
          }
          : item;
      });
      setCarrito(nuevoCarrito);
    } else {
      const nuevoCarrito = carrito.filter((item) =>
        esArticuloInsumo(producto)
          ? item.articuloInsumoId?.id !== producto.id
          : item.articuloManufacturadoId?.id !== producto.id
      );
      setCarrito(nuevoCarrito);
    }
  };


  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito: carrito,
        addCarrito,
        limpiarCarrito,
        removeCarrito,
        removeItemCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
